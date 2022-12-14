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

const registerProduct = async (name) => {
  const product = await productModel.registerProduct(name);
  return product;
};

const updateProducts = async (id, { name, quantity }) => {
  const product = await productModel.updateProducts(id, { name, quantity });
  return product;
};

const removeProduct = async (id) => {
  await productModel.removeProduct(id);
};

module.exports = {
  getAll,
  getById,
  postProduct,
  registerProduct,
  updateProducts,
  removeProduct,
};