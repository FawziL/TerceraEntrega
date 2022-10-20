const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{type:String,required: true,},
    thumbnail:{type:String,required: true,},
    stock:{type:Number,required: true,},
    price:{type:Number,required: true,},
    description:{type:Number,required: true,},
    code:{type:String,required: true,},
});


const productModel = mongoose.model('Product',productSchema);

module.exports = productModel
