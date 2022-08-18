const { Router } = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const router = Router();

router.post('/', rescue(salesController.addSales));

module.exports = router;
