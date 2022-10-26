const {DaoFactoryCart} =require("../daos/daoFactory")
const daoFactoryCart = new DaoFactoryCart();
  const Cart = daoFactoryCart.createDao();
  
  const {DaoFactoryProduct} =require("../daos/daoFactory")
  const daoFactory = new DaoFactoryProduct();
  const Product = daoFactory.createDao();
  
  const logger = require("../utils/logger.js")
  
  const getAll = async (req, res) => {
    try {
      let productsInCart = await Cart.getProductsInCart(req.user.email)
      if (!productsInCart) {
        Cart.save(req.user.email)
      }
      let valorInicial= 0
      const total = productsInCart.reduce((sum, product) => sum + product.precio, valorInicial)
      res.render('cart', { productos: productsInCart, total: total })
    } catch (error) {
      logger.error(`Error al iniciar carrito ${error}`)
    }
  };
  
    const createCart = async (req, res) => {
      try {
        const usuario = await Cart.getByemail(req.user.email)
        console.log(usuario)
        await Cart.buyCart(usuario)
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
      } catch (err) {
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
  
  module.exports =  {getAll, createCart, addProducts, deleteProductsFromCart}