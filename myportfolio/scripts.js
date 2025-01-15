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
});
