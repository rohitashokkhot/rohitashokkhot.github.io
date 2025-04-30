document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startButton = document.querySelector(".start-button");
  const rainSound = document.getElementById("rain-sound");
  const mainContainer = document.querySelector("main");
  const inputs = document.querySelectorAll(".journal-input");

  // Variables
  let timer;
  let timeLeft;
  let isWorking = true;
  let isPaused = false;
  let workDuration = parseInt(inputs[0].value) * 60;
  let breakDuration = parseInt(inputs[1].value) * 60;

  // Quotes for breaks and work sessions
  const workQuotes = [
    "Focus on one task at a time.",
    "Small steps lead to big accomplishments.",
    "Deep work is valuable work.",
    "The sound of rain helps wash away distractions.",
    "Your attention is your most valuable resource.",
  ];

  const breakQuotes = [
    "Rest is as important as work.",
    "Take a moment to breathe deeply.",
    "Look away from the screen for a while.",
    "Stretch your body gently.",
    "Moments of pause help clarify thoughts.",
  ];

  // Event Listeners
  startButton.addEventListener("click", startSession);
  inputs.forEach((input) => {
    input.addEventListener("change", updateDurations);
  });

  // Functions
  function updateDurations() {
    workDuration = parseInt(inputs[0].value) * 60;
    breakDuration = parseInt(inputs[1].value) * 60;
  }

  function startSession() {
    // Play rain sound
    rainSound.volume = 0.4;
    rainSound.play();

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
    // Clear the main container
    mainContainer.innerHTML = "";

    // Create new elements
    const timerElement = document.createElement("div");
    timerElement.id = "timer";

    const statusElement = document.createElement("div");
    statusElement.id = "status";
    statusElement.textContent = "Focus time";

    const quoteElement = document.createElement("div");
    quoteElement.id = "quote";
    quoteElement.textContent = getRandomQuote(workQuotes);

    const controlsElement = document.createElement("div");
    controlsElement.className = "controls";

    const pauseButton = document.createElement("button");
    pauseButton.textContent = "Pause";
    pauseButton.addEventListener("click", togglePause);

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", resetTimer);

    const reflectionInput = document.createElement("textarea");
    reflectionInput.placeholder = "What are you focusing on right now?";
    reflectionInput.id = "reflection";
    reflectionInput.style.width = "100%";
    reflectionInput.style.background = "none";
    reflectionInput.style.border = "1px solid white";
    reflectionInput.style.color = "white";
    reflectionInput.style.fontFamily = "inherit";
    reflectionInput.style.fontSize = "1.2rem";
    reflectionInput.style.padding = "10px";
    reflectionInput.style.marginTop = "20px";
    reflectionInput.style.height = "80px";
    reflectionInput.style.resize = "none";

    // Append elements
    controlsElement.appendChild(pauseButton);
    controlsElement.appendChild(resetButton);

    mainContainer.appendChild(statusElement);
    mainContainer.appendChild(timerElement);
    mainContainer.appendChild(controlsElement);
    mainContainer.appendChild(quoteElement);
    mainContainer.appendChild(reflectionInput);

    // Show quote with animation
    setTimeout(() => {
      quoteElement.classList.add("show");
    }, 500);
  }

  function countdown() {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timer);
      isWorking = !isWorking;

      // Play notification sound
      const notification = new Audio("notification.mp3");
      notification.play();

      // Update status and quote
      updateStatus();

      // Store any reflection text if available
      const reflectionInput = document.getElementById("reflection");
      let reflectionText = "";
      if (reflectionInput) {
        reflectionText = reflectionInput.value;
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

  function updateStatus() {
    const statusElement = document.getElementById("status");
    const quoteElement = document.getElementById("quote");

    statusElement.textContent = isWorking ? "Focus time" : "Break time";

    // Update quote with animation
    quoteElement.classList.remove("show");

    setTimeout(() => {
      quoteElement.textContent = getRandomQuote(
        isWorking ? workQuotes : breakQuotes
      );
      quoteElement.classList.add("show");
    }, 500);
  }

  function updateInterface(previousReflection) {
    const reflectionInput = document.getElementById("reflection");

    if (isWorking) {
      reflectionInput.placeholder = "What are you focusing on right now?";
      reflectionInput.value = "";
    } else {
      reflectionInput.placeholder = "Reflect on what you accomplished...";

      // If there was previous reflection text, create a past reflection element
      if (previousReflection && previousReflection.trim() !== "") {
        const pastReflection = document.createElement("div");
        pastReflection.className = "past-reflection";
        pastReflection.style.fontSize = "0.9rem";
        pastReflection.style.opacity = "0.8";
        pastReflection.style.marginTop = "10px";
        pastReflection.style.padding = "5px";
        pastReflection.style.borderLeft = "2px solid #7ab4c2";
        pastReflection.style.paddingLeft = "10px";

        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        pastReflection.innerHTML = `<strong>${timestamp}</strong>: ${previousReflection}`;

        mainContainer.appendChild(pastReflection);
      }
    }
  }

  function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function togglePause() {
    const pauseButton = document.querySelector(".controls button");

    if (isPaused) {
      // Resume the timer
      timer = setInterval(countdown, 1000);
      pauseButton.textContent = "Pause";
    } else {
      // Pause the timer
      clearInterval(timer);
      pauseButton.textContent = "Resume";
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
        <input type="number" class="journal-input" value="${inputs[0].value}" min="5" />
        minutes, then treat myself to a
        <input type="number" class="journal-input" value="${inputs[1].value}" min="1" /> minute
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

    // Stop the audio
    rainSound.pause();
    rainSound.currentTime = 0;
  }
});
