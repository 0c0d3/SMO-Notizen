// Config
const save_button = "Speichern";
const delete_button = "Löschen";
const note_width = "30%"; //Breite des Notizblocks
const note_rows = "6"; //Höhe des Notizblocks in Zeilen



let navbar;
let note;
let note_container;

//Speichert & Löscht Notizen im localStorage
//Einsehbar unter "Application" in den Dev-Tools
function saveNote() {
    localStorage.setItem("note", document.getElementById("note").value);
}
function deleteNote() {
    note = document.getElementById("note");
    note.value = '';
    localStorage.setItem("note", "");
}


function hideNotes() {
    note_container.children[0].style.display = "block";
    note_container.children[1].style.display = "none";
    note_container.children[2].style.visibility = "hidden";
    note_container.children[3].style.visibility = "hidden";
    note_container.children[4].style.visibility = "hidden";
}
function showNotes() {
    note_container.children[0].style.display = "none";
    note_container.children[1].style.display = "block";
    note_container.children[2].style.visibility = "visible";
    note_container.children[3].style.visibility = "visible";
    note_container.children[4].style.visibility = "visible";
}


function skipLoader() {
    if(document.getElementsByClassName("loader")[0].style.display == 'none') {
        addHTML();
    } else {
        window.setTimeout(skipLoader, 500)
    }
}
skipLoader();


function addHTML() {
    if(localStorage.note == 'undefined') { localStorage.setItem("note", "") };
    navbar = document.getElementsByTagName("navbar")[0].parentElement;
    navbar.insertAdjacentHTML("beforebegin" ,`
      <div id="note-container" style="z-index: 9999; position: fixed; right: 20px; bottom: 20px; width: ` + note_width + `; display: grid; align-items: center; justify-content: center; grid-column-gap: 8px; grid-template-columns: 50% 50%;">
          <div style="display: none; grid-column-end: 3; margin: 0 0 8px auto;">
            <button id="show" style="right: 0px;"><</button>
          </div>
          <div style="display: block; grid-column-end: 3; margin: 0 0 8px auto;">
            <button id="hide" style="right: 0px;">></button>
          </div>
          <textarea class="hide-element" cols="50" rows="` + note_rows + `" wrap="soft" id="note" name="note" placeholder="Notizen..." style="grid-column-start: 1; grid-column-end: 3; margin-bottom: 8px; padding: 6px;">`+localStorage.note+`</textarea>
          <button class="hide-element" id="save" style="padding: 2px;">` + save_button + `</button>
          <button class="hide-element" id="delete" style="padding: 2px;">` + delete_button + `</button>
      </div>
    `);
    note_container = document.getElementById("note-container");
    note_container.children[0].children[0].addEventListener("click", showNotes);
    note_container.children[1].children[0].addEventListener("click", hideNotes);
    note_container.children[3].addEventListener("click", saveNote);
    note_container.children[4].addEventListener("click", deleteNote);
}
