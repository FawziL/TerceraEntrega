const { Router} = require('express');
const router = Router()
const auth = require("../middlewares/isAuth")
const {home, getAcount, chat, login, failedLogin, signup, failedSignup, logout} = require("../controllers/userController.js")
const passport = require ('passport') 
const upload = require ('../multer/loadFile.js')
const isAuth = require ('../middlewares/isAuth.js');

router.get("/", home);

router.get("/micuenta", auth, getAcount);

router.get("/chat", auth, chat);
//router.get('/chat/:mail', this.controller.getChatsByMail)
//router.get('/chat', this.controller.getChat)

router.get("/login", login);

router.post('/login',passport.authenticate('login',{failureRedirect: '/failedLogin',failureMessage: true}), home);

router.get('/failedLogin', failedLogin);  

router.get("/signup", signup);  

router.post('/signup',upload.single('myFile'),passport.authenticate('register',{ failureRedirect: '/failedSignup',failureMessage: true}),login); 
 
router.get('/failedSignup', failedSignup);

router.get('/logout',isAuth, logout) 

module.exports = router;

