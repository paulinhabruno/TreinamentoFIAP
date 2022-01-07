/**
 * Vamos estruturar as nossas notas
 * Daqui pra frente terão id e a data de inclusão
 */

const form = document.querySelector("#form-notes");
const inputCpf = document.querySelector("#input-cpf");

window.addEventListener("unload", saveNotesToStorage);

window.addEventListener("load", loadNotesFromStorage);

const formatDate = (date) => Intl.DateTimeFormat(navigator.language, {dateStyle: "short", timeStyle: "short"}).format(date); // a data foi formatada para o formato local do navegador

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