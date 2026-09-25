const oracledb = require('oracledb');
const fs = require('fs');
const env = require('./env');
const getWalletPath = require('./oracleWallet');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

let pool;

// Lazily creates a single connection pool shared across serverless invocations.
async function getPool() {
  if (pool) return pool;

  const walletPath = await getWalletPath(env.oracle.walletLocation);
  const walletSummary = fs.existsSync(walletPath)
    ? fs.readdirSync(walletPath).map((fileName) => `${fileName}:${fs.statSync(`${walletPath}/${fileName}`).size}`).join(', ')
    : 'directory-missing';

  console.log(`[oracle] alias=${env.oracle.connectString} wallet=${walletPath} files=${walletSummary}`);

  try {
    pool = await oracledb.createPool({
      user: env.oracle.user,
      password: env.oracle.password,
      connectString: env.oracle.connectString,
      configDir: walletPath,
      walletLocation: walletPath,
      walletPassword: env.oracle.walletPassword,
      poolMin: 0,
      poolMax: 5,
      poolIncrement: 1,
    });
  } catch (error) {
    console.error(`[oracle] pool creation failed code=${error.code || 'unknown'} message=${error.message}`);
    throw error;
  }

  return pool;
}

async function withConnection(work) {
  const dbPool = await getPool();
  let connection;
  try {
    connection = await dbPool.getConnection();
    return await work(connection);
  } catch (error) {
    console.error(`[oracle] connection/query failed code=${error.code || 'unknown'} message=${error.message}`);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { getPool, withConnection };
