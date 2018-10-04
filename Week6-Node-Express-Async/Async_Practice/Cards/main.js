$().ready(() => {
  shuffle();
  var deckId;
  // callbacks
  // shuffle one deck
  $.getJSON(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
    deck => {
      console.log(deck.deck_id);
      let deckId = deck.deck_id;
      return $.getJSON(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
        response => {
          //console.log(response);
          //console.log(response.cards[0].value, response.cards[0].suit);
          // iterate over cards array and append whatever value
          for (let i = 0; i < response.cards.length; i++) {
            $('.cards-cb').append(
              `<p>${response.cards[i].value} of ${response.cards[i].suit}</p>`
            );
          }
        }
      );
    }
  );

  // promises
  // shuffle deck
  $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(deck => {
      let deckId = deck.deck_id;
      return $.getJSON(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
    })
    .then(card => {
      $('.cards-promises').append(
        `<p>${card.cards[0].value} of ${card.cards[0].suit}</p>`
      );
    })
    .catch(e => console.log(e));

  // async/await
  async function newCards() {
    try {
      const deck = await $.getJSON(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      );
      let deckId = deck.deck_id;
      console.log(deck);
      // event listener
      $('#draw').click(async function(event) {
        let oneCard = await $.getJSON(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
        console.log(oneCard);
        let imageUrl = oneCard.cards[0].image;
        $('.dealt').append(
          `<p>${oneCard.cards[0].value} of ${oneCard.cards[0].suit}</p>`
        );
        $('.dealt').append(`<img src=${imageUrl} alt="#">`);
      });
    } catch (e) {
      console.log(e);
    }
  }

  newCards();

  function shuffle() {
    $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(deck => {
        deckId = deck.deck_id;
      })
      .catch(e => {
        console.log(e);
      });
  }
  // add event listener to draw a card from the same deck
  // $('#draw').click(event => {
  //   $.getJSON(
  //     `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  //   ).then(card => {
  //     console.log(card.remaining);
  //     let imageUrl = card.cards[0].image;
  //     $('.dealt').append(
  //       `<p>${card.cards[0].value} of ${card.cards[0].suit}</p>`
  //     );
  //     $('.dealt').append(`<img src=${imageUrl} alt="#">`);
  //   });
  // });
});
