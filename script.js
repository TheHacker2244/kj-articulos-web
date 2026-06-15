// BASE DE DATOS DE PRODUCTOS DE K&J ARTÍCULOS ONLINE
const productos = [
    // --- CATEGORÍA FIGURAS ---
    { id: 1, nombre: "Figura Luffy y Shanks", categoria: "figuras", subcategoria: "onepiece", precio: 25.00, img: "img/onepiece_figura2.jpg", descripcion: "Base negra, 15cm de alto" },
    { id: 2, nombre: "Figura Frieren (Elf)", categoria: "figuras", subcategoria: "anime", precio: 30.00, img: "img/fierenfigura.jpg", descripcion: "Edición coleccionista" },
    { id: 3, nombre: "Figura Goku Súper Saiyan", categoria: "figuras", subcategoria: "dragon-ball", precio: 25.00, img: "img/figuragoku.jpg", descripcion: "Goku en modo Super Saiyan" },
    { id: 16, nombre: "Figura Inuyasha", categoria: "figuras", subcategoria: "inuyasha", precio: 27.00, img: "img/inuyasha.jpg", descripcion: "Inuyasha con espada" },
    { id: 17, nombre: "Figura Pikachu", categoria: "figuras", subcategoria: "pokemon", precio: 22.00, img: "img/pikachu.jpg", descripcion: "Figura coleccionable de Pikachu" },
    { id: 18, nombre: "Figura Mario Bros", categoria: "figuras", subcategoria: "Mario", precio: 28.00, img: "img/FiguraMarioBros.jpg", descripcion: "Figura de Mario Bros Clásica" },

    // --- CATEGORÍA PELUCHES ---
    { id: 4, nombre: "Peluche Sonic", categoria: "peluches", precio: 18.00, img: "img/peluche.jpg", descripcion: "Peluche suave azul" },
    { id: 5, nombre: "Peluche Badtz-Maru (Sanrio)", categoria: "peluches", precio: 20.00, img: "img/peluche2.jpg", descripcion: "Sanrio original" },
    { id: 6, nombre: "Peluche Goku", categoria: "peluches", precio: 15.00, img: "img/peluche3.jpg", descripcion: "Goku sin transformación" },
    { id: 7, nombre: "Peluche Anya Forger", categoria: "peluches", precio: 22.00, img: "img/peluche4.jpg", descripcion: "Spy x Family" },

    // --- CATEGORÍA ELECTRÓNICOS ---
    { id: 8, nombre: "Audífonos P9 Max", categoria: "electronicos", precio: 35.00, img: "img/auriculares.jpg", descripcion: "Cancelación de ruido" },
    { id: 9, nombre: "Llavero Seven Deadly Sins", categoria: "electronicos", precio: 5.00, img: "img/llavero7pecados.jpg", descripcion: "Llavero metálico" },

    // --- CATEGORÍA SNACKS / COMIDA ---    
    { id: 10, nombre: "Bebida Ramune (Sabores)", categoria: "snacks", precio: 3.50, img: "img/ramens.jpg", descripcion: "Sabor a fresa o limón" },
    { id: 11, nombre: "Snacks Cantabile (Colección Pingüino)", categoria: "snacks", precio: 4.50, img: "img/bebidas_coreanas.jpg", descripcion: "Bolsas de 80g" },
    { id: 12, nombre: "Ramen Buldak (Picante)", categoria: "snacks", precio: 5.00, img: "img/ramens2.jpg", descripcion: "Nivel de picante 3/5" },
    { id: 13, nombre: "Paleta de Fruta Mango", categoria: "snacks", precio: 6.00, img: "img/helado_mango.jpg", descripcion: "Helado de mango" },
    { id: 14, nombre: "Paleta de Fruta Melocotón", categoria: "snacks", precio: 6.00, img: "img/helados.jpg", descripcion: "Helado de melocotón" },
    { id: 15, nombre: "Paleta de Limón", categoria: "snacks", precio: 6.00, img: "img/helado_limon.jpg", descripcion: "Helado de limón" }
];

// (EL RESTO DE TU CÓDIGO JS SE MANTIENE IGUAL DESDE AQUÍ...)
const grid = document.getElementById('grid-productos');
const buscarInput = document.getElementById('buscador');

let categoriaActiva = 'todo';
let subcategoriaActiva = null;

window.onload = function() {
    mostrarProductos(productos);
    actualizarContadorCarrito();
};

function mostrarProductos(lista) {
    grid.innerHTML = '';
    lista.forEach(prod => {
        grid.innerHTML += `
            <div class="product-card" data-categoria="${prod.categoria}">
                <img src="${prod.img}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
                <p>$${prod.precio.toFixed(2)}</p>
                <button class="btn-add-cart" onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${prod.precio}, '${prod.img}', '${prod.descripcion}')">
                    Agregar al carrito
                </button>
            </div>
        `;
    });
}

function buscarProducto() {
    const termino = buscarInput.value.toLowerCase();
    let filtrados;
    if (categoriaActiva === 'todo') {
        filtrados = productos.filter(p => p.nombre.toLowerCase().includes(termino));
    } else {
        filtrados = productos.filter(p => p.categoria === categoriaActiva && p.nombre.toLowerCase().includes(termino));
        if (subcategoriaActiva) {
            filtrados = filtrados.filter(p => p.subcategoria === subcategoriaActiva);
        }
    }
    mostrarProductos(filtrados);
}

function filtrarPor(categoria, subcategoria) {
    categoriaActiva = categoria;
    subcategoriaActiva = subcategoria || null;
    let filtrados;
    if (categoria === 'todo') {
        filtrados = productos;
    } else {
        filtrados = productos.filter(p => p.categoria === categoria);
        if (subcategoriaActiva) {
            filtrados = filtrados.filter(p => p.subcategoria === subcategoriaActiva);
        }
    }
    mostrarProductos(filtrados);
}

let carrito = JSON.parse(localStorage.getItem('carritoKJ')) || [];

function agregarAlCarrito(id, nombre, precio, img, descripcion) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, img, descripcion, cantidad: 1 });
    }
    localStorage.setItem('carritoKJ', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`${nombre} agregado al carrito!`);
}

function actualizarContadorCarrito() {
    const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.getElementById('cart-count');
    if (contador) contador.innerText = count;
}