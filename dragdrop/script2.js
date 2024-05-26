let draggedElement = null;
let isDragging = false;

const colorBox = document.querySelector(".colorbox");
const dropBox = document.querySelector(".dropbox");

colorBox.addEventListener("mousedown", startDrag);

function startDrag(event) {
  draggedElement = colorBox;
  isDragging = true;
  // Calculate the initial offset between the mouse pointer and the dragged element
  const offsetX = event.clientX - colorBox.getBoundingClientRect().left;
  const offsetY = event.clientY - colorBox.getBoundingClientRect().top;

  // Adjust the position of the dragged element based on the initial offset
  colorBox.style.position = "absolute";
  colorBox.style.left = event.clientX - offsetX + "px";
  colorBox.style.top = event.clientY - offsetY + "px";

  // Attach event listeners for mousemove and mouseup events
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
}

function drag(event) {
  if (isDragging) {
    // Update the position of the dragged element based on mouse movement
    colorBox.style.left = event.clientX + "px";
    colorBox.style.top = event.clientY + "px";
  }
}

function endDrag(event) {
  if (isDragging) {
    const color = window
      .getComputedStyle(draggedElement)
      .getPropertyValue("background-color");
    dropBox.style.backgroundColor = color;
    dropBox.textContent = "Dropped!";
    draggedElement = null;
    isDragging = false;

    // Remove event listeners for mousemove and mouseup events
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", endDrag);
  }
}
