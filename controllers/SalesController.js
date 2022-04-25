const salesService = require('../services/SalesService');

const getAll = async (req, res) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
  const { id } = req.params;
    const sales = await salesService.getById(id);
    if (sales.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sales);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  getById,
};