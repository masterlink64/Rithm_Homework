// destructuring Client function from pg
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://localhost/companies-db'
});

// connect to the actual db
client.connect();

module.exports = client;
