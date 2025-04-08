document.addEventListener('DOMContentLoaded', function() {
    const addTag = document.getElementById('add-tag');
    const tagInput = document.getElementById('new-tag');
    const tagsList = document.getElementById('tags-list');

    if (addTag && tagInput && tagsList) {
        // Charger les tags depuis le localStorage
        const savedTags = JSON.parse(localStorage.getItem('tags')) || [];
        savedTags.forEach(tag => {
            addTagToList(tag);
        });

        addTag.addEventListener('click', function() {
            const tagValue = tagInput.value.trim();

            if (tagValue) {
                addTagToList(tagValue);
                saveTag(tagValue);
                tagInput.value = '';
            }
        });

        function addTagToList(tagValue) {
            const li_tag = document.createElement('li');
            li_tag.textContent = '#' + tagValue;

            // Créer l'icône de suppression
            const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            deleteIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            deleteIcon.setAttribute("viewBox", "0 0 16 16");
            deleteIcon.setAttribute("width", "20");
            deleteIcon.setAttribute("height", "20");
            deleteIcon.setAttribute("x", "0px");
            deleteIcon.setAttribute("y", "0px");
            deleteIcon.innerHTML = '<path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z">';
            deleteIcon.classList.add('delete-icon');

            deleteIcon.addEventListener('click', function() {
                const li = this.closest('li');
                if (li) {
                    const tagValue = li.textContent.slice(1); // Supprimer le caractère '#' du tag
                    li.remove();
                    removeTag(tagValue);
                }
            });

            li_tag.appendChild(deleteIcon);
            tagsList.appendChild(li_tag);
        }

        function saveTag(tagValue) {
            const tags = JSON.parse(localStorage.getItem('tags')) || [];
            tags.push(tagValue);
            localStorage.setItem('tags', JSON.stringify(tags));
        }

        function removeTag(tagValue) {
            let tags = JSON.parse(localStorage.getItem('tags')) || [];
            tags = tags.filter(tag => tag !== tagValue);
            localStorage.setItem('tags', JSON.stringify(tags));
        }
    }

    const addNote = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');
    const deleteNote = document.getElementById('delete-note');
    const searchNote = document.getElementById('search-note');


    if (addNote && notesList) {
        // Charger les notes depuis le localStorage
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

        savedNotes.forEach(note => {
            const li_note = document.createElement('li');
            li_note.innerHTML = `<strong>${note.title}</strong><br>${note.content}`;
            notesList.appendChild(li_note);
        });

        // Ajouter un événement au bouton "Ajouter une note"
        addNote.addEventListener('click', function() {
            const title = document.getElementById('note-title').value;
            const content = document.getElementById('note-content').value;

            if (title && content) {
                const note = {
                    title: title,
                    content: content,
                };

                // Enregistrer la note dans le localStorage
                let notes = JSON.parse(localStorage.getItem('notes')) || [];
                notes.push(note);
                localStorage.setItem('notes', JSON.stringify(notes));

                const li_note = document.createElement('li');
                li_note.innerHTML = `<strong>${note.title}</strong><br>${note.content}`;
                notesList.appendChild(li_note);

                // Réinitialiser le formulaire
                document.getElementById('note-title').value = '';
                document.getElementById('note-content').value = '';
            }
        });
        // Ajouter un événement au bouton "Supprimer une note" qui supprime la dernière note ajoutée ou déjà présente
        deleteNote.addEventListener('click', function() {
            let notes = JSON.parse(localStorage.getItem('notes')) || [];
            if (notes.length > 0) {
                notes.pop();
                localStorage.setItem('notes', JSON.stringify(notes));
                notesList.removeChild(notesList.lastChild);
            }
        });

        searchNote.addEventListener('input', function() {
            const searchValue = searchNote.value.toLowerCase();
            const notes = notesList.getElementsByTagName('li');
            Array.from(notes).forEach(note => {
                const title = note.querySelector('strong').textContent.toLowerCase();
                if (title.includes(searchValue)) {
                    note.style.display = '';
                } else {
                    note.style.display = 'none';
                }
            });
        });
    }
});