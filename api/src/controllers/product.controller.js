const productService = require('../services/product.service');
const asyncHandler = require('../utils/asyncHandler');

const productController = {
  list: asyncHandler(async (req, res) => {
    const products = await productService.listProducts();
    res.json(products);
  }),

  getById: asyncHandler(async (req, res) => {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  }),

  create: asyncHandler(async (req, res) => {
    const product = await productService.createProduct(req.body, req.file);
    res.status(201).json(product);
  }),

  update: asyncHandler(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body, req.file);
    res.json(product);
  }),

  remove: asyncHandler(async (req, res) => {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  }),
};

module.exports = productController;
