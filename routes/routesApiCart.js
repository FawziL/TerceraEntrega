const { Router } = require('express')
const routes = Router()
const {getUserCart, buyCart, addProducts, deleteProductsFromCart, renderUserCart} = require("../controllers/cartController.js")

routes.get("/carrito", renderUserCart)
  
routes.post('/carrito/addProductos', addProducts)
  
routes.post('/carrito/deleteproductos/:id_prod', deleteProductsFromCart)

routes.post('/carrito/buyCarrito', buyCart)

module.exports = routes;