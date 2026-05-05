const ordersRepo = require('../repositories/orders.repository');
const productsRepo = require('../repositories/products.repository');

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
}

function getNextId(orders) {
  if (orders.length === 0) return 1;
  return Math.max(...orders.map(o => o.id)) + 1;
}

const ordersService = {

  getAll({ page = 1, limit = 10, customerId, dateFrom, dateTo, sort }) {
    let orders = ordersRepo.getAll();

    if (customerId) {
      orders = orders.filter(o => o.customer.id === Number(customerId));
    }
    if (dateFrom) {
      orders = orders.filter(o => new Date(o.orderDate) >= new Date(dateFrom));
    }
    if (dateTo) {
      orders = orders.filter(o => new Date(o.orderDate) <= new Date(dateTo));
    }
    if (sort === 'date_asc') orders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    if (sort === 'date_desc') orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    if (sort === 'total_asc') orders.sort((a, b) => a.totalAmount - b.totalAmount);
    if (sort === 'total_desc') orders.sort((a, b) => b.totalAmount - a.totalAmount);

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const total = orders.length;
    const totalPages = Math.ceil(total / limitNum);
    const start = (pageNum - 1) * limitNum;
    const data = orders.slice(start, start + limitNum);

    return { data, meta: { total, page: pageNum, limit: limitNum, totalPages } };
  },

  getById(orderId) {
    const order = ordersRepo.getById(orderId);
    if (!order) {
      const err = new Error(`Pedido con id ${orderId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    return order;
  },

  create({ customerId, items }) {
    if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
      const err = new Error('customerId e items son requeridos');
      err.statusCode = 400;
      throw err;
    }

    const allOrders = ordersRepo.getAll();

    const customerExists = allOrders.some(o => o.customer.id === Number(customerId));
    if (!customerExists) {
      const err = new Error(`Cliente con id ${customerId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }

    const customerOrder = allOrders.find(o => o.customer.id === Number(customerId));
    const customer = customerOrder.customer;

    let nextItemId = 1;
    allOrders.forEach(o => o.items.forEach(i => {
      if (i.id >= nextItemId) nextItemId = i.id + 1;
    }));

    const builtItems = [];
    for (const item of items) {
      const product = productsRepo.getById(item.productId);
      if (!product) {
        const err = new Error(`Producto con id ${item.productId} no encontrado`);
        err.statusCode = 404;
        throw err;
      }
      builtItems.push({
        id: nextItemId++,
        product,
        unitPrice: product.unitPrice,
        quantity: item.quantity
      });
    }

    const newOrder = {
      id: getNextId(allOrders),
      orderNumber: `ORD-${1000 + getNextId(allOrders)}`,
      orderDate: new Date().toISOString(),
      totalAmount: calculateTotal(builtItems),
      customer,
      items: builtItems
    };

    return ordersRepo.create(newOrder);
  },

  replace(orderId, body) {
    const existing = ordersRepo.getById(orderId);
    if (!existing) {
      const err = new Error(`Pedido con id ${orderId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    const totalAmount = calculateTotal(body.items || existing.items);
    const replaced = { ...existing, ...body, id: existing.id, totalAmount };
    return ordersRepo.update(orderId, replaced);
  },

  patch(orderId, body) {
    const existing = ordersRepo.getById(orderId);
    if (!existing) {
      const err = new Error(`Pedido con id ${orderId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    const updated = { ...existing, ...body, id: existing.id };
    return ordersRepo.update(orderId, updated);
  },

  remove(orderId) {
    const existing = ordersRepo.getById(orderId);
    if (!existing) {
      const err = new Error(`Pedido con id ${orderId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    return ordersRepo.delete(orderId);
  },

  getItems(orderId) {
    const order = ordersService.getById(orderId);
    return order.items;
  },

  addItem(orderId, { productId, quantity }) {
    if (!productId || !quantity) {
      const err = new Error('productId y quantity son requeridos');
      err.statusCode = 400;
      throw err;
    }

    const order = ordersService.getById(orderId);
    const product = productsRepo.getById(productId);
    if (!product) {
      const err = new Error(`Producto con id ${productId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }

    const allOrders = ordersRepo.getAll();
    let nextItemId = 1;
    allOrders.forEach(o => o.items.forEach(i => {
      if (i.id >= nextItemId) nextItemId = i.id + 1;
    }));

    const newItem = { id: nextItemId, product, unitPrice: product.unitPrice, quantity };
    order.items.push(newItem);
    order.totalAmount = calculateTotal(order.items);
    ordersRepo.update(orderId, order);
    return newItem;
  },

  updateItem(orderId, itemId, body) {
    const order = ordersService.getById(orderId);
    const itemIndex = order.items.findIndex(i => i.id === Number(itemId));
    if (itemIndex === -1) {
      const err = new Error(`Item con id ${itemId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    order.items[itemIndex] = { ...order.items[itemIndex], ...body };
    order.totalAmount = calculateTotal(order.items);
    ordersRepo.update(orderId, order);
    return order.items[itemIndex];
  },

  removeItem(orderId, itemId) {
    const order = ordersService.getById(orderId);
    const itemIndex = order.items.findIndex(i => i.id === Number(itemId));
    if (itemIndex === -1) {
      const err = new Error(`Item con id ${itemId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    order.items.splice(itemIndex, 1);
    order.totalAmount = calculateTotal(order.items);
    ordersRepo.update(orderId, order);
    return true;
  }
};

module.exports = ordersService;