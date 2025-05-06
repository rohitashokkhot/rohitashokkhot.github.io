// DOM Elements

const typedText = document.querySelector("#typed-text");
const editableArea = document.querySelector("#editable-area");
const timerDisplay = document.querySelector("#timer");
const rainSound = document.querySelector("#rain-sound");
const soundToggle = document.querySelector("#sound-toggle");
let pauseButton = document.querySelector("#pause-button");
let resetButton = document.querySelector("#reset-button");
const controlsDiv = document.querySelector("#controls");

// Variables
let timer;
let timeLeft;
let isWorking = true;
let isPaused = false;
let workDuration = 25 * 60; // Default 25 minutes
let breakDuration = 5 * 60; // Default 5 minutes
let narrativeStep = 0;
let typingSpeed = 50; // ms per character
let typingTimeout;
let isTyping = false;
let currentSession = null; // To track session state
let sessionJournals = []; // Store journals for different sessions

// Narrative flow
const narrativeFlow = [
  {
    text: "It has been raining since evening. Things have been a bit chaotic.",
    action: null,
  },
  {
    text: "I will focus for <input type='number' class='user-input' id='work-time' value='25' min='1' max='120'> minutes, then treat myself to a <input type='number' class='user-input' id='break-time' value='5' min='1' max='30'> minute break.",
    action: setupTimeInputs,
  },
  {
    text: "Let's <span class='interactive-text' id='begin-link'>begin</span> when I feel ready.",
    action: setupBeginLink,
  },
];

// Journal prompts for different sessions
const focusPrompts = [
  "What's my intention for this focused time?",
  "What obstacles might distract me, and how will I handle them?",
  "What one thing would make this session successful?",
  "How does my mind feel right now as I prepare to focus?",
  "What small accomplishment am I working toward?",
];

const breakPrompts = [
  "What went well during that focused time?",
  "What did I notice about my attention?",
  "What would help me return to focus refreshed?",
  "How has my energy shifted during this session?",
  "What small insight came up during my work?",
];

// Start the narrative
startNarrative();

// Functions for typewriter effect
function startNarrative() {
  typeText(narrativeFlow[0].text, () => {
    setTimeout(() => {
      narrativeStep++;
      continueNarrative();
    }, 1500);
  });
}

function continueNarrative() {
  if (narrativeStep < narrativeFlow.length) {
    typeText(narrativeFlow[narrativeStep].text, () => {
      // Execute any action associated with this step
      if (narrativeFlow[narrativeStep].action) {
        narrativeFlow[narrativeStep].action();
      }

      // Move to next step if appropriate
      if (narrativeStep < narrativeFlow.length - 1) {
        setTimeout(() => {
          narrativeStep++;
          continueNarrative();
        }, 1500);
      }
    });
  }
}

function typeText(text, callback) {
  // Stop any ongoing typing
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  isTyping = true;
  let i = 0;
  typedText.innerHTML = "";

  function typeNextChar() {
    if (i < text.length) {
      // For HTML elements, we need to add the whole element at once
      if (text[i] === "<") {
        // Find the end of the HTML tag or element
        const endTagIndex = text.indexOf(">", i);

        // Check if it's a closing tag or a self-closing tag
        let endElementIndex = text.indexOf("</", i + 1);
        if (endElementIndex === -1) endElementIndex = Infinity;

        const closingBracketIndex = text.indexOf(">", endElementIndex);

        // Add the entire HTML element
        if (endElementIndex < Infinity) {
          typedText.innerHTML += text.substring(i, closingBracketIndex + 1);
          i = closingBracketIndex + 1;
        } else {
          // Self-closing or void element
          typedText.innerHTML += text.substring(i, endTagIndex + 1);
          i = endTagIndex + 1;
        }
      } else {
        typedText.innerHTML += text[i];
        i++;
      }

      // Continue typing
      typingTimeout = setTimeout(typeNextChar, typingSpeed);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

  typeNextChar();
}

// Setup input interaction for time settings
function setupTimeInputs() {
  const workTimeInput = document.getElementById("work-time");
  const breakTimeInput = document.getElementById("break-time");

  if (workTimeInput && breakTimeInput) {
    workTimeInput.addEventListener("change", () => {
      workDuration = parseInt(workTimeInput.value) * 60;
    });

    breakTimeInput.addEventListener("change", () => {
      breakDuration = parseInt(breakTimeInput.value) * 60;
    });
  }
}

// Setup begin link
function setupBeginLink() {
  const beginLink = document.getElementById("begin-link");

  if (beginLink) {
    beginLink.addEventListener("click", startFocusSession);
  }
}

// Start the focus session
function startFocusSession() {
  // Update work and break durations in case they were changed
  const workTimeInput = document.getElementById("work-time");
  const breakTimeInput = document.getElementById("break-time");

  if (workTimeInput && breakTimeInput) {
    workDuration = parseInt(workTimeInput.value) * 60;
    breakDuration = parseInt(breakTimeInput.value) * 60;
  }

  // Play rain sound
  rainSound.volume = 0.6;
  rainSound.play();

  // Clear current narrative and start focus narrative
  typedText.innerHTML = "";

  // Show the timer
  timerDisplay.style.opacity = "1";

  // Show controls
  controlsDiv.style.opacity = "1";

  // Start with work session
  isWorking = true;
  timeLeft = workDuration;
  currentSession = "work";
  updateTimerDisplay();

  // Show journal prompt for focus session
  const randomPrompt =
    focusPrompts[Math.floor(Math.random() * focusPrompts.length)];

  // Update narrative
  typeText(
    "The rain continues to fall. I can focus now, the world outside dims as my thoughts gather.",
    () => {
      setTimeout(() => {
        typeText(randomPrompt, () => {
          // Show editable area for journaling
          editableArea.style.opacity = "1";
          editableArea.setAttribute(
            "data-placeholder",
            "Write your thoughts here..."
          );

          // Focus on editable area
          setTimeout(() => {
            editableArea.focus();
          }, 500);
        });
      }, 1500);
    }
  );

  // Setup control buttons
  setupControlButtons();

  // Start countdown
  timer = setInterval(countdown, 1000);
}

// Setup control buttons
function setupControlButtons() {
  // Clear previous event listeners
  pauseButton.replaceWith(pauseButton.cloneNode(true));
  resetButton.replaceWith(resetButton.cloneNode(true));

  // Update references
  pauseButton = document.getElementById("pause-button");
  resetButton = document.getElementById("reset-button");

  // Add new event listeners
  pauseButton.addEventListener("click", togglePause);
  resetButton.addEventListener("click", resetTimer);
}

// Countdown function
function countdown() {
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(timer);

    // Save journal if any
    saveJournal();

    // Toggle session type
    isWorking = !isWorking;
    currentSession = isWorking ? "work" : "break";

    // Play notification sound
    document.getElementById("notification-sound").play();

    // Get a random prompt based on session type
    const prompts = isWorking ? focusPrompts : breakPrompts;
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    // Update the narrative
    if (isWorking) {
      typeText("Break is over. Back to focus with renewed clarity.", () => {
        setTimeout(() => {
          typeText(randomPrompt, () => {
            // Prepare journal area
            editableArea.style.opacity = "1";
            editableArea.textContent = "";
            editableArea.focus();
          });
        }, 1500);
      });
    } else {
      typeText(
        "Time to pause and breathe. The rain provides a gentle backdrop for rest.",
        () => {
          setTimeout(() => {
            typeText(randomPrompt, () => {
              // Prepare journal area
              editableArea.style.opacity = "1";
              editableArea.textContent = "";
              editableArea.focus();
            });
          }, 1500);
        }
      );
    }

    // Reset timer for next session
    timeLeft = isWorking ? workDuration : breakDuration;

    // Restart countdown
    timer = setInterval(countdown, 1000);
  }

  updateTimerDisplay();
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Visual indicator of work/break status
  timerDisplay.style.color = isWorking
    ? "rgba(255, 255, 255, 0.8)"
    : "rgba(122, 180, 194, 0.8)";
}

// Toggle pause
function togglePause() {
  if (isPaused) {
    // Resume
    timer = setInterval(countdown, 1000);
    pauseButton.textContent = "pause";
    typeText("Continuing where we left off. The rain still falls.", null);
  } else {
    // Pause
    clearInterval(timer);
    pauseButton.textContent = "continue";
    typeText(
      "Time stands still for a moment. The rain continues regardless.",
      null
    );
  }

  isPaused = !isPaused;
}

// Save journal entry
function saveJournal() {
  const journalText = editableArea.textContent.trim();

  if (journalText) {
    sessionJournals.push({
      text: journalText,
      timestamp: new Date().toLocaleTimeString(),
      type: currentSession,
    });

    // In a real app, you might save this to localStorage here
    // localStorage.setItem('journal-entries', JSON.stringify(sessionJournals));

    // Clear editable area
    editableArea.textContent = "";
  }
}

// Reset timer and interface
function resetTimer() {
  // Clear timer
  clearInterval(timer);

  // Save any current journal
  saveJournal();

  // Hide timer and controls
  timerDisplay.style.opacity = "0";
  controlsDiv.style.opacity = "0";

  // Reset to beginning
  narrativeStep = 0;

  // Clear the narrative
  typedText.innerHTML = "";
  editableArea.style.opacity = "0";
  editableArea.textContent = "";

  // Restart the narrative flow
  setTimeout(() => {
    startNarrative();
  }, 500);

  // Stop the audio
  rainSound.pause();
  rainSound.currentTime = 0;

  // Reset pause state
  isPaused = false;
  pauseButton.textContent = "pause";
}

// Sound toggle handler
soundToggle.addEventListener("click", () => {
  if (rainSound.paused) {
    rainSound.play();
    soundToggle.textContent = "rain";
    soundToggle.style.color = "rgba(255, 255, 255, 0.5)";
  } else {
    rainSound.pause();
    soundToggle.textContent = "silence";
    soundToggle.style.color = "rgba(122, 180, 194, 0.5)";
  }
});

// Make editable area work like it should
editableArea.addEventListener("focus", function () {
  if (this.textContent.trim() === "") {
    this.textContent = "";
  }
});

editableArea.addEventListener("blur", function () {
  if (this.textContent.trim() === "") {
    this.textContent = "";
  }
});

// Handle keyboard interactions
document.addEventListener("keydown", (e) => {
  // Space bar to pause/resume (when not typing or editing)
  if (
    e.code === "Space" &&
    !isTyping &&
    document.activeElement !== editableArea
  ) {
    e.preventDefault();
    if (timer) togglePause();
  }

  // Escape to reset
  if (e.key === "Escape") {
    resetTimer();
  }
});
