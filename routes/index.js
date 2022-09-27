const { Router } = require('express')
const routes = Router()
const passport = require ('passport') 
const path = require('path')
const isAuth = require ('../middlewares/isAuth.js');
const upload = require ('../multer/loadFile.js')

//const handleAll = require ("../middlewares/loggerMdw.js")
//routes.use(handleAll);

routes.get("/", (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/api/productos')
  }else{
    res.sendFile(path.join(__dirname, "../public/login.html")); 
  }}
);
routes.get('/user', isAuth,(req,res)=>{
  console.log({phone: req.user.phone})
  res.render("userInfo", {email: req.user.email, name: req.user.name, 
    avatar: req.user.avatar, age: req.user.age, phone: req.user.phone, address: req.user.address});
})
routes.get('/login',(req, res)=>{
  if(req.isAuthenticated()){
  res.redirect('/')
  }else{
  res.sendFile(path.join(__dirname, ".././public/login.html")); 
  }    
})
routes.post('/login',passport.authenticate('login',
  {failureRedirect: '/fail-login',failureMessage: true}),
  (req, res)=>{
      res.redirect('/')
  }
)
routes.get('/fail-login',(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/faillogin.html"));
})
routes.get('/signup',(req, res)=>{
    res.sendFile(path.join(__dirname, ".././public/register.html")); 
})
routes.post('/signup',upload.single('myFile'),passport.authenticate('register',
{ failureRedirect: '/fail-signup',failureMessage: true}),(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/login.html"));  
})
routes.get('/fail-signup',(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/failsignup.html"));
})
routes.get('/logout', isAuth, function(req, res, next) {
  let user= req.user.email
  req.logout(function(err){  
    if (err)  return next(err); 
  res.send(`<h1>Hasta luego ${user}</h1>
          <script type="text/javascript">
          setTimeout(function(){ location.href = '/login'},2000)
          </script>`
        )
  })
})



const {productosApi} = require("../daos/ProductosDaoMongoDb");
const {carritosApi} = require("../daos/CarritosDaoMongoDb");
const cartModel = require('../models/carrito')
const userModel = require('../models/usuario')






  /*----------------------PRODUCTOS-------------------------- */
  routes.get('/api/productos', async function (req, res) {
    if(req.isAuthenticated()){
      try {
        const products = await productosApi.getAll()
        res.render('products', { products })
      } catch (error) {
      // logger.warn('error', error)
        res.status(404).json({ message: error.message })}
     }
    else{
      res.sendFile(path.join(__dirname, "../public/login.html"))}   
  })
  
    routes.get('/api/productos/:id', async function (req, res) {
      res.json(await productosApi.getById(req.params.id))
    })
  
    routes.post('/api/productos', async function(req, res) {
        res.json(await productosApi.save(req.body))
    })
  
  
    routes.put('/api/productos/:id', async function (req, res) {
        res.json(await productosApi.updateProducts(req.body, req.params.id))
    })
  
  
    routes.delete('/api/productos/:id', async function (req, res) {
     res.json(await productosApi.deleteById(req.params.id))
    })
  
    /*----------------------CARRITO-------------------------- */
  
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
