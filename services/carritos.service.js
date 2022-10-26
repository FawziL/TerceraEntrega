const {DaoFactoryCart} =require("../daos/daoFactory")
const daoFactoryCart = new DaoFactoryCart();
const Cart = daoFactoryCart.createDao();
const logger = require("../utils/logger.js")
const {DaoFactoryProduct} =require("../daos/daoFactory")
const daoFactory = new DaoFactoryProduct();
const Product = daoFactory.createDao();

const getCart = async (email) => {
    try {
        let productsInCart = await Cart.getProductsInCart(email)
        if (!productsInCart) {
        Cart.save(email)
        }
        return productsInCart
      } catch (error) {
        console.log(error)
      }
}
const createCart = async (email) => {
  try{
      const usuario = await Cart.getByemail(email)
      await Cart.buyCart(usuario)
      return usuario
    }
    catch (error) {
      console.log(error)
    }
}

const addProducts = async (email, id) => {
    try {
      const product = await Product.getById(id)
      await Cart.addProductToCart(email, product)
    } catch (error) {
      logger.error(`Error al iniciar carrito ${error}`);
  }
}

const deleteProductsFromCart = async (email, id) => {
    try {
      const productRemove = await Cart.removeProductFromCart(email, id)
      return productRemove
    } catch (error) {
        console.log(error)
    }
}

module.exports =  {getCart, createCart, addProducts, deleteProductsFromCart}