import { carregarTasques, guardarTasques } from "./storage.js";
import { renderTauler } from "./ui.js";
import { crearTasques, editarTasques, editandoId, setTasques } from "./kanban.js";


document.addEventListener("DOMContentLoaded", function () {

    let tasques = carregarTasques();
    setTasques(tasques);

    // muestra datos al inicio si no exiten ninguno datos
    if (tasques.length === 0) {
        tasques = [{
            id: 0,
            titulo: "Ejemplo de tarea",
            descripcion: "Crear el primer programa",
            prioridad: "MEDIA",
            fechaFin: "20/12/2025",
            estado: 'toDo',
            creadoEl: new Date().toLocaleDateString()
        }];
        guardarTasques(tasques);
        setTasques(tasques);
    }
    
    console.log("Tasques carregades:", tasques);

    renderTauler(tasques);

    // Ejecutar al Enviar el formulario
    document.getElementById("agregar").onclick = function(e){
        e.preventDefault();

        if (editandoId !== null) {
            // Si hay un ID guardado, ejecutamos tu función de editar
            editarTasques(editandoId);
            editandoId = null; 
            this.innerText = "Guardar";
            // cambiamos el titulo del formulario
            const tituloForm = document.getElementById("formulario");
            tituloForm.getElementsByTagName("h2")[0].innerText = "Nueva tarea";
        } else {
            crearTasques();
        }
    };
});
