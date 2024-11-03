// Slideshow JavaScript
let slideIndex = 0;
let autoSlideTimeout;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1;}    
    slides[slideIndex - 1].style.display = "block";  
    autoSlideTimeout = setTimeout(showSlides, 3000); // Auto slide every 3 seconds
}

// Function to go to the next slide
function nextSlide() {
    clearTimeout(autoSlideTimeout); // Stop auto-sliding temporarily
    slideIndex++;
    if (slideIndex > document.getElementsByClassName("mySlides").length) {
        slideIndex = 1;
    }
    updateSlides();
}

// Function to go to the previous slide
function prevSlide() {
    clearTimeout(autoSlideTimeout); // Stop auto-sliding temporarily
    slideIndex--;
    if (slideIndex < 1) {
        slideIndex = document.getElementsByClassName("mySlides").length;
    }
    updateSlides();
}

// Function to display the current slide
function updateSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    autoSlideTimeout = setTimeout(showSlides, 3000); // Restart auto-sliding
}
