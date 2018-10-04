$().ready(() => {
  //regular callbacks
  // 1) single request for 151 pokemon to get names and URLs
  // $.getJSON('https://pokeapi.co/api/v2/pokemon?limit=151', response => {
  //   // results[i].url or results[i].name
  //   // console.log(response.results[0].name);
  //   response.results.forEach(pokemon => {
  //     console.log(pokemon.name);
  //   });
  // });
  // #1 with async
  async function originalPokemons() {
    let pokemons = await $.getJSON(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    pokemons.results.forEach(pokemon => {
      console.log(pokemon.name);
    });
  }

  originalPokemons();

  //2 request 3 pokemon and their data
  // $.getJSON('https://pokeapi.co/api/v2/pokemon-species/3/', response => {
  //   const flavor_text = response.flavor_text_entries[1].flavor_text;
  //   console.log(flavor_text);
  //   return $.getJSON(
  //     'https://pokeapi.co/api/v2/pokemon-species/6/',
  //     response => {
  //       console.log(response.flavor_text_entries[1].flavor_text);
  //       return $.getJSON(
  //         'https://pokeapi.co/api/v2/pokemon-species/9/',
  //         response => {
  //           console.log(response.flavor_text_entries[1].flavor_text);
  //         }
  //       );
  //     }
  //   );
  // });
  //3)
  // generate 3 random pokemon
  // function to generate random number from 1-151
  // event listener on click to generate card
  let $btn = $('button');
  let $cardArea = $('#card-container');

  $btn.on('click', async () => {
    $('#test').empty();
    let randomData = await $.getJSON(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    let randomPokemonUrls = [];
    // random # generator for all the pokemon we are finding
    // will push url to array
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * randomData.results.length);
      let url = randomData.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    // to get pokemon data of each of the randomly chosen pokemon
    // use a promise all to resolve all AJAX calls
    let pokemonData = await Promise.all(
      randomPokemonUrls.map(url => $.getJSON(url))
    );
    // same thing with species data, but will need the pokemonData
    let speciesData = await Promise.all(
      pokemonData.map(p => $.getJSON(p.species.url))
    );

    speciesData.forEach((d, i) => {
      let descriptionObj = d.flavor_text_entries.find(function(entry) {
        return entry.language.name === 'en';
      });
      let description = descriptionObj ? descriptionObj.flavor_text : '';
      let name = pokemonData[i].name;
      let imgSrc = pokemonData[i].sprites.front_default;
      $('#test').append(makePokeCard(name, imgSrc, description));
    });

    function makePokeCard(name, imgSrc, description) {
      return `
      <div id='pokemon' class='col-3'>
        <div class="card">
          <h1>${name}</h1>
          <img src=${imgSrc} />
          <p>${description}</p>
        </div>
      </div>
      `;
    }
  });
});
