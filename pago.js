document.addEventListener('DOMContentLoaded', () => {
    // Obtener productos del local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedProductsDiv = document.getElementById('selected-products');
    const totalAmountSpan = document.getElementById('total-amount');

    // Mostrar
    if (cart.length > 0) {
        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `<strong>${item.name}</strong> - $${item.price.toFixed(2)}`;
            selectedProductsDiv.appendChild(productDiv);
        });
    } else {
        selectedProductsDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
    }

    // Calcular y mostrar total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmountSpan.textContent = total.toFixed(2);

    // Manejar el envío del formulario
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // procesar
        alert('Pago realizado con éxito!');
        // Limpiar local
        localStorage.removeItem('cart');
    });
});
