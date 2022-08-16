const sinon = require("sinon");
const db = require("../../../database");
const mocks = require("../mocks/dataMocks");
const productsModel = require("../../../models/productsModel");
const { expect } = require("chai");

describe("Teste da camada model, rota /products GET", () => {
  afterEach(() => db.query.restore());

  it("Deve retornar todos os produtos no DB", async () => {
    sinon.stub(db, "query").resolves([mocks.allProducts]);
    const products = await productsModel.getAllProducts();
    expect(products).to.be.equal(mocks.allProducts);
  });

  it("Quando o DB estiver vazio, deve retornar um array vazio", async () => {
    sinon.stub(db, "query").resolves([]);
    const products = await productsModel.getAllProducts();
    expect(products.length).to.be.equal(0);
  });
});

describe("Teste da camada model, rota /products/:id GET", () => {
  const ID = 1;

  describe("Se o produto existir", () => {
    beforeEach(() => sinon.stub(db, "query").resolves([[mocks.productById]]));
    afterEach(() => db.query.restore());

    it("Deve retornar um objeto com os dados do produto", async () => {
      const product = await productsModel.getProductById(ID);
      expect(product).to.be.equals(mocks.productById);
    });
  });

  describe("Se o produto não existir", () => {
    beforeEach(() => sinon.stub(db, "query").resolves([[]]));
    afterEach(() => db.query.restore());

    it("Deve retornar um array vazio", async () => {
      const product = await productsModel.getProductById(ID);
      expect(product.length).to.be.equals(0);
    });
  });
});
