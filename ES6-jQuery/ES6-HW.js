// ES5 string concat
var name = 'Michael';
var favoriteColor = 'purple';
var city = 'San Francisco';

console.log(
  name +
    ' lives in ' +
    city +
    ' and his favorite color is ' +
    favoriteColor +
    '.'
);

// ES6 template literal
var name = 'Michael';
var favoriteColor = 'purple';
var city = 'San Francisco';

console.log(
  '${name} lives in ${city} and his favorite color is ${favoriteColor}'
);

// ES5 global constants
var PI = 3.14;
PI = 42; // stop me from doing this!

// ES6 constants
const PI = 3.14;

// ES5 assigning Variables to Object properties
var obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };
  
  var a = obj.numbers.a;
  var b = obj.numbers.b;

// ES6 Object Destructuring


// ES5 Array Swap

var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;

// ES6 One-Line Array Swap with Destructuring


// ES5 Map Callback

function double(arr) {
    return arr.map(function(val) {
      return val * 2;
    });
  }

//ES6 Map Callback Shorthand

function double(arr) {
    return arr.map((val, idx) => {
        return val * 2;
    });
}

// ES5 Default Arguments
function add(a, b) {
    if (a === 0) {
      a = 0;
    } else {
      a = a || 10;
    }
    if (b === 0) {
      b = 0;
    } else {
      b = b || 10;
    }
    return a + b;
  }

// ES6 Default Arguments

function add(a = 10, b = 10) {
  return a + b
}

// ES5 Function that takes a variable number of arguments

function sumMany() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.reduce(function(a, b) {
      return a + b;
    }, 0);
}

// ES6 Function that takes a variable number of arguments

function sumMany(...theArgs) {
    var nums = Array.prototype.slice.call(theArgs);
    return nums.reduce(function(a, b) {
      return a + b;
    }, 0);
}