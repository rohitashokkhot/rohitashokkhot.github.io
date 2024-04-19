const rockButton = document.querySelector("#rock-button");
let choices = ["ROCK", "PAPER", "SCISSORS"];
rockButton.addEventListener("click", function chooseRock() {
  check(0);
});
const paperButton = document.querySelector("#paper-button");
paperButton.addEventListener("click", function choosePaper() {
  check(1);
});
const scissorsButton = document.querySelector("#scissors-button");
scissorsButton.addEventListener("click", function chooseScissors() {
  check(2);
});

function check(myChoice) {
  const sel = document.querySelector("#selection");
  const res = document.querySelector("#result");
  let computerChoice = Math.floor(Math.random() * 3);
  sel.innerHTML = `<p id="my-choice"> Your pick: ${choices[myChoice]} </p>
  <p id="computer-choice"> Computer's pick: ${choices[computerChoice]}</p>`;
  if (choices[myChoice] === choices[computerChoice]) {
    // result = "It's a tie!";
    res.innerHTML = `<span class="tie">It's a tie! </span> `;
  } else if (
    (choices[myChoice] === "ROCK" && choices[computerChoice] === "SCISSORS") ||
    (choices[myChoice] === "PAPER" && choices[computerChoice] === "ROCK") ||
    (choices[myChoice] === "SCISSORS" && choices[computerChoice] === "PAPER")
  ) {
    res.innerHTML = `<span class="win">You win! </span> `;
  } else {
    res.innerHTML = `<span class="loose">You loose! </span> `;
  }
}
