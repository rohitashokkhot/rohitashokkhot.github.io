let myButton = document.querySelector("#my-button");
myButton.addEventListener("click", toggleMe);

function toggleMe() {
  let img = document.querySelector("#myImage");
  img.classList.toggle("round");
}
