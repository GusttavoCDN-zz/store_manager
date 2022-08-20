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

module.exports = { addSales };
