Async Conceptual Warmup

Questions
What does asynchronous mean?
 - it means that you move on to another task while you wait for another to finish executing, preventing blocking.
 - allows a single threaded program like JS to look like it is doing multiple things at once 
What is a callback function?
- a function that is passed to another fucntion

What is a promise?
- a promise is a gurantee that a function will be resolved either way, can fail
- a one-time guarantee of a future value!


Rewrite this "callback-style" AJAX call to use the Promises API

function popUpFact() {
  $.getJSON('http://numbersapi.com/42?json', function(fact) {
    alert(fact.text);
  });
}
Change your solution so that it gets facts for two different numbers, requesting both at once, but only popping up the alert once the server has responded to both.

What does "resolve" mean?

What does "reject" mean?

What is the difference between an async function and a regular function?

Rewrite the above popUpFact function to use async / await

What does Promise.all do?

What does the following function do?

// you can assume that jQuery has been loaded
function getUserData(username) {
  return $.getJSON(`https://api.github.com/users/${username}`);
}