var formulario = document.getElementById("formDatos");
var botonAgregar = document.getElementById("botonAgregar");
var table = document.getElementById("tablaPersonas");

var cadena = '[{"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},{"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},{"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},{"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},{"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},{"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}]';

// clase de persona
class Persona {
    id = 0;
    nombre;
    apellido;
    fechaNacimiento = 0;

    constructor(id, nombre, apellido, fechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }

    toString(){}
}

// clase de ciudadano
class Ciudadano extends Persona {
    dni;     

    constructor(dni,  id, nombre, apellido, fechaNacimiento) {
        super(id, nombre, apellido, fechaNacimiento);
        this.dni = dni;
    } 
}

// clase de extranjero
class Extranjero extends Persona {    
    paisOrigen;    

    constructor(paisOrigen,  id, nombre, apellido, fechaNacimiento) {
        super(id, nombre, apellido, fechaNacimiento);
        this.paisOrigen = paisOrigen;
    }  
}

listaPersonas = toString(cadena);
cargarListaPersonas(listaPersonas);

function toString(cadenaDatos) {
    let arrayObjetos = JSON.parse(cadenaDatos);

    let personas = arrayObjetos.map(objeto => {
        if ('dni' in objeto) {
            let ciudadano = new Ciudadano(objeto.dni, objeto.id, objeto.nombre, objeto.apellido, objeto.fechaNacimiento);
            return ciudadano;
        } else if ('paisOrigen' in objeto) {
            let extranjero = new Extranjero(objeto.paisOrigen, objeto.id, objeto.nombre, objeto.apellido, objeto.fechaNacimiento);
            return extranjero;
        } else {
            return new Persona(objeto.id, objeto.nombre, objeto.apellido, objeto.fechaNacimiento);
        }
    });

    return personas;
}

function cargarListaPersonas(personas) {
    for (var i = 0; i < personas.length; i++) {

        tipo = obtenerTipo(personas[i]);
        cargarPersona(tipo, personas[i]);
    }
}

function generarPersona() {

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value;
    var dni = document.getElementById("dni").value;
    var paisOrigen = document.getElementById("paisOrigen").value;

    var id = generarId();

    let tipoPersona = document.getElementById("tipoPersona").value;

    if (tipoPersona === "ciudadano") {
        return new Ciudadano(dni, id, nombre, apellido, fechaNacimiento);
    } else {
        return new Extranjero(paisOrigen, id,  nombre, apellido, fechaNacimiento);
    }

}

function obtenerTipo(persona)
{
    if(persona.hasOwnProperty('paisOrigen'))
    {
        return "extranjero";
    }else{
        return "ciudadano";
    }
}

function cargarPersona(tipo, persona) {

    alta = document.getElementById("formAbm").getAttribute("index");
    if(alta == -1)
    {
        if(validar(tipo, persona) == true)
        {
            var newRow = table.insertRow(table.rows.length);

            var cellId = newRow.insertCell(0);
            var cellNombre = newRow.insertCell(1);
            var cellApellido = newRow.insertCell(2);
            var cellFechaNacimiento = newRow.insertCell(3);
            var cellDni = newRow.insertCell(4);
            var cellPaisOrigen = newRow.insertCell(5);

            cellId.innerHTML = persona.id;
            cellNombre.innerHTML = persona.nombre;
            cellApellido.innerHTML = persona.apellido;
            cellFechaNacimiento.innerHTML = persona.fechaNacimiento;

            if (persona instanceof Ciudadano) {
                cellDni.innerHTML = persona.dni || "-";
                cellPaisOrigen.innerHTML = "-";
            } else if (persona instanceof Extranjero) {
                cellDni.innerHTML = "-";
                cellPaisOrigen.innerHTML = persona.paisOrigen || "-";
            } else {
                cellDni.innerHTML = "-";
                cellPaisOrigen.innerHTML = "-";
            }
        }else{
            alert("error, verificar datos");
        }
    }else{
        alert("Error, solo modificar o eliminar");
    }
}
    
// modifica la persona de listaPersonas
function modificarPersona(index, nombre, apellido, fechaNacimiento, nuevoDni, nuevoPaisOrigen) {
    
    if (index >= 0 && index < listaPersonas.length) {
        listaPersonas[index].nombre = nombre;
        listaPersonas[index].apellido = apellido;
        listaPersonas[index].fechaNacimiento = fechaNacimiento;

        if (listaPersonas[index] instanceof Ciudadano) {
            listaPersonas[index].dni = nuevoDni;
        } else if (listaPersonas[index] instanceof Extranjero) {
            listaPersonas[index].paisOrigen = nuevoPaisOrigen;
        }

        console.log("Persona modificada:", listaPersonas[index].nombre);
    } else {
        alert("Error en la modificacion");
    }
}

function actualizarInput(tipoPersona) {
    var dniInput = document.getElementById("dni");
    var paisOrigenInput = document.getElementById("paisOrigen");

    dniInput.disabled = false;
    paisOrigenInput.disabled = false;

    dniInput.value = "";
    paisOrigenInput.value = "";

    dniInput.style.visibility = 'hidden';
    paisOrigenInput.style.visibility = 'hidden';

    if (tipoPersona === "ciudadano") {
        dniInput.style.visibility = 'visible';
        paisOrigenInput.disabled = true;
   
    } else if (tipoPersona === "extranjero") {
        paisOrigenInput.style.visibility = 'visible';
        dniInput.disabled = true;
    }
    
}

// busca persona por id
function buscarPersona(id) {
    for (var i = 0; i < listaPersonas.length; i++) {
        if (listaPersonas[i].id == id) {
            return true;
        }
    }
    return false;
}

function validar(tipoPersona, persona) {
    if (persona.nombre !== "" && persona.apellido !== "" && persona.fechaNacimiento !== "" && persona.fechaNacimiento > -1) {
        if (tipoPersona === "ciudadano") {
            if (persona.dni !== "") {
                return true;
            }
        } else if (tipoPersona === "extranjero") {
            if (persona.paisOrigen !== "") {
                return true;
            }
        }
    }
    return false;
}

function calcularEdadPromedio() {
    var tabla = document.getElementById("tablaPersonas");
    var filas = tabla.rows;
    var filtro = document.getElementById("filtroPersona").value;
    var sumaEdades = 0;
    var cantidadPersonas = 0;

    for (var i = 1; i < filas.length; i++) {
        var fila = filas[i];
        var tipoPersona = fila.cells[4].textContent === "-" ? "extranjero" : "ciudadano";

        if (filtro === "todos" || tipoPersona === filtro) {
            var fechaNacimientoString = fila.cells[3].innerText;
            var partesFecha = fechaNacimientoString.match(/(\d{4})(\d{2})(\d{2})/);
            var fechaNacimientoObj = new Date(partesFecha[1], partesFecha[2] - 1, partesFecha[3]);
            var fechaActual = new Date();
            var anoActual = fechaActual.getFullYear();
            var edad = anoActual - fechaNacimientoObj.getFullYear();

            sumaEdades += edad;
            cantidadPersonas++;
        }
    }

    var edadPromedio = cantidadPersonas > 0 ? sumaEdades / cantidadPersonas : 0;

    var textEdadPromedio = document.getElementById("promedio");
    textEdadPromedio.value = edadPromedio.toFixed(2);

    return edadPromedio;
}

// Actualizar la tabla segun el filtro
function cambiarFiltro() {
    var filtro = document.getElementById("filtroPersona").value;

    if (filtro === "ciudadano") {
        vaciarTabla();
        cargarListaPersonas(listaCiudadanos);
    } else if (filtro === "extranjero") {
        vaciarTabla();
        cargarListaPersonas(listaExtranjeros);
    } else {
        vaciarTabla();
        cargarListaPersonas(listaPersonas);
    }

    filtrarDatos(filtro);
}

function vaciarTabla() {
    var tabla = document.getElementById("tablaPersonas");
    var filas = tabla.rows.length;

    for (var i = filas - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
}

function generarId() {
    var id = table.rows.length - 1; 
    var filas = table.rows.length;

    for (var i = filas - 1; i > 0; i--) {
        if (id == table.rows[i].cells[0].innerText) {
            id++;
            break;
        }
    }

    return id;
}


function cargarPersonas() {
    for (var i = 0; i < listaPersonas.length; i++) {
        if (listaPersonas[i] instanceof Extranjero) {
            listaExtranjeros.push(listaPersonas[i]);
        } else if (listaPersonas[i] instanceof Ciudadano) {
            listaCiudadanos.push(listaPersonas[i]);
        }
    }
}

// Elimina el elemento de la posición index
function eliminarPersona(index) {
    if (index > -1) {
        listaPersonas.splice(index, 1);
    }
}

// Carga una lista nueva
function obtenerListaPersonas(personas) {
    if (personas) {
        listaPersonas = [];

        Array.prototype.push.apply(listaPersonas, personas);
    }
}
function mostrarForm() {
    var formulario = document.getElementById("formAbm");
    var tabla = document.getElementById("tablaPersonas");
    var botonAgregar = document.getElementById("botonAgregar");
    var datosTabla = document.getElementById("datosTabla");


    formulario.style.display = (formulario.style.display === "none") ? "block" : "none";
    datosTabla.style.display = (datosTabla.style.display === "none") ? "block" : "none";

}

// puede cambiar de ciudadano a extranjero en caso de error
function mostrarFormConDatos(tabla)
{
    var formulario = document.getElementById("formAbm");
    var datosTabla = document.getElementById("datosTabla");

    var fila = event.target.parentNode;

    var celdas = fila.getElementsByTagName("td");
    
    var nombre = celdas[1].innerText;
    var apellido = celdas[2].innerText;
    var fechaNacimiento = celdas[3].innerText;
    var dni = celdas[4].innerText;
    var paisOrigen = celdas[5].innerText;

    var index = fila.rowIndex;
    var formAbm = document.getElementById("formAbm");
    index = parseInt(index);

    formAbm.setAttribute("index", index);

    var indexForm = formAbm.getAttribute("index");

    cargarForm(nombre, apellido, fechaNacimiento, dni, paisOrigen, index)

    formulario.style.display = (formulario.style.display === "none") ? "block" : "none";
    datosTabla.style.display = (datosTabla.style.display === "none") ? "block" : "none";
}

function cargarForm(nombre, apellido, fechaNacimiento, dni, paisOrigen, index)
{


    if (nombre !== null && apellido !== null && fechaNacimiento !== null && dni !== null && paisOrigen !== null) {

        document.getElementById("nombre").value = nombre;
        document.getElementById("apellido").value = apellido;
        document.getElementById("fechaNacimiento").value = fechaNacimiento;
    
        var tipoPersonaSelect = document.getElementById("tipoPersona");
        var botonAgregar = document.getElementById("botonAgregar");

    }

}

function modificarTabla(tabla)
{

    var fila = event.target.parentNode;
    var celdas = fila.getElementsByTagName("td");
    var index = document.getElementById("formAbm").getAttribute("index");

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value;
    var dni = document.getElementById("dni").value;
    var paisOrigen = document.getElementById("paisOrigen").value;

    if(validar(tipoPersona.value, generarPersona()) == true) {
        modificarPersona(index-1, nombre, apellido, fechaNacimiento, dni, paisOrigen);
        actualizarTabla(index, nombre, apellido, fechaNacimiento, dni, paisOrigen);
        alert("Modificado con exito");
    }else
    {
        alert("Error al modificar, faltan datos para el tipo");
    }

    restablecerForm();

}

function EliminarFilaTabla() {

    var formAbm = document.getElementById("formAbm");
    var index = parseInt(formAbm.getAttribute("index"));
    
    if (!isNaN(index) && index > 0) {
        var tabla = document.getElementById("tablaPersonas");
        tabla.deleteRow(index);
        eliminarPersona(index - 1);
        formAbm.setAttribute("index", -1);
    } else {
        console.error("Índice de fila no válido o no selecciono una persona");
    }

}


function actualizarTabla(index, nombre, apellido, fechaNacimiento, dni, paisOrigen) {
    var fila = document.getElementById("tablaPersonas").rows[index];

    if (fila) {
        fila.cells[1].textContent = nombre;
        fila.cells[2].textContent = apellido;
        fila.cells[3].textContent = fechaNacimiento;
        fila.cells[4].textContent = dni || '-';
        fila.cells[5].textContent = paisOrigen || '-';

    }
}

function ocultarFila(idFila)
{
    var tabla = document.getElementById("tablaPersonas");
    var filas = tabla.rows;

    for (var i = 0; i < filas.length; i++) {
    var celda = filas[i].cells[idFila];
        if (celda) {
            celda.style.display = celda.style.display === 'none' ? 'table-cell' : 'none';
        }
    }
}

function filtrarDatos(filtro) {

    var tabla = document.getElementById("tablaPersonas");
    var filas = tabla.rows;

    for (var i = 0; i < filas.length; i++) {
        var dni = filas[i].cells[4].textContent; 
        var paisOrigen = filas[i].cells[5].textContent; 

        if (filtro === "ciudadano" && dni == "-") {
            filas[i].style.display = "none";
        } else if (filtro === "extranjero" && paisOrigen == "-") {
            filas[i].style.display = "none";
        } else{
            filas[i].style.display = "table-row";
        }
    }
}



function restablecerForm() {
    var tipoPersonaSelect = document.getElementById("tipoPersona");
    var botonAgregar = document.getElementById("botonAgregar");
    var indexForm = document.getElementById("index");

    botonAgregar.disabled = false;   
    document.getElementById("formAbm").setAttribute("index", -1);

}

function ordenarPor(columna) {
    var tabla = document.getElementById("tablaPersonas");
    var filas = tabla.rows;
    var esNumerico = ["id", "fechaNacimiento", "dni"];

    var filasArray = Array.from(filas);

    var filasDatos = filasArray.slice(1);

    filasDatos.sort(function(a, b) {
        var valorA = a.cells[columna].textContent.trim();
        var valorB = b.cells[columna].textContent.trim();

        if (esNumerico.includes(columna)) {
            valorA = parseFloat(valorA) || 0;
            valorB = parseFloat(valorB) || 0;
        }

        if (valorA < valorB) {
            return -1;
        } else if (valorA > valorB) {
            return 1;
        } else {
            return 0;
        }
    });

    // Reorganiza las filas en la tabla
    for (var i = 0; i < filasDatos.length; i++) {
        tabla.appendChild(filasDatos[i]);
    }

    obtenerListaPersonas(obtenerArrayPersonas());
}

function obtenerListaPersonas(personas) {
    if (personas) {
        listaPersonas = [];

        Array.prototype.push.apply(listaPersonas, personas);
    }
}

function obtenerArrayPersonas() {
    var tabla = document.getElementById("tablaPersonas");
    var filas = tabla.rows;
    var arrayPersonas = [];

    for (var i = 1; i < filas.length; i++) { 
        var celdas = filas[i].cells;
        var persona = {
            id: celdas[0].textContent,
            nombre: celdas[1].textContent,
            apellido: celdas[2].textContent,
            fechaNacimiento: celdas[3].textContent,
            dni: celdas[4].textContent,
            paisOrigen: celdas[5].textContent,
        };
        arrayPersonas.push(persona);
    }

    return arrayPersonas;
}
