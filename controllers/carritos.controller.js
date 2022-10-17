const {carritosApi} = require("../daos/index.js");
const cartModel = require('../models/carrito')
const userModel = require('../models/usuario')
const DaoFactory =require("../daos/daoFactory")
const daoFactory = new DaoFactory();
const productDao = daoFactory.createDao();


const getAll = async (req, res) => {
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
      
    } catch (err) {
      console.log(err);
      res
        .status(500)
    }
  };

  const createCart = async (req, res) => {
    try {
      const usuario = await userModel.findOne({email: req.user.email})
      await carritosApi.buyCart(usuario)
      res.redirect('/api/productos');

    } catch (err) {
      console.log(err);
      res.status(400).json(new WSresponse(null, err, true, 400));
    }
  };

  const addProducts = async (req, res) => {
    try {
      const user = req.user
      const product = await productDao.getById(req.body.productId)
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
    } catch (err) {
      console.log(err);
      res.json(new WSresponse(null, err, true, 460));
    }
  }; 

  const deleteProductsFromCart = async (req, res) => {
    try {
      const cart = await cartModel.findOne({ email: req.user.email })
      const productos = cart.productos
      const index = productos.findIndex((prod)=> prod._id == req.params.id_prod)
          if (index > -1) {
              productos.splice(index, 1);
          }
          const updatedCart = await cart.updateOne({productos: productos});
          res.redirect('/carrito');
    } catch (err) {
      console.log(err);
      res.json(new WSresponse(null, err, true, 320));
    }
  }; 

module.exports =  {getAll, createCart, addProducts, deleteProductsFromCart}