const { Router } = require('express');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');
const adminController = require('../controllers/admin.controller');

// Public API: no authentication, consumed by customers browsing/checking out.
const router = Router();

router.get('/products', productController.list);
router.get('/products/:id', productController.getById);
router.get('/whatsapp-number', adminController.getWhatsAppNumber);
router.post('/orders', orderController.create);

module.exports = router;
