const { withConnection } = require('../config/db');
const { normalizeRow, normalizeRows } = require('../utils/normalizeRow');

// Data access only: raw SQL against the Oracle Autonomous Database. No business logic.
const productRepository = {
  async findAll() {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT p.id, p.name, p.description, p.price, p.category_id, p.sub_category_id,
          pc.product_category AS category_name,
          psc.sub_category AS sub_category_name,
          p.image_url, p.image_public_id, p.created_at
         FROM products p
         LEFT JOIN product_categories pc ON pc.id = p.category_id
         LEFT JOIN product_sub_categories psc ON psc.id = p.sub_category_id
         ORDER BY p.created_at DESC`
      );
      return normalizeRows(result.rows);
    });
  },

  async findById(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT p.id, p.name, p.description, p.price, p.category_id, p.sub_category_id,
          pc.product_category AS category_name,
          psc.sub_category AS sub_category_name,
          p.image_url, p.image_public_id, p.created_at
         FROM products p
         LEFT JOIN product_categories pc ON pc.id = p.category_id
         LEFT JOIN product_sub_categories psc ON psc.id = p.sub_category_id
         WHERE p.id = :id`,
        { id }
      );
      return normalizeRow(result.rows[0]) || null;
    });
  },

  async create({ name, description, price, categoryId, subCategoryId, imageUrl, imagePublicId }) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `INSERT INTO products (name, description, price, category_id, sub_category_id, image_url, image_public_id)
         VALUES (:name, :description, :price, :categoryId, :subCategoryId, :imageUrl, :imagePublicId)
         RETURNING id INTO :id`,
        {
          name,
          description,
          price,
          categoryId,
          subCategoryId,
          imageUrl,
          imagePublicId,
          id: { dir: require('oracledb').BIND_OUT, type: require('oracledb').NUMBER },
        }
      );
      return result.outBinds.id[0];
    });
  },

  async update(id, { name, description, price, categoryId, subCategoryId, imageUrl, imagePublicId }) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE products
         SET name = :name,
             description = :description,
             price = :price,
               category_id = :categoryId,
               sub_category_id = :subCategoryId,
             image_url = :imageUrl,
             image_public_id = :imagePublicId
         WHERE id = :id`,
             { name, description, price, categoryId, subCategoryId, imageUrl, imagePublicId, id }
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
