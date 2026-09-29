const categoryRepository = require('../repositories/category.repository');
const ApiError = require('../utils/ApiError');

const categoryService = {
  async listCategories() {
    return categoryRepository.findAll();
  },

  async listSubCategories(categoryId) {
    const parsedCategoryId = Number(categoryId);
    if (!Number.isSafeInteger(parsedCategoryId) || parsedCategoryId <= 0) {
      throw new ApiError(400, 'A valid category ID is required');
    }
    return categoryRepository.findSubCategories(parsedCategoryId);
  },
};

module.exports = categoryService;