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

// Auto-rotate carousel
setInterval(() => moveCarousel(1), 5000);
