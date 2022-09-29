const { Router } = require('express')
const routes = Router()
const path = require('path')
const {productosApi} = require("../daos/ProductosDaoMongoDb");
const {carritosApi} = require("../daos/CarritosDaoMongoDb");
const cartModel = require('../models/carrito')
const userModel = require('../models/usuario')

routes.get("/carrito", async (req, res)  => {
    if(req.isAuthenticated()){
      try {
        let cart = await cartModel.findOne({ email: req.user.email })
        if (!cart) {
          cart = new cartModel({
            email: req.user.email,
            products: [],
          })
          cart.save()
        }
        const productsInCart = cart.productos
        let valorInicial= 0
        const total = productsInCart.reduce((sum, product) => sum + product.precio, valorInicial)
        res.render('cart', { productos: productsInCart, total: total })
      } catch (error) {
        res.status(404).json({ message: error.message })
      }
    }  else{
        res.sendFile(path.join(__dirname, "../public/login.html"))}   
})
  
routes.post('/api/carrito/addProductos', async function(req, res){
    const user = req.user
    const product = await productosApi.getById(req.body.productId)
    let cart = await cartModel.findOne({ email: req.user.email })
    console.log(cart)
    if (!cart) {
      cart = new cartModel({
        email: user.email,
        products: [],
      })
      cart.save()
    }
    (await carritosApi.addProductToCart(cart.id, product))
})
  
routes.post('/api/carrito/deleteproductos/:id_prod', async function(req, res) {
    if(req.isAuthenticated()){
      try {
        const cart = await cartModel.findOne({ email: req.user.email })
        const productos = cart.productos
        const index = productos.findIndex((prod)=> prod._id == req.params.id_prod)
            if (index > -1) {
                productos.splice(index, 1);
            }
            const updatedCart = await cart.updateOne({productos: productos});
            res.redirect('/carrito');
      } catch (error) {
        res.status(404).json({ message: error.message })
      }
}})

routes.post('/api/carrito/buyCarrito', async function(req, res){
    if(req.isAuthenticated()){
      try {
      const usuario = await userModel.findOne({email: req.user.email})
      await carritosApi.buyCart(usuario)
      res.redirect('/api/productos');
      }
      catch (error) {
      res.status(404).json({ message: error.message })
    }
}})

module.exports = routes;