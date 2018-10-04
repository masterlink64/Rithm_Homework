$().ready(() => {
  // callbacks
  $.getJSON('http://numbersapi.com/8/trivia?json', number => {
    // number.text for trivia
    $('.trivia-list-cb').append(`<li> ${number.text} </li>`);
    return $.getJSON('http://numbersapi.com/7/trivia?json', number => {
      $('.trivia-list-cb').append(`<li> ${number.text} </li>`);
      return $.getJSON('http://numbersapi.com/1/trivia?json', number => {
        $('.trivia-list-cb').append(`<li> ${number.text} </li>`);
      });
    });
  });

  $.getJSON(`http://numbersapi.com/4,5,6/trivia?json`, data => {
    for (let key in data) {
      $('.nums').append(`<li> ${data[key].text} </li>`);
    }
  });

  // with ajax promises
  $.getJSON('http://numbersapi.com/8/trivia?json')
    .then(number => {
      $('.trivia-ajax').append(`<li> ${number.text} </li>`);
      return $.getJSON('http://numbersapi.com/8/trivia?json');
    })
    .then(number => {
      $('.trivia-ajax').append(`<li> ${number.text} </li>`);
      return $.getJSON('http://numbersapi.com/8/trivia?json');
    })
    .then(number => {
      $('.trivia-ajax').append(`<li> ${number.text} </li>`);
      return $.getJSON('http://numbersapi.com/8/trivia?json');
    })
    .then(number => {
      $('.trivia-ajax').append(`<li> ${number.text} </li>`);
      return $.getJSON('http://numbersapi.com/8/trivia?json');
    })
    .catch(error => console.log(error));
});
