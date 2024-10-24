let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

const draggables = document.querySelectorAll(".polaroid, .sticker");

draggables.forEach((item) => {
  item.addEventListener("mousedown", startDrag);
});

document.addEventListener("mousemove", handleDrag);
document.addEventListener("mouseup", endDrag);

function startDrag(event) {
  event.preventDefault();
  draggedElement = event.target;

  const rect = draggedElement.getBoundingClientRect();
  offsetX = event.pageX - rect.left;
  offsetY = event.pageY - rect.top;

  draggedElement.style.position = "absolute";
  draggedElement.style.zIndex = "1000";
  document.body.appendChild(draggedElement);
  moveAt(event.pageX, event.pageY);
}

function moveAt(pageX, pageY) {
  draggedElement.style.left = `${pageX - offsetX}px`;
  draggedElement.style.top = `${pageY - offsetY}px`;
}

function handleDrag(event) {
  if (!draggedElement) return;
  moveAt(event.pageX, event.pageY);
}

function endDrag() {
  draggedElement = null;
}

function toggleImage(imgElement) {
  const currentImage = document.getElementById("two-pac");

  if (currentImage.src.includes(imgElement.src)) {
    currentImage.src = imgElement.dataset.newSrc;
  } else {
    currentImage.src = imgElement.src;
  }
}
