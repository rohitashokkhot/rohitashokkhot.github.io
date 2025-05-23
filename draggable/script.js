const boxes = document.querySelectorAll(".inner");
const target = document.body;
let bgColor = null;
console.log(target);
boxes.forEach((colorBlock) => {
  colorBlock.addEventListener("dragstart", (event) => {
    // Get the background color of the dragged box
    const computedStyle = window.getComputedStyle(event.target);
    bgColor = computedStyle.backgroundColor;

    console.log(bgColor);
  });
});

// Add dragover event listener to target box
target.addEventListener("dragover", (event) => {
  event.preventDefault(); // Allow dropping
});

target.addEventListener("drop", (event) => {
  event.preventDefault();
  // Set the background color of the body to the dropped color
  target.style.backgroundColor = bgColor;
});
