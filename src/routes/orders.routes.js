const { Router } = require('express');
const ctrl = require('../controllers/orders.controller');

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:orderId', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:orderId', ctrl.replace);
router.patch('/:orderId', ctrl.patch);
router.delete('/:orderId', ctrl.remove);

router.get('/:orderId/items', ctrl.getItems);
router.post('/:orderId/items', ctrl.addItem);
router.patch('/:orderId/items/:itemId', ctrl.updateItem);
router.delete('/:orderId/items/:itemId', ctrl.removeItem);

module.exports = router;