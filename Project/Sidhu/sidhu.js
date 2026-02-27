console.log("Welcome to MelodyStream");

// 1. Initialize Variables
let songIndex = 0;
let audioElement = new Audio(); // Set initial song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName'); // This now exists
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "295", filePath: "1.mp3", coverPath: "cover.jpeg"},
    {songName: "So High", filePath: "2.mp3", coverPath: "cover.jpeg"},
    {songName: "Same Beef", filePath: "3.mp3", coverPath: "cover.jpeg"},
    {songName: "Legend", filePath: "4.mp3", coverPath: "cover.jpeg"},
    {songName: "The Last Ride", filePath: "5.mp3", coverPath: "cover.jpeg"},
    {songName: "B-Town", filePath: "6.mp3", coverPath: "cover.jpeg"},
    {songName: "Drippy", filePath: "7.mp3", coverPath: "cover.jpeg"},
    {songName: "East Side Flow", filePath: "8.mp3", coverPath: "cover.jpeg"},
    {songName: "Bambhia Bole", filePath: "9.mp3", coverPath: "cover.jpeg"},
    {songName: "Tibeyan Da Putt", filePath: "10.mp3", coverPath: "cover.jpeg"}
];

// 2. Map Songs to UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// 3. Play/Pause Logic (Master Button)
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
        makeAllPlays(); // Reset small icons when pausing
    }
});

// 4. Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => { // Changed 'change' to 'input' for smoother seeking
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// 5. Individual Song Play Buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        
        audioElement.src = songs[songIndex].filePath; // Better to use the object path
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    });
});

// 6. Next and Previous Controls
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= 9) ? 0 : songIndex + 1;
    playSelectedSong();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? 9 : songIndex - 1;
    playSelectedSong();
});

// Helper function to handle repetition in Next/Prev
const playSelectedSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
};

//  Mobile Menu Toggle JS

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const icon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
});