const productsService = require('../services/productsService');

async function getAllProducts(_request, response) {
  const products = await productsService.getAllProducts();
  response.status(200).json(products);
}

async function getProductById(request, response, next) {
  const { id } = request.params;
  const product = await productsService.getProductById(id);

  if (product.error) return next(product.error);
  response.status(200).json(product);
}

module.exports = { getAllProducts, getProductById };
