const supertest = require("supertest") ;
const { expect } = require("chai")   ;
const productGenerate = require("./product.generate.js")  ;

let request;

let response;

let id;

describe("Test -- Productos", () => {
    before(() => {
        request = supertest("http://localhost:8080");
    });
    const productToCreate = productGenerate.generateProduct();
    
    it("It creates a product (POST => /api/productos)", async () => {
        response = await request.post("/api/productos").send(productToCreate);
        
        id=response.body._id
  
        expect(response.status).to.eql(201);
        expect(response.body.title).to.eql(productToCreate.title);
        expect(response.body.thumbnail).to.eql(productToCreate.thumbnail);
        expect(response.body.description).to.eql(productToCreate.description);
        expect(response.body.price).to.eql(Number(productToCreate.price));
        expect(response.body.stock).to.eql(Number(productToCreate.stock));
        expect(response.body.code).to.eql(Number(productToCreate.code));
    });
   
    it("Return all products - GET => /api/productos", async () => {
    response = await request
        .get("/api/productos")

    expect(response.status).to.eql(200);
    });
   
    it("Return status 404 - GET => Unkown Page", async () => {
    const response = await request.get("/asdasds");

    expect(response.status).to.eql(404);
    });

    const productToCreate2 = productGenerate.generateProduct()
    
    it("Modificamos producto - PUT =>/api/productos/id ", async () => {
        response = await request
                    .put(`/api/productos/${id}`)
                    .send(productToCreate2);

        expect(response.status).to.eql(201);
    });
/*
    it("- GET a product by Id => /api/productos/id", async () => {
    response = await request
        .get(`/api/productos/${id}`)
    
    expect(response.status).to.eql(200);
    
    expect(response.body).to.keys("_id","title", "description", "code","price", "thumbnail", "stock");
    });

    it("- DELETE product by Id => /api/productos/id", async () => {
    response = await request
        .delete(`/api/productos/${id}`)
    expect(response.status).to.eql(200);
    });
*/
});