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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.itemName === itemName);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if the item already exists
    } else {
        cart.push({ itemName, itemPrice, quantity: 1 }); // Add new item if it doesn't exist
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPopup(); // Refresh the cart popup
    alert(`${itemName} added to cart at $${itemPrice.toFixed(2)}`);
}



let cart = [];


// Function to update the cart popup with items from localStorage
function updateCartPopup() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartPopup = document.querySelector('.cart-popup');

    if (cart.length) {
        const cartContent = cart
            .map((item, index) => `
                <div class="cart-item">
                    <p>${item.itemName}</p>
                    <div class="quantity-controls">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                    <p>$${(item.itemPrice * item.quantity).toFixed(2)}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `).join('');
        const cartTotal = cart.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
        cartPopup.innerHTML = `
            ${cartContent}
            <p><strong>Total: $${cartTotal.toFixed(2)}</strong></p>
            <a href="../Cart/cart.html" class="view-cart">View Cart</a>
        `;
    } else {
        cartPopup.innerHTML = `<p>Your cart is empty</p><a href="../Cart/cart.html" class="view-cart">View Cart</a>`;
    }

    // Attach event listeners for quantity and remove buttons
    attachCartPopupEventListeners();
}

function attachCartPopupEventListeners() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Increase quantity
    const increaseButtons = document.querySelectorAll('.increase-btn');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            cart[index].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartPopup(); // Refresh popup
            renderCartItems(); // Refresh cart page if applicable
        });
    });

    // Decrease quantity
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPopup(); // Refresh popup
                renderCartItems(); // Refresh cart page if applicable
            }
        });
    });

    // Remove item
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            cart.splice(index, 1); // Remove item
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartPopup(); // Refresh popup
            renderCartItems(); // Refresh cart page if applicable
        });
    });
}



// Ensure the cart popup is updated on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartPopup(); // Load cart contents into the popup on page load
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

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartPopup(); // Refresh the popup to reflect changes
}


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

async function loadReviews(productId) {
    const response = await fetch(`/reviews/${productId}`);
    const reviews = await response.json();
    const reviewsContainer = document.querySelector('.woocommerce-Reviews .wd-reviews-content');
    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review">
            <p><strong>${review.author}</strong> - ${review.rating} ★</p>
            <p>${review.comment}</p>
        </div>
    `).join('');
}
document.addEventListener('DOMContentLoaded', () => {
    const productId = 'mushroom-coffee'; // Replace with dynamic ID
    loadReviews(productId);
});
