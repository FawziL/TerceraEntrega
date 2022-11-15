const order = require("../models/orderModel.js");

let instance;

class OrderMongoDAO {
  constructor() {
    this.collection = order;
}
 
getAll = async() => {
    try {
      const orders = await this.collection.find().lean();
      return orders;
    } catch (err) {
      console.log(err)
      return []
    }
  }

save = async (email, products) =>{
    try {
      const doc = new this.collection({email:email, timestamp:Date.now(), products:products})
      await doc.save() 
      return doc       
  } catch (error) {
    console.log(error)
  }}


getById = async(id) => {
    const doc = await this.collection.findById(id);
    return doc || { error: 'order no encontrado' }
}

static getInstance() {
    if (!instance) {
      instance = new OrderMongoDAO();
    }
    return instance;
  }
}
create = async(carrito)=>{  
  try {
      console.log('carrito.productos', carrito.productos)
      const orden = new this.collection({
          orderNumber:await this.nextOrderNumber(),
          username:carrito.username,
          address:carrito.address,
          productos: carrito.productos, 
          timestamp:Date.now(),
          status:"generada",
          productos: carrito.productos,
      })
      await orden.save() 
      return new OrdenesDTO(orden);
    } catch (error) {
      console.log(error)
    }
    }

module.exports = OrderMongoDAO;
