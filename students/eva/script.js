// Here is an object array containing the videos. The videos are identified by an id number which the playVideo function() fetches on click
const videoList = [
  {
    id: 1,
    name: "Sweet Honeycomb",
    link: "https://www.dropbox.com/scl/fi/c4nwslntq12tqb8y3p5rg/Sweet-Honeycomb-Done.mp4?rlkey=qxb1v84yc9sso9s6u1d14te20&st=ny2yh0t2&dl=1",
  },

  {
    id: 2,
    name: "Serene Cherry",
    link: "https://www.dropbox.com/scl/fi/edw62c2bq4rmypn8xpm4m/Serene-Cherry-Video.mp4?rlkey=9402mo2hh2tprme5dtkcxf5lz&st=p8abpkja&dl=1",
  },

  {
    id: 3,
    name: "Morning Dew",
    link: "https://www.dropbox.com/scl/fi/9vm4rxhbz5m9d1jinec4q/Morning-Dew.mp4?rlkey=6xl7rtrh97muh9tcv8620y9gm&st=dvv64akh&dl=1",
  },
];
// Music References
// https://pixabay.com/music/modern-classical-relaxing-piano-for-sleeping-312507/
// https://pixabay.com/music/modern-classical-golden-sunset-piano-music-200136/

let loop = true;

// VIDEO PLAYER + PLAYLIST
const videoName = document.querySelector("#video-name");
const videoTime = document.querySelector("#video-time");
const video = document.querySelector("#my-video1");
const playPauseBtn = document.querySelector("#play-pause-button1");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src =
      "https://img.icons8.com/ios-glyphs/30/fdafc9/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src =
      "https://img.icons8.com/fluency-systems-filled/48/fdafc9/play.png";
  }
}
// First new Feature: Displaying Minutes and Seconds. Precise playtime displayed for users.
// https://stackoverflow.com/questions/72764258/vanilla-js-how-would-i-display-a-video-currenttime-value-in-a-minutesseconds
// I used Stackoverflow for the code from lines 44 to 48, I then resolved the issue of the minutes not displaying on the page by altering their code.
// Here there is an equation using time = video.CurrentTime into timeString which displays minutes and seconds,
// I figured that videoTime.textContent would have to equal timeString for the minutes:seconds to be displayed on the page.
function updateProgressBar() {
  const time = video.currentTime;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const timeString = `${minutes}:${seconds}`;
  const value = (video.currentTime / video.duration) * 100;
  videoTime.textContent = timeString;
  progressBar.style.width = value + "%";
}

// When the first video button is clicked the play/pause button changes to pause button to indicate the video is playing
// It took a lot of trial and error to work out how to implement the function.
// I was trying to use the togglePlayPause function however I only needed the if statement, as I already had a function playIt.
// Event listener to play the first video
const firstVideoButton = document.querySelector("#first-video-btn");
firstVideoButton.addEventListener("click", function playIt() {
  // video.pause();
  playVideo(0);
});

// This did not work as I was adding another function unnecessarily
// function togglePlayPause() {
//   if (video.paused || video.ended) {
//     video.play();
//     playPauseImg.src =
//       "https://img.icons8.com/ios-glyphs/30/fdafc9/pause--v1.png";
//   }
// }

// Event listener to play the first video
const secondVideoButton = document.querySelector("#second-video-btn");
secondVideoButton.addEventListener("click", function playIt() {
  // video.pause();
  playVideo(1);
});

// Event listener to play the third video
const thirdVideoButton = document.querySelector("#third-video-btn");
thirdVideoButton.addEventListener("click", function playIt() {
  // video.pause();
  playVideo(2);
});

function playVideo(no) {
  video.src = videoList[no].link;
  videoName.textContent = videoList[no].name;
  video.load();
  togglePlayPause();
}

// VIDEO BACKGROUND FROM W3SCHOOLS
// Fetch the video
// const video1 = document.querySelector("#my-video1");
// const playPauseButton1 = document.querySelector("#play-pause-button1");

// function myFunction() {
//   if (video1.paused) {
//     video1.play();
//     playPauseButton1.innerHTML = "Pause";
//   } else {
//     video1.pause();
//     playPauseButton1.innerHTML = "Play";
//   }
// }

// // AUDIO PLAYER
// const topHeading = document.querySelector("#top-heading");
// console.log(topHeading);

// let myNewHeading = "audio is currently playing";

// const dangoAudio = document.querySelector("#dango-audio");
// console.log(dangoAudio);

// // playing sound
// const playButton = document.querySelector("#play-button");
// console.log(playButton);

// playButton.addEventListener("click", playAudio);

// function playAudio() {
//   myNewHeading = "Audio is currently playing";
//   dangoAudio.play();
//   topHeading.textContent = myNewHeading;
// }

// PLAYLIST LOGIC - USEFUL FOR ASSIGNMENT 2
// const playlist = [
//   { id: 1, src: "stardust.mp4" },
//   { id: 2, src: "zenscape.mp4" },
//   {
//     id: 3,
//     src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4",
//     name: "Music Video",
//   },
// ];

// // stardust
// // playlist logic
// const stardustButton = document.querySelector("#stardust-vid-button");
// console.log(stardustButton);

// // listen to click button
// stardustButton.addEventListener("click", function chooseStardust() {
//   chooseVideo(0);
// });

// // zenscape
// // playlist logic
// const zenscapeButton = document.querySelector("#zenscape-vid-button");
// console.log(zenscapeButton);

// // listen to click button
// zenscapeButton.addEventListener("click", function chooseZenscape() {
//   chooseVideo(1);
// });

// // music video
// // playlist logic
// const musicVidButton = document.querySelector("#musicvideo-vid-button");
// console.log(musicVidButton);

// // listen to click button
// musicVidButton.addEventListener("click", function chooseMusicVideo() {
//   chooseVideo(2);
// });
// //
// function chooseVideo(no) {
//   video.src = playlist[no].src;
//   console.log(video.src);
//   video.load();
//   video.play();
// }
