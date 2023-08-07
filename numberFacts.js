"use strict";

const BASE_URL = "http://numbersapi.com"

/**
 *
 */
async function getFavNumberFact(num){

  let resp = await axios({
    method: "GET",
    url: `${BASE_URL}/${num}`,
    headers: {"content-type": "application/json"}
  })

  $(".single-fact").text(resp.data);
}


/**
 *
 */
async function getBatchFacts(min, max){

  let resp = await axios({
    method: "GET",
    url: `${BASE_URL}/${min}..${max}`,
    headers: {"content-type": "application/json"}
  })

  for (let key in resp.data){
    $(".multiple-facts").append(`<p>${resp.data[key]}</p>`)
  }
}






