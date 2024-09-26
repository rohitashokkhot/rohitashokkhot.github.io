const audio = document.querySelector("#custom-audio-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
// const muteBtn = document.querySelector("#mute-btn");
// const muteImg = document.querySelector("#mute-img");
const volImg = document.querySelector("#vol-img");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
audio.removeAttribute("controls");

// This code intends to count the number of times the volume button is clicked, so it can cycle through the functions of low volume, mute, and full volume.
let volClicks = 0;
function vol() {
  volClicks++;
  console.log("click");
  if (volClicks === 1) {
    audio.volume = 0.3;
    volImg.src = "https://img.icons8.com/ios-glyphs/30/low-volume.png";
    console.log("audio low");
    console.log(volClicks);
  } else if (volClicks === 2) {
    audio.muted = true;
    volImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
    console.log("audio muted");
    console.log(volClicks);
  } else if (volClicks === 3) {
    audio.muted = false;
    volImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
    console.log("audio unmuted");
    console.log(volClicks);
    volClicks = 0;
  }
}

// playPauseBtn.addEventListener("click", togglePlayPause);
audio.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

// function toggleMute() {
//   if (audio.muted) {
//     audio.muted = false;
//     muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
//     console.log("audio unmuted");
//   } else {
//     audio.muted = true;
//     muteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
//     console.log("audio muted")
//   }
//   console.log(audio.muted);
// }

function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}

var startingMinutes = 25;
var time = startingMinutes * 60;

const inputTime = document.querySelector("#input-time").value;
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", submitPressed);
function submitPressed() {
  time = inputTime * 60;
  console.log(inputTime);
  console.log("submit");
}

const timer = document.querySelector("#timer");

const startTimerBtn = document.querySelector("#start-timer-btn");
const stopTimerBtn = document.querySelector("#stop-timer-btn");
const resetTimerBtn = document.querySelector("#reset-timer-btn");

stopTimerBtn.disabled = true;

// these functions
var timerID;
function startTimer() {
  timerID = setInterval(updateTimer, 1000);
  startTimerBtn.disabled = true;
  stopTimerBtn.disabled = false;
  startTimerBtn.style.backgroundColor = "red";
  console.log("start timer");
  console.log(inputTime);
}
function stopTimer() {
  clearInterval(timerID);
  startTimerBtn.disabled = false;
  stopTimerBtn.disabled = true;
  console.log("stop timer");
}
function resetTimer() {
  clearInterval(timerID);
  time = startingMinutes * 60;
  startTimerBtn.disabled = false;
  stopTimerBtn.disabled = true;
  updateTimer();
  console.log("reset timer");
}

// var timerClick = 0;
// function startTimer() {
//   if ((timerClick = "0")) {
//     setInterval(updateTimer, 1000);
//     timerClick = 1;
//   } else {
//     clearInterval();
//     timerClick = 0;
//   }
// }

function updateTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timer.innerHTML = `${minutes}: ${seconds}`;
  time--;
  time = time < 0 ? 0 : time;
}
// Add other functionalities here
