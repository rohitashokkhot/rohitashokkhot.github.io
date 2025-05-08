const card = document.querySelector(".card");
card.addEventListener("mouseenter", flip);
card.addEventListener("mouseleave", revert);
function flip() {
  card.classList.add("is-flipped");
}
function revert() {
  card.classList.remove("is-flipped");
}

// if we are using more than one cards then we need to use queryselectorAll
// then add eventlistener to each card
/*
const cards = document.querySelectorAll(".card");
console.log(cards);

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("mouseenter", function () {
    flip(i);
  });
  cards[i].addEventListener("mouseleave", function () {
    revert(i);
  });
}

function flip(i) {
  cards[i].classList.add("is-flipped");
}
function revert(i) {
  cards[i].classList.remove("is-flipped");
}

*/
