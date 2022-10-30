const { Router } = require('express')
const routes = Router()
const {getUserCart, buyCart, addProducts, deleteProductsFromCart, renderUserCart} = require("../controllers/carritos.controller.js")

routes.get("/carrito", renderUserCart)
  
routes.post('/api/carrito/addProductos', addProducts)
  
routes.post('/api/carrito/deleteproductos/:id_prod', deleteProductsFromCart)

routes.post('/api/carrito/buyCarrito', buyCart)

module.exports = routes;