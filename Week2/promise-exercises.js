// 1) 
$.getJSON('https://swapi.co/api/')
  .then(responseData => {
    console.log(responseData);
  })
  .catch(error => console.log(error));

// 2)
// maybe use promise all?
// array of promises
// each promise will console log film-director
// using the console so I will use var
// var filmsPromises = [];
// // loop through ...args of results?
// // how do we do this if there are unknown amount of films?
// for (var i = 0; i < 7; i++) {
//     filmsPromises.push(
//         $.getJSON('https://swapi.co/api/films/')
//     );
// }
// promise all?
// Promise.all(filmsPromises)
//     .then(film => {
//         film.forEach(f => {
//             var title = f.results[0].title;
//             var director = f.results[0].director;
//             console.log(`${title}-${director}`);
//     })
//   })
//   .catch(err => console.log(err));
// DONT need promise all

$.getJSON('https://swapi.co/api/films/')
  .then(function (response) {
    return response.results.forEach(function (el) {
      var title = el.title;
      var director = el.director;
      console.log(`${title}-${director}`);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

// 3) 
// 1 AJAX request
// 2 use promise all for all the diff AJAX request of the names of residents

$.getJSON('https://swapi.co/api/planets/1')
  .then(planet => {
    var residentArr = [];
    var residents = planet.residents
    // what if array is unknown length?
    for (var i = 0; i < residents.length; i++) {
      residentArr.push(
        $.getJSON(residents[i])
      );
    }
    return Promise.all(residentArr)
  })
  .then(residents => {
    // residents is now an ARRAY
    residents.forEach(res => {
      console.log(res.name);
    })
  })
  .catch(err => console.log(err));

// 4) 
// promise race
// need to make an array of promises, in this case only two ppl so don't have to loop
var twoPeople = [$.getJSON('https://swapi.co/api/people/1'), $.getJSON('https://swapi.co/api/people/4')];

Promise.race(twoPeople)
  .then(person => {
    var name = person.name
    if (name === 'Luke Skywalker') {
      console.log(`${name} has saved the universe!!!`)
    } else {
      // or use throw error
      throw new Error('Darth Vader has taken over the universe.')
    }
  })
  .catch(err => console.log(err));


