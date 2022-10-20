class Producto {
    constructor(id, {title, description, code, price, thumbnail, stock }) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.thumbnail = thumbnail;
      this.stock = stock;
    
    }
}

module.exports = Producto