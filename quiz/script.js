const sections = document.querySelectorAll(".wrapper");
// ** we get all the four questions here using queryselector
console.log(sections);

const progressBarFill = document.querySelector(".progress-bar-fill");
// here it needs a . and not # as you defined progress-bar-fill as class in HTML
let newWidth = 0; // ** variable to store the progress bar width
// progressBarFill.style.width = "33.33%";
let draggedElement = null; //** variable to store the dragged element
// const boxes = document.querySelectorAll(".final"),
//   image = document.querySelector(".inner");

// //Loop through each boxes element
// boxes.forEach((box) => {
//   //When a draggable element dragged over a box element
//   box.addEventListener("dragover", (e) => {
//     e.preventDefault(); //Prevent default behaviour
//   });

//   //When a draggable element is dropped on a box elemen
//   box.addEventListener("drop", () => {
//     box.appendChild(getElement); // ** there is no function called getElement
//     box.classList.remove("hovered");
//   });
// });

// the above is me trying to get the dragging to work but it not working, I would love feedback on why that code didnt work

// below is how I managed to get the drag and drop to work.

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  draggedElement = document.getElementById(data);
}

// here is the array for the questions which will change when the user clicks next question

const questions = [
  "What is the best season for holidays?",
  "What season encourages you to see friends?",
  "What season inspires you?",
  "What season has the best meals?",
];

let counter = 0;
let display = document.querySelector("h3");
display.innerText = questions[counter];

let btn = document.getElementById("next-question");

btn.addEventListener("click", () => {
  if (counter < sections.length) {
    sections[counter].classList.remove("show");
    counter++;

    newWidth += 25;
    if (counter != sections.length) {
      display.innerText = questions[counter];
      sections[counter].classList.add("show");
    }
    progressBarFill.style.width = newWidth + "%"; // **increment width with each question
  }
});

// below is trying to get the next question button to reset the positions of the dragable answers. unfortunately I cannot get it working.
// ** you do not need this
// function reset1() {
//   var wrapper = document.getElementById("wrapper");
//   // ** if you are using getelementbyId do not use . or # just use the id name, which is wrapper here.
//   // ** also do not use var it is old JS, use let or const.
//   wrapper.innerHTML = html;
// }
// var html;
// window.onload = function () {
//   html = document.getElementById("wrapper").innerHTML;
// };
