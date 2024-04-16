const seekBar = document.querySelector(".seekbar");
const playButton = document.getElementById("play");
const previousbutton=    document.getElementById("previous-btn");
const nextbutton=    document.getElementById("next-btn");
let audio;
const songNameElement = document.querySelector(".song-name");
const pseudoaudio=document.querySelector("#pseudoaudio");
let currentAudio = null; 
const volumeControl = document.querySelector(".volume");
const songs = [
    {
        title: "9 45",
        artist: "Jay Trak, Prabh Singh, and Rooh Sandhu",
        audioSrc: "9 45_64-(PagalWorld).mp3"
    },
    {
        title: "Abrars Entry",
        artist: "Harshavardhan Rameshwar",
        audioSrc: "Abrars Entry Jamal Kudu Animal 128 Kbps.mp3"
    },
    {
        title: "Badnam",
        artist: "Mankirat Aulakh",
        audioSrc: "Badnam.mp3"
    },
    {
        title: "Brown Rang",
        artist: "YOYO Honey singh",
        audioSrc: "Brown Rang International Villager 128 Kbps.mp3"
    },
    {
        title: "Company",
        artist: "Emiway Bantai",
        audioSrc: "Company(PagalWorld.com.se).mp3"
    },
    
    
    // Add more songs as needed
];
document.addEventListener("DOMContentLoaded", function() {
 

const musicList = document.getElementById("musicList");

songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${song.title} - ${song.artist}</span>
        <button class="playButton" data-index="${index}">Play</button>`;
    musicList.appendChild(listItem);
});

const playButtons = document.querySelectorAll(".playButton");

playButtons.forEach(button => {
    button.addEventListener("click", () => {
        const index = button.dataset.index;
        const audioSrc = songs[index].audioSrc;
        const title=songs[index].title
        const artist=songs[index].artist

        playSong(audioSrc,title,artist);
        seekBar.value = audio.currentTime;
        seekBar.max = audio.duration;
        playButton.innerHTML = '<i class="fa-solid fa-pause"></i>'
        
    });
});
});


function playSong(audioSrc, title, artist) {
    // Update the song name element
   

    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause(); // Pause the currently playing audio

        songNameElement.textContent = `${title} - ${artist}`;
    }

    audio = new Audio(audioSrc);
    // Update seekbar when metadata is loaded
    audio.onloadedmetadata = function() {
        seekBar.max = audio.duration;
    };

    // Update seekbar continuously while playing
    audio.ontimeupdate = function() {
        seekBar.value = audio.currentTime;
    };
// Update the seekbar continuously while playing
audio.ontimeupdate = function() {
    seekBar.value = audio.currentTime;
};

// Update audio's current time when seekbar value changes
seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});

    // Play the audio
    audio.play();
    currentAudio = audio;
}






playButton.addEventListener("click", () => {
    if (!audio || audio.paused) {
        // If no song is playing or is paused, play the default song
        playSong("Music/You And Me - Shubh.mp3");
        playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        // If a song is playing, toggle play/pause
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audio.pause();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }
});


volumeControl.addEventListener("input", () => {
    // Convert the volume value to a floating-point number between 0 and 1
    const volumeLevel = parseFloat((volumeControl.value)/100);
    console.log(volumeLevel)
    // Set the volume of the audio element
    audio.volume = volumeLevel;

    // If the volume is set to zero, pause the audio
    if (volumeLevel === 0) {
        audio.pause();
    } else {
        // If volume is not zero, play the audio
        audio.play();
    }
});

// Adding dynamic albums
const musicList = document.getElementById("musicList");
const albums = {
    "Still roll in": [
        { title: "You and ME", artist: "Shubh", audioSrc: "You And Me - Shubh.mp3" },
        { title: "9 45", artist: "Ujjwal Sharma", audioSrc: "9 45_64-(PagalWorld).mp3" }
    ],
    "International Villager": [
        { title: "Angreji Beat", artist: "YOYO Honey singh", audioSrc: "Angreji Beat - (Raag.Fm).mp3" },
        { title: "Gabru", artist: "J Star,  YOYO Honey Singh", audioSrc: "Gabru - (Raag.Fm).mp3" }
    ],
    "Making Memories": [
        { title: "Admirin You", artist: "Karan Aujla", audioSrc: "Admirin You (feat. Preston Pablo) - Karan Aujla.mp3" },
        
    ],
    "Moosetape": [
        { title: "295", artist: "Sidhu Moosewala", audioSrc: "295.mp3" },
        { title: "Signed to god", artist: "Sidhu Moosewala", audioSrc: "Signed_to_God.mp3" },
        { title: "GOAT", artist: "Sidhu Moosewala", audioSrc: "GOAT.mp3" },
       
    ],
    "Animal": [
        { title: "Abrars Entry", artist: "Jamal kadu", audioSrc: "Abrars Entry Jamal Kudu Animal 128 Kbps.mp3" },
        { title: "Gabru", artist: "J Star,  YOYO Honey Singh", audioSrc: "Gabru - (Raag.Fm).mp3" }
    ],
    // Add more albums and songs as needed
    "Unforgettable": [
        { title: "Bewafa", artist: "Imran Khan", audioSrc: "Bewafa - (Raag.Fm).mp3"},
        { title: "Aaja we Mahiya", artist: "Imran Khan", audioSrc: "Aaja We Mahiya - (Raag.Fm).mp3" }
    ],
    // Add more albums and songs as needed
};


function displayAlbumSongs(albumName) {
    // Clear the current list of songs
    musicList.innerHTML = "";

    // Retrieve the songs for the clicked album
    const songs = albums[albumName];

    // Create list items for each song and append them to the musicList container
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${song.title} - ${song.artist}</span>
            <button class="playButton" data-index="${index}">Play</button>`;
        musicList.appendChild(listItem);

        // Add event listener to the newly created play button
        const playButton = listItem.querySelector('.playButton');
        playButton.addEventListener('click', () => {
            playSong(song.audioSrc, song.title, song.artist);
            play.innerHTML = '<i class="fa-solid fa-pause"></i>';
            // playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';


            
        });
    });
}


// Add event listeners to each album card
const albumCards = document.querySelectorAll(".container");
albumCards.forEach(card => {
    card.addEventListener("click", () => {
        const albumName = card.querySelector("h2").textContent;
        displayAlbumSongs(albumName);
    });
});

// Select the toggle button
// Select the toggle button
const toggleButton = document.querySelector(".toggle-sidebar");

// Add event listener to the toggle button
toggleButton.addEventListener("click", () => {
    // Select the sidebar element
    const sidebar = document.querySelector('.left');
    
    // Toggle the 'active' class on the sidebar element to show/hide it
    sidebar.classList.toggle('active');
    
    // If the sidebar is active, set its width to 100%, else reset it to its default width
    if (sidebar.classList.contains('active')) {
        sidebar.style.width = '100%';
    } else {
        sidebar.style.width = '25vw'; // Adjust the width as needed
    }
});
// Select all album containers
const albumContainers = document.querySelectorAll('.container');

// Add event listener to each album container
albumContainers.forEach(album => {
    album.addEventListener('click', () => {
        // Select the sidebar element
        const sidebar = document.querySelector('.left');
        
        // Toggle the 'active' class on the sidebar element to show/hide it
        sidebar.classList.toggle('active');
        
        // If the sidebar is active, set its width to 100%, else reset it to its default width
        if (sidebar.classList.contains('active')) {
            sidebar.style.width = '100%';
        } else {
            sidebar.style.width = '25vw'; // Adjust the width as needed
        }
    });
});






// Function to play the next song

// Function to play the next song
function playNextSong() {
    console.log("Next button clicked");
    console.log("Current audio:", currentAudio);

    // Check if currentAudio is null or undefined
    if (!currentAudio) {
        console.error("No current audio is playing.");
        return;
    }

    // Log the current audio source
    console.log("Current audio source:", currentAudio.src);

    // Find the index of the current song in the playlist
    const currentIndex = songs.findIndex(song => song.audioSrc === currentAudio.src);
    console.log("Current index:", currentIndex);

    // Calculate the index of the next song
    const nextIndex = (currentIndex + 1) % songs.length;
    console.log("Next index:", nextIndex);

    // Get the audio source of the next song
    const nextAudioSrc = songs[nextIndex].audioSrc;
    const nextTitle = songs[nextIndex].title;
    const nextArtist = songs[nextIndex].artist;
    console.log("Next audio source:", nextAudioSrc);

    // Play the next song
    playSong(nextAudioSrc, nextTitle, nextArtist);
}





// Function to play the previous song
function playPreviousSong() {
    // Find the index of the current song in the playlist
    const currentIndex = songs.findIndex(song => song.audioSrc === currentAudio.src);
    
    // Calculate the index of the previous song
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    
    // Get the audio source of the previous song
    const previousAudioSrc = songs[previousIndex].audioSrc;
    const previousTitle = songs[previousIndex].title;
    const previousArtist = songs[previousIndex].artist;
    
    // Play the previous song
    playSong(previousAudioSrc, previousTitle, previousArtist);
}

// Add event listener to the previous button
previousbutton.addEventListener("click", playPreviousSong);

// Add event listener to the next button
nextbutton.addEventListener("click", playNextSong);


    





