const Productos= require('./productos.dao');
const productModel = require('../models/producto')
const productosApi = new Productos(productModel)
const Carritos= require('./carritos.dao');
const cartModel = require('../models/carrito')
const carritosApi = new Carritos(cartModel)


module.exports =  { carritosApi, productosApi };

