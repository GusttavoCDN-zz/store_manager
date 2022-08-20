const createError = require('./createError');
const salesModel = require('../models/salesModel');

function verifyProductsInput(sales) {
  if (!sales.every(({ productId }) => productId)) {
    return createError('badRequest', '"productId" is required');
  }

  if (!sales.every(({ quantity }) => quantity !== undefined)) {
    return createError('badRequest', '"quantity" is required');
  }

  if (!sales.every(({ quantity }) => quantity > 0)) {
    return createError(
      'unprocessableEntity',
      '"quantity" must be greater than or equal to 1',
    );
  }
  return { error: null };
}

async function verifyIfProductExists(sales) {
  const products = await salesModel.getProducts();
  const salesProducts = sales.map(({ productId }) => productId);

  const productsNotFound = salesProducts.filter(
    (productId) => !products.includes(productId),
  );

  if (productsNotFound.length) {
    return createError('notFound', 'Product not found');
  }

  return { error: null };
}

module.exports = { verifyProductsInput, verifyIfProductExists };
