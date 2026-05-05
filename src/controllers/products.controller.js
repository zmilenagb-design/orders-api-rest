const productsService = require('../services/products.service');

const productsController = {
  getAll(req, res, next) {
    try {
      const result = productsService.getAll(req.query);
      res.status(200).json(result);
    } catch (err) { next(err); }
  },

  getById(req, res, next) {
    try {
      const product = productsService.getById(req.params.productId);
      res.status(200).json(product);
    } catch (err) { next(err); }
  }
};

module.exports = productsController;