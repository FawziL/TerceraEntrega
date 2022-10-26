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

const addProducts = async (req, res) => {
  try {
    const product = await Product.getById(req.body.productId)
    const productAdd = await Cart.addProductToCart(req.user.email, product)
    return productAdd
  } catch (error) {
    logger.error(`Error al iniciar carrito ${error}`);
  }
}

const deleteProductsFromCart = async (productID) => {
    try {
        const cart = await cartModel.findOne({ email: req.user.email })
        const productos = cart.productos
        const index = productos.findIndex((prod)=> prod._id == req.params.id_prod)
            if (index > -1) {
                productos.splice(index, 1);
            }
      } catch (error) {
        console.log(error)
      }
}


module.exports =  {getCart, createCart, addProducts, deleteProductsFromCart}