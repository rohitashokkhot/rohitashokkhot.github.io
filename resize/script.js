const resizableBox = document.querySelector(".outer");
const resizer = document.querySelector("#resize-pointer");

let isResizing = false;

resizer.addEventListener("mousedown", startResize);

function startResize(event) {
  isResizing = true;

  // Attach event listeners for mousemove and mouseup events
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
}

function resize(event) {
  if (isResizing) {
    const boxRect = resizableBox.getBoundingClientRect();
    const newWidth = event.clientX - boxRect.left;
    const newHeight = event.clientY - boxRect.top;

    resizableBox.style.width = newWidth + "px";
    resizableBox.style.height = newHeight + "px";
  }
}

function stopResize() {
  isResizing = false;

  // Remove event listeners for mousemove and mouseup events
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}
