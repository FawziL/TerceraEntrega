const {productService} = require("../services/index.js")
const logger = require("../utils/logger.js")

const getAll = async (req, res) => {
    try {
      const products = await productService.getAll();
      return res.json(products)
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  };

  const renderProducts = async (req, res) => {
    try {
      const products = await productService.getAll();
      res.render('products', { products })
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  };

  const createProduct = async (req, res) => {
    try {
        res.json(await productService.createProduct(req.body))
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  };

  const updateProducts = async (req, res) => {
    try {
        res.json(await productService.updateProducts(req.body, req.params.id))
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  }; 

  const getById = async (req, res) => {
    try {
        res.json(await productService.getById(req.params.id))
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  }; 

  const deleteById = async (req, res) => {
    try {
        res.json(await productService.deleteById(req.params.id))
      
    } catch (err) {
      logger.error(` ${err}`)
    }
  }; 

  module.exports =  {getAll, getById, createProduct, updateProducts, deleteById, renderProducts}