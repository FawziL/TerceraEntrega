const {productService} = require("../services/index.js")

const getAll = async (req, res) => {
    try {
      const products = await productService.getAll();
      res.render('products', { products })
      
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json(new WSresponse(null, "Internal server error", true, 500));
    }
  };

  const createProduct = async (req, res) => {
    try {
        res.json(await productService.createProduct(req.body))
      
    } catch (err) {
      console.log(err);
      res.status(400).json(new WSresponse(null, err, true, 400));
    }
  };

  const updateProducts = async (req, res) => {
    try {
        res.json(await productService.updateProducts(req.body, req.params.id))
      
    } catch (err) {
      console.log(err);
      res.json(new WSresponse(null, err, true, 489));
    }
  }; 

  const getById = async (req, res) => {
    try {
        res.json(await productService.getById(req.params.id))
      
    } catch (err) {
      console.log(err);
      res.json(new WSresponse(null, err, true, 460));
    }
  }; 

  const deleteById = async (req, res) => {
    try {
        res.json(await productService.deleteById(req.params.id))
      
    } catch (err) {
      console.log(err);
      res.json(new WSresponse(null, err, true, 320));
    }
  }; 

  module.exports =  {getAll, getById, createProduct, updateProducts, deleteById}