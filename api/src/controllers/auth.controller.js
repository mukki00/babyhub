const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');

const authController = {
  login: asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { token } = await authService.login(username, password);
    res.json({ token });
  }),
};

module.exports = authController;
