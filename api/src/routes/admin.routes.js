const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');
const requireAdminAuth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Protected Admin API: /api/admin/login is public, everything else requires a JWT.
const router = Router();

router.post('/login', authController.login);

router.use(requireAdminAuth);

router.get('/products', productController.list);
router.post('/products', upload.single('image'), productController.create);
router.put('/products/:id', upload.single('image'), productController.update);
router.delete('/products/:id', productController.remove);

router.get('/orders', orderController.list);
router.get('/orders/:id', orderController.getById);

module.exports = router;
