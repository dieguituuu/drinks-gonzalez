const edad = parseInt(prompt('¿Cuantos años tenes?'))

const blanco = document.getElementById('blanco')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonCarrito = document.getElementById('boton-carrito')
const carritoDiv = document.getElementById('carrito')

if(edad >=18) {
    alert('Bienvenido/a a Mystic Drinks.')
  } else {
    alert('Lo sentimos, sos menor de edad.')
    document.getElementById('blanco').style.display = "none";
  }

const producto = [
    {id: 1, nombre: 'Jägermeister', precio: '$2,200', img: 'jager.jpg'},
    {id: 2, nombre: 'Smirnoff', precio: '$1.400', img: 'smirnoff.jpg'},
    {id: 3, nombre: 'Fernet Branca', precio: '$1.100', img: 'fernet.jpg'},
    {id: 4, nombre: 'Absolut', precio: '$1,650', img: 'absolut.jpg'},
    {id: 5, nombre: 'Jack Daniels', precio: '$3,400', img: 'jack-daniels.jpg'},
    {id: 6, nombre: 'Speed', precio: '$325', img: 'speed.jpg'},
    {id: 7, nombre: 'Red Bull', precio: '$350', img: 'red-bull.jpg'},
    {id: 8, nombre: 'Coca-Cola', precio: '$280', img: 'coca-cola.jpg'},
    {id: 9, nombre: 'Baggio', precio: '$190', img: 'baggio.jpg'},
    {id: 10, nombre: 'Termidor', precio: '$240', img: 'termidor.jpg'},
    {id: 11, nombre: 'Manaos', precio: '$160', img: 'manaos.jpg'}    
]

const contenedorProductos = document.getElementById('prod-content')
const carrito = []

producto.forEach((producto) => {
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
    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

const agregarAlCarrito = (prodId) => {
    const item = producto.find((prod) => prod.id === prodId)
    const existe = carrito.some(prod=>prod.id === producto.id)
    if(existe === false) {
        producto.cantidad = 1;
        carrito.push(producto)
    } else {
        const encontrarProd = carrito.find(prod=> prod.id ===producto.id);
        encontrarProd.cantidad++;
    }
    carrito.push(item)
    actualizarCarrito()
}

const actualizarCarrito = () => {
    carritoDiv.innerHTML = '';
    carrito.forEach(producto=> {
        carritoDiv.innerHTML +=`
        <div class= 'carrito-prod'>
        <h3 class= 'carrito-prod-nombre'>${producto.nombre}</h3>
        <p class= 'carrito-prod-cant'></p>
        <p class= 'carrito-prod-precio'>${producto.precio}</p>

        `
    }
        )
}
    


function renderizarCarrito() {
    const existe = carrito.some(prod=>prod.id === producto.id)
    if(existe === false) {
        producto.cantidad = 1;
        carrito.push(producto)
    } else {
        const encontrarProd = carrito.find(prod=> prod.id ===producto.id);
        encontrarProd.cantidad++;
    }
}