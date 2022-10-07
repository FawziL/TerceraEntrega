const  { productosApi } = require("../daos/index.dao")
const logger = require("../logger")


const getAll = async () => {
    try {
        console.log("Hola3")
        const products = await productosApi.getAll()
        return products
    } catch (error) {
        console.log(error)
        logger.error(`No estás autenticado: ${error}`)}
}


const getById = async () => {
    res.json(await productosApi.getById(req.params.id))
}

const createProduct = async (product) => {
    return await productosApi.createProduct(product)
}

const updateProducts = async (product, productID) => {
    return await productosApi.updateProducts(product, productID)
}

const deleteById = async (productID) => {
    return await productosApi.deleteById(productID)
}

module.exports =  {getAll, getById, createProduct, updateProducts, deleteById}