const order = require("../models/orderModel.js");
const transporter = require("../mailer/mailer.js")
require("dotenv").config();
const config = require("../config/config.js");

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

      const mailOptions = {
        from: "Servidor Node",
        to: config.admin,
        subject: "Nuevo Orden",
        html: 
        `
        <h1>Email: ${email}</h1>
        <h2>Fecha: ${Date.now()}</h2>
        <h2>Número de Orden: ${numberOrder}</h2>
        <h2>Productos: ${products}</h2>
        `,
      };

      async function enviarInfo() {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
      }
      try {
        enviarInfo()
      } catch (error) {
        console.log(error);
      }   

      await doc.save() 
      return doc       
  } catch (error) {
    console.log(error)
  }}


getById = async(email) => {
    const doc = await this.collection.find({email:email});
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
