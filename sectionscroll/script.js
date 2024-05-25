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
  if (slideIndex === slides.length - 1) {
    rightArrowButton.disabled = true;
    return;
  }
  if (slideIndex < slides.length - 1) {
    slideIndex++;
    const targetElement = slides[slideIndex];
    const targetPosition = targetElement.offsetLeft;
    console.log(targetPosition);
    window.scrollTo({ left: targetPosition, behavior: "smooth" });
    leftArrowButton.disabled = false;
  }
}

function previousSlide() {
  if (slideIndex === 0) {
    leftArrowButton.disabled = true;
    return;
  }
  if (slideIndex > 0) {
    slideIndex--;
    const targetElement = slides[slideIndex];
    const targetPosition = targetElement.offsetLeft;
    console.log(targetPosition);
    window.scrollTo({ left: targetPosition, behavior: "smooth" });
    rightArrowButton.disabled = false;
  }
}
