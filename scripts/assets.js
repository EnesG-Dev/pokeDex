//localStorage.clear();

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveLoadFromLs() {
    if (getArray("key")) {
        array = getArray("key");
    } else {
        saveToLs()
    }
}

function saveToLs() {
    setArray("key", array);
}

function toggleDNone(id) {
    document.getElementById(`${id}`).classList.toggle('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}  


