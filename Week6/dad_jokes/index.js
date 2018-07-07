const fs = require('fs');
const axios = require('axios');
let term = process.argv[2];

// print first joke
axios
  .get(`https://icanhazdadjoke.com/search?term=${term}`, {
    headers: { Accept: 'application/json' }
  })
  .then(res => {
    if (res.data.results.length === 0) {
      console.log('no jokes found here!');
    } else {
      console.log(res.data.results[0].joke);
    }
  })
  .catch(err => console.log(err));

// print random joke
axios
  .get(`https://icanhazdadjoke.com/search?term=${term}`, {
    headers: { Accept: 'application/json' }
  })
  .then(res => {
    // random joke
    let jokesArr = res.data.results;
    let joke = jokesArr[Math.floor(Math.random() * jokesArr.length)];
    if (jokesArr.length === 0) {
      console.log('Uh oh! No jokes were found!');
    } else {
      console.log(joke.joke);
    }
  })
  .catch(err => console.log(err));
