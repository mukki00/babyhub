const adminService = require('../services/admin.service');
const asyncHandler = require('../utils/asyncHandler');

const adminController = {
  getPhoneNumber: asyncHandler(async (req, res) => {
    const phoneNumber = await adminService.getPhoneNumber(req.admin.sub);
    res.json({ phoneNumber });
  }),

  updatePhoneNumber: asyncHandler(async (req, res) => {
    const phoneNumber = await adminService.updatePhoneNumber(req.admin.sub, req.body.phoneNumber);
    res.json({ phoneNumber });
  }),

  getWhatsAppNumber: asyncHandler(async (_req, res) => {
    const phoneNumber = await adminService.getWhatsAppNumber();
    res.json({ phoneNumber });
  }),
};

module.exports = adminController;