const card = document.querySelector(".card");
console.log(card);

// Flip on hover
card.addEventListener("mouseenter", flipMe);
card.addEventListener("mouseleave", revertBack);
function flipMe() {
  card.classList.add("flip");
}
function revertBack() {
  card.classList.remove("flip");
}

// Flip on click
// card.addEventListener("click", toggleFlip);

// function toggleFlip() {
//   card.classList.toggle("flip");
// }

// if we are using more than one cards then we need to use queryselectorAll
// then add eventlistener to each card
/*
const cards = document.querySelectorAll(".card");
console.log(cards);

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("mouseenter", function () {
    flipMe(i);
  });
  cards[i].addEventListener("mouseleave", function () {
    revertBack(i);
  });
}

function flipMe(i) {
  cards[i].classList.add("flip");
}
function revertBack(i) {
  cards[i].classList.remove("flip");
}

*/
