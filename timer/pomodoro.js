document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startButton = document.querySelector(".start-button");
  const rainSound = document.getElementById("rain-sound");
  const mainContainer = document.querySelector("main");
  const inputs = document.querySelectorAll(".journal-input");
  const soundToggle = document.getElementById("sound-toggle");

  // Variables
  let timer;
  let timeLeft;
  let isWorking = true;
  let isPaused = false;
  let isSoundOn = true;
  let workDuration = parseInt(inputs[0].value) * 60;
  let breakDuration = parseInt(inputs[1].value) * 60;

  // Event Listeners
  startButton.addEventListener("click", startSession);
  inputs.forEach((input) => {
    input.addEventListener("change", updateDurations);
  });

  soundToggle.addEventListener("click", toggleSound);

  // Functions
  function updateDurations() {
    workDuration = parseInt(inputs[0].value) * 60;
    breakDuration = parseInt(inputs[1].value) * 60;
  }

  function toggleSound() {
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
      rainSound.play();
      soundToggle.textContent = "Sound: On";
    } else {
      rainSound.pause();
      soundToggle.textContent = "Sound: Off";
    }
  }

  function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = "";

    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }

    typing();
  }

  function startSession() {
    // Play rain sound if enabled
    if (isSoundOn) {
      rainSound.volume = 0.4;
      rainSound.play();
    }

    // Transform the interface
    transformInterface();

    // Start the timer
    isWorking = true;
    timeLeft = workDuration;
    updateTimerDisplay();

    // Start countdown
    timer = setInterval(countdown, 1000);
  }

  function transformInterface() {
    // Save input values
    const workTime = inputs[0].value;
    const breakTime = inputs[1].value;

    // Clear the main container
    mainContainer.innerHTML = "";

    // Create new elements
    const journalEntry = document.createElement("p");
    journalEntry.className = "journal-entry";

    const timerElement = document.createElement("div");
    timerElement.id = "timer";

    const statusLine = document.createElement("p");
    statusLine.className = "status-line";

    const controlsElement = document.createElement("div");
    controlsElement.className = "journal-controls";

    const pauseButton = document.createElement("span");
    pauseButton.className = "journal-link";
    pauseButton.textContent = "pause";
    pauseButton.addEventListener("click", togglePause);

    const resetButton = document.createElement("span");
    resetButton.className = "journal-link";
    resetButton.textContent = "restart";
    resetButton.addEventListener("click", resetTimer);

    const soundButton = document.createElement("span");
    soundButton.className = "journal-link";
    soundButton.textContent = isSoundOn ? "quiet" : "sound";
    soundButton.addEventListener("click", () => {
      isSoundOn = !isSoundOn;
      soundButton.textContent = isSoundOn ? "quiet" : "sound";
      if (isSoundOn) {
        rainSound.play();
      } else {
        rainSound.pause();
      }
    });

    const reflectionLine = document.createElement("p");
    reflectionLine.className = "reflection-line";
    reflectionLine.contentEditable = true;
    reflectionLine.dataset.placeholder = "...";

    // Set initial text with typewriter effect
    setTimeout(() => {
      if (isWorking) {
        typeText(
          journalEntry,
          "Focus time begins. The rain keeps falling steadily outside."
        );
        typeText(statusLine, `I will work until the timer reaches zero.`, 40);
      } else {
        typeText(journalEntry, "Time for a short break. The rain is soothing.");
        typeText(
          statusLine,
          `I'll rest for a while before returning to work.`,
          40
        );
      }
    }, 300);

    // Append elements
    controlsElement.appendChild(pauseButton);
    controlsElement.appendChild(document.createTextNode(" · "));
    controlsElement.appendChild(resetButton);
    controlsElement.appendChild(document.createTextNode(" · "));
    controlsElement.appendChild(soundButton);

    mainContainer.appendChild(journalEntry);
    mainContainer.appendChild(timerElement);
    mainContainer.appendChild(statusLine);
    mainContainer.appendChild(controlsElement);
    mainContainer.appendChild(reflectionLine);
  }

  function countdown() {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timer);
      isWorking = !isWorking;

      // Play notification sound if sound is enabled
      if (isSoundOn) {
        const notification = new Audio("notification.mp3");
        notification.volume = 0.5;
        notification.play();
      }

      // Store any reflection text if available
      const reflectionLine = document.querySelector(".reflection-line");
      let reflectionText = "";
      if (reflectionLine) {
        reflectionText = reflectionLine.textContent;
      }

      // Reset the timer for next session
      timeLeft = isWorking ? workDuration : breakDuration;

      // Update the interface
      updateInterface(reflectionText);

      // Restart countdown
      timer = setInterval(countdown, 1000);
    }

    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const timerElement = document.getElementById("timer");
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function updateInterface(previousReflection) {
    const journalEntry = document.querySelector(".journal-entry");
    const statusLine = document.querySelector(".status-line");
    const reflectionLine = document.querySelector(".reflection-line");

    // Update with typewriter effect
    if (isWorking) {
      typeText(journalEntry, "Back to focusing. The rain continues to fall.");
      typeText(statusLine, `I will concentrate for a while longer.`, 40);
    } else {
      typeText(
        journalEntry,
        "Taking a short break now. The sound of rain helps me relax."
      );
      typeText(statusLine, `I'll rest my mind before returning to work.`, 40);
    }

    // Reset the reflection line
    reflectionLine.textContent = "";

    // If there was previous reflection text, create a past reflection element
    if (
      previousReflection &&
      previousReflection.trim() !== "" &&
      previousReflection !== "..."
    ) {
      const pastReflection = document.createElement("p");
      pastReflection.className = "past-reflection";

      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      pastReflection.textContent = `${timestamp}: ${previousReflection}`;

      // Insert after status line
      statusLine.insertAdjacentElement("afterend", pastReflection);
    }
  }

  function togglePause() {
    const pauseButton = document.querySelector(".journal-link");

    if (isPaused) {
      // Resume the timer
      timer = setInterval(countdown, 1000);
      pauseButton.textContent = "pause";
    } else {
      // Pause the timer
      clearInterval(timer);
      pauseButton.textContent = "resume";
    }

    isPaused = !isPaused;
  }

  function resetTimer() {
    // Clear the timer
    clearInterval(timer);

    // Reset to initial interface
    mainContainer.innerHTML = `
      <p>It has been raining since evening. Things have been a bit chaotic.</p>
      <p>
        I will focus for
        <input type="number" class="journal-input" value="${inputs[0].value}" min="5" max="90" />
        minutes, then treat myself to a
        <input type="number" class="journal-input" value="${inputs[1].value}" min="1" max="30" /> minute
        break.
      </p>
      <p>Let's begin when I feel ready.</p>
      <p style="margin-top: 20px">
        <button class="start-button">Begin</button>
      </p>
    `;

    // Re-attach event listeners
    document
      .querySelector(".start-button")
      .addEventListener("click", startSession);
    document.querySelectorAll(".journal-input").forEach((input) => {
      input.addEventListener("change", updateDurations);
    });
  }
});
