const Chat = require("../models/chatModel.js");
let instance;

class ContenedorMongoDbChat {
  constructor() { 
    this.collection = Chat;
}

async getAll(){
  try {
    const chats = await this.collection.find();
    return chats
  } catch (error) {
    throw new CustomError(500, error);
  }
}

async create(email, message){
  try {
    const userMessage = new this.collection({ email, message })
    await userMessage.save()
    return userMessage
  } catch (error) {
    throw new CustomError(500, error);
  }           
}

async getByEmail(email) {
  try {
    const chats = await this.collection.find({ email: email});
    return chats
  } catch (error) {
    throw new CustomError(500, error);
  }
}

static getInstance() {
  if (!instance) instance = new ContenedorMongoDbChat();
  return instance;
}

}

module.exports = ContenedorMongoDbChat;