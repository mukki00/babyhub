require('dotenv').config();

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
  },
  cloudinary: {
    cloudName: required('CLOUDINARY_CLOUD_NAME'),
    apiKey: required('CLOUDINARY_API_KEY'),
    apiSecret: required('CLOUDINARY_API_SECRET'),
  },
};
