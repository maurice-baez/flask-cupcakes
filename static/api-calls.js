"use strict"

const BASE_API_URL = "http://127.0.0.1:5001/api"

async function getCupcakes(){
  console.debug("getCupcakes");
  const response = await axios.get(`${BASE_API_URL}/cupcakes`);

  return response.data.cupcakes;
}


async function new_cupcakes() {
  let flavor = $("#flavor").val(); 
  let rating = $("#rating").val(); 
  let size = $("#size").val(); 
  let image = $("#image-url").val(); 
  const response = await axios.post(`${BASE_API_URL}/cupcakes`,
                                    {flavor,
                                      size,
                                      rating : Number(rating),
                                      image});
console.log(response);
}







