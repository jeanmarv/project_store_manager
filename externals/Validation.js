const productsService = require('../services/ProductService');

const availability = async (req, res, next) => {
  const [{ productId, quantity }] = req.body;

  const product = await productsService.getById(productId);

  const soma = product.quantity - quantity;

  if (quantity > product.quantity || soma <= 0) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }

  return next();
};

module.exports = {
  availability,
};