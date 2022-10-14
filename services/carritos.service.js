const DaoFactory =require("../daos/daoFactory")
const daoFactory = new DaoFactory();
const productDao = daoFactory.createDao();
const {carritosApi} = require("../daos/index.js");
const cartModel = require('../models/carrito')
const userModel = require('../models/usuario')

const getAll = async () => {
    try {
      const products = await carritosApi.getAll()
      return products
      } catch (error) {
        console.log(error)
      }
}
const createCart = async (product) => {
    try {
        const usuario = await userModel.findOne({email: req.user.email})
        await carritosApi.buyCart(usuario)
        res.redirect('/api/productos');
        }
        catch (error) {
        res.status(404).json({ message: error.message })
      }
}

const addProducts = async (product, productID) => {
    try{
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
    } catch (error) {
        res.status(404).json({ message: error.message })
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
            const updatedCart = await cart.updateOne({productos: productos});
            res.redirect('/carrito');
      } catch (error) {
        res.status(404).json({ message: error.message })
      }
}


module.exports =  {getAll, createCart, addProducts, deleteProductsFromCart}