const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{type:String,required: true,},
    thumbnail:{type:String,required: true,},
    price:{type:Number,required: true,},
    description:{type:String,required: true,},
    code:{type:Number,required: true,},
    stock:{type:Number,required: true,},
});


const productModel = mongoose.model('Product',productSchema);

module.exports = productModel

