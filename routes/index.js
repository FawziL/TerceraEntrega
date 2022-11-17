const { Router } = require('express')
const routes = Router()
const routesApiProducts = require("./routesApiProducts.js")
const routesApiCart = require("./routesApiCart.js")
const routesApiOrder = require("./routesApiOrder.js")
const routerUser = require("./routerUser.js")
const routerChat = require("./routerChat.js")
const compression = require('compression')

routes.use(routesApiProducts);
routes.use(routesApiCart);
routes.use(routesApiOrder);
routes.use(routerUser);
routes.use(routerChat);


const handleAll = require ("../middlewares/loggerMdw.js")
routes.use(handleAll);
routes.use(compression());

module.exports = routes;
