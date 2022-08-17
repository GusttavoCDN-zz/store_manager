const createError = require('../helpers/createError');
const productsModel = require('../models/productsModel');

async function getAllProducts() {
  const products = await productsModel.getAllProducts();
  return products;
}

async function getProductById(id) {
  const product = await productsModel.getProductById(id);
  if (!product) return createError('notFound', 'Product not found');
  return product;
}

module.exports = { getAllProducts, getProductById };
