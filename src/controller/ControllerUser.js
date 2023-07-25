const userModel = require('../models/user');
const ValidasiUser = require('../validasi/validasiUser');
const hashPasswordMiddleware = require('../middleware/bcryptjs');
const { pool } = require('../config/db');
//======================== JWT COMPONEN=================
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey123';
//========================= Import
//======
//=====
// ============== GET DATA===================
const GetAllUser = async (req, res) => {
  try {
    const result = await userModel.GetDataUser();
    const users = result.rows;
    res.status(200).json({
      message: 'View Get All Data',
      success: true,
      error: null,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: ' Data Not Yet',
      success: false,
      error: error,
      data: null,
    });
  }
};
//================ GET BY ID=================
const GetAllUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.GetDataUserById(id);
    const user = result.rows[0];

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Data Profile',
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving user data',
      success: false,
      error: error.message,
      data: null,
    });
  }
};
//================ POST DATA=================
const CreateDataUser = async (req, res, next) => {
  const bodyquery = req.body;
  const password = req.body.password;
  console.log(password);

  try {
    await userModel.CreateDatauser(bodyquery);
    res.status(201).json({
      message: ' CREATE DATA SECCUES',
      success: true,
      error: null,
      data: bodyquery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: ' CREATE DATA ERROR',
      success: false,
      error: error,
      data: null,
    });
  }
};
//================= UPDATE DATA===============
const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    await userModel.UpdateUserById(id, newData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
      data: null,
    });
  }
};
//================== Delete Data==============
const DeleteUser = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    await userModel.DeleteUserById(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

//================== Login ===================

const LoginUserController = async (req, res) => {
  console.log('ariyanda');
  const bodyquery = req.body;
  console.log(bodyquery);
  console.log('ariyanda');
  const password = req.body.password;
  const username = req.body.username;
  // const LoginUserQuerySql = 'SELECT * FROM users WHERE username = $1';

  const validateUser = await ValidasiUser.LoginUserwithAuth1(username, password);

  // console.log(user);

  if (!validateUser) {
    return res.status(400).json({
      success: false,
      message: 'login failed',
      data: null,
    });
  }

  try {
    await userModel.LoginUserwithAuth(bodyquery);

    //================================

    const LoginUserQuerySql = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    console.log(LoginUserQuerySql);

    const result = await pool.query(LoginUserQuerySql, values);

    const user = result.rows[0];

    console.log(user);

    //==============================

    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Login Data Succes',
      success: true,
      error: null,
      username: bodyquery,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: ' Login Error ',
      success: false,
      error: error.message,
      data: null,
    });
  }
};

//================ EXPORT DATA==================
module.exports = {
  GetAllUser,
  CreateDataUser,
  UpdateUser,
  DeleteUser,
  GetAllUserById,
  LoginUserController,
};
