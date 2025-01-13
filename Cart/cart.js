// Sample cart data
let cart = [
    { itemName: "Mushroom Coffee", itemPrice: 49.99, quantity: 1 },
    { itemName: "Mushroom Matcha", itemPrice: 39.99, quantity: 2 }
];

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.itemPrice * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.itemName} x ${item.quantity}</p>
                <p>$${(item.itemPrice * item.quantity).toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total-amount").textContent = total.toFixed(2);
}

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