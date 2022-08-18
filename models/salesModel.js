const db = require('../database');

async function addSales() {
  const [{ insertId: id }] = await db.query(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return id;
}

module.exports = { addSales };
