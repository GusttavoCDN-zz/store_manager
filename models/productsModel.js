const db = require('../database');

async function getAllProducts() {
  const [products] = await db.query('SELECT * FROM StoreManager.products');
  return products || [];
}

async function getProductById(id) {
  const [[product]] = await db.query(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [Number(id)],
  );
  return product;
}

async function addProduct(name) {
  const [{ insertId: id }] = await db.query(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return { id, name };
}

module.exports = { getAllProducts, getProductById, addProduct };
