let bgColor = null;
document.addEventListener("DOMContentLoaded", () => {
  const colorBoxes = document.querySelectorAll(".color-box");

  // Add dragstart event listeners to color boxes
  colorBoxes.forEach((box) => {
    box.addEventListener("dragstart", (event) => {
      // Get the computed background color of the dragged box
      const computedStyle = window.getComputedStyle(event.target);
      bgColor = computedStyle.backgroundColor;

      // Set the data transfer (use 'text/plain' type and store background color)
      //event.dataTransfer.setData("text/plain", bgColor);
    });
  });

  // Add dragover event listener to body (to allow dropping)
  document.body.addEventListener("dragover", (event) => {
    event.preventDefault(); // Allow dropping
  });

  // Add drop event listener to body
  document.body.addEventListener("drop", (event) => {
    event.preventDefault();

    // Retrieve the background color from the data transfer
    //const bgColor = event.dataTransfer.getData("text/plain");

    // Set the background color of the body to the dropped color
    document.body.style.backgroundColor = bgColor;
  });
});
