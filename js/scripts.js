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
];

function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());

//gets names of pokemon from pokemonRepository and lists pokemon and thier heights and highlights small pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height < 1) {
    document.write(pokemon.name + ' (Height: ' + pokemon.height + ')' + ' ' + pokemon.name + ' is tiny! ' + '<br>' )
  }
  else {
    document.write(pokemon.name + ' (Height: ' + pokemon.height + ')' + '<br>')
  }
});
