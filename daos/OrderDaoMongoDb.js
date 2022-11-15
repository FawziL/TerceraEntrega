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
      const orders = await this.getAll()
      const numberOrder = orders.length + 1;
      const doc = new this.collection({email:email, timestamp:Date.now(), products:products, numberOrder: numberOrder})
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

module.exports = OrderMongoDAO;
