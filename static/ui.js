"use strict";

const $cupcakeList = $("#cupcakes-list");
const $form = $("#cupcake-form");

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

$form.on("submit", async function (evt) {
    evt.preventDefault();
    await new_cupcakes();
    await displayCupcakes();
});