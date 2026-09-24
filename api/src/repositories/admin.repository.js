const { withConnection } = require('../config/db');

// Single-admin credential lookup used only by the auth service.
const adminRepository = {
  async findByUsername(username) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, username, password_hash
         FROM admins
         WHERE username = :username`,
        { username }
      );
      return result.rows[0] || null;
    });
  },
};

module.exports = adminRepository;
