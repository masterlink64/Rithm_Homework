const { Client } = require('pg'); // need Client FROM pg module
const client = new Client({
  connectionString: 'postgresql://localhost/users-app-db'
});

// const pg = require('pg');
// const client = new pg.Client({
//   connectionString: 'postgresql://localhost/users-app-db'
// });

client.connect();

module.exports = client;
