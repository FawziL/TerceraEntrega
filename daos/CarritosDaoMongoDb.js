const Carritos= require('../api/carritos');
const cartModel = require('../models/carrito')
const carritosApi = new Carritos(cartModel)


module.exports =  { carritosApi };

