
function renderNotes() {
    let contentRef = document.getElementById('content')
    contentRef.innerHTML = "";
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        
        contentRef.innerHTML += getNoteTemplate(note);
    }
}

