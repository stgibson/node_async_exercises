const BASE_URL = "http://numbersapi.com";
const FAVORITE_NUM = 7;

// get a fact on my favorite number
axios.get(`${BASE_URL}/${FAVORITE_NUM}?json`)
  .then(res => console.log(res.data.text))
  .catch(err => console.log(err));

// get facts on multiple numbers with 1 request
axios.get(`${BASE_URL}/${FAVORITE_NUM},42?json`)
  .then(res => {
    const $numFactsList = $("#mult-nums-facts");
    const numFacts = res.data;
    for (let num in numFacts) {
      const $numFactListItem = $(`<li>${numFacts[num]}</li>`);
      $numFactsList.append($numFactListItem);
    }
  })
  .catch(err => console.log(err));

// get 4 facts on my favorite number
const NUM_OF_FACTS = 4;
const $numFactsList = $("#mult-facts-fav-num");
for (let i = 0; i < NUM_OF_FACTS; i++) {
  axios.get(`${BASE_URL}/${FAVORITE_NUM}?json`)
    .then(res => {
      const numFact = res.data.text;
      const $numFactListItem = $(`<li>${numFact}</li>`);
      $numFactsList.append($numFactListItem);
    })
    .catch(err => console.log(err));
}