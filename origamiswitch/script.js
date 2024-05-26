// script.js
document.addEventListener("DOMContentLoaded", () => {
  const colorSwatches = document.querySelectorAll(".color-swatch");
  const svgImage = document.getElementById("svgImage");
  let draggedColor = "";

  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("dragstart", (e) => {
      draggedColor = e.target.style.backgroundColor;
    });
  });

  svgImage.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  svgImage.addEventListener("drop", (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.tagName === "path") {
      target.setAttribute("fill", draggedColor);
    }
  });
});
