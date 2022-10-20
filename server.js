const express = require("express");
const { Server: HttpServer } = require("http");
const app = express();
const httpServer = new HttpServer(app);
const passport = require("passport");
const initPassport = require("./passport/init.js");
const rutas = require("./routes/index.js");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config/config");
const mongo = config.mongodb;
const port = config.port;
const engine = require("express-handlebars");
const path = require("path");
const cluster = require("cluster");
const os = require("os");
const cpus = os.cpus();
const isCluster = process.argv[2] == "cluster";
const  { graphqlHTTP } = require( "express-graphql");
const  productoController = require("./controllers/producto.graphql.controller.js")
const  productoSchema = require( "./graphql/producto.schema.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(mongo);

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

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
    cookie: {
      maxAge: 500000,
    },
  })
);
//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

if (isCluster && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const connectedServer = httpServer.listen(port, () => {
    //logger.info(`Servidor http escuchando en el puerto ${connectedServer.address()} - PID ${process.pid}`)
    console.log(`Servidor escuchando: ${port}`);

    app.use("/", rutas);
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: productoSchema,
        rootValue: {
          getProductos: productoController.getProductos,
          getProducto: productoController.getProducto,
          createProducto: productoController.createProducto,
          updateProducto: productoController.updateProducto,
          deleteProducto: productoController.deleteProducto,
        },
        graphiql: true,
      })
    );

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
}
