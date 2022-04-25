const validateProductID = async (req, res, next) => {
  const sales = req.body;
  const actualID = sales.every((sale) => sale.productId);

  if (!actualID) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantity = async (req, res, next) => {
  const sales = req.body;
  const lowQuantity = sales.every((sale) => sale.quantity < 1);
  const actualQuantity = sales.every((saleq) => saleq.quantity);

  if (lowQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!actualQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = {
  validateProductID,
  validateQuantity,
};