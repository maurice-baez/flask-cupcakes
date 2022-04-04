"use strict"

const BASE_API_URL = "http://localhost:5001/api/"

const $cupcakeList = $("#cupcakes-list")

async function getCupcakes(){
  console.debug("getCupcakes");
  const response = await axios.get(`${BASE_API_URL}cupcakes`);

  return response.data.cupcakes;
}










function generateCupcakeHTML(cupcake){

  const $cupcake = $("<li>");

  $cupcake.html(`<div class="row">
                 <img src="${cupcake.image}" class="col-6 cupcake-img">

                 <span class="col-2">${cupcake.flavor}</span>
                 <span class="col-2">${cupcake.rating}</span>
                 <span class="col-2">${cupcake.size}</span>

                </div>`
                 );

  return $cupcake;
}




async function displayCupcakes() {
  console.debug("displayCupcakes");

  const cupcakes = await getCupcakes();

  for(let cupcake of cupcakes){

   let cc = generateCupcakeHTML(cupcake);

    $cupcakeList.append(cc);
  }
}

displayCupcakes();