const db = require('../database');

async function createSale() {
  const [{ insertId: id }] = await db.query(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  console.log(id);
  return id;
}

async function getProducts() {
  const query = `
    SELECT id FROM StoreManager.products
  `;

  const [sale] = await db.query(query);
  const products = sale.map(({ id }) => id);
  return products;
}

async function createSaleAndProduct(saleId, productId, quantity) {
  const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  await db.query(query, [saleId, productId, quantity]);

  return true;
}

module.exports = { createSale, getProducts, createSaleAndProduct };
