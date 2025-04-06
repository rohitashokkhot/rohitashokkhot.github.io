const mainHeading = document.querySelector("h1");

console.log(mainHeading);
mainHeading.style.color = "Blue";
mainHeading.textContent = "this is new heading";

// mainHeading.style.backgroundColor = "beige";

const allParas = document.querySelectorAll(".beige");
console.log(allParas);
for (let i = 0; i < allParas.length; i++) {
  allParas[i].style.color = "green";
  allParas[i].classList.add("redBorder");
  // allParas[i].style.border = "1px solid red";
}

const myCat = document.querySelector("#my-cat");
myCat.addEventListener("mouseenter", addMe);
myCat.addEventListener("mouseleave", removeMe);
function addMe() {
  myCat.classList.add("round");
}
function removeMe() {
  myCat.classList.remove("round");
}

const toggleButton = document.querySelector("#toggle-button");
toggleButton.addEventListener("click", toggleMe);
function toggleMe() {
  myCat.classList.toggle("round");
  // header.style.backgroundColor = "beige";
}

// myCat.classList.add("round");
let myName = "Rohit";
const header = document.querySelector("header");
header.innerHTML += `<h2>I am ${myName} </h2>`;
