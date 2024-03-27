const MAIN_URL = 'https://pokeapi.co/api/v2/pokemon/';
const allPokemon = [];
const typeColors = {
    grass: 'rgb(72,208,175)',
    fire: 'rgb(251,108,108)',
    water: 'rgb(117,189,253)',
    normal: 'rgb(187,187,170)',
    electric: 'rgb(254,206,74)',
    ice: 'rgb(116,207,192)',
    fighting: 'rgb(186,85,68)',
    poison: 'rgb(149,83,204)',
    ground: 'rgb(166,116,57)',
    bug: 'rgb(146,193,42)',
    flying: 'rgb(150,202,254)',
    rock: 'rgb(187,170,102)',
    psychic: 'rgb(255,98,128)',
    ghost: 'rgb(110,67,111)',
    dragon: 'rgb(85,112,189)',
    steel: 'rgb(170,170,187)',
    fairy: 'rgb(236,142,230)',
    dark: 'rgb(78,68,69)'
};
let numberOfPokemon = 25;


async function init() {
    await loadPokemon();
}


async function loadPokemon() {
    for (let i = 1; i < numberOfPokemon; i++) {
        let url = MAIN_URL + `${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemon.push(currentPokemon);

        renderPokemonCard(i, currentPokemon);
        renderPokemonCardType(i, currentPokemon);
        renderPokemonCardColor(i, currentPokemon);

        console.log(i, currentPokemon); // nur zur Orientierung !!!
    }
}

/* beim laden neuer Pokemon, bleibt der Inhalt des Arrays bestehen und dupliziert sich + 25 */
function loadMorePokemon() {
    numberOfPokemon += 24;

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


function renderPokemonCardType(i, currentPokemon) {
    let type1 = currentPokemon['types'][0]['type']['name'];
    let types = document.getElementById(`types${i}`);

    for (let j = 0; j < currentPokemon['types'].length; j++) {
        if (currentPokemon['types'][1] === undefined) {
            types.innerHTML = /* html */`
                <div id="type${i}" class="type">${type1}</div>
            `;
        } else {
            let type2 = currentPokemon['types'][1]['type']['name'];
            types.innerHTML = /* html */`
                <div id="type${i}" class="type">${type1}</div>
                <div id="type${i}" class="type">${type2}</div>
            `;
        }
    }
}


function renderPokemonCardColor(i, currentPokemon) {
    let cardContent = document.getElementById(`cardContent${i}`);

    const type = currentPokemon['types'][0]['type']['name'];
    if (typeColors[type]) {
        cardContent.style.backgroundColor = typeColors[type];
    }
}

/* richtiges Pokemon (ab #25), TypeColor und Type fehlen noch */
function showPokemonInfo(i) {
    let pokemonInfo = document.getElementById('pokemon-info');
    document.body.style.overflow = 'hidden';
    pokemonInfo.style.display = 'flex';

    pokemonInfo.innerHTML = /* html */`
            <div onclick="dontClosePokemonInfo(event)" id="infoContent${i}" class="infoContent">

                <div id="infoHeader">                    
                    <h1>${allPokemon[i - 1]['name']}</h1>
                    <b>#${allPokemon[i - 1]['id']}</b>
                </div>

                <div id="infoTypes${i}" class="infoTypes"></div>

                <div class="imageAndButtons">
                    <button onclick="previousPokemon(${i})" id="previousButton" class="previousNextButtons"><img src="./img/arrow-left.png"></button>
                    <img class="infoImage" src="${allPokemon[i - 1]['sprites']['front_default']}">
                    <button onclick="nextPokemon(${i})" id="nextButton" class="previousNextButtons"><img src="./img/arrow-right.png"></button>
                </div>

                <div id="infoCard">
                    <div id="categories">
                        <h3 onclick="openAbout(${i})" id="about" class="cursor-pointer">About</h3>
                        <h3 onclick="openStats(${i})" id="stats" class="cursor-pointer">Base Stats</h3>
                    </div>

                    <div id="categoryContent">
                    
                    </div>
                </div>
            </div>
        `;
    renderPokemonInfoCardType(i);
    renderPokemonInfoCardColor(i);
    openAbout(i);
}


function renderPokemonInfoCardType(i) {
    let types = document.getElementById(`infoTypes${i}`);

    for (let n = 0; n < allPokemon[n]['types'].length; n++) {
        if (allPokemon[i - 1]['types'][1] === undefined) {
            types.innerHTML = /* html */`
                <div id="type${i}" class="infoType">${allPokemon[i - 1]['types'][0]['type']['name']}</div>
            `;
        } else {
            types.innerHTML = /* html */`
                <div id="type${i}" class="infoType">${allPokemon[i - 1]['types'][0]['type']['name']}</div>
                <div id="type${i}" class="infoType">${allPokemon[i - 1]['types'][1]['type']['name']}</div>
            `;
        }
    }
}


function renderPokemonInfoCardColor(i) {
    let infoContent = document.getElementById(`infoContent${i}`);

    const type = allPokemon[i - 1]['types'][0]['type']['name'];
    if (typeColors[type]) {
        infoContent.style.backgroundColor = typeColors[type];
    }
}



function openAbout(i) {
    document.getElementById('about').classList.add('onclick');
    document.getElementById('stats').classList.remove('onclick');
    let categoryContent = document.getElementById('categoryContent');

    categoryContent.innerHTML = '';
    categoryContent.innerHTML = /* html */ `
        <p id="description" class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.Suscipit dolore maiores, qui quasi accusamus possimus magni aut consectetur harum, minus fugit cum laborum in eos magnam.Reiciendis dicta dolorem ad ?</p>
            <div id="heightAndWeight">
                <div id="height">
                    <p class="color-grey">Height</p>
                    <p>${allPokemon[i - 1]['height']}</p>
                </div>
                <div id="weight">
                    <p class="color-grey">Weight</p>
                    <p>${allPokemon[i - 1]['weight']}</p>
                </div>
            </div>
    `;
}


function openStats(i) {
    document.getElementById('stats').classList.add('onclick');
    document.getElementById('about').classList.remove('onclick');
    let categoryContent = document.getElementById('categoryContent');

    categoryContent.innerHTML = '';

    for (let k = 0; k < allPokemon[k]['stats'].length; k++) {
        categoryContent.innerHTML += /* html */`
            <div class="d-flex justify-content-center align-items-center mt-4">
                <div class="w-124">${allPokemon[i - 1]['stats'][k]['stat']['name']}</div>
                <div class="mx-3">${allPokemon[i - 1]['stats'][k]['base_stat']}</div>
                <div class="progress progessBar" role="progressbar" aria-label="Example 1px high">
                    <div class="progress-bar" style="width: ${allPokemon[i - 1]['stats'][k]['base_stat']}px"></div>
                </div>
            </div>
        `;
    }
}


function closePokemonInfo() {
    document.body.style.overflow = '';
    document.getElementById('pokemon-info').style.display = 'none';
}


function dontClosePokemonInfo(event) {
    event.stopPropagation();
}

/* if-else-Abfrage fehlt noch */
function previousPokemon(i) {
    showPokemonInfo(i - 1);
}


function nextPokemon(i) {
    showPokemonInfo(i + 1);
}


function filterNames() {
    let search = document.getElementById('searchForPokemon').value;
    search = search.toLowerCase();

    let pokemonCard = document.getElementById('pokemon-cards');
    pokemonCard.innerHTML = '';

    for (let l = 0; l < allPokemon.length; l++) {
        let pokemon = allPokemon[l];
        if (pokemon['name'].toLowerCase().includes(search)) {
            pokemonCard.innerHTML += /* html */ `
                <div id="cardContent${l}" class="cardContent" onclick="showPokemonInfo(${l} + 1)">
                    <div id="header">
                        <h2>${pokemon['name']}</h2> 
                        <b>#${pokemon['id']}</b>
                    </div>
                
                    <div id="imagePosition">
                        <div id="types${l}"></div>
                        <img src="${pokemon['sprites']['front_default']}">
                    </div>
                </div>
            `;
            renderPokemonInfoType(l);
            renderPokemonSearchedCardColor(l);
        }
    }
}


function renderPokemonInfoType(l) {
    let types = document.getElementById(`types${l}`);

    for (let m = 0; m < allPokemon[m]['types'].length; m++) {
        if (allPokemon[l]['types'][1] === undefined) {
            types.innerHTML = /* html */`
                <div id="type${l}" class="type">${allPokemon[l]['types'][0]['type']['name']}</div>
            `;
        } else {
            types.innerHTML = /* html */`
                <div id="type${l}" class="type">${allPokemon[l]['types'][0]['type']['name']}</div>
                <div id="type${l}" class="type">${allPokemon[l]['types'][1]['type']['name']}</div>
            `;
        }
    }
}


function renderPokemonSearchedCardColor(l) {
    let cardContent = document.getElementById(`cardContent${l}`);

    const type = allPokemon[l]['types'][0]['type']['name'];
    if (typeColors[type]) {
        cardContent.style.backgroundColor = typeColors[type];
    }
}
