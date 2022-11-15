const {orderService} = require("../services/index.js")
const logger = require("../utils/logger.js")

const getAll = async (req, res) => {
    try {
      const orders = await orderService.getAll();
      return res.json(orders)
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  };

  const renderOrders = async (req, res) => {
    try {
      const orders = await orderService.getAll();
      res.render('orders', { orders })
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  };


  const getById = async (req, res) => {
    try {
        res.json(await orderService.getById(req.params.email))
        console.log(req.params.email)
    } catch (err) {
      logger.error(` ${err}`)
    }
  }; 

  module.exports =  {getAll, getById, renderOrders}