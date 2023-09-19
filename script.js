const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1126";

let pokemonList;

// Cargar la lista de todos los Pokemon
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => (pokemonList = data.results));

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const pokemonDiv = document.getElementById("pokemon");
const body = document.querySelector("body");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  // Filtramos la lista segun el valor
  if (searchValue.length >= 3) {
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchValue)
    );

    // Mostrar los resultados div si hay coincidencias
    // if (filteredList.length > 0) {
    //   resultsDiv.style.display = "block";
    // } else {
    //   resultsDiv.style.display = "none";
    // }

    // Mostrar la lista de Pokémon que coincidan
    resultsDiv.innerHTML = "";
    filteredList.forEach((pokemon) => {
      const pokemonDiv = document.createElement("div");
      pokemonDiv.classList.add("pokemon-card");
      pokemonDiv.textContent = pokemon.name;
      pokemonDiv.addEventListener("click", () => {
        displayPokemon(pokemon.url);
        resultsDiv.innerHTML = "";
      });
      resultsDiv.appendChild(pokemonDiv);
    });
  } else {
    resultsDiv.innerHTML = "";
  }
});

function displayPokemon(url) {
  // Conseguir los datos de Pokémon
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pokemonDiv.innerHTML = `
        <h2>${data.name}</h2>
        <section>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <img src="${data.sprites.back_default}" alt="${data.name}">
        </section>
        <ul>
        <li> <strong>FUERZA</strong>: ${data.height}</li>
        <li> <strong>PESO</strong>: ${data.weight} </li>
        <li> <strong>VIDA</strong>: ${data.stats[0].base_stat} </li>
        <li> <strong>ATAQUE BASE</strong>:  ${data.stats[1].base_stat}</li>
        <li> <strong>DEFENSA</strong>: ${data.stats[2].base_stat}</li>
        <li> <strong>VELOCIDAD</strong>: ${data.stats[5].base_stat}</li>
        <li> <strong>TIPO</strong> : ${data.types
          .map((type) => type.type.name)
          .join(", ")}</li>
        </ul>
          `;
    });
}
