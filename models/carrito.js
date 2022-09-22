const mongoose = require( "mongoose")

module.exports = mongoose.model('carrito', {
    user: { type: String, required: true },
    products: { type: Array, required: false },
})