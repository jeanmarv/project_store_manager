const productModel = require('../models/ProductModel');

const validateQuantity = async (sales) => {
  const product = await productModel.getById(sales.productId);
  if (product.quantity <= sales.quantity) {
      const error = new Error('Such amount is not permitted to sell');
      error.code = 422;
      return error;
  }
  return true;
};

module.exports = {
  validateQuantity,
};