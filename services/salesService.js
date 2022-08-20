const createError = require('../helpers/createError');
const {
  verifyProductsInput,
  verifyIfProductExists,
} = require('../helpers/validateSales');

const salesModel = require('../models/salesModel');

async function addSales(sales) {
  const productInputError = await verifyProductsInput(sales);
  const productExistsError = await verifyIfProductExists(sales);

  if (productInputError.error) return productInputError;
  if (productExistsError.error) return productExistsError;

  const salesId = await salesModel.createSale();
  await Promise.all(
    sales.map(({ productId, quantity }) =>
      salesModel.createSaleAndProduct(salesId, productId, quantity)),
  );

  return { data: { id: salesId, itemsSold: sales } };
}

async function getAllSales() {
  const sales = await salesModel.getAllSales();
  const formatedSales = sales.map((sale) => ({
    saleId: sale.saleId,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return formatedSales;
}

async function getSaleById(id) {
  const saleProducts = await salesModel.getSaleById(id);
  if (!saleProducts.length) return createError('notFound', 'Sale not found');
  return saleProducts;
}

async function deleteSales(id) {
  const sale = await salesModel.deleteSale(id);
  if (sale === 0) return createError('notFound', 'Sale not found');

  await salesModel.deleteSaleProducts(id);
  return {};
}

module.exports = { addSales, getSaleById, getAllSales, deleteSales };
