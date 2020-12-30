const BASE_URL = "https://deckofcardsapi.com/api/deck";

// get 1 card from a newly shuffled deck and get another card from same deck
let value1;
let suit1;
axios.get(`${BASE_URL}/new/draw/?count=1`)
  .then(res => {
    value1 = res.data.cards[0].value;
    suit1 = res.data.cards[0].suit;
    const deckId = res.data.deck_id;
    return axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
  })
  .then(res => {
    const value2 = res.data.cards[0].value;
    const suit2 = res.data.cards[0].suit;
    console.log(`${value1.toLowerCase()} of ${suit1.toLowerCase()}`);
    console.log(`${value2.toLowerCase()} of ${suit2.toLowerCase()}`);
  })
  .catch(err => console.log(err));

// create a new deck for user to draw from by clicking the button
let deckId;

/**
 * Draws a card from deck with id deckId
 */
function drawCard() {
  axios.get(`${BASE_URL}/${deckId}/draw/?count=1`)
    .then(res => {
      const $newCard = $(`<img src="${res.data.cards[0].image}">`);
      $("#cards").append($newCard);
    })
    .catch(err => console.log(err));
}

$(() => {
  axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
    .then(res => {
      deckId = res.data.deck_id;
      // set event listener now since deck ready to use
      $("#btn-draw-card").on("click", drawCard);
    })
    .catch(err => console.log(err));
})