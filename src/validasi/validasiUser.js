const { check } = require('express-validator');
const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

const ValidasiPasswordUser = (password, req, res) => {
  const min_pass = 6;
  if (password.length < min_pass) {
    return false;
  }

  return true;
};

const LoginUserwithAuth1 = async (username, password, next) => {
  console.log(username);
  const LoginUserQuerySql = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  const result = await pool.query(LoginUserQuerySql, values);

  const user = result.rows[0];

  if (!user) {
    throw new Error('Username atau password salah');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  return passwordMatch;
};

const validasiEmail = [check('email').trim().notEmpty().withMessage('Email cannot be empty.').isEmail().withMessage('Invalid email address.')];

module.exports = {
  LoginUserwithAuth1,
  ValidasiPasswordUser,
  validasiEmail,
};
