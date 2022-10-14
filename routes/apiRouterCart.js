const { Router } = require('express')
const routes = Router()
const {getAll, createCart, addProducts, deleteProductsFromCart} = require("../controllers/carritos.controller.js")

routes.get("/carrito", getAll)
  
routes.post('/api/carrito/addProductos', addProducts)
  
routes.post('/api/carrito/deleteproductos/:id_prod', deleteProductsFromCart)

routes.post('/api/carrito/buyCarrito', createCart)

module.exports = routes;