const ProductMongoDAO = require("./ProductosDaoMongoDb.js");

class DaoFactory {
  createDao() {
     return ProductMongoDAO.getInstance();
  }
}

module.exports= DaoFactory;
