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

function addToCart(item, price) {
    cart.push({ item, price });
    updateCartPopup();
}

function updateCartPopup() {
    const cartPopup = document.querySelector('.cart-popup');
    const cartContent = cart.map(cartItem => `<p>${cartItem.item} - $${cartItem.price.toFixed(2)}</p>`).join('');
    const cartTotal = cart.reduce((total, cartItem) => total + cartItem.price, 0);

    cartPopup.innerHTML = cart.length
        ? `${cartContent}<p><strong>Total: $${cartTotal.toFixed(2)}</strong></p><a href="cart.html" class="view-cart">View Cart</a>`
        : `<p>Your cart is empty</p><a href="cart.html" class="view-cart">View Cart</a>`;
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
const apiKey = 'AIzaSyDpoLnQlcYl317wKEvN3aS5ujnfTQrOk-E';
const placeId = 'CSZzpBmBnN-mEAE'; // Replace with your Place ID
const reviewsContainer = document.getElementById('reviews-container');

async function fetchReviews() {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result && data.result.reviews) {
            displayReviews(data.result.reviews);
        } else {
            reviewsContainer.innerHTML = '<p>No reviews found.</p>';
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        reviewsContainer.innerHTML = '<p>Failed to load reviews.</p>';
    }
}

function displayReviews(reviews) {
    reviewsContainer.innerHTML = reviews
        .map(review => {
            return `
            <div class="review">
                <p><strong>${review.author_name}</strong></p>
                <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                <p>${review.text}</p>
            </div>
            `;
        })
        .join('');
}

fetchReviews();
