// const { Client } = require('pg');
// const client = new Client({
//   user: 'admin',
//   host: 'localhost',
//   database: 'pijarcamp',
//   password: 'lele123',
//   port: 5432,
// });
// client.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected!');
// });

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});
pool.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});
module.exports = { pool };
