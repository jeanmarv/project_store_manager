const salesModel = require('../models/SalesModel');

const getAll = async () => {
  const product = await salesModel.getAll();
  return product;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  return product;
};

module.exports = {
  getAll,
  getById,
};