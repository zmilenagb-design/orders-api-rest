const { readData } = require('./dataStore');

const customersRepo = {
  getAll() {
    const orders = readData();
    const customersMap = new Map();
    orders.forEach(order => {
      if (!customersMap.has(order.customer.id)) {
        customersMap.set(order.customer.id, order.customer);
      }
    });
    return Array.from(customersMap.values());
  },

  getById(id) {
    const customers = customersRepo.getAll();
    return customers.find(c => c.id === Number(id)) || null;
  }
};

module.exports = customersRepo;