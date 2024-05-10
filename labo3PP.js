var formulario = document.getElementById("formDatos");
var botonAgregar = document.getElementById("botonAgregar");
var table = document.getElementById("tablaPersonas");

var cadena = '[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000},{"id":2,"nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000},{"id":3, "nombre":"Facundo","apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000},{"id":4, "nombre":"Fernando", "apellido":"Nieto","edad":18, "compras":8000, "telefono":"152111131"},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20,"compras":50000, "telefono":"42040077"},{"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23,"compras":7000, "telefono":"1813181563"}]';

// clase de persona
class Persona {
    id = 0;
    nombre;
    apellido;
    edad = 0;

    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString(){}
}

// clase de empleado
class Empleado extends Persona {
    sueldo;     
    ventas; 

    constructor(sueldo, ventas,  id, nombre, apellido, edad) {
        super(id, nombre, apellido, edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    } 
}

// clase de cliente
class Cliente extends Persona {    
    compras;    
    telefono;  

    constructor(compras, telefono,  id, nombre, apellido, edad) {
        super(id, nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }  
}

listaPersonas = toString(cadena);
cargarListaPersonas(listaPersonas);

function toString(cadenaDatos) {
    let arrayObjetos = JSON.parse(cadenaDatos);

    let personas = arrayObjetos.map(objeto => {
        if ('ventas' in objeto) {
            let empleado = new Empleado(objeto.sueldo, objeto.ventas, objeto.id, objeto.nombre, objeto.apellido, objeto.edad);
            return empleado;
        } else if ('telefono' in objeto) {
            let cliente = new Cliente(objeto.compras, objeto.telefono, objeto.id, objeto.nombre, objeto.apellido, objeto.edad);
            return cliente;
        } else {
            return new Persona(objeto.id, objeto.nombre, objeto.apellido, objeto.edad);
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
    var edad = document.getElementById("edad").value;
    var sueldo = document.getElementById("sueldo").value;
    var ventas = document.getElementById("ventas").value;
    var compras = document.getElementById("compras").value;
    var telefono = document.getElementById("telefono").value;

    var id = generarId();

    let tipoPersona = document.getElementById("tipoPersona").value;

    if (tipoPersona === "empleado") {
        return new Empleado(sueldo, ventas, id, nombre, apellido, edad);
    } else {
        return new Cliente(compras, telefono, id,  nombre, apellido, edad);
    }

}

function obtenerTipo(persona)
{
    if(persona.hasOwnProperty('telefono'))
    {
        return "cliente";
    }else{
        return "empleado";
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
            var cellEdad = newRow.insertCell(3);
            var cellSueldo = newRow.insertCell(4);
            var cellVentas = newRow.insertCell(5);
            var cellCompras = newRow.insertCell(6);
            var cellTelefono = newRow.insertCell(7);

            cellId.innerHTML = persona.id;
            cellNombre.innerHTML = persona.nombre;
            cellApellido.innerHTML = persona.apellido;
            cellEdad.innerHTML = persona.edad;

            if (persona instanceof Empleado) {
                cellSueldo.innerHTML = persona.sueldo || "-";
                cellVentas.innerHTML = persona.ventas || "-";
                cellCompras.innerHTML = "-";
                cellTelefono.innerHTML = "-";
            } else if (persona instanceof Cliente) {
                cellSueldo.innerHTML = "-";
                cellVentas.innerHTML = "-";
                cellCompras.innerHTML = persona.compras || "-";
                cellTelefono.innerHTML = persona.telefono || "-";
            } else {
                cellSueldo.innerHTML = "-";
                cellVentas.innerHTML = "-";
                cellCompras.innerHTML = "-";
                cellTelefono.innerHTML = "-";
            }
        }else{
            alert("error, verificar datos");
        }
    }else{
        alert("Error, solo modificar o eliminar");
    }
}
    
// modifica la persona de listaPersonas
function modificarPersona(index, nombre, apellido, edad, nuevoSueldo, nuevaVenta, nuevaCompra, nuevoTelefono) {
    if (index >= 0 && index < listaPersonas.length) {
        listaPersonas[index].nombre = nombre;
        listaPersonas[index].apellido = apellido;
        listaPersonas[index].edad = edad;

        if (listaPersonas[index] instanceof Empleado) {
            listaPersonas[index].sueldo = nuevoSueldo;
            listaPersonas[index].ventas = nuevaVenta;
        } else if (listaPersonas[index] instanceof Cliente) {
            listaPersonas[index].compras = nuevaCompra;
            listaPersonas[index].telefono = nuevoTelefono;
        }

        console.log("Persona modificada:", listaPersonas[index].nombre);
    } else {
        alert("Error en la modificacion");
    }
}

function actualizarInput(tipoPersona) {
    var sueldoInput = document.getElementById("sueldo");
    var ventasInput = document.getElementById("ventas");
    var comprasInput = document.getElementById("compras");
    var telefonoInput = document.getElementById("telefono");

    sueldoInput.disabled = false;
    ventasInput.disabled = false;
    comprasInput.disabled = false;
    telefonoInput.disabled = false;

    sueldoInput.value = "";
    ventasInput.value = "";
    comprasInput.value = "";
    telefonoInput.value = "";

    sueldoInput.style.visibility = 'hidden';
    ventasInput.style.visibility = 'hidden';
    comprasInput.style.visibility = 'hidden';
    telefonoInput.style.visibility = 'hidden';

    if (tipoPersona === "empleado") {
        sueldoInput.style.visibility = 'visible';
        ventasInput.style.visibility = 'visible';    
        comprasInput.disabled = true;
        telefonoInput.disabled = true;
   
    } else if (tipoPersona === "cliente") {
        comprasInput.style.visibility = 'visible';
        telefonoInput.style.visibility = 'visible';
        sueldoInput.disabled = true;
        ventasInput.disabled = true;

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
    if (persona.nombre !== "" && persona.apellido !== "" && persona.edad !== "" && persona.edad > -1) {
        if (tipoPersona === "empleado") {
            if (persona.sueldo !== "" && persona.ventas !== "") {
                return true;
            }
        } else if (tipoPersona === "cliente") {
            if (persona.compras !== "" && persona.telefono !== "" && persona.telefono > 0) {
                return true;
            }
        }
    }
    return false;
}

function calcularEdadPromedio() {
    var table = document.getElementById("tablaPersonas");
    var filas = table.rows.length;
    var sumaEdades = 0;

    for (var i = 1; i < filas; i++) {
        var celdaEdad = parseInt(table.rows[i].cells[3].innerText);

        if (!isNaN(celdaEdad)) {
            sumaEdades += celdaEdad;
        }
    }

    var cantidadFilasValidas = filas - 1;
    var edadPromedio = cantidadFilasValidas > 0 ? sumaEdades / cantidadFilasValidas : 0;

    var textEdadPromedio = document.getElementById("promedio");
    textEdadPromedio.value = edadPromedio.toFixed(2); 

    return edadPromedio;
}

// Actualizar la tabla segun el filtro
function cambiarFiltro() {
    var filtro = document.getElementById("filtroPersona").value;

    if (filtro === "Empleado") {
        vaciarTabla();
        cargarListaPersonas(listaEmpleados);
    } else if (filtro === "Cliente") {
        vaciarTabla();
        cargarListaPersonas(listaClientes);
    } else {
        vaciarTabla();
        cargarListaPersonas(listaPersonas);
    }
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
        if (listaPersonas[i] instanceof Cliente) {
            listaClientes.push(listaPersonas[i]);
        } else if (listaPersonas[i] instanceof Empleado) {
            listaEmpleados.push(listaPersonas[i]);
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

// puede cambiar de empleado a cliente en caso de error
function mostrarFormConDatos(tabla)
{
    var formulario = document.getElementById("formAbm");
    var datosTabla = document.getElementById("datosTabla");

    var fila = event.target.parentNode;

    var celdas = fila.getElementsByTagName("td");
    
    var nombre = celdas[1].innerText;
    var apellido = celdas[2].innerText;
    var edad = celdas[3].innerText;
    var sueldo = celdas[4].innerText;
    var ventas = celdas[5].innerText;
    var compras = celdas[6].innerText;
    var telefono = celdas[7].innerText;


    var index = fila.rowIndex;
    var formAbm = document.getElementById("formAbm");
    index = parseInt(index);

    formAbm.setAttribute("index", index);

    var indexForm = formAbm.getAttribute("index");

    cargarForm(nombre, apellido, edad, sueldo, ventas, compras, telefono, index)

    formulario.style.display = (formulario.style.display === "none") ? "block" : "none";
    datosTabla.style.display = (datosTabla.style.display === "none") ? "block" : "none";
}

function cargarForm(nombre, apellido, edad, sueldo, ventas, compras, telefono, index)
{


    if (nombre !== null && apellido !== null && edad !== null && sueldo !== null && ventas !== null && compras !== null && telefono !== null) {

        document.getElementById("nombre").value = nombre;
        document.getElementById("apellido").value = apellido;
        document.getElementById("edad").value = edad;
    
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
    var edad = document.getElementById("edad").value;
    var sueldo = document.getElementById("sueldo").value;
    var ventas = document.getElementById("ventas").value;
    var compras = document.getElementById("compras").value;
    var telefono = document.getElementById("telefono").value;

    if(validar(tipoPersona.value, generarPersona()) == true) {
        modificarPersona(index-1, nombre, apellido, edad, sueldo, ventas, compras, telefono);
        actualizarTabla(index, nombre, apellido, edad, sueldo, ventas, compras, telefono);
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


function actualizarTabla(index, nombre, apellido, edad, sueldo, ventas, compras, telefono) {
    var fila = document.getElementById("tablaPersonas").rows[index];

    if (fila) {
        fila.cells[1].textContent = nombre;
        fila.cells[2].textContent = apellido;
        fila.cells[3].textContent = edad;
        fila.cells[4].textContent = sueldo || '-';
        fila.cells[5].textContent = ventas || '-';
        fila.cells[6].textContent = compras || '-';
        fila.cells[7].textContent = telefono || '-';

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
        var sueldo = filas[i].cells[4].textContent; 
        var compras = filas[i].cells[7].textContent; 

        if (filtro === "empleado" && sueldo == "-") {
            filas[i].style.display = "none";
        } else if (filtro === "cliente" && compras == "-") {
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
    var esNumerico = ["id", "edad", "telefono"];

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
            edad: celdas[3].textContent,
            sueldo: celdas[4].textContent,
            ventas: celdas[5].textContent,
            compras: celdas[6].textContent,
            telefono: celdas[7].textContent

        };
        arrayPersonas.push(persona);
    }

    return arrayPersonas;
}
