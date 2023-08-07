"use strict";

const BASE_URL = "http://numbersapi.com"

/**
 * Makes call for single fact from NumbersAPI and appends fact to page
 * Accepts: one number
 */
async function getFavNumberFact(num){

  let resp = await axios({
    method: "GET",
    url: `${BASE_URL}/${num}`,
    headers: {"content-type": "application/json"}
  })

  const fact = resp.data;

  $(".single-fact").append(`<p>${fact}</p>`);
}


/**
 * Makes call for batch of facts from NumbersAPI and appends facts to page
 * Accepts: min, max numbers
 */
async function getBatchFacts(min, max){

  let resp = await axios({
    method: "GET",
    url: `${BASE_URL}/${min}..${max}`,
    headers: {"content-type": "application/json"}
  })

  const factsBatch = resp.data;

  for (let key in factsBatch){
    $(".multiple-facts").append(`<p>${factsBatch[key]}</p>`)
  }
}

/**
 * Makes four calls to NumbersAPI and appends facts to page
 * Accepts: one number
 */
async function getFourFacts(num){

  const f1 = axios({
    method: "GET",
    url: `${BASE_URL}/${num}`,
    headers: {"content-type": "application/json"}
  })

  const f2 = axios({
    method: "GET",
    url: `${BASE_URL}/${num}`,
    headers: {"content-type": "application/json"}
  })

  const f3 = axios({
    method: "GET",
    url: `${BASE_URL}/${num}`,
    headers: {"content-type": "application/json"}
  })

  const f4 = axios({
    method: "GET",
    url: `${BASE_URL}/${num}`,
    headers: {"content-type": "application/json"}
  })

  const resolvedPromises = await Promise.allSettled([f1, f2, f3, f4]);
  //Promise.all => this will give all or none promises depending on them all succeeding

  for (let result of resolvedPromises){
       $(".four-facts").append(`<p>${result.value.data}</p>`)
      console.log(result);
    }
}

/**
 * Calls API functions and displays results on page.
 */
async function displayFacts(){

await getFavNumberFact(11);
await getBatchFacts(5,8);
await getFourFacts(7);

}

displayFacts();




