const This = require('./one')();

const is = require('./one/two/test');

const how = require('./one/three').word;

const { we } = require('./four/thing');

const Do = require('./four/five')[0];

const it = require('./four/five/six').it();

console.log(This + is + how + we + Do + it);
