const btnAgregar = document.querySelector("#btn-agregar");
const tareaDescripcion = document.querySelector("#texto-tarea");
const tablaDatos = document.querySelector("#tabla-datos");
const resumenTareasTotal = document.querySelector("#tareas-total");
const resumenTareasRealizadas = document.querySelector("#tareas-realizadas");

let listaTareas = [];

btnAgregar.addEventListener("click",()=>{
    let _nuevaTarea = {id: Number(definirNuevoId()), nombre: tareaDescripcion.value, terminada: false}
    listaTareas.push(_nuevaTarea);
    tareaDescripcion.value = "";
    contruyeTabla(listaTareas);
    mostrarResumenTareas();
});

const imprimeCheck = (estado)=>{
    return estado ? "checked":"";
};

const contruyeTabla = (lista) =>{
    const listaO = lista.sort((x, y) => x.id - y.id);
    let _contenidoHtml = ""
    for(dato of listaO){
        _contenidoHtml += `<tr class="fila-tarea" id="fila-${dato.id}">
                            <td>${dato.id}</td>
                            <td>${dato.nombre}</td>
                            <td><input type="checkbox" ${imprimeCheck(dato.terminada)} OnClick="updateEstadoTarea(${dato.id})"></td>
                            <td><i class="fa-solid fa-delete-left" OnClick="borraElemento(${dato.id},true)"></i></td>
                        </tr>`;
    }
    tablaDatos.innerHTML = _contenidoHtml;
};

const updateEstadoTarea = (_id) => {
    const _original = listaTareas.filter(x => x.id === _id);
    const _estado = _original[0].terminada ? false : true;
    let _updateTarea = {id: _original[0].id, nombre: _original[0].nombre, terminada: _estado}
    borraElemento(_id);
    listaTareas.push(_updateTarea);
    contruyeTabla(listaTareas);
    mostrarResumenTareas();
};

const borraElemento = (_id, update = false) => {
    const indice = listaTareas.findIndex(x => x.id === _id);
    listaTareas.splice(indice,1);
    if(update){
        contruyeTabla(listaTareas);
        mostrarResumenTareas();
    }
};

const mostrarResumenTareas = () => {
    const _tareasRealizadas = listaTareas.filter(x => x.terminada === true).length;
    resumenTareasTotal.innerHTML = `Total: ${listaTareas.length}`;
    resumenTareasRealizadas.innerHTML = `Realizadas: ${_tareasRealizadas}`;
};

const definirNuevoId = () => {
    if (listaTareas.length === 0 ) return 1;
    const valores = listaTareas.map(obj => obj.id);
    return nuevoId = Math.max(...valores) + 1 ;
};

mostrarResumenTareas();

