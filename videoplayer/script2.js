const videos = [
  {
    name: "zenscape",
    src: "zenscape.mp4",
  },
  {
    name: "stardust",
    src: "stardust.mp4",
  },
];

const videoName = document.querySelector("#video-name");

const firstVideoButton = document.querySelector("#first-video-btn");
console.log(firstVideoButton);
firstVideoButton.addEventListener("click", function () {
  loadMe(0);
});

const secondVideoButton = document.querySelector("#second-video-btn");
console.log(secondVideoButton);
secondVideoButton.addEventListener("click", function () {
  loadMe(1);
});

const myVideo = document.querySelector("#my-video");
console.log(myVideo);

function loadMe(no) {
  myVideo.src = videos[no].src;
  videoName.textContent = videos[no].name;
  myVideo.load();
}

myVideo.addEventListener("timeupdate", updateProgressBar);

const progressBar = document.querySelector("#progress-bar-fill");
const videoTime = document.querySelector("#video-time");

function updateProgressBar() {
  // console.log(myVideo.currentTime);
  let progress = (myVideo.currentTime / myVideo.duration) * 100;
  // console.log(progress);
  progressBar.style.width = progress + "%";
  videoTime.textContent = myVideo.currentTime.toFixed(2);
}

const muteUnmuteButton = document.querySelector("#mute-unmute-btn");
console.log(muteUnmuteButton);

muteUnmuteButton.addEventListener("click", muteUnmuteMe);

function muteUnmuteMe() {
  if (myVideo.muted) {
    myVideo.muted = false;
    muteUnmuteButton.style.backgroundColor = "#d5cea3";
  } else {
    myVideo.muted = true;
    muteUnmuteButton.style.backgroundColor = "#7b775e";
  }
}

myVideo.addEventListener("dblclick", toggleFullScreen);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else document.exitFullscreen();
}

let currentIndex = 0;
const prevButton = document.querySelector("#previous-btn");
console.log(prevButton);
prevButton.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex = currentIndex - 1;
    loadMe(currentIndex);
    prevButton.style.backgroundColor = "#d5cea3";
    nextButton.disabled = false;
  } else {
    prevButton.disabled = true;
    prevButton.style.backgroundColor = "#7b775e";
  }
  console.log(currentIndex);
});

const nextButton = document.querySelector("#next-btn");
console.log(nextButton);
nextButton.addEventListener("click", function () {
  if (currentIndex < videos.length - 1) {
    currentIndex = currentIndex + 1;
    loadMe(currentIndex);
    nextButton.style.backgroundColor = "#d5cea3";
    prevButton.disabled = false;
  } else {
    nextButton.disabled = true;
    nextButton.style.backgroundColor = "#7b775e";
  }
  console.log(currentIndex);
});
