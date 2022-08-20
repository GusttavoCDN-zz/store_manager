const { Router } = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const router = Router();

router.get('/:id', rescue(productsController.getProductById));
router.put('/:id', rescue(productsController.updateProduct));
router.delete('/:id', rescue(productsController.deleteProduct));
router.get('/', rescue(productsController.getAllProducts));
router.post('/', rescue(productsController.addProduct));

module.exports = router;
