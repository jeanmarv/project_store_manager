const express = require('express');
const salesController = require('../controllers/SalesController');
const validateSales = require('../middlewares/ValidateSales');

const routes = express.Router();

routes.get('/', salesController.getAll);

routes.get('/:id', salesController.getById);

routes.post('/', validateSales.validateProductID,
validateSales.validateQuantity,
salesController.postSale);

routes.put('/:id', validateSales.validateProductID,
validateSales.validateQuantity,
salesController.updateSales);

routes.delete('/:id', salesController.removeSales);

module.exports = routes;
