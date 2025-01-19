document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            const description = this.nextElementSibling;
            const infoCard = this.closest(".info-card");
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                infoCard.style.height = "auto";
                infoCard.style.maxHeight = "none"; // Allow the card to expand
                this.textContent = "Visa mindre";
            } else {
                description.style.display = "none";
                infoCard.style.height = "auto";
                infoCard.style.maxHeight = ""; // Reset to default height
                this.textContent = "Visa mer";
            }
        });
    });

    const showMoreButtons = document.querySelectorAll(".show-more-btn");

    showMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            const moreImages = this.previousElementSibling;
            if (moreImages.style.display === "none" || moreImages.style.display === "") {
                moreImages.style.display = "block";
                this.textContent = "Visa mindre";
            } else {
                moreImages.style.display = "none";
                this.textContent = "Visa mer";
            }
        });
    });

    const projectImages = document.querySelectorAll(".project-img");
    const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    const fullscreenImage = fullscreenOverlay.querySelector("img");
    const closeBtn = fullscreenOverlay.querySelector(".close-btn");

    projectImages.forEach(img => {
        img.addEventListener("click", function() {
            fullscreenImage.src = this.src;
            fullscreenOverlay.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", function() {
        fullscreenOverlay.style.display = "none";
    });
});


const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});


// Get all the links in the navbar
const navLinks = document.querySelectorAll('.nav-link');

// Get the current URL path
const currentPath = window.location.pathname.split('/').pop();

// Loop through links and add 'active' class to the current page
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});
