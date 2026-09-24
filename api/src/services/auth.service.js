const adminRepository = require('../repositories/admin.repository');
const { comparePassword } = require('../utils/password');
const { signAdminToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');

const authService = {
  async login(username, password) {
    if (!username || !password) {
      throw new ApiError(400, 'username and password are required');
    }

    const admin = await adminRepository.findByUsername(username);
    if (!admin) throw new ApiError(401, 'Invalid credentials');

    const passwordHash = admin.PASSWORD_HASH ?? admin.password_hash;
    const isValid = await comparePassword(password, passwordHash);
    if (!isValid) throw new ApiError(401, 'Invalid credentials');

    const adminId = admin.ID ?? admin.id;
    const token = signAdminToken({ sub: adminId, username });
    return { token };
  },
};

module.exports = authService;
