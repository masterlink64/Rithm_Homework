// destructuring Client function from pg
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://localhost/teams-db'
});

// connects to the actual db
client.connect();

module.exports = client;
