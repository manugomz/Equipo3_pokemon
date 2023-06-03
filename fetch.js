const $containerPokemons = document.querySelector(".container-pokemons");
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemons(url) {
  try {
    $containerPokemons.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando...">`;

    let res = await fetch(url),
      json = await res.json(),
      $template = "";

    console.log(res);
    console.log(json);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    /*     for (let i = 0; i < json.results.length; i++) { */
    //console.log(json.results[i]);
    try {
      let res = await fetch(json.results[0].url),
        pokemon = await res.json();
      console.log(res, pokemon);
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      $template += `
        <div class="card">
            <div class="name">
              <p><b>${pokemon.name}</b></p>
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="back-pokemon" class="centrar-pikachu ">
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="centrar-nuevo">
            </div>
            <div class="power">
             <p><b>${pokemon.base_experience}</b></p>
             <button>Buy</button>
            </div>
          </div>
        `;
    } catch (err) {
      console.log(err);
      let message = err.statusText || "Ocurriò un error";
      $template.innerHTML = `<div class="card">
            <div class="name">
              <p><b>Name</b></p>
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="back-pokemon">
              <p>Error ${err.status}: ${message}</p>
            </div>
            <div class="power">
             <p><b>Power Level</b></p>
             <button>Buy</button>
            </div>
          </div>`;
    }
    /*  } */
    $containerPokemons.innerHTML = $template;
  } catch (err) {
    //console.log(err);
    let message = err.statusText || "Ocurriò un error";
    $containerPokemons.innerHTML = `<p> Error ${err.status}:${message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", (e) => loadPokemons(pokeAPI));
