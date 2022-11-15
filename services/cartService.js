const DaoCart = require("../daos/CarritosDaoMongoDb")
const Cart = DaoCart.getInstance();
const logger = require("../utils/logger.js")
const DaoProduct = require("../daos/ProductosDaoMongoDb.js")
const Product = DaoProduct.getInstance();
const DaoOrder = require("../daos/OrderDaoMongoDb.js")
const Order = DaoOrder.getInstance();

const getCart = async (email, address) => {
    try {
        let productsInCart = await Cart.getProductsInCart(email, address)
        if (!productsInCart) {
        Cart.save(email, address)
        }
        return productsInCart
      } catch (error) {
        console.log(error)
      }
}
const buyCart = async (email) => {
  try{
      const cart = await Cart.getByemail(email)
      const orderArray = cart.productos
      const order1 = orderArray
      await Order.save(email, order1)
      await Cart.buyCart(cart)
      return cart
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

module.exports =  {getCart, buyCart, addProducts, deleteProductsFromCart}