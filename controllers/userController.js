const logger = require("../utils/logger")
const path = require('path')

const home = async (req, res) => {
  if(req.isAuthenticated()){
      res.redirect('/productos')
  }else{
      res.sendFile(path.join(__dirname, "../public/login.html")); 
  }
}

const login = async (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/')
  }else{
    res.sendFile(path.join(__dirname, ".././public/login.html")); 
    }     
};
const failedLogin = async (req, res) => {
  res.sendFile(path.join(__dirname, ".././public/faillogin.html"));
};

const signup = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"))
};
const failedSignup = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/failsignup.html"));
};
const logout = async (req, res, next) => {
  let user= req.user.email
  req.logout(function(err){  
    if (err)  return next(err); 
  res.send(`<h1>Hasta luego ${user}</h1>
          <script type="text/javascript">
          setTimeout(function(){ location.href = '/'},2000)
          </script>`
        )
  })
};
const getAcount = async (req, res) => {
  const {email, name, address, age, phone, avatar} = req.user
  res.render('userInfo',{email, name, address, age, phone, avatar})
};
const chat = async (req, res) => {
  const {name, avatar} = req.user
  res.render('userInfo',{name, avatar})
};

module.exports =  {home, getAcount, chat, login, failedLogin, signup, failedSignup, logout}



