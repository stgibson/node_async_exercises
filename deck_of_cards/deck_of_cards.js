const BASE_URL = "https://deckofcardsapi.com/api/deck";

// get 1 card from a newly shuffled deck
axios.get(`${BASE_URL}/new/draw/?count=1`)
  .then(res => {
    const value = res.data.cards[0].value;
    const suit = res.data.cards[0].suit;
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
  })
  .catch(err => console.log(err));