const slides = document.querySelectorAll(".slides");
console.log(slides);
let slideIndex = 0;

const rightArrowButton = document.querySelector("#right-arrow-button");
console.log(rightArrowButton);
rightArrowButton.addEventListener("click", nextSlide);

const leftArrowButton = document.querySelector("#left-arrow-button");
console.log(leftArrowButton);
leftArrowButton.addEventListener("click", previousSlide);

function nextSlide() {
  slideIndex++;
  if (slideIndex < slides.length) {
    const targetElement = slides[slideIndex];
    const targetPosition = targetElement.offsetLeft;
    console.log(targetPosition);
    window.scrollTo({ left: targetPosition, behavior: "smooth" });
  }
}

function previousSlide() {
  slideIndex--;
  if (slideIndex >= 0) {
    const targetElement = slides[slideIndex];
    const targetPosition = targetElement.offsetLeft;
    console.log(targetPosition);
    window.scrollTo({ left: targetPosition, behavior: "smooth" });
  }
}
