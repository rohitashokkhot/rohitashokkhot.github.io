const cardContainer = document.querySelector("#card-container");
console.log(cardContainer);
window.addEventListener("scroll", handleScroll);
let cardCount = 5;
console.log("body offset", document.body.offsetHeight);

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
  const bottomOffset = window.innerHeight * 0.9;
  const topOffset = 0;
  const viewportHeight = window.innerHeight;
  cards.forEach(makeThemVisible);

  function makeThemVisible(card) {
    const cardTop = card.getBoundingClientRect().top;
    const cardBottom = card.getBoundingClientRect().botttom;
    if (
      (cardTop >= 0 && cardTop < viewportHeight * 0.9) ||
      (cardBottom >= 0 && cardBottom < viewportHeight)
    ) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  }
}

function handleScroll() {
  console.log("Window innerheight", window.innerHeight);
  console.log("Scroll Y", window.scrollY);
  console.log("body offset", document.body.offsetHeight);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadCards();
  }
  checkVisiblity();
}

loadCards();
