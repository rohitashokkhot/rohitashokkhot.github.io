const cardContainer = document.querySelector("#card-container");
console.log(cardContainer);
window.addEventListener("scroll", handleScroll);
let cardCount = 5;

function loadCards() {
  let newCards = "";
  for (let i = 0; i < 5; i++) {
    cardCount++;
    newCards += `<div class="outer"> <p>Card ${cardCount} </p></div>`;
  }
  cardContainer.innerHTML += newCards;
  checkVisiblity(); // Check visibility of new items
}

function checkVisiblity() {
  const cards = document.querySelectorAll(".outer");
  const bottomOffset = window.innerHeight * 0.5;

  cards.forEach(makeThemVisible);

  function makeThemVisible(card) {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < bottomOffset) {
      card.classList.add("visible");
    }
  }
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadCards();
  }
  checkVisiblity();
}

loadCards();
