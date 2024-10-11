document.addEventListener('DOMContentLoaded', function() {
    const tareaInput = document.getElementById('nuevaTarea');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaTareas = document.getElementById('listaTareas');
    let tareas = [];

    function agregarTarea() {
        const tareaTexto = tareaInput.value.trim();
        if (tareaTexto !== '') {
            const nuevaTarea = {
                id: Date.now(),
                texto: tareaTexto,
                completada: false
            };
            tareas.push(nuevaTarea);
            mostrarTareas();
            tareaInput.value = '';
        }
    }

    function mostrarTareas() {
        listaTareas.innerHTML = '';
        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.className = tarea.completada ? 'completada' : '';
            li.innerHTML = `
                <span>${tarea.texto}</span>
                <div>
                    <button onclick="marcarCompletada(${tarea.id})">${tarea.completada ? 'Desmarcar' : 'Completar'}</button>
                    <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
                </div>
            `;
            listaTareas.appendChild(li);
        });
    }

    function marcarCompletada(id) {
        tareas = tareas.map(tarea => {
            if (tarea.id === id) {
                tarea.completada = !tarea.completada;
            }
            return tarea;
        });
        mostrarTareas();
    }

    function eliminarTarea(id) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        mostrarTareas();
    }

    agregarBtn.addEventListener('click', agregarTarea);
    tareaInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });

    window.marcarCompletada = marcarCompletada;
    window.eliminarTarea = eliminarTarea;
});
