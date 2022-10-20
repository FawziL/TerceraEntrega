const faker = require ("faker")  ;
faker.locale = "es";

function generateProduct() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code:faker.commerce.price(50,100,0),
    price:faker.commerce.price(200,400,0),
    thumbnail:faker.internet.avatar(),
    stock:faker.commerce.price(100,200,0)
  };
}

module.exports = {
    generateProduct,
};