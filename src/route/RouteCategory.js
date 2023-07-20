const express = require('express');
const routeController = express.Router();

const ControllerCategory = require('../controller/ControllerCategory');

routeController.get('/', ControllerCategory.GetControllerCategory);

module.exports = routeController;
