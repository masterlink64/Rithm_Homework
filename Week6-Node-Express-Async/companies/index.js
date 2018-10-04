const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// will need the actual routes from the routes folder
// relative path for each route.js file
const usersRoutes = require('./routes/users');
const companiesRoutes = require('./routes/companies');
const jobsRoutes = require('./routes/jobs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/companies', companiesRoutes);
app.use('/jobs', jobsRoutes);

// error handling
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
