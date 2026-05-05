const productsRepo = require('../repositories/products.repository');

const productsService = {
  getAll({ page = 1, limit = 10, search, discontinued }) {
    let products = productsRepo.getAll();

    if (search) {
      products = products.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (discontinued !== undefined) {
      const disc = discontinued === 'true';
      products = products.filter(p => p.isDiscontinued === disc);
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const total = products.length;
    const totalPages = Math.ceil(total / limitNum);
    const start = (pageNum - 1) * limitNum;
    const data = products.slice(start, start + limitNum);

    return { data, meta: { total, page: pageNum, limit: limitNum, totalPages } };
  },

  getById(productId) {
    const product = productsRepo.getById(productId);
    if (!product) {
      const err = new Error(`Producto con id ${productId} no encontrado`);
      err.statusCode = 404;
      throw err;
    }
    return product;
  }
};

module.exports = productsService;