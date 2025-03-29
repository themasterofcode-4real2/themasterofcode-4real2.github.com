document.addEventListener("DOMContentLoaded", function () {
    console.log("Negri Blog Loaded");
    
    const timestamp = document.querySelector(".timestamp");
    if (timestamp) {
        timestamp.style.fontStyle = "italic";
    }
});
