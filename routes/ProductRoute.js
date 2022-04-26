const express = require('express');
const productControl = require('../controllers/ProductController');
const validation = require('../middlewares/ValidateProducts');

const routes = express.Router();

routes.get('/', productControl.getAll);

routes.get('/:id', productControl.getById);

routes.post('/', validation.validateName,
validation.validateQuantity,
productControl.postProduct);

routes.put('/:id', validation.validateName,
validation.validateQuantity,
productControl.updateProducts);

module.exports = routes;
