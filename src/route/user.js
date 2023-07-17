const express = require('express');
const route = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('../middleware/jwt');
const hashPasswordMiddleware = require('../middleware/bcryptjs');
const UserController = require('../controller/ControllerUser.js');

route.get('/', jwt.VertifikasiToken, UserController.GetAllUser);
route.get('/:id', UserController.GetAllUserById);
route.post('/', hashPasswordMiddleware, jwt.generateToken, UserController.CreateDataUser);
route.put('/:id', UserController.UpdateUser);
route.delete('/:id', UserController.DeleteUser);
module.exports = route;
