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
  try{
        const usuario = await cartService.createCart(req.user.email)
        console.log(usuario)
        res.redirect('/api/productos');
      }
      catch (error) {
          logger.error(`Error al iniciar carrito ${error}`);
      }
};
  
const addProducts = async (req, res) => {
  try{
      await cartService.addProducts(req.user.email, req.body.productId)
      res.redirect('/carrito');
    } catch (error) {
      logger.error(`Error al iniciar carrito ${error}`);
  }
}; 
  
const deleteProductsFromCart = async (req, res) => {
  try {
    await cartService.deleteProductsFromCart(req.user.email, req.params.id_prod)
        res.redirect('/api/productos');
      } 
      catch (error) {
          logger.error(`Error al eliminar producto: ${error}`)
      }
    }; 
  
  module.exports =  {getUserCart, buyCart, addProducts, deleteProductsFromCart}


