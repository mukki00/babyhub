const categoryService = require('../services/category.service');
const asyncHandler = require('../utils/asyncHandler');

const categoryController = {
  list: asyncHandler(async (_req, res) => {
    res.json(await categoryService.listCategories());
  }),

  listSubCategories: asyncHandler(async (req, res) => {
    res.json(await categoryService.listSubCategories(req.params.categoryId));
  }),
};

module.exports = categoryController;