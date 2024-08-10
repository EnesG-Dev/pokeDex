function getPreviewTemp(pokemon) {
    return /*html*/`
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
            <div class="square">
                <div id="backgroundColor_${pokemon.id}" class="square-content pokemon-container poke-box-shadow rounded" onclick="showPokeCard(${pokemon.id})">
                    <span class="pokemon-id"># ${pokemon.id}</span>
                    <img src="${getPokeImg(pokemon.id)}" class="rounded d-block poke-filter zoom pokemon-img">
                    <div class="pokemon-type" id="pokeType_${pokemon.id}"></div>
                    <span class="pokemon-name">${pokemon.name}</span>
                </div>
            </div>
        </div>
    `
}

function getTypeTemp(src) {
    return /*html*/`
        <img src="./assets/icons/type_icons/${src}">
    `
}
