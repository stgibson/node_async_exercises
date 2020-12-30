const BASE_URL = "https://pokeapi.co/api/v2";
const NUM_OF_POKEMON = 1118;

// get all names and urls
const pokemonNames = [];
axios.get(`${BASE_URL}/pokemon?limit=${NUM_OF_POKEMON}`)
  .then(res => {
    const namesAndUrls = res.data.results;

    // make requests for 3 random pokemon
    const promises = [];
    for (let i = 0; i < 3; i++) {
      const randNum = Math.floor(Math.random() * NUM_OF_POKEMON);
      promises.push(axios.get(namesAndUrls[randNum].url));
    }
    return Promise.all(promises);
  })
  // make requests for data on the species
  .then(responses => {
    const promises = [];
    for (let response of responses) {
      pokemonNames.push(response.data.name);
      promises.push(axios.get(response.data.species.url));
    }
    return Promise.all(promises);
  })
  .then(responses => {
    const descriptions = [];
    for (let response of responses) {
      if (response.data.flavor_text_entries &&
        response.data.flavor_text_entries.length > 0) {
          descriptions.push(response.data.flavor_text_entries[0].flavor_text);   
        }
      else {
        descriptions.push("");
      }
    }
    for (let i = 0; i < 3; i++) {
      console.log(`${pokemonNames[i]}: ${descriptions[i]}`);
    }
  })
  .catch(err => console.log(err));