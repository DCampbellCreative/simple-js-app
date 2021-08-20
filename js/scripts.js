let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    button.addEventListener("click", function(){
      showDetails(pokemon)
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

//shows details when user clicks pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

//loads list of pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: item.height,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

//load details of pokemon from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function() {
//displays pokemon in respository on DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
});
});
