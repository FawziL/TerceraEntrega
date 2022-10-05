const twilio = require('twilio');
const logger = require("../utils/logger")
require("dotenv").config()
const config = require('../config/config.js')
const accountSid = config.accountSid
const authToken = config.authToken
const toNumber = +584149541095;
const client = twilio(accountSid, authToken);


const sendNewOrder = async (order, user) => {
  try {
    const option = {
      to: toNumber,
      from: +18649205080,
      body: `Se ha realizado un nuevo pedido por el usuario ${user.name}, con el email: ${user.email} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`,
    }
    const message = await client.messages.create(option)

  } catch (error) {
    logger.warn('error', error)
  }
}

const sendWhatsApp = async (order, user) => {
  try {
    client.messages 
      .create({ 
          body: `Se ha realizado un nuevo pedido por el usuario ${user.name}, con el email: ${user.email} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`, 
         from: 'whatsapp:+14155238886',       
         to: `whatsapp:+584149541095` 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
  } catch (error) {
    logger.warn('error', error)
  }
}

module.exports ={sendNewOrder,sendWhatsApp}