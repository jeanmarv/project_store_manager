const express = require('express');
const salesController = require('../controllers/SalesController');
const validateSales = require('../middlewares/ValidateSales');
const validateQuantity = require('../middlewares/ValidateQuantity');

const routes = express.Router();

routes.get('/', salesController.getAll);

routes.get('/:id', salesController.getById);

routes.post('/', validateSales.validateProductID,
validateSales.validateQuantity,
salesController.postSale);

routes.put('/:id', validateSales.validateProductID,
validateQuantity.validateQuantity,
salesController.updateSales);

routes.delete('/:id', salesController.removeSales);

module.exports = routes;
