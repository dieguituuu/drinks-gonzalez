// Se pregunta la edad para corroborar que sea mayor de edad. En caso de que no lo sea, no se le permite entrar en la página.
// const edad = parseInt(prompt('¿Cuantos años tenes?'))

// if(edad >=18) {
//     Swal.fire(
//         '¡Bienvenido/a a Mystic Drinks!',
//         'Tenes edad para comprar alcohol.',
//         'success'
//       )
//   } else {
//     Swal.fire(
//         ':(',
//         'Sos menor de edad.',
//         'error'
//       )
//     document.getElementById('blanco').style.display = "none";
//   }

// Constantes necesarias para el funcionamiento del carrito.
const carritoDiv = document.getElementById('carrito')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonCarrito = document.getElementById('boton-carrito')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function crearProductos(arr) {
    const contenedorProductos = document.getElementById('prod-content')
    arr.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML =  `
    <div class='prod-cards'>
    <img src='./assets/${producto.img}' alt='' class='prod-img'>
    <h3 class='prod-nombre'>${producto.nombre}</h3>
    <p class='prod-precio'>${producto.precio}</p>
    <button id='agregar${producto.id}' class='prod-btn'>Agregar al carrito</button>
    </div>
    `
    contenedorProductos.appendChild(div)
})
}




// Se guardan los productos en localStorage.
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        // actualizarCarrito()
    }
})

// Funcionalidad al boton "vaciar carrito".
botonVaciar.addEventListener('click', () => {
    carrito = []
    actualizarCarrito()
})

function agregarFuncionBoton(arr) {
    arr.forEach(producto => {  
    document.querySelector(`#agregar${producto.id}`).addEventListener('click', () => {
    agregarAlCarrito(producto)})
})
}  

function agregarAlCarrito(producto){
        let existe = carrito.some(prod=>prod.id === producto.id)
        if(existe === false){
          producto.cantidad = 1;
          carrito.push(producto)
        }
        else{
          let prodFind = carrito.find(prod=> prod.id === producto.id);
          prodFind.cantidad++;
        }
        actualizarCarrito()
}        

function actualizarCarrito()  {
    carrito.forEach(producto=> {
        let div = document.createElement('div')
        div.innerHTML +=`
        <div class='productoEnCarrito'>
        <p>${producto.nombre}</p>
        <p class= 'carrito-prod-precio'>${producto.precio}</p>
        <p class= 'carrito-prod-cant'>${producto.cantidad}</p>
        <button onclick='eliminarDelCarrito(${producto.id})' class='boton-eliminar'><i class='fas fa-trash-alt'></i></button>
        </div>
        `
        contenedorCarrito.appendChild(div)

    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
    contadorCarrito.innerText = carrito.lenght
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

// Función para eliminar productos del carrito.
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

// Función para actualizar el carrito.

// Función para que se acumulen los productos iguales dentro del carrito.
function renderizarCarrito(producto) {
    const existe = carrito.some(prod=>prod.id === producto.id)
    if(existe === false) {
        producto.cant = 1;
        carrito.push(producto)
    } else {
        const encontrarProd = carrito.find(prod=> prod.id ===producto.id);
        encontrarProd.cant++;
    }
}

// Constantes necesarias para el modal del carrito.
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


// Evento para abrir el modal del carrito.
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

// Evento para cerrar el modal del carrito.
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

// Evento para poder cerrar el modal del carrito.
contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')
})

// Evento para que no se cierre el modal del carrito automáticamente al vaciarlo.
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})

function productos() {
    fetch('./js/productos.json')
    .then(res=>res.json())
    .then(info => { crearProductos(info)
    agregarFuncionBoton(info)})
}

productos()