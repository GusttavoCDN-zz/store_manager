const { Router } = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const router = Router();

router.get('/:id', rescue(salesController.getSaleById));
router.delete('/:id', rescue(salesController.deleteSales));
router.get('/', rescue(salesController.getAllSales));
router.post('/', rescue(salesController.addSales));

module.exports = router;
