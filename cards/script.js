// --- logic with single card ----
// const card = document.querySelector(".card");
// console.log(card);

// Flip on hover
// card.addEventListener("mouseenter", flipMe);
// card.addEventListener("mouseleave", revertBack);
// function flipMe() {
//   card.classList.add("flip");
// }
// function revertBack() {
//   card.classList.remove("flip");
// }

// Flip on click
// card.addEventListener("click", toggleFlip);

// function toggleFlip() {
//   card.classList.toggle("flip");
// }

// --- -------------------------------------- ----

// --- logic with multiple cards ----
const myCards = [
  { id: 1, name: "Queen", src: "queen.png" },
  { id: 2, name: "King", src: "king.png" },
  { id: 3, name: "Jack", src: "jack.png" },
];

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

let cardComposition = "";

for (let i = 0; i < shuffledCards.length; i++) {
  cardComposition += `
  <div class="card-container">
          <div class="card" draggable="true">
            <div class="card-face"><img src="cloud.png" alt="Back" /></div>
            <div class="card-face flip">
              <img src="${shuffledCards[i].src}" alt="${shuffledCards[i].name}" />
            </div>
          </div>
        </div>
  `;
  console.log(cardComposition);
}
const deck = document.querySelector(".deck");
deck.innerHTML = cardComposition;

const cards = document.querySelectorAll(".card");
console.log(cards);

let draggedCard = null;

const dropBox = document.querySelector(".dropbox");

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function () {
    // cards[i].classList.toggle("flip");
  });

  cards[i].addEventListener("dragstart", function () {
    draggedCard = cards[i];
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

resetButton.addEventListener("click", function () {
  location.reload();
});
