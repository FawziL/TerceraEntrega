const { buildSchema } = require( "graphql");

const productoSchema = buildSchema(`
    input ProductoInput {
        title: String!,
        description: String,
        code: Int,
        price: Int!,
        thumbnail: String,
        stock: Int
    }
    type Producto {
        id: ID!,
        title: String!,
        description: String,
        code: Int,
        price: Int!,
        thumbnail: String,
        stock: Int
    }
    type Query {
        getProducto(id: ID!): Producto,
        getProductos(campo: String, valor: String): [Producto],
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto,
        updateProducto(id: ID!, datos: ProductoInput): Producto,
        deleteProducto(id: ID!): Producto,
    }
`);
// const resolvers = {
//     Date: dateScalar, 
    
//   }; 

module.exports =  productoSchema;