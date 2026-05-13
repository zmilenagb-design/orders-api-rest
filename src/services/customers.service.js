const customersRepo = require('../repositories/customers.repository');

const customersService = {
  getAll({ page = 1, limit = 10, search, city, country } = {}) {
    let customers = customersRepo.getAll();

    if (search) {
      customers = customers.filter(c =>
        c.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (city) {
      customers = customers.filter(c =>
        c.city?.toLowerCase().includes(city.toLowerCase())
      );
    }
    if (country) {
      customers = customers.filter(c =>
        c.country?.toLowerCase().includes(country.toLowerCase())
      );
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const total = customers.length;
    const totalPages = Math.ceil(total / limitNum);
    const start = (pageNum - 1) * limitNum;
    const data = customers.slice(start, start + limitNum);

    return { data, meta: { total, page: pageNum, limit: limitNum, totalPages } };
  },

  getById(customerId) {
    const customer = customersRepo.getById(customerId);
    if (!customer) {
      const err = new Error(`Cliente con id ${customerId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    return customer;
  }
};

module.exports = customersService;