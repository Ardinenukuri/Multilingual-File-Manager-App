const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ericalivia@2004',
  database: 'multilingual_file_manager_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});


module.exports = connection;
