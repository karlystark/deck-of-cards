"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck"
let deckID;

/*
** Fetch shuffled deck from API and set deckID
*/
async function fetchAndSetDeck() {

  const resp = await axios({
    method: "GET",
    url: `${BASE_URL}/new/shuffle/?deck_count=1`
  });

  deckID = resp.data.deck_id;

}

/*
** Call API to pull a single card, append card to canvas and apply transforms
** to each card. If deck empty, display refresh message.
*/
async function pullSingleCard() {

  const resp = await axios({
    method: "GET",
    url: `${BASE_URL}/${deckID}/draw/?count=1`
  });

  const cardImg = resp.data.cards[0].image;
  const cardSuit = resp.data.cards[0].suit;
  const cardValue = resp.data.cards[0].value;

  const randRotation = Math.floor(Math.random() * 100) -50;
  const randTranslate = Math.floor(Math.random() * 50) - 25;

  $(".card-canvas").append(
    $("<img>", {
      src: cardImg,
      css: { transform:
      `rotate(${randRotation}deg)
      translateY(${randTranslate}px)
      translateX(${randTranslate}px)`},
      alt: `${cardValue} of ${cardSuit}`,
      class: "card"
    }));

  if (resp.data.remaining === 0) {
     $(".draw-card-btn").text("REFRESH TO SHUFFLE DECK");
  }

}

/*
** Await fetchAndSetDeck at start.
*/
async function start(){
  await fetchAndSetDeck();
}


$(".draw-card-btn").on("click", pullSingleCard);

start();



/* code from previous exercises:

// async function pullTwoCards(){

//   //await fetchAndSetDeck();

//   const card1 =  axios({
//     method: "GET",
//     url: `${BASE_URL}/${deckID}/draw/?count=1`
//   });

//   const card2 = axios({
//     method: "GET",
//     url: `${BASE_URL}/${deckID}/draw/?count=1`
//   });

//   const resolvedPromises = await Promise.allSettled([card1, card2]);
//   console.log(resolvedPromises);

//    for(let card of resolvedPromises){
//      console.log(
//       `${card.value.data.cards[0].value} of ${card.value.data.cards[0].suit}`
//     );
//    }
// }

*/


