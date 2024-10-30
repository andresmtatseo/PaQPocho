document.addEventListener('DOMContentLoaded', () => {
    // Obtener los productos
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedProductsDiv = document.getElementById('selected-products');
    const totalAmountSpan = document.getElementById('total-amount');

    // Mostrar los productos
    if (cart.length > 0) {
        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `<strong>${item.name}</strong> - $${item.price.toFixed(2)}`;
            selectedProductsDiv.appendChild(productDiv);
        });
    } else {
        selectedProductsDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
    }

    // Calcular y mostrar el total de la compra
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmountSpan.textContent = total.toFixed(2);

    // Métodos de pago
    const metodoPagoSelect = document.getElementById('metodo-pago');
    const pagoMovilSection = document.getElementById('pago-movil-section');
    const cashSection = document.getElementById('cash-section');

    metodoPagoSelect.addEventListener('change', function() {
        const selectedMethod = this.value;
        if (selectedMethod === 'pagomovil') {
            pagoMovilSection.style.display = 'block';
            cashSection.style.display = 'none';
        } else if (selectedMethod === 'efectivo') {
            cashSection.style.display = 'block';
            pagoMovilSection.style.display = 'none';
        } else {
            pagoMovilSection.style.display = 'none';
            cashSection.style.display = 'none';
        }
    });

    // Validar y enviar el formulario
    const paymentForm = document.getElementById("payment-form");
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        if (!/^[a-zA-Z\s]+$/.test(nombre) || /^\s*$/.test(nombre)) {
            alert("Por favor, ingrese un nombre válido (solo letras y espacios, no solo espacios en blanco).");
            return;
        }
        
        const telefono = document.getElementById("telefono").value;
        console.log("telefono");
        if (!/^\d{11}$/.test(telefono)) {
            console.log("telefono");
            alert("Por favor, ingrese un número de teléfono válido.");
            return;
        }
        
        if (metodoPagoSelect.value === "pagomovil") {
            const comprobanteInput = document.getElementById("comprobante").value;
            const comprobanteImg = document.getElementById("comprobante-img").files.length;
            if ((comprobanteInput === "" || /^\s*$/.test(comprobanteInput)) && comprobanteImg === 0) {
                alert("Ingrese el número de comprobante o suba una imagen del comprobante.");
                return;
            }
        }

        alert('Pago realizado con éxito!');
        localStorage.removeItem('cart'); // Limpiar el carrito del localStorage
        window.location.href = 'gracias.html'; // Redireccionar
    });
});
