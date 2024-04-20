let myButton = document.querySelector("#my-button");
myButton.addEventListener("click", toggleMe);
let myImg = document.querySelector("#myImage");

myImg.addEventListener("mouseover", addMe);
myImg.addEventListener("mouseout", removeMe);
function addMe() {
  myImg.classList.add("round");
}
function removeMe() {
  myImg.classList.remove("round");
}
function toggleMe() {
  myImg.classList.toggle("round");
}

let allParagraphs = document.querySelectorAll("p");
//allParagraphs.forEach(changeColor);

function changeColor(item) {
  //console.log(item);
  item.style.backgroundColor = "limegreen";
  // item.textContent = "New text content";
}
console.log(allParagraphs);
