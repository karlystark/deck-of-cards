"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck"
const CURR_DECK = getDeck()



class Deck {
  constructor(){
    this.deckID = this.getDeck()
  }

  static async getDeck() {

    const resp = await axios({
      method: "GET",
      url: `${BASE_URL}/new/shuffle/?deck_count=1`
    });

    const deckID = resp.data.deck_id;

    return deckID;
  }

}

const deck = new Deck()


// async function getDeck() {

//   const resp = await axios({
//     method: "GET",
//     url: `${BASE_URL}/new/shuffle/?deck_count=1`
//   });

//   const deckID = resp.data.deck_id;

//   return deckID;
// }


// async function drawCard() {

//   const resp = await axios({
//     method: "GET",
//     url: `${BASE_URL}/${CURR_DECK}/draw/?count=1`
//   });


//   console.log(resp.data)
// }