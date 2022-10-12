const Carritos= require("../controllers/carritos.controller.js");
const cartModel = require('../models/carrito')
const carritosApi = new Carritos(cartModel)


module.exports =  { carritosApi };

