const ALLPOKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const POKEAPI = 'https://pokeapi.co/api/v2/pokemon/' // ID/
const POKE_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' // 150.svg

let idCounter = 1;
let toId = 21;
let test

async function renderPreviews() {
    for (idCounter; idCounter < toId; idCounter++) {
        let id = idCounter;
        let pokeUrl = POKEAPI + id + '/';
        let pokemon = await fetchDataJson(pokeUrl);
        document.getElementById('previewContain').innerHTML += previewTemp(pokemon);
        types(pokemon);
    }
    toId = toId+20;
}

function getPokeImg(id) {
    let imgUrl = POKE_IMG + id + '.svg';
    return imgUrl;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function types(pokemon) {
    let typesArr = pokemon.types;
    typesArr.forEach(slot => {
        let type = slot.type.name;
        
        let typeImg = `Pokemon_Type_Icon_${capitalizeFirstLetter(type)}.svg`;
    
    document.getElementById(`pokeType_${pokemon.id}`).innerHTML += getTypeTemp(typeImg);
    });
}



async function fetchDataJson(api) {
    let response = await fetch(api);
    if (response.ok) {
        let responseAsJson = await response.json();
        return responseAsJson;
    } else {
        console.error('HTTP-Error: ' + response.status);
    }
}

function init() {
    renderPreviews();
    console.log('go!');
}




function previewTemp(pokemon) {
    return /*html*/`
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
            <div class="square">
                <div class="square-content pokemon-container poke-box-shadow rounded">
                    <span class="pokemon-id"># ${pokemon.id}</span>
                    <img src="${getPokeImg(pokemon.id)}" class="rounded d-block poke-filter zoom">
                    <div class="pokemon-type" id="pokeType_${pokemon.id}"></div>
                    <span class="pokemon-name">${pokemon.name}</span>
                </div>
            </div>
        </div>
    `
}

function getTypeTemp(src) {
    return /*html*/`
        <img src="./assets/img/type_icons/${src}">
    `
}

