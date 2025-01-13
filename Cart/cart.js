// cart data
let cart = [];



// Function to remove an item
function removeItem(index) {
    cart.splice(index, 1);
    renderCartItems();
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();

    document.getElementById("checkout-button").addEventListener("click", () => {
        alert("Proceeding to checkout!");
    });
});

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
document.getElementById("checkout-button").addEventListener("click", async () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    try {
        const response = await fetch('/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart }),
        });
        const result = await response.json();
        if (result.success) {
            alert('Payment successful!');
            localStorage.removeItem('cart');
        } else {
            alert('Payment failed: ' + result.error);
        }
    } catch (error) {
        console.error(error);
        alert('Error during payment process.');
    }
});

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.itemPrice * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.itemName}</p>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <p>$${(item.itemPrice * item.quantity).toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total-amount").textContent = total.toFixed(2);

    // Attach event listeners for quantity buttons
    attachCartPageEventListeners();
}

function attachCartPageEventListeners() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Increase quantity
    const increaseButtons = document.querySelectorAll('.increase-btn');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            cart[index].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems(); // Refresh cart page
            updateCartPopup(); // Refresh popup
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
                renderCartItems(); // Refresh cart page
                updateCartPopup(); // Refresh popup
            }
        });
    });
}


function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}
document.addEventListener("DOMContentLoaded", renderCartItems);
