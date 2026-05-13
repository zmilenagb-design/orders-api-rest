const customersService = require('../services/customers.service');

const customersController = {
  getAll(req, res, next) {
    try {
      const result = customersService.getAll(req.query);
      res.status(200).json(result);
    } catch (err) { next(err); }
  },

  getById(req, res, next) {
    try {
      const customer = customersService.getById(req.params.customerId);
      res.status(200).json(customer);
    } catch (err) { next(err); }
  }
};

module.exports = customersController;