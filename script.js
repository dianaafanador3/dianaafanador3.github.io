// Carousel functionality
let currentSlideIndex = 0;

function showSlide(n) {
    const slides = document.getElementsByClassName('carousel-item');
    const dots = document.getElementsByClassName('dot');

    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    // Show current slide and activate corresponding dot
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

function changeSlide(n) {
    const slides = document.getElementsByClassName('carousel-item');
    currentSlideIndex += n;

    if (currentSlideIndex > slides.length) {
        currentSlideIndex = 1;
    }
    if (currentSlideIndex < 1) {
        currentSlideIndex = slides.length;
    }

    showSlide(currentSlideIndex);
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
let minSwipeDistance = 50; // Minimum distance for a swipe

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
            // Swipe right - previous slide
            changeSlide(-1);
        } else {
            // Swipe left - next slide
            changeSlide(1);
        }
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function () {
    currentSlideIndex = 1;
    showSlide(currentSlideIndex);

    // Add touch event listeners for swipe gestures
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
});
