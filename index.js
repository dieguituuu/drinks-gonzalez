const edad = parseInt(prompt('¿Cuantos años tenes?'))
const blanco = document.getElementById('blanco')

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
})

const agregarAlCarrito = (prodId) => {
    const item = producto.find((prod) => prod.id === prodId)
    carrito.push(item)
}

const boton = document.getElementById('agregar${producto.id}')
boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id)
    console.log('agregado al carrito')
})

