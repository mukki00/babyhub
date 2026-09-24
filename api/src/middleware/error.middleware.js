const ApiError = require('../utils/ApiError');

// Central error handler: keeps Oracle/Cloudinary internals out of client responses.
function errorMiddleware(err, req, res, next) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({ error: message });
}

function notFoundMiddleware(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

module.exports = { errorMiddleware, notFoundMiddleware };
