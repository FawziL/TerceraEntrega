const { Router } = require('express')
const routes = Router()
const passport = require ('passport') 
const path = require('path')
const isAuth = require ('../middlewares/isAuth.js');
const upload = require ('../multer/loadFile.js')
const apiRouterProducts = require("./apiRouterProducts.js")
const apiRouterCart = require("./apiRouterCart.js")
const compression = require('compression')
routes.use(apiRouterProducts);
routes.use(apiRouterCart );

const handleAll = require ("../middlewares/loggerMdw.js")
routes.use(handleAll);
routes.use(compression());

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

module.exports = routes;
