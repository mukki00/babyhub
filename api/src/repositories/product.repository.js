const { withConnection } = require('../config/db');
const { normalizeRow, normalizeRows } = require('../utils/normalizeRow');

// Data access only: raw SQL against the Oracle Autonomous Database. No business logic.
const productRepository = {
  async findAll() {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, name, description, price, image_url, image_public_id, created_at
         FROM products
         ORDER BY created_at DESC`
      );
      return normalizeRows(result.rows);
    });
  },

  async findById(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, name, description, price, image_url, image_public_id, created_at
         FROM products
         WHERE id = :id`,
        { id }
      );
      return normalizeRow(result.rows[0]) || null;
    });
  },

  async create({ name, description, price, imageUrl, imagePublicId }) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `INSERT INTO products (name, description, price, image_url, image_public_id)
         VALUES (:name, :description, :price, :imageUrl, :imagePublicId)
         RETURNING id INTO :id`,
        {
          name,
          description,
          price,
          imageUrl,
          imagePublicId,
          id: { dir: require('oracledb').BIND_OUT, type: require('oracledb').NUMBER },
        }
      );
      return result.outBinds.id[0];
    });
  },

  async update(id, { name, description, price, imageUrl, imagePublicId }) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE products
         SET name = :name,
             description = :description,
             price = :price,
             image_url = :imageUrl,
             image_public_id = :imagePublicId
         WHERE id = :id`,
        { name, description, price, imageUrl, imagePublicId, id }
      );
      return result.rowsAffected > 0;
    });
  },

  async remove(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(`DELETE FROM products WHERE id = :id`, { id });
      return result.rowsAffected > 0;
    });
  },
};

module.exports = productRepository;
