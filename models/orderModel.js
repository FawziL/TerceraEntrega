const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email: {type:String, required: true},
    timestamp: {type:Array,required: true},
    products:{type:Array,required: true},
    numberOrder:{type:Number,required: true},
    estado:{type:String,required: true, default: 'Generado'},
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports =  orderModel