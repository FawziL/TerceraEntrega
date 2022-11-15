require("dotenv").config()

module.exports = {
  mongodb: process.env.MONGO_URL,
  session: {SECRET: process.env.SECRET},
  port: '8080',
  accountSid: process.env.ACCOUNTSID, 
  authToken: process.env.AUTHTOKEN,
  admin: process.env.ADMIN,
  user: process.env.USER
}
