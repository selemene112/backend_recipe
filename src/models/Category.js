const { pool } = require('../config/db');

const GetdataCategory = () => {
  const GetCatagorySQL = 'SELECT * FROM category';

  return pool.query(GetCatagorySQL);
};

module.exports = {
  GetdataCategory,
};
