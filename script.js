// Carousel functionality
let currentSlideIndex = 0;

function showSlide(n) {
    const slides = document.getElementsByClassName("carousel-item");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show current slide and activate corresponding dot
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add("active");
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add("active");
    }
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    currentSlideIndex = 1;
    showSlide(currentSlideIndex);
});

