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

    // Metodos de pagos estoy cansado jefe
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

    // envio del formulariop
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        alert('Pago realizado con éxito!');
        localStorage.removeItem('cart');
        window.location.href = 'gracias.html';
    });
});
