const { expect } = require('chai');
const sinon = require("sinon");
const salesController = require('../../../controllers/SalesController');
const salesService = require('../../../services/SalesService');

const productArray = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
  ];

  const res = {};
  const req = {};

describe('Testes para a tabela sales da camada controller', () => {
  describe("Controller getall retorna um objeto de arrays", () => {
    before(() => {
      sinon.stub(salesService, 'getAll').resolves(productArray);
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });
    after(() => {
      salesService.getAll.restore();
    });
    it("Caso correto, retornar o array de objetos correto", async () => {
        await salesController.getAll(req, res);
        expect(res.json.calledWith(productArray)).to.be.equal(true);
        expect(res.status.calledWith(200)).to.be.equal(true);   
    });
  });
  describe("Controller getById retorna um produto de id especifico", () => {
    before(() => {
      sinon.stub(salesService, 'getById').resolves(productArray);
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });
    after(() => {
      salesService.getById.restore();
    });

    it("Caso sucesso deve retornar o id especifico", async () => {
        await salesController.getById({ params: 1 }, res);
        expect(res.json.calledWith(productArray)).to.be.equal(true);
    });
    it("Caso correto deve retornar o status correto", async () => {
        await salesController.getById({ params: 1 }, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Controller RemoveSales, remove o produto e manda status correto:', () => {
    it('Certifica que é retornado o status correto', async () => {

      req.params = { id: 100 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(salesService, 'getById').resolves(false);
      sinon.stub(salesService, 'removeSales').resolves();

      await salesController.removeSales(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
      salesService.removeSales.restore();
      salesService.getById.restore();

    })
  })
});