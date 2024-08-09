const ALLPOKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const POKEAPI = 'https://pokeapi.co/api/v2/pokemon/' // ID/
const POKE_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species/' // ID/
const POKE_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' // 150.svg

let idCounter = 1;
let toId = 21;
let test

async function renderPreviews() {
    for (idCounter; idCounter < toId; idCounter++) {
        let id = idCounter;
        let pokeUrl = POKEAPI + id + '/';
        let pokemon = await fetchDataJson(pokeUrl);
        document.getElementById('previewContain').innerHTML += getPreviewTemp(pokemon);
        
        renderTypes(pokemon);
        setBackgroundColor(pokemon);
    }
    toId = toId+20;
}

// async function pokeSpecies(id) {
//     let speciesUrl = POKE_SPECIES + id + '/';
//     let getSpeciesApi = await fetchDataJson(speciesUrl);
//     let pokeColor = getSpeciesApi.color.name;
//     return pokeColor;
// }

function getPokeImg(id) {
    let imgUrl = POKE_IMG + id + '.svg';
    return imgUrl;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderTypes(pokemon) {
    let typesArr = pokemon.types;

    typesArr.forEach(slot => {
        let type = slot.type.name;
        let typeImgName = `Pokemon_Type_Icon_${capitalizeFirstLetter(type)}.svg`;
    
        document.getElementById(`pokeType_${pokemon.id}`).innerHTML += getTypeTemp(typeImgName);
    });
}

function setBackgroundColor(pokemon) {
    let firstType = pokemon.types[0].type.name;
    let typeColor = capitalizeFirstLetter(firstType);

    document.getElementById(`backgroundColor_${pokemon.id}`).style = `background-color: ${backgroundColors[typeColor]}`;
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
