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
 * Creates an HTML playing card for display
 * @param {string} value The value of the card
 * @param {string} suit The suit of the card
 * @return {string} HTML for playing card
 */
function generateCard(value, suit) {
  // get char that represents value
  switch(value) {
    case "JACK":
      value = "j";
      break;
    case "QUEEN":
      value = "q";
      break;
    case "KING":
      value = "k";
      break;
    case "ACE":
      value = "a";
      break;
    default:
      value = value;
      break;
  }
  // get string for representing suit in HTML
  switch(suit) {
    case "DIAMONDS":
      suit = "diams";
      break;
    default:
      suit = suit.toLowerCase();
      break;
  }

  return `
    <div class="card rank-${value} ${suit}">
      <span class="rank">${value.toUpperCase()}</span>
      <span class="suit">&${suit};</span>
    </div>
  `
}

/**
 * Draws a card from deck with id deckId
 */
function drawCard() {
  axios.get(`${BASE_URL}/${deckId}/draw/?count=1`)
    .then(res => {
      value = res.data.cards[0].value;
      suit = res.data.cards[0].suit;
      const $newCard = $(`<li>${generateCard(value, suit)}</li>`);
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