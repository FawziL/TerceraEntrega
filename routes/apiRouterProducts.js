const { Router } = require('express')
const routes = Router()
const path = require('path')
const {productosApi} = require("../daos/index.dao");

routes.get('/api/productos', async function (req, res) {
    if(req.isAuthenticated()){
      try {
        const products = await productosApi.getAll()
        res.render('products', { products })
      } catch (error) {
        res.status(404).json({ message: error.message })}
     }
    else{
      res.sendFile(path.join(__dirname, "../public/login.html"))}   
})
  
routes.get('/api/productos/:id', async function (req, res) {
    res.json(await productosApi.getById(req.params.id))
})
  
routes.post('/api/productos', async function(req, res) {
    res.json(await productosApi.save(req.body))
})
  
  
routes.put('/api/productos/:id', async function (req, res) {
    res.json(await productosApi.updateProducts(req.body, req.params.id))
})
  
  
routes.delete('/api/productos/:id', async function (req, res) {
    res.json(await productosApi.deleteById(req.params.id))
})

module.exports = routes;
