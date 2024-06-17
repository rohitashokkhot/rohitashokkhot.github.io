// const page

// Get all draggable items and drop zones
const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

// Add event listeners for draggable items
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggable.dataset.correctDropzone);
    setTimeout(() => {
      draggable.classList.add("dragging");
    }, 0);
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

// Add event listeners for drop zones
dropzones.forEach((dropzone) => {
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("over");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("over");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    const correctDropzoneId = e.dataTransfer.getData("text/plain");
    const dragging = document.querySelector(".dragging");
    if (dragging && dropzone.id === correctDropzoneId) {
      dropzone.appendChild(dragging);
      showPopup("Correct!");
    } else {
      showPopup("Incorrect!");
    }
    dropzone.classList.remove("over");
  });
});

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("hidden");
}

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  const correctDropzoneId = e.dataTransfer.getData("text/plain");
  const dragging = document.querySelector(".dragging");
  if (dragging && dropzone.id === correctDropzoneId) {
    dropzone.appendChild(dragging);
    showPopup("Correct!", true);
  } else {
    showPopup("Incorrect!", false);
  }
  dropzone.classList.remove("over");
});
