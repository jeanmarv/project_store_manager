const productModel = require('../models/ProductModel');
const validateQuantity = require('./ValidateQuantity');

const updateQuantity = async (id, quantity) => {
  const product = await productModel.getById(id);
  const newQuantity = product.quantity - quantity;
  await validateQuantity.validateQuantity(id, newQuantity);
};

module.exports = {
  updateQuantity,
};