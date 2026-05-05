const ordersService = require('../services/orders.service');

const ordersController = {
  getAll(req, res, next) {
    try {
      const result = ordersService.getAll(req.query);
      res.status(200).json(result);
    } catch (err) { next(err); }
  },

  getById(req, res, next) {
    try {
      const order = ordersService.getById(req.params.orderId);
      res.status(200).json(order);
    } catch (err) { next(err); }
  },

  create(req, res, next) {
    try {
      const order = ordersService.create(req.body);
      res.status(201).json(order);
    } catch (err) { next(err); }
  },

  replace(req, res, next) {
    try {
      const order = ordersService.replace(req.params.orderId, req.body);
      res.status(200).json(order);
    } catch (err) { next(err); }
  },

  patch(req, res, next) {
    try {
      const order = ordersService.patch(req.params.orderId, req.body);
      res.status(200).json(order);
    } catch (err) { next(err); }
  },

  remove(req, res, next) {
    try {
      ordersService.remove(req.params.orderId);
      res.status(204).send();
    } catch (err) { next(err); }
  },

  getItems(req, res, next) {
    try {
      const items = ordersService.getItems(req.params.orderId);
      res.status(200).json(items);
    } catch (err) { next(err); }
  },

  addItem(req, res, next) {
    try {
      const item = ordersService.addItem(req.params.orderId, req.body);
      res.status(201).json(item);
    } catch (err) { next(err); }
  },

  updateItem(req, res, next) {
    try {
      const item = ordersService.updateItem(req.params.orderId, req.params.itemId, req.body);
      res.status(200).json(item);
    } catch (err) { next(err); }
  },

  removeItem(req, res, next) {
    try {
      ordersService.removeItem(req.params.orderId, req.params.itemId);
      res.status(204).send();
    } catch (err) { next(err); }
  }
};

module.exports = ordersController;