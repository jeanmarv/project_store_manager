// const productModel = require('../models/ProductModel');
const productService = require('../services/ProductService');

const getAll = async (req, res) => {
  try {
    const product = await productService.getAll();
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
  const { id } = req.params;
    const product = await productService.getById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  getById,
};