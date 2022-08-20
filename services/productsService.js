const createError = require('../helpers/createError');
const validateName = require('../helpers/validateName');
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

async function addProduct(name) {
  const { error } = validateName(name);
  if (error) return { error };

  const product = await productsModel.addProduct(name);
  return product;
}

async function updateProduct(id, name) {
  const { error } = validateName(name);
  if (error) return { error };

  const affectedRows = await productsModel.updateProduct(id, name);
  if (affectedRows === 0) return createError('notFound', 'Product not found');
  return { id, name };
}

async function deleteProduct(id) {
  const affectedRows = await productsModel.deleteProduct(id);
  if (affectedRows === 0) return createError('notFound', 'Product not found');
  return {};
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
