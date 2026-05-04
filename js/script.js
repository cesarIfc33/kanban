import { carregarTasques, guardarTasques } from "./storage.js";
import { renderTauler, renderEstadisticas, activarDragAndDrop} from "./ui.js";
import { crearTasques, editarTasques, editandoId, setTasques,
         getTasquesFiltrades, getEstadisticas, setFiltros, filtros, tasques
        } from "./kanban.js";


document.addEventListener("DOMContentLoaded", function () {

    setTasques(carregarTasques());

    // muestra datos al inicio si no exiten ninguno datos
    if (tasques.length === 0) {
        setTasques([{
            id: 0,
            titulo: "Ejemplo de tarea",
            descripcion: "Crear el primer programa",
            prioridad: "MEDIA",
            fechaFin: "20/12/2025",
            estado: 'toDo',
            creadoEl: new Date().toLocaleDateString()
        }]);
        guardarTasques(tasques);
        setTasques(tasques);
    }
    
    console.log("Tasques carregades:", tasques);

    actualizarUI();

    // Ejecutar al Enviar el formulario
    document.getElementById("agregar").onclick = function(e){
        e.preventDefault();

        if (editandoId !== null) {
            // Si hay un ID guardado, ejecutamos tu función de editar
            editarTasques(editandoId);
            actualizarUI();
            editandoId = null; 
            this.innerText = "Guardar";
            // cambiamos el titulo del formulario
            const tituloForm = document.getElementById("formulario");
            tituloForm.getElementsByTagName("h2")[0].innerText = "Nueva tarea";
        } else {
            crearTasques();
            actualizarUI();
        }
    };

    document.getElementById("btoFiltrar").onclick = () => {

        const estado = document.getElementById("filtro-estado").value;
        const texto = document.getElementById("filtro-texto").value;

        setFiltros({ estado, texto });

        actualizarUI();
    };
});

// recalcula y muestra las estadisticas
export function actualizarUI() {
    const filtradas = getTasquesFiltrades(tasques, filtros);
    renderTauler(filtradas);

    const stats = getEstadisticas(tasques);
    renderEstadisticas(stats);
}


document.addEventListener("DOMContentLoaded", () => {
    activarDragAndDrop();
});

