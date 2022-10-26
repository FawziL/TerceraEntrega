const {DaoFactoryCart} =require("../daos/daoFactory")
const daoFactoryCart = new DaoFactoryCart();
const Cart = daoFactoryCart.createDao();
  
const {DaoFactoryProduct} =require("../daos/daoFactory")
const daoFactory = new DaoFactoryProduct();
const Product = daoFactory.createDao();

const {cartService} = require("../services/index.js")
  
const logger = require("../utils/logger.js")
  
  const getUserCart = async (req, res) => {
    try {
      let productsInCart = await cartService.getCart(req.user.email)
      let valorInicial= 0
      const total = productsInCart.reduce((sum, product) => sum + product.price, valorInicial)
      res.render('cart', { productos: productsInCart, total: total })
    } catch (error) {
      logger.error(`Error al iniciar carrito ${error}`)
    }
  };
  
    const buyCart = async (req, res) => {
      try {
        const usuario = await cartService.createCart(req.user.email)
        console.log(usuario)
        res.redirect('/api/productos');
        }
        catch (error) {
          logger.error(`Error al iniciar carrito ${error}`);
      }
    };
  
    const addProducts = async (req, res) => {
      try {
        const product = await Product.getById(req.body.productId)
        await Cart.addProductToCart(req.user.email, product)
      } catch (error) {
        logger.error(`Error al iniciar carrito ${error}`);
      }
    }; 
  
    const deleteProductsFromCart = async (req, res) => {
      try {
        await Cart.removeProductFromCart(req.user.email, req.params.id_prod)
        res.redirect('/carrito');
      } catch (error) {
          logger.error(`Error al eliminar producto: ${error}`)
      }
    }; 
  
  module.exports =  {getUserCart, buyCart, addProducts, deleteProductsFromCart}