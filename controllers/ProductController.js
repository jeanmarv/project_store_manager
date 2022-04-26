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
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const postProduct = async (req, res) => {
  try {
  const { name, quantity } = req.body;

  const nameVerification = await productService.registerProduct(name);
  if (nameVerification) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  
  const postProducts = await productService.postProduct(name, quantity);
  return res.status(201).json(postProducts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateProducts = async (req, res) => {
  try {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productService.updateProducts(id, { name, quantity });
  const getByID = await productService.getById(id);

  if (!getByID) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  getById,
  postProduct,
  updateProducts,
};