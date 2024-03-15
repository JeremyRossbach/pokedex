async function loadPokemon() {
    for (let i = 1; i < 25; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + `${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        console.log(currentPokemon);
    }
    renderPokemon();
}


function renderPokemon() {
    let pokemonCard = document.getElementById('pokemon-cards');

    for (let i = 0; i < 24; i++) {
        
        pokemonCard.innerHTML += `
        <div id="cardContent${i}" class="cardContent" onclick="showPokemonInfo()">
            <div id="header">
                <h2>${currentPokemon['name']}</h2> 
                <b>#${currentPokemon['order']}</b>
            </div>
        
            <div id="imagePosition">
                <div id="types">
                    <div id="type">${currentPokemon['types'][0]['type']['name']}</div>
                </div>
                <img src="${currentPokemon['sprites']['front_default']}">
            </div>
        </div>
    `;
    }
}






function showPokemonInfo() {
    document.getElementById('pokemon-cards').style.display = "none";

    let pokemonInfo = document.getElementById('pokemon-info');

    pokemonInfo.innerHTML = `
        <div id="infoContent">
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
    document.getElementById('about').classList.add("onclick");
    document.getElementById('stats').classList.remove("onclick");
    let categoryContent = document.getElementById('categoryContent');

    categoryContent.innerHTML = '';
    categoryContent.innerHTML = `
        <p id="description" class="mb-24">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolore maiores, qui quasi accusamus possimus magni aut consectetur harum, minus fugit cum laborum in eos magnam. Reiciendis dicta dolorem ad?</p>
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
    document.getElementById('stats').classList.add("onclick");
    document.getElementById('about').classList.remove("onclick");
    let categoryContent = document.getElementById('categoryContent');

    categoryContent.innerHTML = '';
    categoryContent.innerHTML = `
        <div id="">
            <div class="display-flex mt-32">
                <div class="w-124 mb-24">${currentPokemon['stats'][0]['stat']['name']}</div>
                <div class="w-124 mb-24 jc-end">${currentPokemon['stats'][0]['base_stat']}</div>
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
                <div class="w-124 mb-24">${currentPokemon['stats'][3]['stat']['name']}</div>
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
        </div>
    `;
}


function goBack() {
    location.reload();
}