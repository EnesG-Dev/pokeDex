const ALLPOKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const POKEAPI = 'https://pokeapi.co/api/v2/pokemon/' // ID/
const POKE_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species/' // ID/
const POKE_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' // 150.svg

let idCounter = 1;
let toId = 41;
let isSearching = false;

async function loadMore() {
    if (isSearching) return;
    document.getElementById('loadMore_img').classList.add('pokeball-loading');
    document.getElementById("loadMore_btn").disabled = true;
    await renderPreviews(0);
    document.getElementById('loadMore_img').classList.remove('pokeball-loading');
    document.getElementById("loadMore_btn").disabled = false;
    toId = toId + 20;
}

async function renderPreviews(count) {
    if (isSearching) return;
    if (count == 1) { idCounter = 1 }
    for (idCounter; idCounter < toId; idCounter++) {
        if (isSearching) break;
       
        let pokeUrl = POKEAPI + idCounter + '/';
        let pokemon = await fetchDataJson(pokeUrl);
        document.getElementById('previewContain').innerHTML += getPreviewTemp(pokemon);

        renderTypes(pokemon);
        setBackgroundsColor(pokemon);
    }
}

async function loadPokeCard(id) {
    let pokeUrl = POKEAPI + id + '/';
    let pokemon = await fetchDataJson(pokeUrl);
    showPokeCard(pokemon);
    checkButtons(id);

}

async function showPokeCard(pokemon) {
    document.getElementById('modalContent').innerHTML = getModalTemp(pokemon);

    renderTypesModal(pokemon);
    setBackgroundColor(pokemon);

    await renderAbout(pokemon);
    renderStats(pokemon);
    await renderAbility(pokemon)

    setBackColors(pokemon);
    setTextColors(pokemon)
}

function setBackColors(pokemon) {
    let firstType = pokemon.types[0].type.name;
    let typeColor = capitalizeFirstLetter(firstType);

    let classElements = document.getElementsByClassName('type-background-color');

    for (let i = 0; i < classElements.length; i++) {
        const element = classElements[i];
        element.style.backgroundColor = `${backgroundColors[typeColor]}`;
    }
}

function setTextColors(pokemon) {
    let firstType = pokemon.types[0].type.name;
    let typeColor = capitalizeFirstLetter(firstType);

    let classElements = document.getElementsByClassName('type-color');

    for (let i = 0; i < classElements.length; i++) {
        const element = classElements[i];
        element.style.color = `${backgroundColors[typeColor]}`;
    }
}

async function renderAbout(pokemon) {
    const URL = POKE_SPECIES + pokemon.id;
    const species = await fetchDataJson(URL);
    const speciesArr = species.flavor_text_entries;

    let flavorTextIndex = speciesArr.findIndex(i => i.language.name == 'en');
    let flavorText = speciesArr[flavorTextIndex].flavor_text;

    document.getElementById('pills-about').innerHTML += getModalAboutTemp(pokemon, flavorText);
}

function renderStats(pokemon) {
    const statNames = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'];

    for (let i = 0; i < statNames.length; i++) {
        const statName = statNames[i];
        const statValue = pokemon.stats[i].base_stat;
        const statValuePricent = statValue / 255 * 100;

        document.getElementById('pills-stats').innerHTML += getModalStatsTemp(statName, statValue, statValuePricent);
    }
}

async function renderAbility(pokemon) {
    const abilities = pokemon.abilities;

    for (let i = 0; i < abilities.length; i++) {
        const abilityName = abilities[i].ability.name;
        const abilityURL = abilities[i].ability.url;
        const abilityText = await fetchDataJson(abilityURL)
        const text = abilityText.effect_entries[1].short_effect;

        document.getElementById('pills-ability').innerHTML += getModalAbilitiesTemp(abilityName, text);
    }
}

function getPokeImg(id) {
    let imgUrl = POKE_IMG + id + '.svg';
    return imgUrl;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function nextPokemon(id) {
    let nextId = id + 1;
    if (nextId == idCounter) {
        loadMore();
    }
    loadPokeCard(nextId);
}

function previousPokemon(id) {
    let previousId = id - 1;
    loadPokeCard(previousId);
}

function checkButtons(id) {
    document.getElementById('previousButton').disabled = id == 1;
}

function renderTypesModal(pokemon) {
    let typesArr = pokemon.types;

    typesArr.forEach(slot => {
        let type = slot.type.name;
        let typeImgName = `Pokemon_Type_Icon_${capitalizeFirstLetter(type)}.svg`;
        let typeColor = capitalizeFirstLetter(type);

        document.getElementById(`pokeType_0`).innerHTML += getTypeTemp(typeImgName, type);
        document.getElementById(`${type}`).style = `color: ${backgroundColors[typeColor]}`;
    });
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

    document.getElementById(`backgroundColor_0`).style = `background-color: ${backgroundColors[typeColor]}`;
}

function setBackgroundsColor(pokemon) {
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

async function searchPokemon() {
    let searchWord = document.getElementById('searchInp').value;
    if (searchWord.length > 0) {
        isSearching = true;
    }
    if (searchWord.length > 2) {
        let allPokemmonLink = await fetchDataJson(ALLPOKEMON);

        let searchPokemons = allPokemmonLink.results
            .filter(pokemon => pokemon['name'].includes(searchWord))
            .map(pokemon => pokemon.name);

        await renderSearchPokemons(searchPokemons);
    } else if (searchWord.length == 0) {
        isSearching = false;
        document.getElementById('previewContain').innerHTML = '';
        await renderPreviews(1);
        document.getElementById('loadMore_btn').classList.remove('d-none');
    }
}

async function renderSearchPokemons(searchPokemons) {
    document.getElementById('previewContain').innerHTML = '';
    document.getElementById('loadMore_btn').classList.add('d-none');

    for (let i = 0; i < searchPokemons.length; i++) {
        const searchPokemon = searchPokemons[i];
        let pokeUrl = POKEAPI + searchPokemon + '/';
        let pokemon = await fetchDataJson(pokeUrl);

        if (pokemon.id < 650) {
            document.getElementById('previewContain').innerHTML += getPreviewTemp(pokemon);

            renderTypes(pokemon);
            setBackgroundsColor(pokemon);
        }
    };
}

function init() {
    loadMore();
}
