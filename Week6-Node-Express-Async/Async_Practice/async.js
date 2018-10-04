// Async Conceptual Warmup

// Questions
// What does asynchronous mean?
//  - it means that you move on to another task while you wait for another to finish executing, preventing blocking.
//  - allows a single threaded program like JS to look like it is doing multiple things at once 
// - 
// What is a callback function?
// - a function that is passed to another fucntion
// - HoF

// What is a promise?
// - a promise is a gurantee that a function will be resolved either way, can fail
// - a one-time guarantee of a future value!
// - global object


// Rewrite this "callback-style" AJAX call to use the Promises API

// function popUpFact() {
//   $.getJSON('http://numbersapi.com/42?json', function(fact) {
//     alert(fact.text);
//   });
// }
// with promise
function popUpFact() {
  $.getJSON('http://numbersapi.com/42?json')
    .then(fact => {
      alert(fact.text);
    }).catch(e => {
      console.log(e)
    });
}

function popUpTwoFacts() {
  $.getJSON('http://numbersapi.com/42?json')
    .then(fact => {
      alert(fact.text);
      return $.getJSON('http://numbersapi.com/30?json');
    })
    .then(fact => {
      alert(fact.text);
    })
    .catch(e => {
      console.log(e)
    });
}

// Change your solution so that it gets facts for two different numbers, requesting both at once, but only popping up the alert once the server has responded to both.

// What does "resolve" mean?
// it means the promise has either been fulfilled or rejected
// then function of the promised will be called
// goes to .then

// What does "reject" mean?
// it means the request threw an error somehow
// catch functino of the promise object will be called.
// anything bad happens
// goes to .catch

// What is the difference between an async function and a regular function?
// an async function will be placed in the event queue when it is resolved regular function is only placed in the call stack
// and regular function will execute first
// async returns resolved promise implicitly, can use await keyword

// Rewrite the above popUpFact function to use async / await
async function popUpFact2() {
  const response = await $.getJSON('http://numbersapi.com/42?json');
  alert(response.text);
}

// What does Promise.all do?
// will will wait for multiple promises to resolve with Promise.all
// it accepts an ARRAY of promises and returns a new promise to you that will resolve only after each 
// promise in the array has resolved.
// if one promise is rejected all of them will get rejected

// What does the following function do?

// // you can assume that jQuery has been loaded
function getUserData(username) {
  return $.getJSON(`https://api.github.com/users/${username}`);
}
// this function will send an AJAX request with the username of whoever that is passed into the parameter