import {
  saveNotesToStorage,
  loadNotesFromStorage,
  addNoteToList} 
  from "./noteService.js";

const form = document.querySelector("#form-notes");
const inputCpf = document.querySelector("#input-cpf");

window.addEventListener("unload", saveNotesToStorage);

window.addEventListener("load", loadNotesFromStorage);

const cleanForm = () => form.reset();

const handleSubmit = (event) => {
  event.preventDefault();

  const dateNow = new Date()

  const newNote = { // para separar os atributos dos objetos use a vírgula
    id: dateNow.getTime(),
    date: dateNow,
    text: inputCpf.value
  }

  //recuperar a nota digitada pelo usuário
  const textNewNote = inputCpf.value;

  addNoteToList(newNote);
  cleanForm();
}

form.addEventListener("submit", handleSubmit);