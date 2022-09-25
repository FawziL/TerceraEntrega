const { Router } = require('express');
const router = Router()
const { getProductos, postProductos, getProductoId, 
            putProduct,deleteProduct} = require('../controllers/productsController.js')

const { postCarrito, deleteCarrito, listarCarritos, verCarrito} = require('../controllers/cartController.js')


router.get('/productos', getProductos)
router.get('/productos/:id', getProductoId)
router.post('/productos', postProductos)
router.put('/productos/:id', putProduct)
router.delete('/productos/:id', deleteProduct )



router.post('/carrito', postCarrito) 
router.delete('/carrito/:id', deleteCarrito )
router.get('/carrito', listarCarritos)
router.get('/carrito/:id/productos', verCarrito)


module.exports = router
