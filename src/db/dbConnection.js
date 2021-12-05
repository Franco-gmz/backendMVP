const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('CREATE TABLE [IF NOT EXISTS] projects (id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,start DATE NOT NULL,finish DATE NOT NULL,name VARCHAR(20) NOT NULL,description VARCHAR(50) NOT NULL,leader INT UNSIGNED,state VARCHAR(15) NOT NULL);', (err, res) => {
  if (err) console.log(err.code);
  else console.log("Projects created");
})

module.exports = connection;
/*var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'password',
  database : 'psa',
  port: '3306'
});
 
connection.connect();

module.exports = connection;*/
