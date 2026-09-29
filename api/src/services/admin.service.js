const adminRepository = require('../repositories/admin.repository');
const ApiError = require('../utils/ApiError');

const PHONE_PATTERN = /^\+94\d{9}$/;

const adminService = {
  async getPhoneNumber(adminId) {
    return adminRepository.findPhoneNumber(adminId);
  },

  async getWhatsAppNumber() {
    return adminRepository.findPrimaryPhoneNumber();
  },

  async updatePhoneNumber(adminId, phoneNumber) {
    const normalizedPhone = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
    if (!PHONE_PATTERN.test(normalizedPhone)) {
      throw new ApiError(400, 'Phone number must be in the format +947xxxxxxxx');
    }

    const updated = await adminRepository.updatePhoneNumber(adminId, normalizedPhone);
    if (!updated) throw new ApiError(404, 'Admin account not found');
    return normalizedPhone;
  },
};

module.exports = adminService;