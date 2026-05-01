
document.addEventListener("DOMContentLoaded", function () {

    // Cargar Tareas
    function carregarTasques() {
        return JSON.parse(localStorage.getItem('tasquesKanban')) || [];
    }

    // Guardar Tareas
    function guardarTasques(tasques) {
        localStorage.setItem('tasquesKanban', JSON.stringify(tasques));
    }

    let tasques = carregarTasques();

    // muestra datos al inicio si no exiten ninguno datos
    if (tasques.length === 0) {
        tasques = [{
            id: 0,
            titulo: "Ejemplo de tarea",
            descripcion: "Crear el primer programa",
            prioridad: "MEDIA",
            fechaFin: "20/12/2025",
            estado: 'Por hacer',
            creadoEl: new Date().toLocaleDateString()
        }];

        guardarTasques(tasques);
    }

    console.log("Tasques carregades:", tasques);
});

