const sinon = require("sinon");
const mocks = require("../mocks/dataMocks");
const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");
const { expect } = require("chai");
const createError = require("../../../helpers/createError");

describe("Teste da camada de service, rota /products GET", () => {
  describe("Se existirem produtos: ", () => {
    it("Deve retornar todos os produtos existentes", async () => {
      sinon.stub(productsModel, "getAllProducts").resolves(mocks.allProducts);
      const products = await productsService.getAllProducts();
      expect(products).to.be.equals(mocks.allProducts);
      productsModel.getAllProducts.restore();
    });
  });

  describe("Se não existirem produtos: ", () => {
    it("Deve retornar um array vazio", async () => {
      sinon.stub(productsModel, "getAllProducts").resolves([]);
      const products = await productsService.getAllProducts();
      expect(products.length).to.be.equals(0);
    });
  });
});

describe("Teste da camada de serviço, rota /products/:id GET", () => {
  const ID = 1;

  const erro = createError('notFound', 'Product not found');

  describe("Se o produto existir", () => {
    beforeEach(() =>
      sinon.stub(productsModel, "getProductById").resolves(mocks.productById)
    );
    afterEach(() => productsModel.getProductById.restore());

    it("Deve retornar um objeto com os dados do produto", async () => {
      const product = await productsService.getProductById(ID);
      expect(product).to.be.equals(mocks.productById);
    });
  });

  describe("Se o produto não existir", () => {
    beforeEach(() =>
      sinon.stub(productsModel, "getProductById").resolves(undefined)
    );
    afterEach(() => productsModel.getProductById.restore());

    it("Deve retornar um objeto de erro", async () => {
      const product = await productsService.getProductById(ID);
      expect(product).to.be.eqls(erro);
    });
  });
});
