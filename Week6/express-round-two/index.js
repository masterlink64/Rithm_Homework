const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const employeeRoutes = require('./routes/employees');

app.use(bodyParser.json());
// morgan allows us to log our request
app.use(morgan('dev'));
// can prefix all routes with something
app.use('/employees', employeeRoutes);

app.listen(3000, function() {
  console.log('server starting on port 3000');
});
