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

client.query('CREATE TABLE [IF NOT EXISTS] tasks (id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,name VARCHAR(20) NOT NULL,description VARCHAR(50) NOT NULL,state VARCHAR(15) NOT NULL,id_project INT UNSIGNED NOT NULL);', (err, res) => {
  if (err) console.log(err.code);
  else console.log("Tasks created");
})

client.query('CREATE TABLE [IF NOT EXISTS] project_teams (id_project INT UNSIGNED,id_employee INT UNSIGNED,PRIMARY KEY (id_project, id_employee));', (err, res) => {
  if (err) console.log(err.code);
  else console.log("project_teams created");
})

client.query('CREATE TABLE [IF NOT EXISTS] task_teams (id_task INT UNSIGNED,id_employee INT UNSIGNED,PRIMARY KEY (id_task, id_employee));', (err, res) => {
  if (err) console.log(err.code);
  else console.log("task_teams created");
})





module.exports = client;

