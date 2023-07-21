const { pool } = require('../config/db');
// ========================= Create

const CreateDatauser = (body) => {
  const querySQL = `INSERT INTO users (username, password) VALUES ('${body.password}','${body.username}')`;

  return pool.query(querySQL);
};
// ========================= Get all
const GetDataUser = () => {
  const querySQLGet = 'SELECT * FROM users';

  return pool.query(querySQLGet);
};
// ========================= Get by id
const GetDataUserById = (id) => {
  const querySQL = 'SELECT * FROM users WHERE id = $1';
  const values = [id];

  return pool.query(querySQL, values);
};
// ========================= Update by id

const UpdateUserById = async (id, newData) => {
  const querySQL = 'UPDATE users SET username = $1, password = $2 WHERE id = $3';
  const values = [newData.username, newData.password, id];

  return pool.query(querySQL, values);
};

// ========================= delete by id

const DeleteUserById = async (id) => {
  const querySQL = 'DELETE FROM users WHERE id = $1';
  const values = [id];

  return pool.query(querySQL, values);
};

const LoginUserwithAuth = async (username, password) => {
  const LoginUserQuerySql = 'SELECT * FROM users WHERE username = $1 AND password = $2';
  values = [username, password];

  return pool.query(LoginUserQuerySql, values);
};

// ========================= Export
module.exports = {
  CreateDatauser,
  GetDataUser,
  GetDataUserById,
  UpdateUserById,
  DeleteUserById,
  LoginUserwithAuth,
};
