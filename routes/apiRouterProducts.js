const { Router } = require('express')
const routes = Router()
const auth = require("../middlewares/isAuth")
const {getAll, getById, createProduct, updateProducts, deleteById} = require("../controllers/product.controller.js")

 

routes.get('/api/productos', auth, async function (req, res) {
  const products = await getAll()
  res.render('products', { products })
})

routes.post('/api/productos', async function(req, res) {
  res.json(await createProduct(req.body))
})

routes.put('/api/productos/:id', async function (req, res) {
  res.json(await updateProducts(req.body, req.params.id))
})

routes.get('/api/productos/:id', async function (req, res) {
  res.json(await getById(req.params.id))
})

routes.delete('/api/productos/:id', async function (req, res) {
  res.json(await deleteById(req.params.id))
})

module.exports = routes;
