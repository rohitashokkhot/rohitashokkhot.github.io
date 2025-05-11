let draggedCard = null;

const cards = document.querySelectorAll(".deck .card");
const dropBox = document.querySelector(".dropbox");

// Set up drag events
cards.forEach((card) => {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
  });
});

// Prevent multiple drops
dropBox.addEventListener("dragover", (e) => {
  if (!dropBox.querySelector(".card")) {
    e.preventDefault();
  }
});

dropBox.addEventListener("drop", () => {
  if (draggedCard && !dropBox.querySelector(".card")) {
    const clone = draggedCard.cloneNode(true);
    clone.classList.remove("flip");
    clone.addEventListener("click", () => {
      clone.classList.toggle("flip");
    });
    dropBox.appendChild(clone);
  }
});
