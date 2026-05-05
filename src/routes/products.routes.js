const { Router } = require('express');
const ctrl = require('../controllers/products.controller');

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:productId', ctrl.getById);

module.exports = router;