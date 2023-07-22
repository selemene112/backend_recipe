const express = require('express');
const route = express.Router();

const jwt = require('../middleware/jwt');
const hashPasswordMiddleware = require('../middleware/bcryptjs');
const UserController = require('../controller/ControllerUser.js');
const ValidasiUser = require('../validasi/validasiUser');

//============================== Route User ==============================

route.get('/', UserController.GetAllUser);
route.get('/:id', UserController.GetAllUserById);
route.post('/', UserController.CreateDataUser);
route.put('/:id', UserController.UpdateUser);
route.delete('/:id', UserController.DeleteUser);
route.post('/login', UserController.LoginUserController);

module.exports = route;
