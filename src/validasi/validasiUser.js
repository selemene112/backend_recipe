const { check } = require('express-validator');
const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

const ValidasiPasswordUser = (password) => {
  const min_pass = 6;
  return password.length > min_pass;
};

const LoginUserwithAuth1 = async (username, password) => {
  console.log(username);

  const LoginUserQuerySql = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  console.log(LoginUserQuerySql);

  const result = await pool.query(LoginUserQuerySql, values);

  const user = result.rows[0];

  // const payload = user
  // console.log(user);

  if (!user) {
    throw new Error('Username atau password salah');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch);
  console.log(password);

  return passwordMatch;
};

module.exports = {
  LoginUserwithAuth1,
  ValidasiPasswordUser,
};
