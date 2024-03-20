const MAIN_URL = 'https://pokeapi.co/api/v2/pokemon/';
let numberOfPokemons = 25;


async function init() {
    await loadPokemon();
}


async function loadPokemon() {
    for (let i = 1; i < numberOfPokemons; i++) {
        let url = MAIN_URL + `${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        renderPokemonCard(i, currentPokemon);
        renderPokemonType(i, currentPokemon);
        renderPokemonCardColor(i, currentPokemon);

        console.log(i, currentPokemon); // nur zur Orientierung !!!
    }
}


function loadMorePokemons() {
    numberOfPokemons += 24;

    document.getElementById('pokemon-cards').innerHTML = '';

    loadPokemon();
}


function renderPokemonCard(i, currentPokemon) {
    let pokemonCard = document.getElementById('pokemon-cards');

    pokemonCard.innerHTML += /* html */ `
        <div id="cardContent${i}" class="cardContent" onclick="showPokemonInfo(${i})">
            <div id="header">
                <h2>${currentPokemon['name']}</h2> 
                <b>#${currentPokemon['id']}</b>
            </div>
        
            <div id="imagePosition">
                <div id="types${i}"></div>
                <img src="${currentPokemon['sprites']['front_default']}">
            </div>
        </div>
    `;
}


function renderPokemonType(i, currentPokemon) {
    let types = document.getElementById(`types${i}`);

    for (let j = 0; j < currentPokemon['types'].length; j++) {
        if (currentPokemon['types'][1] === undefined) {
            types.innerHTML = `
                <div id="type${i}" class="type">${currentPokemon['types'][0]['type']['name']}</div>
            `;
        } else {
            types.innerHTML = `
                <div id="type${i}" class="type">${currentPokemon['types'][0]['type']['name']}</div>
                <div id="type${i}" class="type">${currentPokemon['types'][1]['type']['name']}</div>
            `;
        }
    }
}


function renderPokemonCardColor(i, currentPokemon) {
    let cardContent = document.getElementById(`cardContent${i}`);

    if (currentPokemon['types'][0]['type']['name'] === 'grass') {
        cardContent.style.backgroundColor = 'rgb(72,208,175)';
    } 
    if (currentPokemon['types'][0]['type']['name'] === 'fire') {
        cardContent.style.backgroundColor = 'rgb(251,108,108)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'water') {
        cardContent.style.backgroundColor = 'rgb(117,189,253)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'normal') {
        cardContent.style.backgroundColor = 'rgb(187,187,170)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'electric') {
        cardContent.style.backgroundColor = 'rgb(254,206,74)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'ice') {
        cardContent.style.backgroundColor = 'rgb(116,207,192)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'fighting') {
        cardContent.style.backgroundColor = 'rgb(186,85,68)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'poison') {
        cardContent.style.backgroundColor = 'rgb(149,83,204)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'ground') {
        cardContent.style.backgroundColor = 'rgb(166,116,57)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'bug') {
        cardContent.style.backgroundColor = 'rgb(146,193,42)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'flying') {
        cardContent.style.backgroundColor = 'rgb(150,202,254)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'rock') {
        cardContent.style.backgroundColor = 'rgb(187,170,102)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'psychic') {
        cardContent.style.backgroundColor = 'rgb(255,98,128)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'ghost') {
        cardContent.style.backgroundColor = 'rgb(110,67,111)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'dragon') {
        cardContent.style.backgroundColor = 'rgb(85,112,189)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'steel') {
        cardContent.style.backgroundColor = 'rgb(170,170,187)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'fairy') {
        cardContent.style.backgroundColor = 'rgb(236,142,230)';
    }
    if (currentPokemon['types'][0]['type']['name'] === 'stellar') {
        cardContent.style.backgroundColor = 'rgb(78,68,69)';
    }
}


function showPokemonInfo(i, currentPokemon) {
    document.getElementById('pokemon-cards').style.display = 'none';

    let pokemonInfo = document.getElementById('pokemon-info');

    pokemonInfo.innerHTML += /* html */`
            <div id="infoContent${i}">
                <button id=xButton onclick="goBack()">x</button>

                <div id="infoHeader">
                    <h1>${currentPokemon['name']}</h1>
                    <b>#${currentPokemon['order']}</b>
                </div>

                <div id="infoTypes">
                    <div id="type">${currentPokemon['types'][0]['type']['name']}</div>
                </div>

                <div class="center">
                    <img src="${currentPokemon['sprites']['front_default']}">
                </div>

                <div id="infoCard">
                    <div id="categories">
                        <h3 id="about" class="cursor-pointer" onclick="openAbout()">About</h3>
                        <h3 id="stats" class="cursor-pointer" onclick="openStats()">Base Stats</h3>
                    </div>

                    <div id="categoryContent">
                    
                    </div>
                </div>
            </div>
        `;
    openAbout();
}


function openAbout() {
    document.getElementById('about').classList.add('onclick');
    document.getElementById('stats').classList.remove('onclick');
    let categoryContent = document.getElementById('categoryContent');

    categoryContent.innerHTML = '';
    categoryContent.innerHTML = /* html */ `
            <p id = "description" class="mb-24">Lorem ipsum dolor sit amet consectetur adipisicing elit.Suscipit dolore maiores, qui quasi accusamus possimus magni aut consectetur harum, minus fugit cum laborum in eos magnam.Reiciendis dicta dolorem ad ?</p>
                <div id="heightAndWeight">
                    <div id="height">
                        <p class="color-grey">Height</p>
                        <p>${currentPokemon['height']}</p>
                    </div>
                    <div id="weight">
                        <p class="color-grey">Weight</p>
                        <p>${currentPokemon['weight']}</p>
                    </div>
                </div>
        `;
}


function openStats() {
    document.getElementById('stats').classList.add('onclick');
    document.getElementById('about').classList.remove('onclick');
    let categoryContent = document.getElementById('categoryContent');

    categoryContent.innerHTML = "";
    categoryContent.innerHTML = /* html */ `
            < div id = "" >
            <div class="display-flex mt-32">
                <div class="w-124 mb-24">${currentPokemon['stats'][0]['stat']['name']}</div>
                <div class="w-124 mb-24 jc-end">${currentPokemon["stats"][0]["base_stat"]}</div>
            </div>
            <div class="display-flex">
                <div class="w-124 mb-24">${currentPokemon['stats'][1]['stat']['name']}</div>
                <div class="w-124 jc-end">${currentPokemon['stats'][1]['base_stat']}</div>
            </div>
            <div class="display-flex">
                <div class="w-124 mb-24">${currentPokemon['stats'][2]['stat']['name']}</div>
                <div class="w-124 mb-24 jc-end">${currentPokemon['stats'][2]['base_stat']}</div>
            </div>
            <div class="display-flex">
                <div class="w-124 mb-24">${currentPokemon['stat'][3]['stat']['name']}</div>
                <div class="w-124 mb-24 jc-end">${currentPokemon['stats'][3]['base_stat']}</div>
            </div>
            <div class="display-flex">
                <div class="w-124 mb-24">${currentPokemon['stats'][4]['stat']['name']}</div>
                <div class="w-124 mb-24 jc-end">${currentPokemon['stats'][4]['base_stat']}</div>
            </div>
            <div class="display-flex">
                <div class="w-124 mb-24">${currentPokemon['stats'][5]['stat']['name']}</div>
                <div class="w-124 mb-24 jc-end">${currentPokemon['stats'][5]['base_stat']}</div>
            </div>
        </div >
            `;
}


function goBack() {
    location.reload();
}