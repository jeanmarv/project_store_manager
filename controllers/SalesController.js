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

const postSale = async (req, res) => {
  try {
  const sales = req.body;
  const postSales = await salesService.postSale(sales);
  return res.status(201).json(postSales);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateSales = async (req, res) => {
  try {
  const sales = req.body;
  const { id } = req.params;
  const saleUp = await salesService.updateSales(id, sales);
  const findId = await salesService.getById(id);

  if (!findId) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(saleUp);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const removeSales = async (req, res) => {
  try {
  const { id } = req.params;

  const getID = await salesService.getById(id);

  if (!getID || !getID.length) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  await salesService.removeSales(id);
  return res.status(204).end();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  getById,
  postSale,
  updateSales,
  removeSales,
};