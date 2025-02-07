let slideIndex = 0;
const slides = document.querySelectorAll('.img-gallery img');
const prevButton = document.querySelector('.img-gallery .prev');
const nextButton = document.querySelector('.img-gallery .next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'fade-out');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === slideIndex) {
            slide.classList.add('fade-out');
        }
    });
    slideIndex = index;
}

function showNextSlide() {
    const nextIndex = (slideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function showPrevSlide() {
    const prevIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);

setInterval(showNextSlide, 9000);