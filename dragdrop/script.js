let draggedElement = null;

const colorBox = document.querySelector(".colorbox");
const dropBox = document.querySelector(".dropbox");

colorBox.addEventListener("dragstart", startDrag);

function startDrag() {
  draggedElement = colorBox;
}

dropBox.addEventListener("dragover", endDrag);

function endDrag(event) {
  event.preventDefault();
}

dropBox.addEventListener("drop", handleDrop);

function handleDrop() {
  if (draggedElement) {
    const color = window
      .getComputedStyle(draggedElement)
      .getPropertyValue("background-color");
    // const color = draggedElement.style.backgroundColor;
    dropBox.style.backgroundColor = color;
    dropBox.textContent = "Dropped!";
    draggedElement = null;
  }
}
