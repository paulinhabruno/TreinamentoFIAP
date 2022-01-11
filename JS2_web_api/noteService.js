import { formatDate } from "./utils.js";

const sectionListNotes = document.querySelector("#list-notes");
const API_HOST = "http://localhost:3333/notes";
// carrega as notas da api
export const loadNotesFromApi = async () => {
  try {   // tente fazer
    const response = await fetch(API_HOST);

    if (!response.ok)
      return alert("Erro ao consultar a API")

    const listNotes = await response.json();
    listNotes.forEach(note => {
      note.date = new Date(note.date);
      addNoteToSection(note)
    });

  } catch (error) { //capture aqui
    console.log (error);
    alert("Ops! Houve um erro ao consultar a API.")    
  }
}
//cria uma nova nota na api
export const postNoteToApi = async (textNote) => {
    try {
      const response = await fetch(API_HOST, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({text: textNote}) // o json é um objeto (que possui várias propriedades) de troca de informações entre aplicações
      });
      if (!response.ok)
      return alert("Ops, houve um erro ao salvar a nota");

      const createdNote = await response.json();

      createdNote.date = new Date(createdNote.date)

      addNoteToSection(createdNote);

    } catch (error) {
      console.log(error)
      alert("Ops, houve um erro ao salvar na API")
    }
}
//deleta uma nova nota da api
const deleteNoteFromApi = async (event, idNote) => {

  try {
    const response = await fetch(API_HOST + `/${idNote}`, {
      method: "DELETE"
    })
    
    if (!response.ok)
    return alert("Ops! Houve um problema ao apagar a nota");

    removeNoteFromSection(event)

  } catch (error) {
    alert("Ops. Houve um erro ao deletar da API")
    
  }
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
  
    trashElement.addEventListener("click", (event) => deleteNoteFromApi(event, id));
  
    newNoteElement.appendChild(trashElement);
  
    return newNoteElement;
  }


  export const addNoteToSection = (newNote) => {
    const newNoteElement = createNewNoteElement(newNote);
  
    sectionListNotes.appendChild(newNoteElement);
  }


  const removeNoteFromSection = (event) => {
    const noteToRemove = event.target.parentNode;
    sectionListNotes.removeChild(noteToRemove);
  
  }

  