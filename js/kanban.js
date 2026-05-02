import { guardarTasques } from "./storage.js";
import { renderTauler } from "./ui.js";

export let tasques = [];
export let editandoId = null;

export function setTasques(data) {
    tasques = data;
}

// Isues3 CRUD de la aplicacion

// Crear Tarea
export function crearTasques() {

    // coge los valores del formulario
    const titulo = document.getElementById('titulo').value.toUpperCase();
    const descripcion = document.getElementById('descripcion').value;
    const prioridad = document.getElementById('prioridad').value.toUpperCase();
    const fechaFin = (document.getElementById('fechaFin').value);
    const estado = document.getElementById('estado').value;

    if (!titulo){
        alert("debe indicar un titulo")
        return tasques;
    }

    // encuentra la cantidad de objetos que hay  para poner el contador id en situación
    let contadorId = tasques.length > 0 
        ? Math.max(...tasques.map(t => t.id)) + 1 
        : 1;

    // Crear un objeto a traves del formulario
    let formulario = {
        id: contadorId,
        titulo,
        descripcion,
        prioridad,
        fechaFin,
        estado,
        creadoEl: new Date().toLocaleDateString()
    };

    // agregar el objeto al array
    tasques.push(formulario);

    // guardar tareas
    guardarTasques(tasques);

    // limpiar campos del formulario
    document.getElementById("formulario-form").reset();

    renderTauler(tasques);
}

// Editar Tarea
export function editarTasques(id) {

    // coge los valores del formulario
    const titulo = document.getElementById('titulo').value.toUpperCase();
    const descripcion = document.getElementById('descripcion').value;
    const prioridad = document.getElementById('prioridad').value.toUpperCase();
    const fechaFin = (document.getElementById('fechaFin').value);
    const estado = document.getElementById('estado').value;

    let index = tasques.findIndex(t => t.id === id);


    if(index !== -1){
        tasques[index] = {
            ...tasques[index],
            titulo,
            descripcion,
            prioridad,
            fechaFin,
            estado,
        };
    }

    guardarTasques(tasques);

    // limpiar campos del formulario
    document.getElementById("formulario-form").reset();
    
    renderTauler(tasques)
}

// Eliminar Tarea con confirmación
export function eliminarTasques(id) {
    if (!confirm("Desea eliminar la tarea: " + tasques.find(t => t.id === id)?.titulo)) 
        return tasques;
        
        //Procede a eliminar tarea
        tasques = tasques.filter(t => t.id !== id);
        guardarTasques(tasques);

        renderTauler(tasques)

}

// Funcion para cambiar el estado la tarea
export function cambiarEstado(id, nuevoEstado) {
    const index = tasques.findIndex(t => t.id === id);
    if (index !== -1) {
        tasques[index].estado = nuevoEstado;
        guardarTasques(tasques);
        renderTauler(tasques)
    }
}

export function prepararEdicion(id) {

    // Buscamos los datos de esa tarea
    const t = tasques.find(tarea => tarea.id === id);
    
    if (t) {
        // Rellenamos el formulario con lo que ya había
        document.getElementById('titulo').value = t.titulo;
        document.getElementById('descripcion').value = t.descripcion;
        document.getElementById('prioridad').value = t.prioridad.toLowerCase();
        document.getElementById('estado').value = t.estado;
        document.getElementById('fechaFin').value = t.fechaFin; 

        editandoId = id;
    
        // Cambiamos el texto del botón para que el usuario sepa que está dando de alta
        document.getElementById("agregar").innerText = "Guardar tarea";

        // cambiamos el titulo del formulario
        const tituloForm = document.getElementById("formulario");
        tituloForm.getElementsByTagName("h2")[0].innerText = "Editar tarea ";
    }
}
