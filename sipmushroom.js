let currentIndex = 0;

let heroIndex = 0;

function showHeroSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === heroIndex) slide.classList.add('active');
    });
    heroIndex = (heroIndex + 1) % slides.length;
}

setInterval(showHeroSlide, 5000);


let mushroomIndex = 0;

function showMushroomSlide() {
    const slides = document.querySelectorAll('.mushroom-slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === mushroomIndex) slide.classList.add('active');
    });
    mushroomIndex = (mushroomIndex + 1) % slides.length;
}

setInterval(showMushroomSlide, 5000);



// Add to Cart Functionality
let cart = [];

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


document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

