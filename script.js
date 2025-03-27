// Récupérer l'icône de suppression SVG
const deleteIcon = document.getElementById('delete-icon');

// Ajouter un événement click pour supprimer l'élément
deleteIcon.addEventListener('click', function() {
    const elementToDelete = document.getElementById('element-to-delete');
    if (elementToDelete) {
        elementToDelete.remove(); // Supprimer l'élément de la page
    }
});