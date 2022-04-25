const express = require('express');
const salesController = require('../controllers/SalesController');

const routes = express.Router();

routes.get('/', salesController.getAll);

routes.get('/:id', salesController.getById);

module.exports = routes;
