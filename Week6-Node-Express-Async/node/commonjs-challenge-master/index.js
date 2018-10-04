const one = require('./one');
const two = require('./one/two/test.js');
const three = require('./one/three');
const four = require('./four/thing.js');
const five = require('./four/five');
const six = require('./four/five/six');

console.log(one() + two + three.word + four.we + five[0] + six.it());
