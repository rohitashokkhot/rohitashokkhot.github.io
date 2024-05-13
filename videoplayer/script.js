// We create an object array containing the videos
const videoList = [
  { name: "Zenscape", link: "zenscape.mp4" },
  { name: "Stardust", link: "stardust.mp4" },
];

let loop = false;

const playPauseButton = document.querySelector("#play-pause-btn");
playPauseButton.addEventListener("click", togglePlay);
const playPauseImg = document.querySelector("#play-pause-img");

const muteUnmuteButton = document.querySelector("#mute-unmute-btn");
muteUnmuteButton.addEventListener("click", toggleAudio);
const muteUnmuteImg = document.querySelector("#mute-unmute-img");

const increaseVolumeButton = document.querySelector("#increase-volume-btn");
increaseVolumeButton.addEventListener("click", increaseVolume);

const decreaseVolumeButton = document.querySelector("#decrease-volume-btn");
decreaseVolumeButton.addEventListener("click", decreaseVolume);

const loopButton = document.querySelector("#loop-btn");
loopButton.addEventListener("click", loopVideo);

const step1Button = document.querySelector("#step-1-btn");
step1Button.addEventListener("click", gotoStep1);

const myVideo = document.querySelector("#my-video");
const videoName = document.querySelector("#video-name");
const videoTime = document.querySelector("#video-time");
const progressBar = document.querySelector("#progress-bar-fill");
// myVideo.removeAttribute("controls");
myVideo.addEventListener("timeupdate", updateProgressBar);
myVideo.addEventListener("volumechange", updateVolume);
myVideo.addEventListener("ended", replay);
const firstVideoButton = document.querySelector("#first-video-btn");
firstVideoButton.addEventListener("click", function playIt() {
  myVideo.pause();
  playVideo(0);
});

function updateVolume() {
  const volume = myVideo.volume;
  console.log("Volume changed:", volume);
}

function increaseVolume() {
  if (myVideo.volume < 0.9) {
    myVideo.volume += 0.1;
  }
}

function decreaseVolume() {
  if (myVideo.volume > 0.11) {
    myVideo.volume -= 0.1;
  }
}

function gotoStep1() {
  myVideo.currentTime = 16.41;
}

const secondVideoButton = document.querySelector("#second-video-btn");
secondVideoButton.addEventListener("click", function playIt() {
  myVideo.pause();
  playVideo(1);
});

function togglePlay() {
  if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

function toggleAudio() {
  if (myVideo.muted) {
    myVideo.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png";
  } else {
    myVideo.muted = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  }
}

function playVideo(no) {
  myVideo.src = videoList[no].link;
  videoName.textContent = videoList[no].name;
  // myVideo.load();
  // myVideo.play();
}

function replay() {
  console.log("loop is", loop);
  if (loop) {
    myVideo.currentTime = 0;
    myVideo.play();
  }
}

function loopVideo() {
  if (loop) {
    loop = false;
    loopButton.style.backgroundColor = "#d5cea3";
  } else {
    loop = true;
    loopButton.style.backgroundColor = "#7b775e";
  }
  console.log("loop is", loop);
}

function updateProgressBar() {
  videoTime.textContent = myVideo.currentTime.toFixed(2);
  const value = (myVideo.currentTime / myVideo.duration) * 100;
  progressBar.style.width = value + "%";
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // If no element is in fullscreen, request fullscreen on the video player
    myVideo.requestFullscreen();
  } else {
    // Otherwise, exit fullscreen
    document.exitFullscreen();
  }
}

// Event listener for double-click on the video to toggle fullscreen
myVideo.addEventListener("dblclick", toggleFullscreen);

// Event listener for fullscreen change event to update UI
document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement === myVideo) {
    console.log("Entered fullscreen");
  } else {
    console.log("Exited fullscreen");
  }
});
