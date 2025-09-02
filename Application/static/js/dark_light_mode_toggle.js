const body = document.body;

// Set default to dark mode first
body.classList.add("dark-mode"); // Default theme

// Check saved mode from localStorage
const savedMode = localStorage.getItem("theme-mode");

if (savedMode) {
    // Remove the default and apply the saved mode
    body.classList.remove("dark-mode");
    body.classList.add(savedMode);
}

// Synchronize the toggle button state
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.checked = savedMode === "light-mode";

// Add event listener for the toggle
darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        localStorage.setItem("theme-mode", "light-mode"); // Save preference
    } else {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        localStorage.setItem("theme-mode", "dark-mode"); // Save preference
    }
});
