const express = require('express')
const app = express()
const {Server: IOServer} = require('socket.io')
const passport = require("passport")
const initPassport = require( './passport/init.js')
const rutas = require( "./routes/index.js");
const mongoose = require( "mongoose")
require("dotenv").config()
const config = require('./config/config')
const mongo = config.mongodb
const port = config.port
const  engine = require('express-handlebars')
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(mongo);

const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")

app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: mongo,
        }),
        secret: "coderhouse",
        resave: false,
        saveUninitialized: false,
        rolling: false,
        cookie:{
            maxAge: 500000,
        }
    })
)




const serverExpress = app.listen(port, (error)=>{
    if(error){
        console.log(`Hubo un error: ${error}`)
    }else{
        console.log(`Servidor escuchando: ${port}`)
      }
})

//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);
app.use("/", rutas);
app.use(express.static(__dirname + '/public'))

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: path.join(__dirname, '/public/views/layout/main.hbs'),
    })
  );
app.set('views', path.join(__dirname, './public/views'))
app.set('view engine', 'hbs')




const products = []

const io = new IOServer(serverExpress)
io.on('connection', socket =>{
    console.log(`Se conectó un usuario ${socket.id}`) 
    io.emit('client:price:thumbnail', products)
    socket.on('client:price:thumbnail', objectInfo => {
        products.push(objectInfo)
        io.emit('client:price:thumbnail', products)
    })
})


