"use strict";

const $cupcakeList = $("#cupcakes-list");
const $form = $("#cupcake-form");
const $deletebtn = $(".delete-cc");


/** Generate HTML markup for each cupcake  */
function generateCupcakeHTML(cupcake){

    const $cupcake = $("<li>");
    $cupcake.addClass("list-group-item cc-item");

    $cupcake.html(`<div data-cc-id="${cupcake.id}"
                  class="d-flex justify-content-around align-items-center cc">
                  <img src="${cupcake.image}" class="cupcake-img"> Flavor:${cupcake.flavor} Rating: ${cupcake.rating} Size: ${cupcake.size}
                  <button class="delete-cc btn btn-outline-danger">Delete Cupcake</button>
                  </div>`
                  );

    return $cupcake;
  }


/** Given a list of cupcakes, generate HTML and append each to the DOM  */
async function displayCupcakes(cupcakes) {
    console.debug("displayCupcakes");

    cupcakes.forEach(c => {
      const cc = generateCupcakeHTML(c);
      $cupcakeList.append(cc);
    })
  }


/** Retrieve cupcake list from database and display on page */
async function getAndDisplayCupcakes(){
    $cupcakeList.empty();
    const cupcakes = await getCupcakes();
    displayCupcakes(cupcakes);
}


// Get cupcake data and display on page load
getAndDisplayCupcakes();



$form.on("submit", async function (evt) {
    evt.preventDefault();
    await new_cupcake();
    await getAndDisplayCupcakes();
    $form.trigger("reset")
});

$cupcakeList.on("click", ".delete-cc", delete_cupcake)
