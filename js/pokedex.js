// OBJETO GLOBAL DE COLORES PARA LOS TIPOS DE POKEMONS
const typesColors = {
    normal: "black",
    fire: "red",
    water: "blue",
    grass: "green",
    electric: "gold",
    ice: "lightblue",
    fighting: "darkgray",
    poison: "purple",
    ground: "brown",
    flying: "skyblue",
    psychic: "pink",
    bug: "limegreen",
    rock: "gray",
    ghost: "darkpurple",
    dragon: "darkgoldenrod",
    dark: "darkgray",
    steel: "silver",
    fairy: "pink"
}

// SELECCIÓN DEL CONTAINER
const myContainer = document.querySelector("#pokedex");

// FETCH Y MAPEO DE DATOS DE LA API
const fetchPokemonsFirstGeneration = async () => {
  
    const pokemonsFirstGeneration = [];

    for (let i = 1; i <= 151; i++) {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const data = await response.json();

        pokemonsFirstGeneration.push({ 
            name: data.name,
            image: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
            type: data.types.map((type) => type.type.name).join(', '),
            id: data.id
        })
    }
    
    return pokemonsFirstGeneration;
};

// DIBUJAMOS LOS POKEMONS
const drawPokemonsFirstGeneration = async (pokemonsFirstGeneration) => {

    myContainer.innerHTML = "";
    for (const pokemon of pokemonsFirstGeneration) {

        const listElement = document.createElement("li");
        listElement.setAttribute("class", "card d-1");

        let types = pokemon.type.split(', ');
        let html = `
        <img class="card-image" src="${pokemon.image}" alt="${pokemon.name}">
        <h4 class="card-title">#000${pokemon.id} ${pokemon.name}</h4>`;

        for (const type of types) {
            let color = typesColors[type];
            html += `<span class="card-subtitle" style="color: ${color};">${type}</span>`;
        }

        listElement.innerHTML = html;
        myContainer.appendChild(listElement);
    }
};

// SELECCIONAMOS EL INPUT Y RECOGEMOS SU VALOR
const drawInput = (pokemonsFirstGeneration) => {
    const input$$ = document.querySelector('input');
    input$$.addEventListener('input', () => searchPokemonsFirstGeneration(input$$.value, pokemonsFirstGeneration));
}

// FILTRAMOS LOS POKEMON POR SU NOMBRE
const searchPokemonsFirstGeneration = (filtro, array) => {
    let filteredPokemonsFirstGeneration = array.filter((pokemonsFirstGeneration) => pokemonsFirstGeneration.name.toLowerCase().includes(filtro.toLowerCase()));
    drawPokemonsFirstGeneration(filteredPokemonsFirstGeneration);
}

// SELECCIONAMOS LA CAJA DE SELECT
const select = document.querySelector("#types-filter");

// CREAMOS LA FUNCION PARA DIBUJAR TODOS LOS TIPOS DE POKEMONS EN EL SELECT + ALL 
const createTypesOptions = (typesColors, select) => {
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "all";
    select.appendChild(allOption);
  
    for (const type in typesColors) {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      select.appendChild(option);
    }
};

// CREAMOS LA FUNCION PARA FILTRAR POR TIPOS
const filterPokemonsByType = (event, pokemonsFirstGeneration) => {
    const selectedType = event.target.value;
    if (selectedType === "all") {
        drawPokemonsFirstGeneration(pokemonsFirstGeneration);
    } else {
        const filteredPokemons = pokemonsFirstGeneration.filter(pokemon => pokemon.type.includes(selectedType));
        drawPokemonsFirstGeneration(filteredPokemons);
    }
}

// INICIADOR DE FUNCIONES
const init = async () => {
    const pokemonsFirstGeneration = await fetchPokemonsFirstGeneration();
    drawPokemonsFirstGeneration(pokemonsFirstGeneration);
    drawInput(pokemonsFirstGeneration);
    createTypesOptions(typesColors, select);
    select.addEventListener('change', (event) => filterPokemonsByType(event, pokemonsFirstGeneration));
};

init();