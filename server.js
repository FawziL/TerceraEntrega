const express = require("express");
const { Server: HttpServer } = require("http");
const app = express();
const httpServer = new HttpServer(app);
const passport = require("passport");
const initPassport = require("./passport/init.js");
const rutas = require("./routes/index.js");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config/config.js");
const engine = require("express-handlebars");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.mongodb, () => {
  console.log("Conectada la base de datos");
});

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongodb,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      maxAge: 5000000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

const server = httpServer.listen(config.port, () => {
console.log(`Servidor escuchando: ${config.port}`);

  app.use("/", rutas);
  app.use(express.static(__dirname + "/public"));
  app.engine(
      "hbs",
      engine({
        extname: ".hbs",
        defaultLayout: path.join(__dirname, "/public/views/layout/main.hbs"),
      })
    );
    app.set("views", path.join(__dirname, "./public/views"));
    app.set("view engine", "hbs");
  });

  const {chatService} = require("./services/index.js")

  const {Server: IOServer} = require('socket.io')
  const io = new IOServer(server)

  io.on('connection', async socket => {
    console.log(`Se conecto un usuario ${socket.id}`)
    const messages = await chatService.getChat()
  
    io.emit('server:message', messages)
  
    socket.on('client:message', async messageInfo => {
      const { email, message } = messageInfo;
      console.log(email)
      console.log(message)
      await chatService.create(email, message)
      const messages = await chatService.getChat()
      io.emit('server:message', messages)
    })
  })