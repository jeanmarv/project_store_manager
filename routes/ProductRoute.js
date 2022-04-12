const express = require('express');
const productControl = require('../controllers/ProductController');

const routes = express.Router();

routes.get('/', productControl.getAll);

routes.get('/:id', productControl.getById);

module.exports = routes;
