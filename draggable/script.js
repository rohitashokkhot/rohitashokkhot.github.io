const boxes = document.querySelectorAll(".inner");
const target = document.body;
let bgColor = null;
console.log(target);
boxes.forEach((colorBlock) => {
  colorBlock.addEventListener("dragstart", (event) => {
    // draggedColor = event.target.style.backgroundColor;
    // Get the background color of the dragged box
    const computedStyle = window.getComputedStyle(event.target);
    bgColor = computedStyle.backgroundColor;

    // Set the data transfer (use 'text/plain' type and store background color)
    //event.dataTransfer.setData("text/plain", bgColor);
    console.log(bgColor);
  });
});

// Add dragover event listener to target box
target.addEventListener("dragover", (event) => {
  event.preventDefault(); // Allow dropping
});

target.addEventListener("drop", (event) => {
  event.preventDefault();

  // Retrieve the background color from the data transfer
  //const bgColor = event.dataTransfer.getData("text/plain");

  // Set the background color of the body to the dropped color
  target.style.backgroundColor = bgColor;
});
