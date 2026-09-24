const { verifyToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');

// Protects /api/admin/* routes: requires a valid admin JWT in the Authorization header.
function requireAdminAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Missing or invalid Authorization header'));
  }

  try {
    req.admin = verifyToken(token);
    return next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
}

module.exports = requireAdminAuth;
