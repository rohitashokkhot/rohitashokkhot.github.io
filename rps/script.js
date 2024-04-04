// Function to generate computer's choice (rock, paper, or scissors)
function computerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

// Update scoreboard based on the result
function updateScoreboard(result) {
  const wins = document.getElementById("wins");
  const losses = document.getElementById("losses");
  const ties = document.getElementById("ties");

  // Increment score based on result
  if (result === "win") {
    wins.textContent = parseInt(wins.textContent) + 1;
  } else if (result === "loss") {
    losses.textContent = parseInt(losses.textContent) + 1;
  } else if (result === "tie") {
    ties.textContent = parseInt(ties.textContent) + 1;
  }
}

// Handling the player's choice
function playerChoice(choice) {
  const computer = computerChoice();
  const result = determineWinner(choice, computer);
  const resultDisplay = document.getElementById("result");

  switch (result) {
    case "win":
      resultDisplay.textContent = "You win!";
      break;
    case "loss":
      resultDisplay.textContent = "Computer wins!";
      break;
    case "tie":
      resultDisplay.textContent = "It's a tie!";
      break;
  }

  updateScoreboard(result);
}

document
  .getElementById("rock")
  .addEventListener("click", () => playerChoice("rock"));
document
  .getElementById("paper")
  .addEventListener("click", () => playerChoice("paper"));
document
  .getElementById("scissors")
  .addEventListener("click", () => playerChoice("scissors"));
