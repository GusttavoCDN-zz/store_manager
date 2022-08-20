const httpStatus = require('../helpers/httpStatus');
const salesService = require('../services/salesService');

async function addSales(req, res, next) {
  const sales = req.body;
  const sale = await salesService.addSales(sales);

  if (sale.error) return next(sale.error);

  return res.status(httpStatus.created).json(sale.data);
}

async function getAllSales(req, res, next) {
  const sales = await salesService.getAllSales();
  if (sales.error) return next(sales.error);
  return res.status(httpStatus.ok).json(sales);
}

async function getSaleById(req, res, next) {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (sale.error) return next(sale.error);

  return res.status(httpStatus.ok).json(sale);
}

async function deleteSales(req, res, next) {
  const { id } = req.params;
  const sale = await salesService.deleteSales(id);
  console.log(sale);
  if (sale.error) return next(sale.error);

  return res.status(httpStatus.noContent).end();
}

module.exports = { addSales, getSaleById, getAllSales, deleteSales };
