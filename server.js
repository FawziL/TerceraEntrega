const express = require('express')
const { Server: HttpServer } = require('http')
const app = express()
const httpServer = new HttpServer(app)
const {Server: IOServer} = require('socket.io')
const passport = require("passport")
const initPassport = require( './passport/init.js')
const rutas = require( "./routes/index.js");
const rutasApi = require( "./routes/api.js");
const mongoose = require( "mongoose")
require("dotenv").config()
const config = require('./config/config')
const mongo = config.mongodb
const port = config.port
const  engine = require('express-handlebars')
const path = require("path")
const cluster = require("cluster");
const os = require("os");
const cpus = os.cpus();
const isCluster = process.argv[3] == "cluster";
const logger = require ("./logger.js");

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
//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);


if(isCluster && cluster.isPrimary){
    cpus.map(() => {
      cluster.fork()
   });
  
   cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork();
  
   });
  } else{

    const connectedServer = httpServer.listen(port, () => {
      logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port} - PID ${process.pid}`)
      console.log(`Servidor escuchando: ${port}`)



app.use("/", rutas);
app.use("/api", rutasApi);

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

const io = new IOServer(connectedServer)
io.on('connection', socket =>{
    console.log(`Se conectó un usuario ${socket.id}`) 
    io.emit('client:price:thumbnail', products)
    socket.on('client:price:thumbnail', objectInfo => {
        products.push(objectInfo)
        io.emit('client:price:thumbnail', products)
    })
})
})
}
  

