let draggedElement = null;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const dragSet = document.querySelectorAll(".drag-image");
const dropBox = document.querySelector(".dropbox");

dragSet.forEach(addDrag);

function addDrag(dragImg) {
  dragImg.addEventListener("mousedown", startDrag);

  function startDrag(event) {
    draggedElement = dragImg;
    isDragging = true;

    // Calculate the initial offset between the mouse pointer and the dragged element
    offsetX = event.clientX - dragImg.getBoundingClientRect().left;
    offsetY = event.clientY - dragImg.getBoundingClientRect().top;

    // Reset any transformations
    dragImg.style.transform = "none";

    // Adjust the position of the dragged element based on the initial offset
    dragImg.style.position = "absolute";
    dragImg.style.zIndex = 1000;

    // Attach event listeners for mousemove and mouseup events
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);
  }

  function drag(event) {
    if (isDragging) {
      // Update the position of the dragged element based on mouse movement
      draggedElement.style.left = event.clientX - offsetX + "px";
      draggedElement.style.top = event.clientY - offsetY + "px";
    }
  }

  function endDrag(event) {
    if (isDragging) {
      const src = draggedElement.getAttribute("src");
      dropBox.innerHTML = `<img src="${src}" />`;
      draggedElement = null;
      isDragging = false;

      // Remove event listeners for mousemove and mouseup events
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
    }
  }
}
