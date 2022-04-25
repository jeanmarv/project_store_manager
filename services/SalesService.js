const salesModel = require('../models/SalesModel');

const getAll = async () => {
  const product = await salesModel.getAll();
  return product;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  return product;
};

const postSale = async (sales) => {
  const createID = await salesModel.createID();
  sales.forEach(async (sale) => {
    await salesModel.postSale(createID, sale);
  });
  return {
    id: createID,
    itemsSold: sales,
  };
};

module.exports = {
  getAll,
  getById,
  postSale,
};