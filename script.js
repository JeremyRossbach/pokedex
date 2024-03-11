let currentPokemon;


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded Pokemon', currentPokemon);

    renderPokemonInfo();
}


function renderPokemonInfo() {
    let pokemonCard = document.getElementById('pokemon-card');
    let PokemonType1 = currentPokemon['types'][0]['type']['name'];
    let PokemonType2 = currentPokemon['types'][1]['type']['name'];

    pokemonCard.innerHTML += `
        <div id="cardContent">
            <div id="header">
                <h2>${currentPokemon['name']}</h2> 
                <b>#${currentPokemon['order']}</b>
            </div>

            <div id="imagePosition">
                <div id="types">
                    <div id="type">${PokemonType1}</div>
                    <div id="type">${PokemonType2}</div>
                </div>
                <img id="image" src="./img/bulbasaur.png">
            </div>
        </div>
    `;
}


function showPokemonInfo() {
    let PokemonType1 = currentPokemon['types'][0]['type']['name'];
    let PokemonType2 = currentPokemon['types'][1]['type']['name'];
    document.getElementById('pokemon-card').style.display = "none";

    let pokemonInfo = document.getElementById('pokemon-info');

    pokemonInfo.innerHTML = `
        <div id="infoContent">
            <button onclick="goBack()">X</button>

            <div id="infoHeader">
                <h1>${currentPokemon['name']}</h1>
                <b>#${currentPokemon['order']}</b>
            </div>

            <div id="infoTypes">
                <div id="type">${PokemonType1}</div>
                <div id="type">${PokemonType2}</div>
            </div>

            <div class="center">
                <img id="infoImage" src="./img/bulbasaur.png">
            </div>

            <div id="infoCard"></div>
        </div>
    `;
}


function goBack() {
    location.reload();
}