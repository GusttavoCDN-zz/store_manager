const httpStatus = require('../helpers/httpStatus');
const salesService = require('../services/salesService');

async function addSales(req, res, next) {
  const sales = req.body;
  const sale = await salesService.addSales(sales);

  if (sale.error) return next(sale.error);

  return res.status(httpStatus.created).json(sale.data);
}

module.exports = { addSales };
