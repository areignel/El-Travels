const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'eltravels',
  password: 'eltravels',
  database: 'eltravels',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create a table for destinations
db.query(`
  CREATE TABLE IF NOT EXISTS destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
    -- Add more fields as needed
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating destinations table:', err);
    return;
  }
  console.log('Destinations table created');
});

// Now you can use SQL queries to interact with the 'destinations' table in MySQL

