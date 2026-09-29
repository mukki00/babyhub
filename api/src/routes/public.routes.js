const { Router } = require('express');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');
const adminController = require('../controllers/admin.controller');
const categoryController = require('../controllers/category.controller');

// Public API: no authentication, consumed by customers browsing/checking out.
const router = Router();

router.get('/products', productController.list);
router.get('/products/:id', productController.getById);
router.get('/categories', categoryController.list);
router.get('/categories/:categoryId/sub-categories', categoryController.listSubCategories);
router.get('/whatsapp-number', adminController.getWhatsAppNumber);
router.post('/orders', orderController.create);

module.exports = router;
