const sinon = require("sinon");
const errors = require("restify-errors");
const dataMocks = require("../mocks/dataMocks");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const { expect } = require("chai");

describe("Teste da camada de controller, rota /products GET", () => {
  const request = {};
  const response = {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Quando realiza a leitura com sucesso ", () => {
    beforeEach(() =>
      sinon
        .stub(productsService, "getAllProducts")
        .resolves(dataMocks.allProducts)
    );
    afterEach(() => productsService.getAllProducts.restore());

    it('responde com um status "200"', async () => {
      await productsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("Deve retornar todos os produtos existentes", async () => {
      await productsController.getAllProducts(request, response);
      expect(response.json.calledWith(dataMocks.allProducts)).to.be.true;
    });
  });
});

describe("Teste da camada de controller, rota /products/:id GET", () => {
  const request = {};
  const response = {};
  let next;

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Quando realiza a leitura de um produto existente", () => {
    const id = 1;

    beforeEach(() => {
      request.params = { id };
      sinon
        .stub(productsService, "getProductById")
        .resolves(dataMocks.productById);
    });

    afterEach(() => productsService.getProductById.restore());

    it('responde com um status "200"', async () => {
      await productsController.getProductById(request, response, next);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("Deve retornar um objeto com os dados do produto", async () => {
      await productsController.getProductById(request, response, next);
      expect(response.json.calledWith(dataMocks.productById)).to.be.true;
    });
  });

  describe("Quando realiza a leitura de um produto inexistente", () => {
    const id = 42;
    const erro = {
      error: {
        code: "notFound",
        message: "Product not found",
      },
    };

    beforeEach(() => {
      request.params = { id };
      next = sinon.stub().returns();
      sinon.stub(productsService, "getProductById").resolves(erro);
    });

    afterEach(() => productsService.getProductById.restore());

    it("Chama o middleware de erro com o erro correto", async () => {
      await productsController.getProductById(request, response, next);
      expect(next.calledWith(erro.error)).to.be.true;
    });
  });
});
