document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de Swipers
    const swiper1 = new Swiper(".mySwiper-1", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    const swiper2 = new Swiper(".mySwiper-2", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 2,
            },
            950: {
                slidesPerView: 3,
            }
        }
    });

    // Manejo de cambio de pestañas
    const tabInputs = document.querySelectorAll(".tabInput");

    tabInputs.forEach(input => {
        input.addEventListener('change', () => {
            const id = input.value; // Usamos el valor del radio button
            const thisSwiper = document.getElementById('swiper' + id);

            // Verifica si thisSwiper existe
            if (thisSwiper && thisSwiper.swiper) {
                thisSwiper.swiper.update();
            } else {
                console.error(`Swiper con ID swiper${id} no encontrado.`);
            }
        });
    });

    // Carrito
    const cartMenu = document.getElementById('cart-menu');
    const openCartButton = document.querySelector('.btn-flotante');
    const closeCartButton = document.querySelector('.close-cart');

    // Abrir el carrito 
    openCartButton.addEventListener('click', function(e) {
        e.preventDefault();
        cartMenu.classList.add('open');
    });

    // Cerrar el carrito 
    closeCartButton.addEventListener('click', function() {
        cartMenu.classList.remove('open');
    });

    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = [];
    let total = 0;

    // Función para agregar producto al carrito
    function addToCart(name, price) {
        // Crear el elemento HTML para el producto
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${name}</h4>
            <span>$${price.toFixed(2)}</span>
            <button class="remove-item">X</button>
        `;
        
        // Añadir producto al menú lateral del carrito
        cartItems.appendChild(cartItem);

        // Actualizar carrito y total
        cart.push({ name, price });
        total += price;
        cartTotal.textContent = total.toFixed(2);

        // Eliminar productos del carrito
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            cartItems.removeChild(cartItem);
            cart = cart.filter(item => item.name !== name);
            total -= price;
            cartTotal.textContent = total.toFixed(2);
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Captura de todos los botones de "Agregar"
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            addToCart(productName, productPrice);
        });
    });
});
