const { Router} = require('express');
const router = Router()
const auth = require("../middlewares/isAuth")
const {getAll, getById, createProduct, updateProducts, deleteById, renderProducts} = require("../controllers/productController.js")
 
router.get('/productos', renderProducts)

router.post('/productos', createProduct)

router.put('/productos/:id', updateProducts)

router.get('/productos/:id', getById)

router.delete('/productos/:id', deleteById)

module.exports = router;
