const Carritos= require("./CarritosDaoMongoDb.js");
const cartModel = require('../models/carrito')
const carritosApi = new Carritos(cartModel)


module.exports =  { carritosApi };

