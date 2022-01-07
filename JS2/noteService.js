

const sectionListNotes = document.querySelector("#list-notes");
const KEY_STORAGE = "@NotesAvanade";

let listNotes = [];

const saveNotesToStorage = () =>
localStorage.setItem(KEY_STORAGE, JSON.stringify(listNotes));

const loadNotesFromStorage = () => {
const listStorage = JSON.parse(localStorage.getItem(KEY_STORAGE));

listNotes = listStorage || [];

//convertendo a data string para o formato Date()
listNotes.forEach(note => {
  note.date = new Date (note.date);
  addNoteToList(note);
});
}


const createNewNoteElement = ({id, date, text}) => { //desestruturação de objetos usando { }
    const newNoteElement = document.createElement("article");
  
    const pDateElement = document.createElement("p");
    pDateElement.textContent = formatDate(date)
    newNoteElement.appendChild(pDateElement);
  
    const pElement = document.createElement("p");
    pElement.textContent = text;
    newNoteElement.appendChild(pElement);
  
    const trashElement = document.createElement("span");
    trashElement.className = "material-icons";
    trashElement.textContent = "delete_forever";
  
    trashElement.addEventListener("click", (event) => removeNote(event, id));
  
    newNoteElement.appendChild(trashElement);
  
    return newNoteElement;
  }




  const addNoteToList = (newNote) => {
    const newNoteElement = createNewNoteElement(newNote);
  
    sectionListNotes.appendChild(newNoteElement);

    listNotes.push(newNote);
  }



  const removeNote = (event, idnoteToRemove) => {
    const noteToRemove = event.target.parentNode;
    sectionListNotes.removeChild(noteToRemove);
  
    listNotes = listNotes.filter(note => note.id !== idnoteToRemove)
  
  }

  