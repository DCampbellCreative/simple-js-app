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

//lists pokemon and thier heights and highlights small pokemon
for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height < 1) {
    document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')' + ' ' + pokemonList[i].name + ' is tiny! ' + '<br>' )
  }
  else {
    document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')' + '<br>')
  }
}
