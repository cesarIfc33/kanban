import { prepararEdicion, eliminarTasques, cambiarEstado, getEstadisticas } from "./kanban.js";

// Obtener datos y mostrar en el HTML
export function renderTauler(tasques) {

        const toDoHtml = document.getElementById("toDo");
        const enProgresoHtml = document.getElementById("en-progreso");
        const finalizadoHtml = document.getElementById("finalizado");

        // limpiar las columnas para no duplicar
        toDoHtml.innerHTML = "";
        enProgresoHtml.innerHTML = "";
        finalizadoHtml.innerHTML = "";


        tasques.forEach(t => {
            // agregar al HTML el div con la classe tarea y el atributo draggable (para arrastrar tareas)
            const div = document.createElement('div');
            div.setAttribute("draggable", "true");
            div.classList.add("tarea");
            div.dataset.id = t.id;
            //Coger el id y sus datos para luego para arrastrar las etiquetas
            div.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", t.id);
            });
            // agregar al HTML el titulo
            const tituloHtml = document.createElement('h4');
            tituloHtml.appendChild(document.createTextNode(t.titulo));
            // agregar al HTML el select
            const estadoHtml = document.createElement('select');
            estadoHtml.classList.add('estat');
            estadoHtml.setAttribute('data-id', t.id);   // insertar atributo con su id
            // agregar al HTML el estado
            const estados = [
                { value: "toDo", text: "Por hacer" },
                { value: "en-progreso", text: "En progreso" },
                { value: "finalizado", text: "Finalizado" }
            ];
            // hacemos una iteracion de las opciones y marcamos cual es la indciada de la tarea 
            estados.forEach(e => {
                const optionHtml = document.createElement('option');
                optionHtml.value = e.value;
                optionHtml.appendChild(document.createTextNode(e.text));

                if (e.value === t.estado) {
                    optionHtml.selected = true;
                }
                estadoHtml.appendChild(optionHtml);
            });
            // agregar al HTML la descripcion
            const descripcionHtml = document.createElement('p');
            descripcionHtml.appendChild(document.createTextNode(t.descripcion));
            // agregar al HTML la prioridad
            const prioridadHtml = document.createElement('p');
            prioridadHtml.appendChild(document.createTextNode('Prioridad: ' + t.prioridad));
            // agregar al HTML la fecha fin
            const fechaFinHtml = document.createElement('p');
            fechaFinHtml.appendChild(document.createTextNode('Fecha fin: ' + t.fechaFin));
            // agregar al HTML la fecha de creacion
            const creadoElHtml = document.createElement('p');
            creadoElHtml.appendChild(document.createTextNode('Creado el: ' + t.creadoEl));
            // agregar al HTML el botn editar
            const btoEditar = document.createElement('button');
            btoEditar.appendChild(document.createTextNode('Editar'));
            btoEditar.classList.add('btn-edit');
            btoEditar.setAttribute('data-id', t.id);   // insertar atributo con su id
            btoEditar.setAttribute('type', 'button');
            // agregar al HTML el botn eliminar
            const btoEliminar = document.createElement('button');
            btoEliminar.appendChild(document.createTextNode('Eliminar'));
            btoEliminar.classList.add('btn-delete');
            btoEliminar.setAttribute('data-id', t.id);    // insertar atributo con su id
            btoEliminar.setAttribute('type', 'button');
        
            div.appendChild(tituloHtml)
            div.appendChild(estadoHtml)
            div.appendChild(descripcionHtml)
            div.appendChild(prioridadHtml)
            div.appendChild(fechaFinHtml)
            div.appendChild(creadoElHtml)
            div.appendChild(btoEditar)
            div.appendChild(btoEliminar)
            
            if (t.estado === "toDo") toDoHtml.appendChild(div) && div.classList.add('toDo');
            else if (t.estado === "en-progreso") enProgresoHtml.appendChild(div) && div.classList.add('en-progreso');
            else finalizadoHtml.appendChild(div) && div.classList.add('finalizado');
        });

        // Asignar eventos a los nuevos botones creados
        // al boton editar le he asignado que al pulsar se visualice el formulario
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.onclick = () => {
                prepararEdicion(parseInt(btn.dataset.id));
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = () => eliminarTasques(parseInt(btn.dataset.id));
        });

        // Asignar evento al select del estado de la tarea
        document.querySelectorAll('.estat').forEach(select => {
            select.onchange = () => cambiarEstado(parseInt(select.dataset.id), select.value);
        });

    }


    //función para visualizar las Estadisticas
    export function renderEstadisticas(stats) {

        const contenedor = document.getElementById('estadisticas-aside');
        const p1 = contenedor.querySelector("p:nth-child(2)");
        const p2 = contenedor.querySelector("p:nth-child(3)");
        const p3 = contenedor.querySelector("p:nth-child(4)");
        const p4 = contenedor.querySelector("p:nth-child(5)");
        const p5 = contenedor.querySelector("p:nth-child(6)");

        p1.textContent = "";
        p2.textContent = "";
        p3.textContent = "";
        p4.textContent = "";
        p5.textContent = "";

        // Tareas
        p1.appendChild(document.createElement("span")).appendChild(document.createTextNode("Tareas: "));
        let spanResultado = document.createElement("span");
        spanResultado.classList.add("resultado");
        spanResultado.appendChild(document.createTextNode(stats.total));
        p1.appendChild(spanResultado);
        

        // Por hacer
        p2.appendChild(document.createElement("span")).appendChild(document.createTextNode("Por hacer: "));
        spanResultado = document.createElement("span");
        spanResultado.classList.add("resultado");
        spanResultado.appendChild(document.createTextNode(stats.porHacer));
        p2.appendChild(spanResultado);

        // En proceso
        p3.appendChild(document.createElement("span")).appendChild(document.createTextNode("En proceso: "));
        spanResultado = document.createElement("span");
        spanResultado.classList.add("resultado");
        spanResultado.appendChild(document.createTextNode(stats.enProgreso));
        p3.appendChild(spanResultado);

        // Completadas
        p4.appendChild(document.createElement("span")).appendChild(document.createTextNode("Completadas: "));
        spanResultado = document.createElement("span");
        spanResultado.classList.add("resultado");
        spanResultado.appendChild(document.createTextNode(stats.finalizado));
        p4.appendChild(spanResultado);

        // Porcentaje
        p5.appendChild(document.createElement("span")).appendChild(document.createTextNode("% Completadas: "));
        spanResultado = document.createElement("span");
        spanResultado.classList.add("resultado");
        spanResultado.appendChild(document.createTextNode(stats.porcentaje + "%"));
        p5.appendChild(spanResultado);
    }

    // ----FUNCION PARA IDENTIFICAR LAS ZONAS DE ARRASTRE DE LAS ETIQUETAS -----
    export function activarDragAndDrop() {

        const columnas = [
            document.getElementById("toDo"),
            document.getElementById("en-progreso"),
            document.getElementById("finalizado")
        ];

        columnas.forEach(col => {

            col.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            col.addEventListener("drop", (e) => {
                e.preventDefault();

                const id = parseInt(e.dataTransfer.getData("text/plain"));

                const nuevoEstado = col.id;

                cambiarEstado(id, nuevoEstado);
            });
        });
    }