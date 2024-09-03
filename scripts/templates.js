function getPreviewTemp(pokemon) {
    return /*html*/`
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
            <div class="square">
                <div id="backgroundColor_${pokemon.id}" class="square-content pokemon-container poke-box-shadow rounded" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadPokeCard(${pokemon.id})">
                    <span class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</span>
                    <img src="${getPokeImg(pokemon.id)}" class="rounded d-block poke-filter zoom pokemon-img">
                    <div class="pokemon-type" id="pokeType_${pokemon.id}"></div>
                    <span class="pokemon-name">${pokemon.name}</span>
                </div>
            </div>
        </div>
    `
}

function getTypeTemp(src, typeText = '') {
    return /*html*/`
        <img src="./assets/icons/type_icons/${src}">
        <span id="${typeText}" class="type-text">${typeText}</span>
    `
}

function getModalTemp(pokemon) {
    return /*html*/`
        <div class="card">

            <div class="square">
                <div id="backgroundColor_0" class="square-content modal-square-content pokemon-container poke-box-shadow rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <span class="modal-id">#${String(pokemon.id).padStart(3, '0')}</span>
                    <img src="${getPokeImg(pokemon.id)}" class="d-block modal-pokemon-img">
                </div>

            </div>
            
            <div class="modal-body-transition">
                <span class="modal-pokemon-name">${pokemon.name}</span>
                <div class="modal-pokemon-type" id="pokeType_0"></div>
            </div>

            <div class="card-body">

                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#pills-about" type="button" role="tab" aria-controls="pills-about" aria-selected="true">About</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-stats-tab" data-bs-toggle="pill" data-bs-target="#pills-stats" type="button" role="tab" aria-controls="pills-stats" aria-selected="false">Stats</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-ability-tab" data-bs-toggle="pill" data-bs-target="#pills-ability" type="button" role="tab" aria-controls="pills-ability" aria-selected="false">Ability</button>
                </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0"></div>
                <div class="tab-pane fade" id="pills-stats" role="tabpanel" aria-labelledby="pills-stats-tab" tabindex="0"></div>
                <div class="tab-pane fade" id="pills-ability" role="tabpanel" aria-labelledby="pills-ability-tab" tabindex="0"></div>

                <button id="previousButton" type="button" class="btn btn-dark left-button arrows" onclick="previousPokemon(${pokemon.id})"><img src="./assets/img/icons/left_arrow.png"></button>
                <button type="button" class="btn btn-dark right-button arrows" onclick="nextPokemon(${pokemon.id})"><img src="./assets/img/icons/right_arrow.png"></button>
            </div>
        </div>
    `
}

function getModalAboutTemp(pokemon, flavorText) {
    return /*html*/`
        <h5 class="type-color about-info"><img src="./assets/img/icons/height.png">${pokemon.height}</h5>
        <h5 class="type-color about-info"><img src="./assets/img/icons/weight.png">${pokemon.weight}</h5>
        <p>${flavorText}</p>
    `
}

function getModalStatsTemp(statName, statValue, statValuePricent) {
    return /*html*/`
        <div class="progress-container">
            <div class="progress-font">${statName}</div>
            <div class="progress-font">${statValue}</div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar type-background-color" style="width: ${statValuePricent}%"></div>
            </div>
        </div>
    `
}

function getModalAbilitiesTemp(abilitiName, text) {
    return /*html*/`
        <h5 class="type-color">${abilitiName}</h5>
        <p>${text}</p>
    `
}
