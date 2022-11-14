const { Router} = require('express');
const router = Router()
const auth = require("../middlewares/isAuth")
const {getAll, getById, createProduct, updateProducts, deleteById, renderProducts} = require("../controllers/productController.js")
 
router.get('/api/productos', renderProducts)

router.post('/api/productos', createProduct)

router.put('/api/productos/:id', updateProducts)

router.get('/api/productos/:id', getById)

router.delete('/api/productos/:id', deleteById)

module.exports = router;
