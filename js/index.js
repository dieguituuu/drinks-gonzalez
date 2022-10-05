const edad = parseInt(prompt('¿Cuantos años tenes?'))

const carritoDiv = document.getElementById('carrito')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonCarrito = document.getElementById('boton-carrito')

const carrito = []

if(edad >=18) {
    Swal.fire(
        '¡Bienvenido/a a Mystic Drinks!',
        'Tenes edad para comprar alcohol.',
        'success'
      )
  } else {
    Swal.fire(
        ':(',
        'Sos menor de edad.',
        'error'
      )
    document.getElementById('blanco').style.display = "none";
  }

const producto = fetch('./js/productos.json')
.then(response=>response.json())
.then(info => {
    const contenedorProductos = document.getElementById('prod-content')
    info.forEach((producto) => {
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