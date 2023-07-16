const { pool } = require('../config/db');

const CreateDatauser = (body) => {
  const querySQL = `INSERT INTO users (username, password) VALUES ('${body.password}','${body.username}')`;

  return pool.query(querySQL);
};

const GetDataUser = () => {
  const querySQLGet = 'SELECT * FROM users';

  return pool.query(querySQLGet);
};

const GetDataUserById = (id) => {
  const querySQL = 'SELECT * FROM users WHERE id = $1';
  const values = [id];

  return pool.query(querySQL, values);
};

const UpdateUserById = async (id, newData) => {
  const querySQL = 'UPDATE users SET username = $1, password = $2 WHERE id = $3';
  const values = [newData.username, newData.password, id];

  return pool.query(querySQL, values);
};

const DeleteUserById = async (id) => {
  const querySQL = 'DELETE FROM users WHERE id = $1';
  const values = [id];

  return pool.query(querySQL, values);
};

module.exports = {
  CreateDatauser,
  GetDataUser,
  GetDataUserById,
  UpdateUserById,
  DeleteUserById,
};
