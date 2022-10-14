const { Router} = require('express');
const router = Router()
const auth = require("../middlewares/isAuth")
const {getAll, getById, createProduct, updateProducts, deleteById} = require("../controllers/productos.controller.js")
 
router.get('/api/productos',auth, getAll)

router.post('/api/productos', createProduct)

router.put('/api/productos/:id', updateProducts)

router.get('/api/productos/:id', getById)

router.delete('/api/productos/:id', deleteById)

module.exports = router;
