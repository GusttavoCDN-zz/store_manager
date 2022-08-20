const db = require('../database');

async function getAllProducts() {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await db.query(query);
  return products || [];
}

async function getProductById(id) {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await db.query(query, [Number(id)]);
  return product;
}

async function addProduct(name) {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId: id }] = await db.query(query, [name]);
  return { id, name };
}

async function updateProduct(id, name) {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [{ affectedRows }] = await db.query(query, [name, Number(id)]);
  return affectedRows;
}

async function deleteProduct(id) {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [{ affectedRows }] = await db.query(query, [Number(id)]);
  return affectedRows;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
