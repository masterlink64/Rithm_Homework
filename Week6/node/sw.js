const axios = require('axios');

// get command-line arguments from process.argv

console.log(process.argv);
let arg = process.argv[2];
// API request with axios
let validEndpoints = new Set(['planets', 'people']);

if (!validEndpoints.has(arg)) {
  console.log(arg + ' wasnt a valid endpoint');
  process.exit(1);
}

// axios adds a data key
// axios let's you
axios
  .get(`https://swapi.co/api/${arg}`)
  .then(res => console.log(res.data.count))
  .catch(err => console.log(err.res.data));
