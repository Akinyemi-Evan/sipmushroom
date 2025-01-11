let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    } else if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }

    showSlide(currentSlideIndex);
}

// Auto-rotate slides every 5 seconds
setInterval(() => moveSlide(1), 5000);

// Add to Cart Functionality
function addToCart(itemName, itemPrice) {
    // Placeholder for cart functionality
    alert(`${itemName} added to cart at $${itemPrice.toFixed(2)}`);
    // This can be expanded to update a cart page or localStorage
}

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
        ? `${cartContent}<p><strong>Total: $${cartTotal.toFixed(2)}</strong></p><a href="../Cart/cart.html" class="view-cart">View Cart</a>`
        : `<p>Your cart is empty</p><a href="../Cart/cart.html" class="view-cart">View Cart</a>`;
}
document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart');
    const cartPopup = document.querySelector('.cart-popup');

    // Show popup when hovering over the cart
    cart.addEventListener('mouseenter', () => {
        cartPopup.style.display = 'block';
    });

    // Keep popup open while inside it
    cartPopup.addEventListener('mouseenter', () => {
        cartPopup.style.display = 'block';
    });

    // Hide popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!cart.contains(e.target)) {
            cartPopup.style.display = 'none';
        }
    });
});

function toggleNav() {
    const navDrawer = document.getElementById('nav-drawer');
    navDrawer.classList.toggle('open');

    // Add or remove event listener for closing the drawer
    if (navDrawer.classList.contains('open')) {
        document.addEventListener('click', closeNavOnOutsideClick);
    } else {
        document.removeEventListener('click', closeNavOnOutsideClick);
    }
}

function closeNavOnOutsideClick(event) {
    const navDrawer = document.getElementById('nav-drawer');
    const menuIcon = document.querySelector('.menu-icon');

    // Check if the click is outside the nav drawer and menu icon
    if (!navDrawer.contains(event.target) && !menuIcon.contains(event.target)) {
        navDrawer.classList.remove('open');
        document.removeEventListener('click', closeNavOnOutsideClick);
    }
}
let currentHeroSlideIndex = 0;

function showHeroSlide(index) {
    const heroSlides = document.querySelectorAll('.hero-slide');
    heroSlides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none'; // Show the current slide, hide others
    });
}

function moveHeroSlide(direction) {
    const heroSlides = document.querySelectorAll('.hero-slide');
    currentHeroSlideIndex += direction;

    // Wrap around the slideshow
    if (currentHeroSlideIndex < 0) {
        currentHeroSlideIndex = heroSlides.length - 1;
    } else if (currentHeroSlideIndex >= heroSlides.length) {
        currentHeroSlideIndex = 0;
    }

    showHeroSlide(currentHeroSlideIndex);
}

// Auto-play Hero Slideshow every 5 seconds
setInterval(() => moveHeroSlide(1), 5000);

// Initialize the first slide on page load
document.addEventListener('DOMContentLoaded', () => {
    showHeroSlide(currentHeroSlideIndex);
});
