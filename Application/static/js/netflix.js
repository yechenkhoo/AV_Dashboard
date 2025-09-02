// Get the modal elements
const videoModal = document.getElementById("video-modal");
const videoPlayer = document.getElementById("video-player");
const closeBtn = document.querySelector(".close-btn");

// MP4 file URLs for different items
const videoURLs = {
    "Stranger Things": "../images/entertainment_options/netflix/netflix.mp4", 
    "Murder Mystery": "../images/entertainment_options/netflix/netflix.mp4",
    "Our Planet": "../images/entertainment_options/netflix/netflix.mp4",
    "Tidying Up": "../images/entertainment_options/netflix/netflix.mp4",
    "Dead to Me": "../images/entertainment_options/netflix/netflix.mp4",
    "Raising Dion": "../images/entertainment_options/netflix/netflix.mp4"
};

// Function to open the modal and play the video
function openModal(videoUrl) {
    videoPlayer.src = videoUrl;
    videoPlayer.play(); // Start playing the video
    videoModal.style.display = "flex"; // Show the modal
}

// Function to close the modal and stop the video
function closeModal() {
    videoPlayer.pause(); // Pause the video
    videoPlayer.currentTime = 0; // Reset to the beginning
    videoPlayer.src = ""; // Clear the source
    videoModal.style.display = "none"; // Hide the modal
}

// Event listeners for opening the modal
document.querySelector(".banner").addEventListener("click", () => {
    openModal(videoURLs["Stranger Things"]);
});

document.querySelector(".play-button").addEventListener("click", () => {
    openModal(videoURLs["Stranger Things"]);
});

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("p").innerText;
        openModal(videoURLs[title]);
    });
});

// Event listener for closing the modal
closeBtn.addEventListener("click", closeModal);

// Close the modal when clicking outside the video area
window.addEventListener("click", (event) => {
    if (event.target === videoModal) {
        closeModal();
    }
});
const searchBar = document.getElementById("movie-search");
const searchResults = document.getElementById("search-results");

// Filter function for the dropdown search results
function filterMovies() {
    const searchTerm = searchBar.value.toLowerCase();
    searchResults.innerHTML = ""; // Clear previous results

    if (searchTerm) {
        const matches = Object.keys(videoURLs).filter(title => title.toLowerCase().includes(searchTerm));
        matches.forEach(title => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("search-result-item");
            resultItem.textContent = title;
            resultItem.addEventListener("click", () => {
                openModal(videoURLs[title]);
                searchResults.style.display = "none"; // Hide dropdown after selection
                searchBar.value = ""; // Clear search bar after selection
            });
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = matches.length > 0 ? "block" : "none";
    } else {
        searchResults.style.display = "none";
    }
}

// Event listeners
searchBar.addEventListener("input", filterMovies);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
    if (event.target === videoModal) {
        closeModal();
    }
});

// Hide search results dropdown if clicking outside of it
document.addEventListener("click", (event) => {
    if (!searchResults.contains(event.target) && event.target !== searchBar) {
        searchResults.style.display = "none";
    }
});