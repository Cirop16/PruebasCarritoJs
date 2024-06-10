// la estructura del producto

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

// el carrito de compras

class Carrito {
    constructor() {
        this.productos = [];
    }

    // para agregar producto al carrito

    agregarProducto(producto) {
        this.productos.push(producto);

        // para guardar el carrito en localStorage

        localStorage.setItem('carrito', JSON.stringify(this.productos));
    }

    // calcular el total

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }
}

// aca crear un nuevo carrito

let carrito = new Carrito();

// cargar el carrito de localStorage

if (localStorage.getItem('carrito')) {
    carrito.productos = JSON.parse(localStorage.getItem('carrito'));
}

// la funcion para agregar un producto al carrito

function agregarProducto() {
    let nombre = prompt("Ingrese un producto de la lista:");
    let precio = prompt("Ingrese el precio del producto:");
    if (nombre && precio) {
        carrito.agregarProducto(new Producto(nombre, precio));
        mostrarCarrito();
    } else {
        alert("Por favor, ingrese un nombre y un precio validos.");
    }
}

// otra funcion para mostrar el carrito

function mostrarCarrito() {
    let tabla = document.getElementById('tablaCarrito');

    // limpiar la tabla

    tabla.innerHTML = '<tr><th>Producto</th><th>Precio</th></tr>';

    // sumar los productos a la tabla

    for (let producto of carrito.productos) {
        let fila = tabla.insertRow();
        let celda1 = fila.insertCell();
        let celda2 = fila.insertCell();
        celda1.textContent = producto.nombre;
        celda2.textContent = producto.precio;
    }
    // enseñar el total

    let total = carrito.calcularTotal();
    alert("El total es: " + total);
}

// aca la funcion para limapiar el carrito

function limpiarCarrito() {
    if (confirm("¿Seguro que queres limpiar el carrito?")) {
        // Limpiar el localStorage
        localStorage.removeItem('carrito');
        // Limpiar el array de productos
        carrito.productos = [];
        // Limpiar la tabla
        let tabla = document.getElementById('tablaCarrito');
        tabla.innerHTML = '<tr><th>Producto</th><th>Precio</th></tr>';
    }
}
