const { Router } = require('express');
const ctrl = require('../controllers/customers.controller');

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:customerId', ctrl.getById);

module.exports = router;