// I covered all the basic function of a media player. Some additional functions I made is the "About artist" button and the small now-playing indicator on the header.

const trackList = [
  {
    name: "Hes",
    feature: "P - Hase",
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
  },
  {
    name: "Dry Down",
    feature: "P - Hase feat Ben Snaath",
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
  },
  {
    name: "Leapt",
    feature: "P - Hase",
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
  },
  {
    name: "Water Feature",
    feature: "P - Hase",
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
  },
];

const myAudio = document.querySelector("#my-audio");

// // Play button track 1
const playButton1 = document.querySelector("#play-button-1");
console.log(playButton1);
playButton1.addEventListener("click", function chooseAudio() {
  playAudio(0);
});

// Play button track 2
const playButton2 = document.querySelector("#play-button-2");
console.log(playButton2);
playButton2.addEventListener("click", function chooseAudio() {
  playAudio(1);
});

// Play button track 3
const playButton3 = document.querySelector("#play-button-3");
console.log(playButton3);
playButton3.addEventListener("click", function chooseAudio() {
  playAudio(2);
});

// Play button track 4
const playButton4 = document.querySelector("#play-button-4");
console.log(playButton4);
playButton4.addEventListener("click", function chooseAudio() {
  playAudio(3);
});

// display current track name and feature
const currentSong = document.querySelector("#current-song-name");
console.log(currentSong);
const currentFeature = document.querySelector("#current-song-artist");
console.log(currentFeature);

function playAudio(no) {
  myAudio.src = trackList[no].src;
  currentSong.textContent = trackList[no].name;
  currentFeature.textContent = trackList[no].feature;
  console.log(myAudio.src);
  myAudio.load();
  myAudio.play();
}

// play pause button on header
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);
playPauseButton.addEventListener("click", toggleAudio);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

function toggleAudio() {
  if (myAudio.paused || myAudio.ended) {
    myAudio.play();
    playPauseImg.src =
      "https://img.icons8.com/material-rounded/24/FFFFFF/pause.png";
  } else {
    myAudio.pause();
    playPauseImg.src =
      "https://img.icons8.com/sf-regular-filled/48/FFFFFF/play.png";
  }
}

// progress bar
const progressBar = document.querySelector("#progress-bar-fill");
console.log(progressBar);
myAudio.addEventListener("timeupdate", updateProgressBar);

function updateProgressBar() {
  const value = (myAudio.currentTime / myAudio.duration) * 100;
  progressBar.style.width = value + "%";
}

// mute unmute button
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);
const muteUnmuteImg = document.querySelector("#mute-unmute-img");
muteUnmuteButton.addEventListener("click", toggleSound);

function toggleSound() {
  if (myAudio.muted) {
    myAudio.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/sf-black-filled/64/FFFFFF/high-volume.png";
  } else {
    myAudio.muted = true;
    muteUnmuteImg.src =
      "https://img.icons8.com/material-rounded/24/FFFFFF/no-audio--v1.png";
  }
}

// previous song button
const previousButton = document.querySelector("#previous-song-button");
console.log(previousButton);
previousButton.addEventListener("click", previousTrack);

// next song button
const nextButton = document.querySelector("#next-song-button");
console.log(nextButton);
nextButton.addEventListener("click", nextTrack);

let currentIndex = 0;

function previousTrack() {
  currentIndex = (currentIndex - 1 + trackList.length) % trackList.length;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
  currentSong.textContent = trackList[currentIndex].name;
  currentFeature.textContent = trackList[currentIndex].feature;
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % trackList.length;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
  currentSong.textContent = trackList[currentIndex].name;
  currentFeature.textContent = trackList[currentIndex].feature;
}

// function to play audio at specific index
function playAudioAtIndex(no) {
  myAudio.pause();
  console.log(trackList[no].src);
  myAudio.src = trackList[no].src;
  myAudio.load();
  myAudio.play();
}

// decrease volume button
const volumeDownButton = document.querySelector("#volume-down-button");
console.log(volumeDownButton);
volumeDownButton.addEventListener("click", decreaseVolume);

// increase volume button
const volumeUpButton = document.querySelector("#volume-up-button");
console.log(volumeUpButton);
volumeUpButton.addEventListener("click", increaseVolume);

myAudio.addEventListener("volumechange", updateVolume);

function updateVolume() {
  const volume = myAudio.volume;
  console.log("volume changed", volume);
}

function decreaseVolume() {
  if (myAudio.volume > 0.11) {
    myAudio.volume -= 0.1;
  }
}

function increaseVolume() {
  if (myAudio.volume < 0.9) {
    myAudio.volume += 0.1;
  }
}

// This is the part I intended to do the lyric animation which are similar to the karaoke lyrics or those on Apple Music or Spotify, but it didn't work out as I expected. The right side is meant to contain "About artist" and the lyric animation but the later didn't work eventually. I tried with different logics but there was somehting still missing as a key connection between those logics.

// // lyric animation
const lyricData = [
  { time: 1, text: "lyrics 1." },
  { time: 6, text: "another lyrics 2." },
  { time: 10, text: "yet another another lyrics." },
  { time: 14, text: "Lorem ipsum dolor sit." },
  {
    time: 20,
    text: "amet consectetur adipisicing elit. Doloribus, asperiores?",
  },
  { time: 23, text: "Perspiciatis, maiores." },
  { time: 26, text: "Lorem ipsum dolor sit amet." },
  { time: 30, text: "Illo animi aspernatur eligendi similique culpa iste." },
  {
    time: 35,
    text: "Quae non quas quis sequi enim eveniet quia cum placeat! Pariatur reprehenderit.",
  },
];
const lyricButton = document.querySelector("#lyric-button");
console.log(lyricButton);
lyricButton.addEventListener("click", function () {
  lyricDisplay(myAudio.currentTime);
});
myAudio.addEventListener("timeupdate", function () {
  lyricDisplay(myAudio.currentTime);
});
const lyricContainer = document.querySelector(".lyric-container");
function lyricDisplay(time) {
  console.log(time);
  for (let currentLyric = 0; currentLyric < lyricData.length; currentLyric++) {
    if (
      time >= lyricData[currentLyric].time &&
      time < lyricData[currentLyric + 1].time
    ) {
      lyricContainer.textContent = lyricData[currentLyric].text;
    }
  }
}
// const audioLyric = trackList[2];
// console.log(audioLyric);
// myAudio.addEventListener("timeupdate", updateLyricHighlight);

// function updateLyricHighlight() {
//     const value2 = (myAudio.currentTime / myAudio.duration) * 100;
//     progressBar.style.height = value2 + "%";
// }

// audioLyric.addEventListener("timeupdate", lyricDisplay);

// function lyricDisplay(no){
//     if (currentLyric < lyricData.length) {
//         const line = lyricData[no];

// }}

// About artist button
// For this button, I also want to highlight the information that will appear so I make it slightly change background color when it's shown.
const aboutArtistButton = document.querySelector("#about-artist");
console.log(aboutArtistButton);
aboutArtistButton.addEventListener("click", aboutArtistDisplay);

const aboutArtistContainer = document.querySelector(".right");
console.log(aboutArtistContainer);

const infoArtist = document.querySelector("#info-artist").textContent;
console.log(infoArtist);

function aboutArtistDisplay() {
  aboutArtistContainer.textContent = infoArtist;
  aboutArtistContainer.style.backgroundColor = "rgba(50, 50, 50, 1)";
}
