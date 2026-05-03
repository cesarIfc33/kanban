

//--------------- Issue 2 - modelo de datos y persistencia con localStorage ---------
// Cargar Tareas
export function carregarTasques() {
    return JSON.parse(localStorage.getItem('tasquesKanban')) || [];
}

// Guardar Tareas
export function guardarTasques(tasques) {
    localStorage.setItem('tasquesKanban', JSON.stringify(tasques));
}
