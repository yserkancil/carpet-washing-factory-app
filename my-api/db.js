const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mycarpetapp'
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL database connected');
});

module.exports = connection;
