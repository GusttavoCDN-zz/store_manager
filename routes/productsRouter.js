const { Router } = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const router = Router();

router.get('/:id', rescue(productsController.getProductById));
router.get('/', rescue(productsController.getAllProducts));
router.post('/', rescue(productsController.addProduct));

module.exports = router;
