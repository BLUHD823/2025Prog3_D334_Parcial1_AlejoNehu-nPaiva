let frutas = [
    {id:1, nombre:"Arándano", precio: 5000, ruta_img: "./img/arandano.jpg"},
    {id:2, nombre:"Banana", precio: 1000, ruta_img: "./img/banana.jpg"},
    {id:3, nombre:"Frambuesa", precio: 4000, ruta_img: "./img/frambuesa.png"},
    {id:4, nombre:"Frutilla", precio: 3000, ruta_img: "./img/frutilla.jpg"},
    {id:5, nombre:"Kiwi", precio: 2000, ruta_img: "./img/kiwi.jpg"},
    {id:6, nombre:"Mandarina", precio: 800, ruta_img: "./img/mandarina.jpg"},
    {id:7, nombre:"Manzana", precio: 1500, ruta_img: "./img/manzana.jpg"},
    {id:8, nombre:"Naranja", precio: 9000, ruta_img: "./img/naranja.jpg"},
    {id:9, nombre:"Pera", precio: 2500, ruta_img: "./img/pera.jpg"},
    {id:10, nombre:"Ananá", precio: 3000, ruta_img: "./img/anana.jpg"},
    {id:11, nombre:"Pomelo Amarrillo", precio: 2000, ruta_img: "./img/pomelo-amarillo.jpg"},
    {id:12, nombre:"Pomelo Rojo", precio: 2000, ruta_img: "./img/pomelo-rojo.jpg"},
    {id:13, nombre:"Sandía", precio: 2700, ruta_img: "./img/sandia.jpg"},
];

/*---------------------
VARIABLES DEL DOM
-----------------------*/
let label = document.getElementById("label-datos-alumno");
let listaFrutas = document.getElementById("lista-frutas");
let barraDeBusqueda = document.getElementById("barra-busqueda");
let carritoContenedor = document.getElementById("carrito-contenedor");
let datosCarritos = document.getElementById("carrito-datos");
let totalTexto = document.getElementById("total-carrito");

let carrito = [];
let htmlCarrito = "";

const alumno = {
    dni : "45.753.375",
    nombre : "Alejo Nehuén",
    apeliido : "Paiva"
};

/*---------------------
ESCUCHADORES DE EVENTOS
-----------------------*/
barraDeBusqueda.addEventListener("input", filtrarProducto)

/*---------------------
FUNCIONES
-----------------------*/

//EJERCICIO 2: IMPRIMIR DATOS DE ALUMNO 
function imprimirDatosAlumno() { //Imprime los datos del alumno en un texto o label específico
    label.textContent = `DNI: ${alumno.dni} - NOMBRE COMPLETO: ${alumno.nombre} ${alumno.apeliido}`; //Modifica el texto del label para poner los datos del alumno
    console.log(`DNI: ${alumno.dni} - NOMBRE COMPLETO: ${alumno.nombre} ${alumno.apeliido}`);
}

//EJERCICIO 3: MOSTRAR FRUTAS
function mostrarLista(array) //Muestra en distintas cartas el array de productos 
{
    let htmlProductos = "";
    array.forEach(fruta=>{ //Por cada elemento del array agrega estas etiquetas html y las agrega a htmlProductos
        htmlProductos += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button onclick="agregarCarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `
    })
    listaFrutas.innerHTML = htmlProductos; //Modifica el html al contenido de htmlProductos
}

//EJERCICIO 4: FILTRAR POR BARRA DE BUSQUEDA
function filtrarProducto() { //filtra los distintos productos dependiendo de lo escrito en la barra de búsqueda
    let valorBusqueda = barraDeBusqueda.value.toLowerCase(); //Todo lo escrito en la barra de tareas se parsea a minúscula para evitar errores en el filtrado
    let productosFiltrados = frutas.filter(fruta => {
        return fruta.nombre.toLowerCase().includes(valorBusqueda) //Crea un nuevo array con lo que coincide del texto de la barra de búsqueda
    })
    mostrarLista(productosFiltrados);
}


//EJERCICIO 5: Carrito

function mostrarCarrito(){ //Encargada de mostrar el producto en el carrito
    
    htmlCarrito = "<ul>";
       carrito.forEach( (fruta, index) => { //Crea etiquetas html, con los datos de los productos agregados al carrito, en lista
        htmlCarrito += 
        ` 
        <li class="bloque-item">
            <p class="nombre-item">${fruta.nombre} - ${fruta.precio}</p>
            <button onclick="eliminarCarrito(${index})" class="boton-eliminar">Eliminar</button>
        </li>
        `;
    })
    htmlCarrito += //cierra la lista luego de que se agreguen todos los productos en el carrito
    `
        </ul>
    `;
    console.log("Carrito quedó:");
    console.log(carrito);
    carritoContenedor.innerHTML = htmlCarrito;
    cantidadProductos()
    totalCarrito()
}

function agregarCarrito(idFruta) { //Encargada de agregar el producto al carrito
    console.log("Agregado al carrito: " + idFruta);
    carrito.push(frutas.find(fruta => fruta.id == idFruta)); //Usando el id que nos dan por los parametros de la función se agrega al carrito solo si coincide con el id de algún producto de la lista de productos
    mostrarCarrito();
    actualizarCarrito()
}

function eliminarCarrito(index) //elimina por índice
{
    carrito.splice(index, 1); //Usando splice y usando el índice del producto en el carrito eliminamos solo 1 iteración del producto en todo el array
    mostrarCarrito();
    actualizarCarrito()
}

//EJERCICIO 6: Almacenar productos en el localstorage
function cargarCarrito() //Carga los datos que quedaron en el local storage
{
    let textoCarritoLeido = localStorage.getItem("carrito"); //Busca los datos del carrito en el local storage

    if (!textoCarritoLeido)
    {
        mostrarCarrito(); //Si no encuentra nada, solo mostrará los datos default del carrito(ningún elemento)
    }
    else
    {
        console.log("SE INTENTA PARSEAR EL CARRITO");
        carrito = JSON.parse(textoCarritoLeido); //Si encuentra datos del carrito en local storage los toma, los almacena y los muestra
        mostrarCarrito();
    }
}

function actualizarCarrito() //actualiza el carrito con los datos del localstorage
{
    localStorage.setItem("carrito", JSON.stringify(carrito)); //Guarda los datos del carrito al mismo nombre en formato Json
}

//EJERCICIO 7: Contador de productos carrito
function cantidadProductos() { //Modifica un texto para que muestre la cantidad de productos en el carrito usando lenght
    datosCarritos.textContent = `Carrito: ${carrito.length} Productos`;
}

function totalCarrito() { //Suma todos los precios de los productos del carrito
    let numeroTotal = 0;
    carrito.forEach(fruta =>{ //Usando for each se suman todos los elementos
        numeroTotal += fruta.precio;
    })
    totalTexto.textContent = `TOTAL: $ ${numeroTotal}`; //Se modifica el contenido de un texto para mostrar los datos
}

//EJERCICIO 8: Botones ordenar
function ordenarNombre() { //Ordena la lista de productos por nombre
    frutas.sort(function(a, b){return a.nombre.localeCompare(b.nombre)}); //Para comparar strings se usa una función locale compare y con esa comparación modificar el orden del array
    mostrarLista(frutas);
}

function ordenarMenorAMayor() { //Ordena la lista de mayor a menor 
    frutas.sort(function(a, b){return a.precio - b.precio}); //Para ordenar de menor a mayor primero tengo que comparar restando dos números. Si da negativo, a es menor. Pero si la diferencia es mayor a 0, a es mayor
    mostrarLista(frutas);
}

//EJERCICIO 9: VaciarCarrito
function vaciarCarrito(){ //Setea a null los elementos del array carrito
    carrito = [];
    mostrarCarrito();

    vaciarCarritoLocalStorage();
}

function vaciarCarritoLocalStorage() //Elimina el array del local storage
{
    localStorage.removeItem("carrito");
}



function init (){
    imprimirDatosAlumno();
    cargarCarrito()
    mostrarLista(frutas);
    cantidadProductos()
    totalCarrito()
}

init()