const DaoOrder = require("../daos/OrderDaoMongoDb.js");
const Orders = DaoOrder.getInstance();

const getOrder = async (email, products) => {
  try {
   await Orders.save(email, products)
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getOrder };
