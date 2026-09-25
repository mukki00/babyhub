const path = require('path');
const dotenv = require('dotenv');

// .env is the authoritative source; override stale values that may exist in .env.local.
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

// Centralized, validated access to environment configuration.
const required = (name, fallback) => process.env[name] ?? fallback;

module.exports = {
  nodeEnv: required('NODE_ENV', 'development'),
  port: Number(required('PORT', 3001)),
  jwt: {
    secret: required('JWT_SECRET', 'dev-secret-change-me'),
    expiresIn: required('JWT_EXPIRES_IN', '8h'),
  },
  oracle: {
    user: required('ORACLE_USER'),
    password: required('ORACLE_PASSWORD'),
    connectString: required('ORACLE_CONNECT_STRING'),
    walletLocation: required('ORACLE_WALLET_LOCATION'),
    walletPassword: required('ORACLE_WALLET_PASSWORD'),
  },
  cloudinary: {
    cloudName: required('CLOUDINARY_CLOUD_NAME'),
    apiKey: required('CLOUDINARY_API_KEY'),
    apiSecret: required('CLOUDINARY_API_SECRET'),
  },
};
