const db = require('../database');

async function createSale() {
  const [{ insertId: id }] = await db.query(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return id;
}

async function getProducts() {
  const query = `
    SELECT id FROM StoreManager.products
  `;

  const [products] = await db.query(query);
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

async function getAllSales() {
  const query = `
    SELECT id as saleId, date, SP.product_id, SP.quantity 
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products as SP 
    ON StoreManager.sales.id = SP.sale_id;
  `;

  const [sales] = await db.query(query);
  return sales;
}

async function getSaleById(id) {
  const query = `
    SELECT date, SP.product_id as productId, SP.quantity 
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products as SP 
    ON StoreManager.sales.id = SP.sale_id
    WHERE id = ?;
  `;

  const [sale] = await db.query(query, [id]);
  return sale;
}

module.exports = {
  createSale,
  getProducts,
  createSaleAndProduct,
  getAllSales,
  getSaleById,
};
