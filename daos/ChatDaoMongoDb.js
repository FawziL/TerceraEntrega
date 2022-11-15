const Chat = require("../models/chatModel.js");

let instance;

class ContenedorMongoDbChat {
  constructor() { 
    this.collection = Chat;
}

getAll = async () => {
    try {
        const allMessages = await this.collection.find()
        return allMessages   
    } catch (error) {
        return []
    }
  }

save = async (email, message) =>{
    try {
      const doc = new this.collection({email:email, timestamp:Date.now(),message:message})
      await doc.save() 
      return doc       
  } catch (error) {
    console.log(error)
  }
   
  }

  getByEmail = async(email) => {
      const messages = await this.collection.findOne({ email: email });
      return messages || { error: 'chat no encontrado' }
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorMongoDbChat();
    }
    return instance;
  }
}

module.exports = ContenedorMongoDbChat;