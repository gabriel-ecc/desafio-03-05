const btnAgregar = document.querySelector("#btn-agregar");
const tareaDescripcion = document.querySelector("#texto-tarea");
const tablaTareas = document.querySelector("#tabla-estado-tareas");
const tablaDatos = document.querySelector("#tabla-datos");
const resumenTareasTotal = document.querySelector("#tareas-total");
const resumenTareasRealizadas = document.querySelector("#tareas-realizadas");

let cantidadTareas = 0;
let listaTareas = [];

btnAgregar.addEventListener("click",()=>{
    cantidadTareas++;
    let _nuevaTarea = [{id: Number(cantidadTareas), nombre: tareaDescripcion.value, terminada: false}]
    listaTareas = listaTareas.concat(_nuevaTarea);
    tareaDescripcion.value = "";
    armaTabla();
    mostrarResumenTareas();
    console.log("ingreso ",listaTareas);
});



const imprimeCheck = (estado)=>{
    return estado ? "checked":"";
};

const agregaFila = (dato) =>{
    let _contenidoHtml = `<tr class="fila-tarea" id="fila-${dato.id}">
                            <td>${dato.id}</td>
                            <td>${dato.nombre}</td>
                            <td><input type="checkbox" ${imprimeCheck(dato.terminada)} OnClick="updateEstadoTarea(${dato.id})"></td>
                            <td><i class="fa-solid fa-delete-left"></i></td>
                        </tr>`;
    tablaDatos.innerHTML = _contenidoHtml;
};

const updateEstadoTarea = (_id) => {
    console.log(listaTareas);
    const _original = listaTareas.filter(x => x.id === _id);
    const _estado = _original[0].terminada ? false : true;
    let _updateTarea = [{id: _original[0].id, nombre: _original[0].nombre, terminada: _estado}]
    console.log(_updateTarea);
    borraElemento(_id);
    console.log(listaTareas);
    listaTareas = listaTareas.concat(_updateTarea);
    console.log(listaTareas);
    armaTabla();
    mostrarResumenTareas();
};

const borraElemento = (_id) => {
    const _indice = _id - 1;
    listaTareas = listaTareas.splice(_indice,1);
};

const mostrarResumenTareas = () => {
    const _tareasRealizadas = listaTareas.filter(x => x.terminada === true).length;
    resumenTareasTotal.innerHTML = `Total: ${listaTareas.length}`;
    resumenTareasRealizadas.innerHTML = `Realizadas: ${_tareasRealizadas}`;
};

mostrarResumenTareas();

