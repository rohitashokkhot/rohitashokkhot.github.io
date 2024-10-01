const audio = document.querySelector("#custom-audio-player");
console.log(audio);

const playPauseBtn = document.querySelector("#play-pause-btn");
console.log(playPauseBtn);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// audio.removeAttribute("controls");
playPauseBtn.addEventListener("click", togglePlayPause);

audio.addEventListener("timeupdate", updateProgressBar);

function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "pause_btn.png";
  } else {
    audio.pause();
    playPauseImg.src = "play_btn.png";
  }
}

// VOLUME SCRIPTING

const volumeUpBtn = document.querySelector("#volume-up-btn");
console.log(volumeUpBtn);

const volumeDownBtn = document.querySelector("#volume-down-btn");
console.log(volumeDownBtn);

function updateVolume() {
  const volume = audio.volume;
  console.log("Volume changed:", volume);
}

audio.addEventListener("volumechange", updateVolume);
//event listener is to check the current volume

volumeUpBtn.addEventListener("click", increaseVolume);

volumeDownBtn.addEventListener("click", decreaseVolume);

//both event listeners above are to decrease/increase volume when the button is clicked

//volume values range from 0 to 1 with an increment of 0.1
function increaseVolume() {
  if (audio.volume < 0.9) {
    audio.volume += 0.1;
  }
}

function decreaseVolume() {
  if (audio.volume > 0.11) {
    audio.volume -= 0.1;
  }
}

// BACKWARD/FORWARD SCRIPTING

const backwardBtn = document.querySelector("#backward-btn");
console.log(backwardBtn);

const forwardBtn = document.querySelector("#forward-btn");
console.log(forwardBtn);

// PROGRESS BAR SCRIPTING

const progressBar = document.querySelector("#progress-bar-fill");
console.log(progressBar);

function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}

// STAR POSITION RANDOMISER

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const STAR_COUNT = 200;
let result = "";
for (let i = 0; i < STAR_COUNT; i++) {
  result += `${randomNumber(-50, 50)}vw ${randomNumber(
    -50,
    50
  )}vh ${randomNumber(2, 3)}px ${randomNumber(2, 3)}px #fff,`;
}
console.log(result.substring(0, result.length - 1));

const stars = document.querySelector(".stars");
console.log(stars);

// TIME DISPLAY SCRIPTING
const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
  setTimeout(showTime, 1000);
}

showTime();
