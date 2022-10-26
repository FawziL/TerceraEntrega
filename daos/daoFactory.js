const ProductMongoDAO = require("./ProductosDaoMongoDb.js");
const CartMongoDAO = require("./CarritosDaoMongoDb.js");

class DaoFactoryProduct {
  createDao() {
     return ProductMongoDAO.getInstance();
  }
}
class DaoFactoryCart {
  createDao() {
     return CartMongoDAO.getInstance();
  }
}

module.exports= {DaoFactoryProduct, DaoFactoryCart}


