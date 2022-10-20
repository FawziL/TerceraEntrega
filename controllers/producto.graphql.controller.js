const crypto = require ("crypto") ;
const ProductoDaoFactory = require ('../daos/daoFactory.js') 
const DAO = ProductoDaoFactory()


const createProducto = async ({ datos }) => {
  const newProducto = await DAO.createProduct(datos)
  return newProducto;
};

const getProducto = async ({ id }) => {
  const producto = await DAO.getById(id)
  if(!producto) throw new Error( "Producto no encontrado")
  return producto;
};

const getProductos = async ({ campo, valor }) => {
  const verProductos = await DAO.getAll()
  if (campo && valor) {
    return verProductos.filter((producto) => producto[campo] == valor);
  } else {
    return verProductos;
  }
};

const updateProducto = async ({ id, datos }) => {
  const producto = await DAO.getById(id)
  if(!producto) throw new Error( "Producto no encontrado")
  const {title, description, code, price, thumbnail, stock} = datos
  const productoUpdated = await DAO.update(id, title, description, code, price, thumbnail, stock)
  return productoUpdated;
};

const deleteProducto = async ({ id }) => {
  const productoDeleted = await DAO.getById(id)
  if(!productoDeleted) throw new Error( "Producto no encontrado")
  await DAO.deleteById(id)
  
  return productoDeleted;
};

module.exports= {
    createProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto,
};