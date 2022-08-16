const { Router } = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const router = Router();

router.get('/', rescue(productsController.getAllProducts));
router.get('/:id', rescue(productsController.getProductById));

module.exports = router;
