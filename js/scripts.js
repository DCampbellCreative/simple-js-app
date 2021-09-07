let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  let modalContainer = document.querySelector("#modal_container");

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //shows modal with pokemon info
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $("<img class='modal-img' style='width:50%'>");
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");
    let typesElement = $(
      "<p>" + "Types : " + pokemon.types.join(", ") + "</p>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  //creates button for each pokemonList
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add("group-list-item");
    button.classList.add("btn", "btn-primary");
    button.innerText = pokemon.name;
    button.setAttribute("data-target", "#pokemonModal");
    button.setAttribute("data-toggle", "modal");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  // shows details when user clicks pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //fetchs pokemon details from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //load details of pokemon from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //add the details to the item
        const pokemonType = details.types.map((type) => type.type.name);
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = pokemonType;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showModal: showModal,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  //displays pokemon in respository on DOM
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
