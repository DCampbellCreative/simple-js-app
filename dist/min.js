let pokemonRepository = (function () {
  let t = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  document.querySelector("#modal_container");
  function n(e) {
    t.push(e);
  }
  function o(t) {
    let e = $(".modal-body"),
      n = $(".modal-title");
    $(".modal-header");
    n.empty(), e.empty();
    let o = $("<h1>" + t.name + "</h1>"),
      i = $("<img class='modal-img' style='width:50%'>");
    i.attr("src", t.imageUrl);
    let a = $("<p>Height : " + t.height + "</p>"),
      l = $("<p>Types : " + t.types.join(", ") + "</p>");
    n.append(o), e.append(i), e.append(a), e.append(l);
  }
  function i(t) {
    a(t).then(function () {
      o(t);
    });
  }
  function a(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        const n = e.types.map((t) => t.type.name);
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = n);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  return {
    add: n,
    getAll: function () {
      return t;
    },
    addListItem: function (t) {
      let e = document.querySelector(".list-group"),
        n = document.createElement("li"),
        o = document.createElement("button");
      n.classList.add("group-list-item"),
        o.classList.add("btn", "btn-primary"),
        (o.innerText = t.name),
        o.setAttribute("data-target", "#pokemonModal"),
        o.setAttribute("data-toggle", "modal"),
        o.addEventListener("click", function () {
          i(t);
        }),
        n.appendChild(o),
        e.appendChild(n);
    },
    showModal: o,
    showDetails: i,
    loadList: function () {
      return fetch(e)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: a,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
