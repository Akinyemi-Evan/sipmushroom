let currentIndex = 0;

function moveCarousel(direction) {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

    // Update currentIndex
    currentIndex += direction;

    // Wrap around carousel
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
        currentIndex = 0;
    }

    // Move carousel
    const offset = -currentIndex * 100; // 100% width per image
    carouselImages.style.transform = `translateX(${offset}%)`;
}

// Auto-rotate carousel every 5 seconds
setInterval(() => moveCarousel(1), 5000);


// Add to Cart Functionality
let cart = [];

function addToCart(itemName, itemPrice) {
    cart.push({ itemName, itemPrice });
    updateCartPopup();
    alert(`${itemName} added to cart at $${itemPrice.toFixed(2)}`);
}
function updateCartPopup() {
    const cartPopup = document.querySelector('.cart-popup');
    const cartContent = cart.map(cartItem => `<p>${cartItem.itemName} - $${cartItem.itemPrice.toFixed(2)}</p>`).join('');
    const cartTotal = cart.reduce((total, cartItem) => total + cartItem.itemPrice, 0);

    cartPopup.innerHTML = cart.length
        ? `${cartContent}<p><strong>Total: $${cartTotal.toFixed(2)}</strong></p><a href="cart.html" class="view-cart">View Cart</a>`
        : `<p>Your cart is empty</p><a href="cart.html" class="view-cart">View Cart</a>`;
}

// Navigation Drawer Functionality
function toggleNav() {
    const navDrawer = document.getElementById('nav-drawer');
    navDrawer.classList.toggle('open');

    if (navDrawer.classList.contains('open')) {
        document.addEventListener('click', closeNavOnOutsideClick);
    } else {
        document.removeEventListener('click', closeNavOnOutsideClick);
    }
}

function closeNavOnOutsideClick(event) {
    const navDrawer = document.getElementById('nav-drawer');
    const menuIcon = document.querySelector('.menu-icon');

    if (!navDrawer.contains(event.target) && !menuIcon.contains(event.target)) {
        navDrawer.classList.remove('open');
        document.removeEventListener('click', closeNavOnOutsideClick);
    }
}



