const adminRepository = require('../repositories/admin.repository');
const { comparePassword, hashPassword } = require('../utils/password');
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

  async changePassword(adminId, currentPassword, newPassword) {
    if (!currentPassword || !newPassword) {
      throw new ApiError(400, 'current password and new password are required');
    }
    if (newPassword.length < 8) {
      throw new ApiError(400, 'new password must be at least 8 characters');
    }

    const admin = await adminRepository.findById(adminId);
    if (!admin) throw new ApiError(404, 'Admin account not found');

    const passwordHash = admin.PASSWORD_HASH ?? admin.password_hash;
    const isValid = await comparePassword(currentPassword, passwordHash);
    if (!isValid) throw new ApiError(400, 'Current password is incorrect');

    const updated = await adminRepository.updatePassword(adminId, await hashPassword(newPassword));
    if (!updated) throw new ApiError(404, 'Admin account not found');
  },
};

module.exports = authService;
