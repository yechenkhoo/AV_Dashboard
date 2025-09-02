// Streaming URLs
const radioStreams = {
    "987FMAAC": "https://playerservices.streamtheworld.com/api/livestream-redirect/987FM_PREM.aac", 
    "CLASS95AAC": "https://playerservices.streamtheworld.com/api/livestream-redirect/CLASS95_PREM.aac",
    "LOVE972FMAAC": "https://playerservices.streamtheworld.com/api/livestream-redirect/LOVE972FM_PREM.aac",
};

// Select audio player and wave container
const audioPlayer = document.getElementById("audio-player");
const audioWave = document.getElementById("audio-wave");
const playPauseButton = document.getElementById('play-pause');
const volumeControl = document.getElementById('volume-control');

// Add bars for the audio wave animation
window.addEventListener("load", () => {
    const numberOfBars = 160;
    const audioWaveContainer = document.getElementById("audio-wave");

    for (let i = 0; i < numberOfBars; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        audioWaveContainer.appendChild(bar);
    }

    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`;
    });
});


let nowPlayingInterval; // Interval for auto-updating Now Playing info

// Function to fetch and display Now Playing info
async function fetchNowPlaying(stationId) {
    try {
        const response = await fetch(`https://np.tritondigital.com/public/nowplaying?mountName=${stationId}&numberToFetch=1&eventType=track`);
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const title = xmlDoc.querySelector("property[name='cue_title']")?.textContent || "N/A";
        const artist = xmlDoc.querySelector("property[name='track_artist_name']")?.textContent || "N/A";
        
        document.getElementById("now-playing").innerText = `${artist} - ${title}`;
    } catch (error) {
        console.error("Failed to fetch Now Playing data:", error);
        document.getElementById("now-playing").innerText = "Not Available";
    }
}

// Function to set up and play a station and update the UI
function playStation(stationId, stationName) {
    const audioSourceURL = radioStreams[stationId];
    audioPlayer.src = audioSourceURL;
    audioPlayer.play();
    fetchNowPlaying(stationId); // Fetch Now Playing info once immediately

    // Update the current station display
    document.getElementById("current-station").textContent = stationName;

    // Update the button styling
    document.querySelectorAll(".station-button").forEach(button => button.classList.remove("current"));
    document.querySelector(`button[data-station="${stationId}"]`).classList.add("current");

    // Clear any previous interval and start a new one to auto-update Now Playing info
    clearInterval(nowPlayingInterval);
    nowPlayingInterval = setInterval(() => fetchNowPlaying(stationId), 10000); // Every 10 seconds
}

// Play or pause the audio and update icon
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');
    } else {
        audioPlayer.pause();
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-play');
    }
}

// Listen for keydown events on the document
document.addEventListener("keydown", function(event) {
    // Check if the pressed key is the spacebar (key code 32)
    if (event.code === "Space") {
        event.preventDefault(); // Prevent default spacebar behavior (e.g., scrolling)
        togglePlayPause(); // Call the play/pause toggle function
    }
});


// Set default volume to 50%
audioPlayer.volume = 0.5;
volumeControl.value = 50; // Sync the volume slider to 50%

// Adjust volume
volumeControl.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});


// Update the play/pause button and wave animation when audio state changes
function updateUIOnPlayPause() {
    if (audioPlayer.paused) {
        audioWave.classList.add("paused");
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-play');
    } else {
        audioWave.classList.remove("paused");
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');
    }
}

// Add event listeners to the play/pause button and audio element
playPauseButton.addEventListener('click', togglePlayPause);
audioPlayer.addEventListener("play", updateUIOnPlayPause);
audioPlayer.addEventListener("pause", updateUIOnPlayPause);

// Event listeners for station buttons
document.querySelectorAll(".station-button").forEach(button => {
    button.addEventListener("click", function () {
        const stationId = this.getAttribute("data-station");
        const stationName = this.querySelector("img").alt;
        playStation(stationId, stationName);
    });
});

// Play the first station by default on page load
document.addEventListener("DOMContentLoaded", () => {
    const firstStationId = Object.keys(radioStreams)[0];
    const firstStationName = document.querySelector(`button[data-station="${firstStationId}"] img`).alt;
    playStation(firstStationId, firstStationName); 
});

