document.addEventListener('DOMContentLoaded', () => {
    // Swipers
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

    // cambio pestanas
    const tabInputs = document.querySelectorAll(".tabInput");

    tabInputs.forEach(input => {
        input.addEventListener('change', () => {
            const id = input.value;
            const thisSwiper = document.getElementById('swiper' + id);

            // Verifica si thisSwiper existe
            if (thisSwiper && thisSwiper.swiper) {
                thisSwiper.swiper.update();
            } else {
                console.error(`Swiper con ID swiper${id} no encontrado.`);
            }
        });
    });

    localStorage.removeItem('cart'); // limpio por si acaso
    // carrito
    const cartMenu = document.getElementById('cart-menu');
    const openCartButton = document.querySelector('.btn-flotante');
    const closeCartButton = document.querySelector('.close-cart');
    const payButton = document.getElementById('pay-button'); // Obtener el botón de pagar

    // Abrir
    openCartButton.addEventListener('click', function(e) {
        e.preventDefault();
        cartMenu.classList.add('open');
    });

    // Cerrar 
    closeCartButton.addEventListener('click', function() {
        cartMenu.classList.remove('open');
    });

    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = [];
    let total = 0;

    // agregar producto al carrito
    function addToCart(name, price) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${name}</h4>
            <span>$${price.toFixed(2)}</span>
            <button class="remove-item"> X </button>
        `;
        
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

    // Capturar los botones de agregar"
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            addToCart(productName, productPrice);
        });
    });

    // Validar carrito antes de redirigir
    payButton.addEventListener('click', (event) => {
        event.preventDefault(); 

        if (cart.length === 0) {
            alert('Tu carrito esta vacio. Por favor, añade productos antes de proceder al pago.'); 
        } else {
            window.location.href = payButton.href; 
        }
    });
    
});
