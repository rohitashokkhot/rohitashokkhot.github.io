let toggleButton = document.querySelector("#toggle-button");
toggleButton.addEventListener("click", toggleMe);
let boxContainer = document.querySelector(".box-container");
let outer = document.querySelector(".outer");
let count = 0;
function toggleMe() {
  boxContainer.classList.toggle("row-reverse");
}

let addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addMe);

let removeButton = document.querySelector("#remove-button");
removeButton.addEventListener("click", removeMe);
function addMe() {
  // boxContainer.innerHTML += `<div class="box purple-box"></div>
  //       <div class="box coral-box"></div>`;

  if (count % 2 === 0) {
    boxContainer.innerHTML += `<div class="box purple-box"></div>`;
  } else {
    boxContainer.innerHTML += `<div class="box coral-box"></div>`;
  }
  count++;
}

function removeMe() {
  let lastBox = boxContainer.lastElementChild;
  console.log(lastBox);
  if (lastBox) {
    lastBox.remove();
  }
  count--;
}

boxContainer.addEventListener("mouseenter", dropMe);
boxContainer.addEventListener("mouseleave", pickMe);

function dropMe() {
  boxContainer.classList.add("drop");
  boxContainer.classList.add("row-reverse");
}

function pickMe() {
  boxContainer.classList.remove("drop");
  boxContainer.classList.remove("row-reverse");
}
