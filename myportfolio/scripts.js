document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            const description = this.nextElementSibling;
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                this.textContent = "Visa mindre";
            } else {
                description.style.display = "none";
                this.textContent = "Visa mer";
            }
        });
    });
});
