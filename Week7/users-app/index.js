const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');

// order matters here, will need to body-parser middleware before connecting to routes
// great for ALL AJAX req
//app.use(bodyParser.urlencoded({ extended: true }));
// great for httpie/postman/SOME AJAX req
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/users', userRoutes);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.listen(3000, () => {
  console.log('server starting on port 3000!');
});
