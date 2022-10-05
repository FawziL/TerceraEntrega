const { Router} = require('express');
const router = Router()
const auth = require("../middlewares/isAuth")
const {getAll, getById, createProduct, updateProducts, deleteById} = require("../api/productos.js")

 

router.get('/api/productos', auth, async function (req, res) {
  const products = await getAll()
  res.render('products', { products })
})

router.post('/api/productos', async function(req, res) {
  res.json(await createProduct(req.body))
})

router.put('/api/productos/:id', async function (req, res) {
  res.json(await updateProducts(req.body, req.params.id))
})

router.get('/api/productos/:id', async function (req, res) {
  res.json(await getById(req.params.id))
})

router.delete('/api/productos/:id', async function (req, res) {
  res.json(await deleteById(req.params.id))
})

module.exports = router;
