const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');
const productController = require('../controllers/product.controller');
const categoryController = require('../controllers/category.controller');
const orderController = require('../controllers/order.controller');
const requireAdminAuth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Protected Admin API: /api/admin/login is public, everything else requires a JWT.
const router = Router();

router.post('/login', authController.login);

router.use(requireAdminAuth);

router.get('/settings/phone', adminController.getPhoneNumber);
router.put('/settings/phone', adminController.updatePhoneNumber);

router.get('/categories', categoryController.list);
router.get('/categories/:categoryId/sub-categories', categoryController.listSubCategories);

router.get('/products', productController.list);
router.post('/products', upload.single('image'), productController.create);
router.put('/products/:id', upload.single('image'), productController.update);
router.delete('/products/:id', productController.remove);

router.get('/orders', orderController.list);
router.get('/orders/:id', orderController.getById);
router.put('/orders/:id', orderController.update);
router.delete('/orders/:id', orderController.remove);
router.patch('/orders/:id/shipped', orderController.markShipped);
router.patch('/orders/:id/delivered', orderController.setDelivered);
router.patch('/orders/:id/paid', orderController.setPaid);
router.patch('/orders/:id/returned', orderController.markReturned);
router.patch('/orders/:id/received', orderController.setReceived);
router.patch('/orders/:id/reship', orderController.reshipReturned);
router.patch('/orders/:id/refund', orderController.refundReturned);

module.exports = router;
