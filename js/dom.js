const imgCarrito = document.getElementById("imgCarrito")
const container = document.querySelector("div#container")
const inputSearch = document.querySelector("input#inputSearch")
const carrito = recuperarCarrito()

function filtrarProductos(valor) {
    let resultado = productos.filter(prenda => prenda.nombre.toLowerCase().includes(valor.toLowerCase()))
        if (resultado.length > 0) {
            cargarProductos(resultado)
        }
}

function retornoCardHTML(prenda) {
return `<div class="card">
            <div class="card-image">${prenda.imagen}</div>
            <div class="card-name">${prenda.nombre}</div>
            <div class="card-price">$ ${prenda.precio}</div>
            <div class="card-button">
                <button class="button button-outline button-add" id="${prenda.id}" title="Clic para agregar al carrito"><img src="images/icons8-carro-favorito-32.png"></button>
            </div>
        </div>`
}

function cargarProductos(array) {
    container.innerHTML = ""
    array.forEach(prenda => {
        container.innerHTML += retornoCardHTML(prenda)
    })
    activarClickEnBotones()
}

inputSearch.addEventListener("search", (e)=> {
    filtrarProductos(e.target.value)
})

function activarClickEnBotones() {
    const botones = document.querySelectorAll("button.button.button-outline.button-add")
          for (const boton of botones) {
            boton.addEventListener("click", ()=> {
                let resultado = productos.find(prenda => prenda.id === parseInt(boton.id))
                    carrito.push(resultado)
                    guardarCarrito()
            })
          }
}

function guardarCarrito() {
    localStorage.setItem("carritoPrenda", JSON.stringify(carrito))
}

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("carritoPrenda")) || []
}

cargarProductos(productos)
recuperarCarrito()