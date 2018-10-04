// destructuring Client function from pg
const { Client } = require('pg');

let dbName = 'companies-db';
if (process.env.NODE_ENV === 'test') {
  dbName = 'companies-db-test';
}
const client = new Client({
  connectionString: `postgresql://localhost/${dbName}`
});

// connect to the actual db
client.connect();

module.exports = client;
