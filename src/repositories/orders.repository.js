const { readData, writeData } = require('./dataStore');

const ordersRepo = {
  getAll() {
    return readData();
  },

  getById(id) {
    const orders = readData();
    return orders.find(o => o.id === Number(id)) || null;
  },

  create(newOrder) {
    const orders = readData();
    orders.push(newOrder);
    writeData(orders);
    return newOrder;
  },

  update(id, updatedOrder) {
    const orders = readData();
    const index = orders.findIndex(o => o.id === Number(id));
    if (index === -1) return null;
    orders[index] = updatedOrder;
    writeData(orders);
    return orders[index];
  },

  delete(id) {
    const orders = readData();
    const index = orders.findIndex(o => o.id === Number(id));
    if (index === -1) return false;
    orders.splice(index, 1);
    writeData(orders);
    return true;
  }
};

module.exports = ordersRepo;