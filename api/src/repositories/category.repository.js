const { withConnection } = require('../config/db');
const { normalizeRows } = require('../utils/normalizeRow');

const categoryRepository = {
  async findAll() {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, product_category
         FROM product_categories
         ORDER BY product_category`
      );
      return normalizeRows(result.rows);
    });
  },

  async findSubCategories(categoryId) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, category_id, sub_category
         FROM product_sub_categories
         WHERE category_id = :categoryId
         ORDER BY sub_category`,
        { categoryId }
      );
      return normalizeRows(result.rows);
    });
  },

  async hasSubCategory(categoryId, subCategoryId) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id
         FROM product_sub_categories
         WHERE id = :subCategoryId
           AND category_id = :categoryId`,
        { categoryId, subCategoryId }
      );
      return result.rows.length > 0;
    });
  },
};

module.exports = categoryRepository;