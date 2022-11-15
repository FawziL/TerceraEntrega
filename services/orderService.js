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
      const orders = await Orders.getAll()
      return orders
  } catch (error) {
      logger.error(`No estás autenticado: ${error}`)}
}
const getById = async (email) => {
  try {
      const orders = await Orders.getById(email)
      return orders
  } catch (error) {
      logger.error(`No estás autenticado: ${error}`)}
}

module.exports = { getOrder, getAll, getById};
