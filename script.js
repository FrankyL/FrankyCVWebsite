document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            const content = this.nextElementSibling;
            content.classList.toggle("open");

            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Expand
            }
        });
    });
});
