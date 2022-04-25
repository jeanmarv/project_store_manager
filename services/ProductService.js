const productModel = require('../models/ProductModel');

const getAll = async () => {
  const product = await productModel.getAll();
  return product;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const postProduct = async (name, quantity) => {
  const product = await productModel.postProduct(name, quantity);
  return product;
};

module.exports = {
  getAll,
  getById,
  postProduct,
};