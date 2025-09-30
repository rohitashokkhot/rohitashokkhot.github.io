const card = document.querySelector(".card");
console.log(card);

let draggedCard = null;

card.addEventListener("dragstart", startDrag);

function startDrag() {
  draggedCard = card;
  console.log(draggedCard);
}

const dropBox = document.querySelector(".dropbox");
console.log(dropBox);

dropBox.addEventListener("dragover", stopDrag);

function stopDrag(e) {
  e.preventDefault();
}

dropBox.addEventListener("drop", dropCard);

function dropCard() {
  console.log(draggedCard);
  const clone = draggedCard;
  clone.classList.remove("flip");
  clone.addEventListener("click", function () {
    clone.classList.toggle("flip");
  });
  dropBox.appendChild(clone);
}
