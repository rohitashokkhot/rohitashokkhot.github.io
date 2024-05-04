const videoList = ["zenscape.mp4", "stardust.mp4"];
const playPauseButton = document.querySelector("#play-pause-btn");
playPauseButton.addEventListener("click", togglePlay);
const playPauseImg = document.querySelector("#play-pause-img");
const myVideo = document.querySelector("#my-video");

const firstVideoButton = document.querySelector("#first-video-btn");
firstVideoButton.addEventListener("click", function playIt() {
  myVideo.pause();
  playVideo(0);
});

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

function playVideo(no) {
  myVideo.src = videoList[no];
  // myVideo.load();
  // myVideo.play();
}
