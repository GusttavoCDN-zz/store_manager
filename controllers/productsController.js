const errors = require('restify-errors');
const productsService = require('../services/productsService');

async function getAllProducts(_request, response, next) {
  const products = await productsService.getAllProducts();

  if (!products) {
    const error = new errors.NotFoundError('Products not found');
    error.statusCode = 404;

    return next(error);
  }
  response.status(200).send(products);
}

async function getProductById(request, response, next) {
  const { id } = request.params;
  const product = await productsService.getProductById(id);

  if (!product) {
    const error = new errors.NotFoundError('Product not found');
    error.statusCode = 404;

    return next(error);
  }
  response.status(200).send(product);
}

module.exports = { getAllProducts, getProductById };
