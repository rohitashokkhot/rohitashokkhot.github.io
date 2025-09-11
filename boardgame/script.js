const allParas = document.querySelectorAll("p");

for (let i = 0; i < allParas.length; i++) {
  allParas[i].classList.add("new-border");
}

const myQueen = document.querySelector("#my-queen");

myQueen.addEventListener("mouseenter", addMe);
myQueen.addEventListener("mouseleave", removeMe);

function addMe() {
  myQueen.classList.add("round");
}

function removeMe() {
  myQueen.classList.remove("round");
}
