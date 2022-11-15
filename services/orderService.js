const DaoOrder = require("../daos/OrderDaoMongoDb.js");
const Orders = DaoOrder.getInstance();

const getOrder = async (email, products) => {
  try {
   await Orders.save(email, products)
  } catch (error) {
    console.log(error);
  }
};
const getAll = async () => {
  try {
      const products = await Orders.getAll()
      return products
  } catch (error) {
      logger.error(`No estás autenticado: ${error}`)}
}

module.exports = { getOrder, getAll};
