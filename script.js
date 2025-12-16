const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const content = document.getElementById('content');

let totalPokemons = 0;

searchButton.addEventListener('click', fetchPokemon);

function fetchPokemon() {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) return;

  content.innerHTML = ''; 

  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      return response.json();
    })
    .then(pokemonData => {
      renderPokemon(pokemonData);
    })
    .catch(error => {
      content.innerHTML = `<p>${error.message}</p>`;
    });
}

function renderPokemon(pokemon) {
  const normalSprite = pokemon.sprites.front_default;
  const shinySprite = pokemon.sprites.front_shiny;

  let isShiny = false;

  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const hasShiny = Boolean(shinySprite);

  content.innerHTML = `
    <div class="pokemon-header">
      <h2>
        ${pokemonName} (#${pokemon.id})
        ${
          hasShiny
            ? `
              <button
                id="shinyToggle"
                class="shiny-button"
                aria-label="Ativar versão shiny"
                title="Ver versão shiny"
              >
                ⭐
              </button>
            `
            : ''
        }
      </h2>
    </div>

    <img
      id="pokemonImage"
      class="pokemon-image"
      src="${normalSprite}"
      alt="Imagem do Pokémon ${pokemonName}"
    >

    <p><strong>Altura:</strong> ${pokemon.height}</p>
    <p><strong>Peso:</strong> ${pokemon.weight}</p>

    <p><strong>Tipos:</strong>
      ${pokemon.types.map(type => type.type.name).join(', ')}
    </p>

    <p><strong>Habilidades:</strong>
      ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}
    </p>
  `;

  if (!hasShiny) return;

  const pokemonImage = document.getElementById('pokemonImage');
  const shinyToggle = document.getElementById('shinyToggle');

  shinyToggle.addEventListener('click', () => {
    isShiny = !isShiny;
    pokemonImage.src = isShiny ? shinySprite : normalSprite;
    shinyToggle.textContent = isShiny ? '↩️' : '✨';
  });
}
