"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck"
let deckID;
// class Deck {
//   constructor(){
//     this.deckID = this.
//   }

// }s

async function fetchAndSetDeck() {

  const resp = await axios({
    method: "GET",
    url: `${BASE_URL}/new/shuffle/?deck_count=1`
  });

  deckID = resp.data.deck_id;

}

async function pullSingleCard() {
  //await fetchAndSetDeck();

  const resp = await axios({
    method: "GET",
    url: `${BASE_URL}/${deckID}/draw/?count=1`
  });

  const cardValue = resp.data.cards[0].value;

  //console.log(cardValue);
  const cardSuit = resp.data.cards[0].suit;
  // console.log(cardSuit);

   console.log(`${cardValue} of ${cardSuit}`);
}

async function pullTwoCards(){

  //await fetchAndSetDeck();

  const card1 =  axios({
    method: "GET",
    url: `${BASE_URL}/${deckID}/draw/?count=1`
  });

  const card2 = axios({
    method: "GET",
    url: `${BASE_URL}/${deckID}/draw/?count=1`
  });

  const resolvedPromises = await Promise.allSettled([card1, card2]);
  console.log(resolvedPromises);

   for(let card of resolvedPromises){
     console.log(
      `${card.value.data.cards[0].value} of ${card.value.data.cards[0].suit}`
    );
   }
}


