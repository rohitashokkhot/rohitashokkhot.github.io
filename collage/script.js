let draggedItem = null;
const dropzone = document.querySelector(".dropzone");
const dragImages = document.querySelectorAll(".pile img");
console.log(dragImages);

dragImages.forEach(manageDrag);

function manageDrag(item) {
  item.addEventListener("dragstart", function () {
    dragNHide(item);
  });
  item.addEventListener("dragend", function () {
    endDrag(item);
  });
}

function dragNHide(item) {
  draggedItem = item;
  setTimeout(function () {
    item.style.display = "none";
  }, 0);
}

function endDrag(item) {
  console.log(draggedItem);
  draggedItem.style.display = "block";
  draggedItem = null;
}

// dragImages.forEach((item) => {
//   item.addEventListener("dragstart", () => {
//     draggedItem = item;
//     setTimeout(() => {
//       item.style.display = "none";
//     }, 0);
//   });

//   item.addEventListener("dragend", () => {
//     setTimeout(() => {
//       draggedItem.style.display = "block";
//       draggedItem = null;
//     }, 0);
//   });
// });

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropzone.addEventListener("drop", () => {
  dropzone.appendChild(draggedItem);
  // console.log(draggedItem);
  // dropzone.innerHTML += draggedItem.outerHTML;
});
