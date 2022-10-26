const { Router } = require('express')
const routes = Router()
const apiRouterProducts = require("./apiRouterProducts.js")
const apiRouterCart = require("./apiRouterCart.js")
const routerUser = require("./routerUser.js")
const compression = require('compression')
routes.use(apiRouterProducts);
routes.use(apiRouterCart );
routes.use(routerUser);

const handleAll = require ("../middlewares/loggerMdw.js")
routes.use(handleAll);
routes.use(compression());


module.exports = routes;
