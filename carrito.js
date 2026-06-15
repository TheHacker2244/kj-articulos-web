document.addEventListener("DOMContentLoaded", function() {
    let carrito = JSON.parse(localStorage.getItem('carritoKJ')) || [];
    const listaCarrito = document.getElementById('lista-productos-carrito');
    const totalSpan = document.getElementById('total-carrito');
    const carritoVacio = document.getElementById('carrito-vacio');
    const carritoContenido = document.getElementById('carrito-contenido');
    const cartCount = document.getElementById('cart-count');

    function renderizarCarrito() {
        listaCarrito.innerHTML = '';

        if (carrito.length === 0) {
            carritoVacio.style.display = 'block';
            carritoContenido.style.display = 'none';
            cartCount.innerText = '0';
            return;
        }

        carritoVacio.style.display = 'none';
        carritoContenido.style.display = 'block';

        let total = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            const descripcion = item.descripcion || 'Sin descripción adicional (consulta con el vendedor)';

            const div = document.createElement('div');
            div.className = 'item-carrito';
            div.innerHTML = `
                <img src="${item.img || 'img/Logo.png'}" alt="${item.nombre}">
                <div class="info-producto">
                    <h4>${item.nombre}</h4>
                    <div class="descripcion">${descripcion}</div>
                </div>
                <div class="precio">$${item.precio.toFixed(2)}</div>
                <div class="cantidad-control">
                    <button class="restar" data-index="${index}">−</button>
                    <span>${item.cantidad}</span>
                    <button class="sumar" data-index="${index}">+</button>
                </div>
                <div class="eliminar-item" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </div>
            `;
            listaCarrito.appendChild(div);
        });

        totalSpan.innerText = `$${total.toFixed(2)}`;
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.innerText = totalItems;

        document.querySelectorAll('.item-carrito .sumar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                carrito[index].cantidad += 1;
                guardarYRenderizar();
            });
        });

        document.querySelectorAll('.item-carrito .restar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad -= 1;
                } else {
                    carrito.splice(index, 1);
                }
                guardarYRenderizar();
            });
        });

        document.querySelectorAll('.item-carrito .eliminar-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                carrito.splice(index, 1);
                guardarYRenderizar();
            });
        });
    }

    function guardarYRenderizar() {
        localStorage.setItem('carritoKJ', JSON.stringify(carrito));
        renderizarCarrito();
    }

    document.getElementById('btn-finalizar-compra').addEventListener('click', function() {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        let mensaje = "Hola K&J! Me gustaría comprar los siguientes productos:\n\n";
        carrito.forEach((item, index) => {
            mensaje += `${index + 1}. ${item.nombre} (${item.descripcion || 'Sin descripción'}) x${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}\n`;
        });
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        mensaje += `\nTotal: $${total.toFixed(2)}\n\nGracias!`;

        const url = `https://wa.me/50360193343?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    });

    renderizarCarrito();
});