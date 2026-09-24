const { Router } = require('express');
const publicRoutes = require('./public.routes');
const adminRoutes = require('./admin.routes');

const router = Router();

router.use('/api', publicRoutes);
router.use('/api/admin', adminRoutes);

module.exports = router;
