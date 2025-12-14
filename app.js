
const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const notesList = document.getElementById('notesList');

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesList.innerHTML = '';

  notes.forEach((note, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span>${note}</span>
      <span class="delete" data-index="${index}">Excluir</span>
    `;

    notesList.appendChild(li);
  });
}

function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

addBtn.addEventListener('click', () => {
  const newNote = noteInput.value.trim();
  if (newNote === '') return;

  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(newNote);

  saveNotes(notes);
  loadNotes();

  noteInput.value = '';
});

notesList.addEventListener('click', (e) => {
  if (!e.target.classList.contains('delete')) return;

  const index = e.target.dataset.index;
  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.splice(index, 1);
  saveNotes(notes);
  loadNotes();
});

loadNotes();
