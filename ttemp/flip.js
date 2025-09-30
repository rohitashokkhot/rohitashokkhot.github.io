const card = document.querySelector(".card");
console.log(card);

card.addEventListener("mouseenter", addFlip);
card.addEventListener("mouseleave", removeFlip);

function addFlip() {
  card.classList.add("flip");
}

function removeFlip() {
  card.classList.remove("flip");
}
