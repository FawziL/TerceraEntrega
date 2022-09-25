const {CarritoDaoMongo} = require("../daos/carritoDaoMongo.js");
const CarritoDao = new CarritoDaoMongo;

const postCarrito = async (req, res)=>{
    const elemento = await CarritoDao.newCart()
    res.json(elemento)
}

const verCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    res.json(elemento)
}
const deleteCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    await CarritoDao.deleteById(id)
    res.json(await CarritoDao.getAll())
}
const listarCarritos =  async (req, res) => {
    const verCarritos = await CarritoDao.getAll()
    res.json(verCarritos)
}

module.exports = {
    postCarrito,
    verCarrito,
    deleteCarrito,
    listarCarritos,
}