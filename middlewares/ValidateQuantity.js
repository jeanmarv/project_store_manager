const Validate = require('../externals/Validate');

const validateQuantity = async (req, res, next) => {
  const items = req.body;
  const check = await Validate.ValidateQuantity(items);
  if (check !== true) return res.status(check.code).send({ message: check.message });
  next();
};

module.exports = {
  validateQuantity,
};