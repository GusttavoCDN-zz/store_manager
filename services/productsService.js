const productsModel = require('../models/productsModel');

async function getAllProducts() {
  const products = await productsModel.getAllProducts();
  if (!products) return null;
  return products;
}

async function getProductById(id) {
  const product = await productsModel.getProductById(id);
  if (!product) return null;
  return product;
}

module.exports = { getAllProducts, getProductById };
