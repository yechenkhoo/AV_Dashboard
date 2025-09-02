const videos = [
    {
        title: "LE SSERAFIM (르세라핌) – 1-800-hot-n-fun @인기가요 inkigayo 20240901",
        channel: "SBSKPOP X INKIGAYO",
        views: "1.2M",
        uploaded: "1 month ago",
        thumbnail: "../images/entertainment_options/youtube/1800hnf.jpg",
        link: "https://www.youtube.com/embed/jF4ljzafQsY?si=l5S2epeeRFtQJOTz",
    },
    {
        title: "I couldn't visit the stray cat I've known for 5 years for a week, this is her reaction.",
        channel: "Stray Paws Clips",
        views: "1.1M",
        uploaded: "1 month ago",
        thumbnail: "../images/entertainment_options/youtube/straycat.jpg",
        link: "https://www.youtube.com/embed/W4ZXwVXWSwc?si=XPY5foQi-pJkWV-D",
    },
    {
        title: "Cat loaf bumps its head and goes back to sleep",
        channel: "Tabby Cat Bobbie",
        views: "1.5M",
        uploaded: "1 year ago",
        thumbnail: "../images/entertainment_options/youtube/catloaf.jpg",
        link: "https://www.youtube.com/embed/Y_8A7-4fjbo?si=DvBAA2uty_okpetL",
    },
    {
        title: "Playing God Unplugged",
        channel: "Tim Henson",
        views: "22M",
        uploaded: "2 years ago",
        thumbnail: "../images/entertainment_options/youtube/playinggod.jpg",
        link: "https://www.youtube.com/embed/DSBBEDAGOTc?si=InujvdYmTiclrZO_",
    },
    {
        title: "When I put a drop of water on the head of a jumping spider, the reaction was too cute",
        channel: "ハエトリフィルム / Jumping Spider Film",
        views: "11M",
        uploaded: "2 years ago",
        thumbnail: "../images/entertainment_options/youtube/spider.jpg",
        link: "https://www.youtube.com/embed/wNEgOy53DMs?si=fEqlricWS47seRY6",
    },
    {
        title: "The weather girl called the man a pill bug by mistake",
        channel: "WeatherNewsTV",
        views: "17M",
        uploaded: "2 years ago",
        thumbnail: "../images/entertainment_options/youtube/weathergirl.jpg",
        link: "https://www.youtube.com/embed/tzLGA1-QWfU?si=kgPclD1PkW1ZfduL",
    },
    {
        title: "BRO IS JUST NOT BUILT FOR THIS 😭",
        channel: "DUH.",
        views: "244K",
        uploaded: "1 month ago",
        thumbnail: "../images/entertainment_options/youtube/notbuilt.jpg",
        link: "https://www.youtube.com/embed/LcTqKJ5eQN8?si=YoGanhB92v5f9YXw",
    },
    {
        title: "aespa 에스파 'Whiplash' Dance Practice",
        channel: "aespa",
        views: "2M",
        uploaded: "3 weeks ago",
        thumbnail: "../images/entertainment_options/youtube/whiplash.jpg",
        link: "https://www.youtube.com/embed/4hAdcenQWqU?si=cPHvzdRvJAQuBN92",
    },
    {
        title: "All Akko Switches Reviewed & Ranked (2023)",
        channel: "Milktooth",
        views: "248K",
        uploaded: "10 months ago",
        thumbnail: "../images/entertainment_options/youtube/akko.jpg",
        link: "https://www.youtube.com/embed/ZdhLGlIDNPs?si=FtlrYMXCMTMktH2N",
    },
    {
        title: "when mina ‘s japanese made jihyo malfunction ft. Mina being sweet unnie to tzuyu",
        channel: "Michaeng",
        views: "36K",
        uploaded: "2 months ago",
        thumbnail: "../images/entertainment_options/youtube/twice.jpg",
        link: "https://www.youtube.com/embed/MFkIQF4J0Wg?si=qFlm282Tz3Iux5Ds",
    },
    // Add more videos here
];

// Get the container for videos
const videoElement = document.getElementById('videos');

// Load playlist dynamically
videos.forEach((video, index) => {
    // Create a container for each video
    const videoItem = document.createElement('div');
    videoItem.classList.add('video');

    // Set the inner HTML with video details
    videoItem.innerHTML = `
        <div class="video-thumbnail"><img src="${video.thumbnail}"></img></div>
        <div class="video-info">
            <h4>${video.title}</h4>
            <p>${video.channel} • ${video.views} views • ${video.uploaded}</p>
        </div>
    `;

    // Attach click event to open modal and play video
    videoItem.addEventListener('click', () => playVideo(index));
    videoElement.appendChild(videoItem);
});

// Function to open modal and play video
function playVideo(index) {
    const modal = document.getElementById("video-modal");
    const videoPlayer = document.getElementById("video-player");

    // Set the video URL from the `link` property of the video
    videoPlayer.src = videos[index].link;
    modal.style.display = "block"; // Show modal
}

// Close the modal and stop the video
function closeModal() {
    const modal = document.getElementById("video-modal");
    const videoPlayer = document.getElementById("video-player");

    modal.style.display = "none";
    videoPlayer.src = ""; // Stop the video
}

// Attach close event to the modal close button
document.querySelector('.close').addEventListener('click', closeModal);

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById("video-modal");
    if (event.target === modal) {
        closeModal();
    }
};


// search function
const searchInput = document.getElementById('search-input');

// Function to display videos based on an array of video data
function displayVideos(videosToDisplay) {
    // Clear the current video list
    videoElement.innerHTML = '';

    // Loop through the videos to display and add each one to the container
    videosToDisplay.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video');

        videoItem.innerHTML = `
            <div class="video-thumbnail"><img src="${video.thumbnail}"></img></div>
            <div class="video-info">
                <h4>${video.title}</h4>
                <p>${video.channel} • ${video.views} views • ${video.uploaded}</p>
            </div>
        `;

        // Attach click event to open modal and play video
        videoItem.addEventListener('click', () => playVideo(index));
        videoElement.appendChild(videoItem);
    });
}

// Function to handle search input and filter videos
function filterVideos() {
    const query = searchInput.value.toLowerCase(); // Convert input to lowercase for case-insensitive search

    // Filter videos based on the search query
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query)
    );

    // Display only the filtered videos
    displayVideos(filteredVideos);
}

// Event listener for real-time search
searchInput.addEventListener('input', filterVideos);

// Initial load of all videos
displayVideos(videos);
