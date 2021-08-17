let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Eevee',
      height: 0.3,
      type: ['normal']
    },
    {
      name: 'Vaporeaon',
      height: 1,
      type: ['water'],
    },
    {
      name: 'Jolteon',
      height: 0.8,
      type: ['electric']
    },
    {
      name: 'Flareon',
      height: 0.9,
      type: ['fire']
    },
    {
      name: 'Espeon',
      height: 0.9,
      type: ['psychic']
    },
    {
      name: 'Umbreon',
      height: 1,
      type: ['dark']
    },
    {
      name: 'Leafeon',
      height: 1,
      type: ['grass']
    },
    {
      name: 'Glaceon',
      height: 0.8,
      type: ['ice']
    },
    {
      name: 'Sylveon',
      height: 1,
      type: ['fairy']
    },
    {
    name: 'Pikachu',
    height: .3,
    type: ['electric'],
  }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

//adds pokemon to pokedex
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon_list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.classList.add('pokemon_button');
    button.innerText = pokemon.name;
    addEventListener("click", showDetails);
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function showDetails(pokemon){
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();


//displays pokemon in respository on DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
});
