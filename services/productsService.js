const DaoProduct = require("../daos/ProductosDaoMongoDb.js")
const Product = DaoProduct.getInstance();
const logger = require("../utils/logger")


const getAll = async () => {
    try {
        const products = await Product.getAll()
        return products
    } catch (error) {
        logger.error(`No estás autenticado: ${error}`)}
}


const getById = async (id) => {
    res.json(await Product.getById(id))
}

const createProduct = async (product) => {
    return await Product.createProduct(product)
}

const updateProducts = async (product, productID) => {
    return await Product.updateProducts(product, productID)
}

const deleteById = async (productID) => {
    return await Product.deleteById(productID)
}


module.exports =  {getAll, getById, createProduct, updateProducts, deleteById}