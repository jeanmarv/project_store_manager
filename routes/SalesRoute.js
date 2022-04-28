const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/SalesController');
const validateSales = require('../middlewares/ValidateSales');
const validateQuantity = require('../externals/Validation');

const routes = express.Router();

routes.get('/', salesController.getAll);

routes.get('/:id', salesController.getById);

routes.post('/', validateSales.validateProductID,
validateSales.validateQuantity,
rescue(validateQuantity.availability),
salesController.postSale);

routes.put('/:id', validateSales.validateProductID,
validateSales.validateQuantity,
rescue(validateQuantity.availability),
salesController.updateSales);

routes.delete('/:id', salesController.removeSales);

module.exports = routes;
