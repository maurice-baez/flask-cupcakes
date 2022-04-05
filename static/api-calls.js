"use strict"

const BASE_API_URL = "http://localhost:5001/api"


/** Get all cupcakes in the database */
async function getCupcakes(){
  console.debug("getCupcakes");
  const response = await axios.get(`${BASE_API_URL}/cupcakes`);

  return response.data.cupcakes;
}

/** Create a new cupcake in the database */
async function new_cupcake() {
  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image-url").val();

  await axios.post(`${BASE_API_URL}/cupcakes`,
                                    {
                                      flavor,
                                      size,
                                      rating : Number(rating),
                                      image
                                    });
}

/** Delete a cupcake from the database and clear from the DOM */
async function delete_cupcake(evt){

  const $cupcake = $(evt.target).closest(".cc-item");
  const $cupcakeId = $(evt.target).closest(".cc").data("cc-id");

  console.log("cupcake")
  const response = await axios.delete(`${BASE_API_URL}/cupcakes/${$cupcakeId}`);

  $cupcake.remove()
}







