const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const content = document.getElementById('content');

searchButton.addEventListener('click', fetchPokemon);

function fetchPokemon() {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) return;

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
  content.innerHTML = `
    <h2>${pokemon.name} (#${pokemon.id})</h2>

    <p><strong>Altura:</strong> ${pokemon.height}</p>
    <p><strong>Peso:</strong> ${pokemon.weight}</p>

    <p><strong>Tipos:</strong>
      ${pokemon.types.map(type => type.type.name).join(', ')}
    </p>

    <p><strong>Habilidades:</strong>
      ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}
    </p>
  `;
}
