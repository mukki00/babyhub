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

  async findPhoneNumber(adminId) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT phone_number
         FROM admins
         WHERE id = :adminId`,
        { adminId }
      );
      const row = result.rows[0];
      return row ? (row.PHONE_NUMBER ?? row.phone_number ?? null) : null;
    });
  },

  async findPrimaryPhoneNumber() {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT phone_number
         FROM admins
         WHERE id = (SELECT MIN(id) FROM admins)`
      );
      const row = result.rows[0];
      return row ? (row.PHONE_NUMBER ?? row.phone_number ?? null) : null;
    });
  },

  async updatePhoneNumber(adminId, phoneNumber) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE admins
         SET phone_number = :phoneNumber
         WHERE id = :adminId`,
        { adminId, phoneNumber },
        { autoCommit: true }
      );
      return result.rowsAffected > 0;
    });
  },
};

module.exports = adminRepository;
