const setupDiv = document.getElementById("setup");
const focusInput = document.getElementById("focusInput");
const breakInput = document.getElementById("breakInput");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const statusDisplay = document.getElementById("status");
const quoteDiv = document.getElementById("quote");

let focusTime = 0;
let breakTime = 0;
let timeLeft = 0;
let isFocus = true;
let interval = null;

function formatTime(sec) {
  const mins = String(Math.floor(sec / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateTimer() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function switchMode() {
  isFocus = !isFocus;
  timeLeft = isFocus ? focusTime : breakTime;
  statusDisplay.textContent = isFocus ? "Focus Time 🍅" : "Break Time ☕";
  updateTimer();
}

startButton.addEventListener("click", () => {
  focusTime = parseInt(focusInput.value) * 60;
  breakTime = parseInt(breakInput.value) * 60;
  timeLeft = focusTime;
  isFocus = true;

  // Fade out setup inputs
  setupDiv.classList.add("fade-out");

  // Fade in quote
  quoteDiv.classList.add("show");
  startButton.disabled = true;
  pauseButton.disabled = false;

  statusDisplay.textContent = "Step 2: Focus Time 🍅 - Timer started!";
  updateTimer();

  if (!interval) {
    interval = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(interval);
        interval = null;
        switchMode();
        startTimerAgain();
      }
    }, 1000);
  }
});

function startTimerAgain() {
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(interval);
      interval = null;
      switchMode();
      startTimerAgain();
    }
  }, 1000);
}

pauseButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  statusDisplay.textContent = "Step 2: Paused ⏸️";
});

resetButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;

  // Fade back setup inputs
  setupDiv.classList.remove("fade-out");

  // Hide quote
  quoteDiv.classList.remove("show");
  startButton.disabled = false;
  pauseButton.disabled = true;
  timerDisplay.textContent = "00:00";
  statusDisplay.textContent = "Step 1: Set your timer ⏳";
});
