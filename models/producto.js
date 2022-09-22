const mongoose = ("mongoose");

module.exports = mongoose.model('productos', {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
})