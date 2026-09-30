const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');

const authController = {
  login: asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { token } = await authService.login(username, password);
    res.json({ token });
  }),
  changePassword: asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.admin.sub, currentPassword, newPassword);
    res.json({ message: 'Password updated successfully.' });
  }),
};

module.exports = authController;
