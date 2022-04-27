const { expect } = require('chai');
const sinon = require("sinon");
const connection = require('../../../models/connection');
const salesModel = require('../../../models/SalesModel');

const productArray = [
{ id: 1, name: 'Martelo de Thor', quantity: 10 },
{ id: 2, name: 'Traje de encolhimento', quantity: 20 },
{ id: 3, name: 'Escudo do Capitão América', quantity: 30 }
];

describe('Testes para a tabela de sales da camada Model', () => {
  describe("Model GetAll, retorna um objeto de arrays", () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([productArray]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("quando retorna com sucesso o array de objetos", async () => {
      const products = await salesModel.getAll();
      expect(products).to.be.equal(productArray);
    });
    it('O objeto possui as propriedades id, name e quantity', async () => {
      const [products] = await salesModel.getAll();

      expect(products).to.have.a.property('id');
      expect(products).to.have.a.property('name');
      expect(products).to.have.a.property('quantity');
    });
  });

  describe("model getByid, retorna um id especifico", () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ id: 1, name: 'Martelo de Thor', quantity: 10 }]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Retorna com sucesso o ID especifico", async () => {
      const products = await salesModel.getById();
      expect(products).to.have.property("id");
      expect(products).to.have.property("name");
      expect(products).to.have.property("quantity");
    });
  });

  describe("Model RemoveSales, deve remover do database um item", () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves();
    });
    after(() => {
      connection.execute.restore();
    });
    it("Deve excluir com sucesso o item do banco de dados", async () => {
      const products = await salesModel.removeSales(1);
      expect(products).to.be.equal(undefined);
    });
  });
});