const Cart = require("../models/cartModel.js");
const CustomError = require("../utils/CustomError.js")
let instance;

class ContenedorMongoDbCarrito {
  constructor() { 
    this.collection = Cart;
  }

addProductToCart = async(email, product) =>{
    let cart = await this.getByemail(email)
    if(product.id !== undefined) {
        try{
        let productos = cart.productos
        productos.push(product)
        const addProduct = await cart.updateOne({productos: productos});
        return addProduct
            } catch (error) {
                throw new Error(`Error al modificar: ${error}`)
    }}
  } 

 
getAll = async () => {
    try {
        const allCarts = await this.collection.find()
        return allCarts   
    } catch (error) {
        return []
    }
  }

save = async (email, address) =>{
    try {
      const doc = new this.collection({email:email, timestamp:Date.now(),address:address, productos:[]})
      await doc.save() 
      return doc       
  } catch (error) {
    console.log(error)
  }
   
  }
  getInfo = async(email, address) => {
    const cart = await this.collection.findOne({ email: email, address: address });
    return cart || { error: 'carrito no encontrado' }
}
  getByemail = async(email) => {
      const cart = await this.collection.findOne({ email: email });
      return cart || { error: 'carrito no encontrado' }
  }

  getProductsInCart = async(email, address) =>{
    try {
        const cart = await this.getInfo(email, address)
        if (!cart) {
          cart = this.save(email, address)
        }
        return cart.productos
      } catch (error) {
        logger.info('error', error)
        throw new CustomError(500, "Error with cart ID")
      }
  }

  deleteCartById = async(id)  =>{
      try {
          const document = this.collection.findById(id);
          const deleteCart = await document.deleteOne();
          return deleteCart
      } catch (error) {
          throw new Error(`Error al modificar: ${error}`)
      }
  } 

  removeProductFromCart = async(email, productId) =>{
    try{
      let cart = await this.getByemail(email)
      let productos = cart.productos
      const index = productos.findIndex((prod)=> prod._id == productId)
      if (index > -1) {
          productos.splice(index, 1);}
      const updatedCart = await cart.updateOne({productos: productos});
      console.log(productId)
      return updatedCart
    } catch (error) {
      throw new Error(`Error al modificar: ${error}`)
    } 
  }

  buyCart = async (user) => {
      let cart = await this.collection.findOne({email: user.email})
      try{
          await cart.updateOne({ $set: { productos: [] } })
      }catch (error) {
          throw new Error(`${error}`)
      }
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorMongoDbCarrito();
    }
    return instance;
  }
}

module.exports = ContenedorMongoDbCarrito;