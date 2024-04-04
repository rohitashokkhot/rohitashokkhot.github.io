// Function to generate computer's choice (rock, paper, or scissors)
function computerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
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

// Function to handle player's choice
function playerChoice(choice) {
  const computer = computerChoice();
  const result = determineWinner(choice, computer);
  const resultText = {
    win: "You win!",
    loss: "Computer wins!",
    tie: "It's a tie!",
  };
  document.getElementById("result").textContent = resultText[result];

  // Update scoreboard
  updateScoreboard(result);
}

// Function to update the scoreboard
function updateScoreboard(result) {
  const scoreboard = {
    wins: document.getElementById("wins"),
    losses: document.getElementById("losses"),
    ties: document.getElementById("ties"),
  };
  scoreboard[result].textContent = parseInt(scoreboard[result].textContent) + 1;
}

// Get the buttons for rock, paper, and scissors
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

// Add click event listeners to the buttons
rockButton.addEventListener("click", function () {
  playerChoice("rock");
});

paperButton.addEventListener("click", function () {
  playerChoice("paper");
});

scissorsButton.addEventListener("click", function () {
  playerChoice("scissors");
});
