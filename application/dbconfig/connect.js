const mysql = require('mysql2');


exports.pool = mysql.createPool({
    host: 'localhost',
  user: 'root',
  database: 'application',
  password:'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
