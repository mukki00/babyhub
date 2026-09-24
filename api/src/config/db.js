const oracledb = require('oracledb');
const env = require('./env');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

let pool;

// Lazily creates a single connection pool shared across serverless invocations.
async function getPool() {
  if (pool) return pool;

  pool = await oracledb.createPool({
    user: env.oracle.user,
    password: env.oracle.password,
    connectString: env.oracle.connectString,
    walletLocation: env.oracle.walletLocation,
    poolMin: 0,
    poolMax: 5,
    poolIncrement: 1,
  });

  return pool;
}

async function withConnection(work) {
  const dbPool = await getPool();
  const connection = await dbPool.getConnection();
  try {
    return await work(connection);
  } finally {
    await connection.close();
  }
}

module.exports = { getPool, withConnection };
