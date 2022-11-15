const { Router } = require('express')
const routes = Router()
const {getAll, getById, renderOrders} = require("../controllers/orderController.js")

routes.get("/orders", renderOrders)
  
routes.get('/orders/:email', getById)
  
module.exports = routes;