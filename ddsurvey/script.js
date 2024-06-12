const dragImages = document.querySelectorAll(".options img");
console.log(dragImages);
let draggedImage = null;
dragImages.forEach(addDrag);

function addDrag(item) {
  item.addEventListener("dragstart", function () {
    draggedImage = item;
    console.log(draggedImage);
  });
}
