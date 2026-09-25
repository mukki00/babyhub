const fs = require('fs');
const os = require('os');
const path = require('path');

const walletFiles = {
  cwalletSso: 'ORACLE_WALLET_CWALLET_SSO_BASE64',
  ewalletP12: 'ORACLE_WALLET_EWALLET_P12_BASE64',
  ewalletPem: 'ORACLE_WALLET_EWALLET_PEM_BASE64',
  tnsnames: 'ORACLE_WALLET_TNSNAMES_BASE64',
  sqlnet: 'ORACLE_WALLET_SQLNET_BASE64',
};

let walletPathPromise;

async function getWalletPath(configuredPath) {
  const encodedFiles = Object.values(walletFiles).map((name) => process.env[name]);
  if (!encodedFiles.some(Boolean)) return path.resolve(configuredPath);
  if (encodedFiles.some((value) => !value)) {
    throw new Error('Oracle wallet deployment variables are incomplete');
  }

  if (!walletPathPromise) {
    walletPathPromise = Promise.resolve().then(() => {
      const directory = path.join(os.tmpdir(), 'babyhub-oracle-wallet');
      fs.mkdirSync(directory, { recursive: true });
      for (const [fileName, variableName] of Object.entries(walletFiles)) {
        const targetName = {
          cwalletSso: 'cwallet.sso',
          ewalletP12: 'ewallet.p12',
          ewalletPem: 'ewallet.pem',
          tnsnames: 'tnsnames.ora',
          sqlnet: 'sqlnet.ora',
        }[fileName];
        fs.writeFileSync(path.join(directory, targetName), Buffer.from(process.env[variableName], 'base64'));
      }
      return directory;
    });
  }

  return walletPathPromise;
}

module.exports = getWalletPath;
