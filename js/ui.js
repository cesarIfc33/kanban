import { prepararEdicion, eliminarTasques, cambiarEstado } from "./kanban.js";

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
            // agregar al HTML el div con una clase
            const div = document.createElement('div');
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
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.onclick = () => prepararEdicion(parseInt(btn.dataset.id));
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = () => eliminarTasques(parseInt(btn.dataset.id));
        });

        // Asignar evento al select del estado de la tarea
        document.querySelectorAll('.estat').forEach(select => {
            select.onchange = () => cambiarEstado(parseInt(select.dataset.id), select.value);
        });
    }
