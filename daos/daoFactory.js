const ProductMongoDAO = require("./ProductosDaoMongoDb.js");

class DaoFactory {
  createDao() {
     return new ProductMongoDAO();
  }
}

module.exports= DaoFactory;
