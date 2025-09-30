const startButton = document.querySelector("#start-button");
console.log(startButton);
startButton.addEventListener("click", startGame);

const gameScreen = document.querySelector("#game-screen");
console.log(gameScreen);

const welcomeScreen = document.querySelector("#welcome-screen");
console.log(welcomeScreen);

function startGame() {
  const newLeft = gameScreen.offsetLeft;
  console.log(newLeft);
  window.scrollTo({ left: newLeft, behavior: "smooth" });
  playGame();
}

function playGame() {
  const myCards = [
    { id: 1, name: "Queen", src: "queen.png" },
    { id: 2, name: "King", src: "king.png" },
    { id: 3, name: "Jack", src: "jack.png" },
  ];

  let cardComposition = "";
  // Shuffle cards using Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const shuffledCards = shuffleArray(myCards);

  for (let i = 0; i < shuffledCards.length; i++) {
    cardComposition += `
<div class="card-container">
        <div class="card" draggable="true">
          <div class="card-face"><img src="cloud.png" alt="Back" /></div>
          <div class="card-face flip">
            <img src="${shuffledCards[i].src}" alt="${shuffledCards[i].name}" class="card-front" />
          </div>
        </div>
      </div>
`;
    console.log(cardComposition);
  }

  const deck = document.querySelector(".deck");
  deck.innerHTML = "";
  deck.innerHTML = cardComposition;

  const cards = document.querySelectorAll(".card");

  let draggedCard = null;

  const dropBox = document.querySelector(".dropbox");
  dropBox.innerHTML = "";
  console.log(dropBox);

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("dragstart", function () {
      draggedCard = cards[i];
      console.log(draggedCard);
      dropBox.innerHTML = "";
    });
  }
  dropBox.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  dropBox.addEventListener("drop", function () {
    if (draggedCard && !dropBox.querySelector(".card")) {
      // const clone = draggedCard.cloneNode(true);
      const clone = draggedCard;
      clone.classList.remove("flip");
      clone.addEventListener("click", function () {
        clone.classList.toggle("flip");
      });
      dropBox.appendChild(clone);
    }
  });
  const resetButton = document.querySelector("#reset-button");
  console.log(resetButton);

  function resetGame() {
    dropBox.innerHTML = "";
    deck.innerHTML = "";
    draggedCard = null;
  }

  resetButton.addEventListener("click", function () {
    const newLeft = welcomeScreen.offsetLeft;
    console.log(newLeft);
    window.scrollTo({ left: newLeft, behavior: "smooth" });
    resetGame();
  });
}
