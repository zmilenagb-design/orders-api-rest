const { readData } = require('./dataStore');

const productsRepo = {
  getAll() {
    const orders = readData();
    const productsMap = new Map();
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productsMap.has(item.product.id)) {
          productsMap.set(item.product.id, item.product);
        }
      });
    });
    return Array.from(productsMap.values());
  },

  getById(id) {
    const products = productsRepo.getAll();
    return products.find(p => p.id === Number(id)) || null;
  }
};

module.exports = productsRepo;