// Array of songs
const songs = [
    {
        title: "Rocketeer",
        artist: "Far East Movement, Ryan Tedders, Ruff Loaderz",
        src: "../static/songs/rocketeer.mp3",
        cover: "../static/songs/song_covers/rocketeer-cover.jpg",
        album: "Free Wired",
        time: "3:32"
    },
    {
        title: "CRAZY",
        artist: "LE SSERAFIM",
        src: "../static/songs/crazy.mp3",
        cover: "../static/songs/song_covers/crazy-cover.jpg",
        album: "CRAZY",
        time: "2:39"
    },
    {
        title: "ETA",
        artist: "NewJeans",
        src: "../static/songs/eta.mp3",
        cover: "../static/songs/song_covers/eta-cover.jpg",
        album: "NewJeans 2nd EP 'Get Up'",
        time: "2:31"
    },
    {
        title: "FE!N",
        artist: "Travis Scott, Playboi Carti",
        src: "../static/songs/fein.mp3",
        cover: "../static/songs/song_covers/fein-cover.jpg",
        album: "UTOPIA",
        time: "3:13"
    },
    {
        title: "Youngblood",
        artist: "5 Seconds of Summer",
        src: "../static/songs/youngblood.mp3",
        cover: "../static/songs/song_covers/youngblood-cover.jpg",
        album: "Youngblood (Deluxe)",
        time: "3:23"
    },
    {
        title: "MY BAG",
        artist: "(G)-IDLE",
        src: "../static/songs/mybag.mp3",
        cover: "../static/songs/song_covers/mybag-cover.jpg",
        album: "I NEVER DIE",
        time: "2:40"
    },
    // add songs here
];

// Calculate and update playlist info
function updatePlaylistInfo() {
    // Calculate total number of songs
    const totalSongs = songs.length;
    
    // Calculate total duration in seconds
    let totalDurationInSeconds = 0;
    songs.forEach(song => {
        const [minutes, seconds] = song.time.split(':').map(Number);
        totalDurationInSeconds += (minutes * 60) + seconds;
    });

    // Convert total duration to hours and minutes
    const totalHours = Math.floor(totalDurationInSeconds / 3600);
    const totalMinutes = Math.floor((totalDurationInSeconds % 3600) / 60);

    // Update HTML elements
    document.getElementById('playlist-size').innerText = totalSongs;
    document.getElementById('playlist-time').innerText = 
        `${totalHours > 0 ? totalHours + ' hr ' : ''}${totalMinutes} min`;
}

// Call the function initially to update the playlist info on page load
updatePlaylistInfo();

let currentSongIndex = 0;
let filteredSongs = songs; // Default to the full song list

const audioPlayer = document.getElementById('audio-player');
const playlistElement = document.getElementById('songs');
const playPauseButton = document.getElementById('play-pause');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const albumArt = document.getElementById('album-art');
const volumeControl = document.getElementById('volume-control');

// For song timer seeker
const currentTimeElem = document.getElementById('current-time');
const totalTimeElem = document.getElementById('total-time');
const seekBarContainer = document.querySelector('.seek-bar-container');
const seekBarProgress = document.querySelector('.seek-bar-progress');

// Update total time when the audio loads
audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    totalTimeElem.textContent = formatTime(duration);
});

// Update the progress bar and current time display as the audio plays
audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    
    // Update current time text
    currentTimeElem.textContent = formatTime(currentTime);

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    seekBarProgress.style.width = `${progressPercent}%`;
});

// Click-to-seek functionality
seekBarContainer.addEventListener('click', (event) => {
    const width = seekBarContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audioPlayer.duration;

    // Calculate the new time and set it
    const newTime = (clickX / width) * duration;
    audioPlayer.currentTime = newTime;
});

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secondsPart}`;
}

// Load playlist dynamically
songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.classList.add('song-item');
    songItem.innerHTML = `
        <span class="no-padding">${index + 1}</span>
        <div>
            <img src="${song.cover}"></img>
            <span>${song.title}</span>
        </div>
        <span>${song.artist}</span>
        <span>${song.album}</span>
        <span>${song.time}</span>
    `;
    songItem.addEventListener('click', () => loadAndPlaySong(index));
    playlistElement.appendChild(songItem);
});

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

// Play or pause song
function togglePlayPause() {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    audioPlayer.play();
    playPauseButton.classList.remove('fa-play-circle');
    playPauseButton.classList.add('fa-pause-circle');
}

function pauseSong() {
    audioPlayer.pause();
    playPauseButton.classList.remove('fa-pause-circle');
    playPauseButton.classList.add('fa-play-circle');
}

// Update loadAndPlaySong to load a specific song object
function initialLoad(song, index = null) {
    currentSongIndex = index !== null ? index : filteredSongs.indexOf(song);
    audioPlayer.src = song.src;
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    albumArt.src = song.cover;
    trackText = document.getElementById('track-text');

    if (isOverflown(trackText)) {
        trackText.classList.add('overflown');
    } else {
        trackText.classList.remove('overflown');
    }
}

function loadAndPlaySong(song, index = null) {
    currentSongIndex = index !== null ? index : filteredSongs.indexOf(song);
    audioPlayer.src = song.src;
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    albumArt.src = song.cover;
    trackText = document.getElementById('track-text');


    if (isOverflown(trackText)) {
        trackText.classList.add('overflown');
    } else {
        trackText.classList.remove('overflown');
    }
    
    playSong();
}


// Updated `nextSong` to work with `filteredSongs`
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
    loadAndPlaySong(filteredSongs[currentSongIndex], currentSongIndex);
}

// Updated `prevSong` to work with `filteredSongs`
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
    loadAndPlaySong(filteredSongs[currentSongIndex], currentSongIndex);
}

// Set default volume to 30%
audioPlayer.volume = 0.3;
volumeControl.value = 30; // Sync the volume slider to 30%

// Adjust volume
volumeControl.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});

// Listen for keydown events on the document
document.addEventListener("keydown", function(event) {
    // Check if the pressed key is the spacebar (key code 32)
    if (event.code === "Space") {
        event.preventDefault(); // Prevent default spacebar behavior (e.g., scrolling)
        togglePlayPause(); // Call the play/pause toggle function
    }
});

// Event listeners
playPauseButton.addEventListener('click', togglePlayPause);
document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('prev').addEventListener('click', prevSong);

// Automatically go to the next song when the current song ends
audioPlayer.addEventListener('ended', nextSong);

// Render songs based on the filtered list
function renderSongs(songsToRender) {
    playlistElement.innerHTML = ''; // Clear current song list

    songsToRender.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.innerHTML = `
            <span class="no-padding">${index + 1}</span>
            <div>
                <img src="${song.cover}"></img>
                <span>${song.title}</span>
            </div>
            <span>${song.artist}</span>
            <span>${song.album}</span>
            <span>${song.time}</span>
        `;
        songItem.addEventListener('click', () => loadAndPlaySong(song, index));
        playlistElement.appendChild(songItem);
    });
}

// Search and filter songs
const searchInput = document.getElementById('song-search');
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    
    // Update filteredSongs based on query
    filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query)
    );

    // Reset current song index for the filtered list
    currentSongIndex = 0;
    
    // Render the filtered list
    renderSongs(filteredSongs);
});

// Initial load of all songs
renderSongs(songs);

// Load the first song when the page loads
initialLoad(songs[0]);