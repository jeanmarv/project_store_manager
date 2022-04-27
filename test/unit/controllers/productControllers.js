const { expect } = require('chai');
const sinon = require("sinon");
const productControl = require('../../../controllers/ProductController');
const productService = require('../../../services/ProductService');

const productArray = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
  ];
  const res = {};
  const req = {};

describe('Testes para a tabela products da camada controller', () => {
  describe("Controller getall retorna um objeto de arrays", () => {
    before(() => {
      sinon.stub(productService, 'getAll').resolves(productArray);
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });
    after(() => {
      productService.getAll.restore();
    });
    it("Caso correto, retornar o array de objetos correto", async () => {
        await productControl.getAll(req, res);
        expect(res.json.calledWith(productArray)).to.be.equal(true);
        expect(res.status.calledWith(200)).to.be.equal(true);   
    });
  });
  describe("Controller getById retorna um produto de id especifico", () => {
    before(() => {
      sinon.stub(productService, 'getById').resolves({ id: 1, name: "Martelo de Thor", quantity: 10 });
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });
    after(() => {
      productService.getById.restore();
    });

    it("Caso sucesso deve retornar o id especifico", async () => {
        await productControl.getById({ params: 1 }, res);
        expect(res.json.calledWith( { id: 1, name: "Martelo de Thor", quantity: 10 })).to.be.equal(true);
    });
    it("Caso correto deve retornar o status correto", async () => {
        await productControl.getById({ params: 1 }, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});