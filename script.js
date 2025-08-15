document.querySelectorAll(".collapsible").forEach(button => {
    const content = button.nextElementSibling;
    let hideTimeout;

    button.addEventListener("mouseenter", function () {
        clearTimeout(hideTimeout); // cancel any pending close
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
    });

    button.addEventListener("mouseleave", function () {
        hideTimeout = setTimeout(() => {
            content.classList.remove("open");
            content.style.maxHeight = null;
        }, 200); // wait 2 seconds before closing
    });
});



