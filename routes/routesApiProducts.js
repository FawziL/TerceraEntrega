const { Router} = require('express');
const router = Router()
const auth = require("../middlewares/isAuth")
const {getAll, getById, createProduct, updateProducts, deleteById, renderProducts, getByCategory} = require("../controllers/productController.js")
 
router.get('/productos', renderProducts)

router.post('/productos', createProduct)

router.put('/productos/:id', updateProducts)

router.get('/productos/:id', getById)

router.delete('/productos/:id', deleteById)

router.get('/productos/category/:category', getByCategory)

module.exports = router;
