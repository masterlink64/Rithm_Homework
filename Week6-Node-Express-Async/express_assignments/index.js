const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');

// eval(require('locus')); for locus

// build an application for:
// mean (avg)
// median (midpt)
// mode (most freq)

// operations are invoked via route per operation
// results should be printed to a file

// nums is in query.  ?nums=1,2,3
app.get('/mean', (request, response, next) => {
  console.log('taking the average!');
  // split string into array and turn into numbers
  // handle if element passed in is NOT a number
  // with isNaN(element)
  let arrElements = request.query.nums.split(',');
  for (let el of arrElements) {
    if (isNaN(el)) {
      let nanError = new Error(`${el} is not a number`);
      nanError.status = 400;
      return next(nanError);
    }
  }

  let numsArr = request.query.nums.split(',').map(num => {
    return parseInt(num);
  });

  //eval(require('locus'));
  // eval(require('locus')); this is a debugger in the terminal
  // take the value from nums and turn into an array of numbers
  let result =
    numsArr.reduce((prev, curr) => {
      return prev + curr;
    }) / numsArr.length;
  // write/append result to a file called results.txt
  fs.appendFile(
    `results.txt`,
    // foo()
    `The mean of ${request.query.nums} is ${result}\n`,
    err => {
      // boiler plate for error
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log('MEANING');
    }
  );
  return response.send(`The mean of ${request.query.nums} is ${result}`);
});

app.get('/median', (request, response) => {
  console.log('finding the midpt');
  let numsArr = request.query.nums.split(',').map(num => {
    return parseInt(num);
  });
  let result = numsArr[Math.floor(numsArr.length / 2)];
  fs.appendFile(
    `results.txt`,
    `The median of ${request.query.nums} is ${result}\n`,
    err => {
      // boiler plate for error
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log('MEDIAN');
    }
  );
  return response.send(`The midpoint from the query string is ${result}`);
});

app.get('/mode', (request, response) => {
  console.log('finding the mode in the query string!');
  let numsArr = request.query.nums.split(',').map(num => {
    return parseInt(num);
  });
  let numCount = {};
  let freq = 0;
  let mode;
  numsArr.forEach(number => {
    numCount[number] = ++numCount[number] || 1;
  });
  //eval(require('locus'));
  // go into the obj and find key with the highest count to get mode
  for (let key in numCount) {
    if (numCount[key] > freq) {
      freq = numCount[key];
      mode = +key;
    }
  }
  fs.appendFile(
    `results.txt`,
    `The mode of ${request.query.nums} is ${mode}\n`,
    err => {
      // boiler plate for error
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log('MEDIAN');
    }
  );
  return response.send(`The mode from the query string is ${mode}`);
});

// 6) additional /results route accept get request, responds with printed
// printed contents of the results.txt file
app.get('/results', (request, response) => {
  // read the results.txt file and print it on screen
  fs.readFile('./results.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return process.exit(1);
    }
    console.log(data);
    return response.send(data);
  });
});
// need to set up which port to listen to

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err); // pass the error to the next piece of middleware
});

/* 
  error handler - for a handler with four parameters, 
  the first is assumed to be an error passed by another
  handler's "next"
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: {
      message: err.message
    }
    /*
     if we're in development mode, include stack trace (full error object)
     otherwise, it's an empty object so the user doesn't see all of that
    */
    // error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(3000, function() {
  console.log('Server starting!');
});
