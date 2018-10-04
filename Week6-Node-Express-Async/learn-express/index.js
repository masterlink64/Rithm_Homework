// npm install locus
// eval(require('locus')); where ever you want to debug or set a breakpoint in the terminal

// need to require it!
const express = require('express');

// result of the express module!
const app = express();

// a route handler, listener to '/'
// app.get
// app.post
// app.patch etc

// can take 3 params
app.get('/', function (request, response) {
  // can only send back one response for one request
  // return is not required but SHOULD use
  return response.send('Hello World!');
})

// make another route
// This one is a GET/person
// it should repsond with your first name 
// localhost:3000/person --> 'Steve'
app.get('/person', (request, response) => {
  eval(require('locus')); // like a break point
  return response.send('Steve');
});

// another route should get /person/:firstName
app.get('/person/:firstName', function (request, response) {
  // request.params.VARIABLE
  return response.send(request.params.firstName);
});

// localhost:3000/person/elie --> 'elie'
// localhost:3000/person/steve --> 'steve'

app.get('/explore', function (request, response) {
  console.log('Query String!', request.query);
  // if you don't respod then your browser will hang
  return response.send('All done!');
});

// https:/localhost

// reserach a module called locus

app.listen(3000, function () {
  // port is where you open up traffic
  // a number you reserve for communication for specific traffic
  console.log('Server starting!');
})

