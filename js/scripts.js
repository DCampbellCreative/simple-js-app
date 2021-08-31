let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal_container');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //creates page title
  let pokedex = document.createElement('div');
  pokedex.classList.add('display-4');
  pokedex.innerText = 'Pokedex';
  pageTitle.appendChild(pokedex);


  //shows modal with pokemon info
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();



    let nameElement =$('<h1>' + pokemon.name + '</h1>');

    let imageElement =$("<img class='modal-img' style='width:50%'>");
    imageElement.attr('src', pokemon.imageUrl);

    let heightElement =$('<p>' + 'height : ' + pokemon.height + '</p>');

    let typesElement =$('<p>' + 'types : ' + pokemon.types.join(', ') + '</p>');

    
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }
    //
    // modalContainer.innerHTML = '';
    //
    // let modal = document.createElement('div');
    // modal.classList.add('modal');
    //
    // let closeButtonElement = document.createElement('button');
    // closeButtonElement.classList.add('modal_close');
    // closeButtonElement.innerText = 'Close'
    // closeButtonElement.addEventListener('click', hideModal);
    //
    // let titleElement = document.createElement('h1');
    // titleElement.innerText = pokemon.name;
    //
    // let contentElement = document.createElement('p');
    // contentElement.innerHTML =
    // `height: ${pokemon.height}</br>
    // type: ${pokemon.types.join(', ')}`;
    //
    // let pokemonSprite =  document.createElement('img');
    // pokemonSprite.classList.add('pokemon_sprite');
    // pokemonSprite.src = pokemon.imageUrl;
    //
    // modal.appendChild(closeButtonElement);
    // modal.appendChild(titleElement);
    // modal.appendChild(contentElement);
    // modal.appendChild(pokemonSprite);
    // modalContainer.appendChild(modal);
    //
  //   modalContainer.classList.add('is_visible');
  //
  //   function hideModal(){
  //     modalContainer.classList.remove('is_visible');
  //   }
  //
  //   window.addEventListener('keydown', (e) => {
  //     if (e.key === 'Escape' && modalContainer.classList.contains('is_visible')){
  //       hideModal();
  //     }
  //   });
  //
  //   modalContainer.addEventListener('click', (e) => {
  //     let target = e.target;
  //     if (target === modalContainer) {
  //       hideModal();
  //     }
  //   });
  //
  //   document.querySelector('#show_modal').addEventListener('click', () => {
  //     showModal();
  //   });
  // }
  // //adds pokemon to pokedex
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    listItem.classList.add('group-list-item');
    button.classList.add('btn', 'btn-primary');
    button.innerText = pokemon.name;

    // button.addEventListener("click", function(){
    //   showDetails(pokemon)
    // });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  //shows details when user clicks pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //fetchs pokemon details from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
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
      //add the details to the item
      const pokemonType = details.types.map((type) => type.type.name);
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = pokemonType;
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
