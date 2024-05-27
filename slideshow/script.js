const slides = document.querySelectorAll(".slides");
console.log(slides);
let slideIndex = 0;

const rightArrowButton = document.querySelector("#right-arrow-button");
console.log(rightArrowButton);
rightArrowButton.addEventListener("click", gotoNextSlide);

const leftArrowButton = document.querySelector("#left-arrow-button");
console.log(leftArrowButton);
leftArrowButton.addEventListener("click", gotoPreviousSlide);

function gotoNextSlide() {
  if (slideIndex === slides.length - 1) {
    rightArrowButton.disabled = true;
    return;
  }
  if (slideIndex < slides.length - 1) {
    slideIndex++;
    const nextSlide = slides[slideIndex];
    const newLeftPosition = nextSlide.offsetLeft;
    console.log(newLeftPosition);
    window.scrollTo({ left: newLeftPosition, behavior: "smooth" });
    leftArrowButton.disabled = false;
  }
}

function gotoPreviousSlide() {
  if (slideIndex === 0) {
    leftArrowButton.disabled = true;
    return;
  }
  if (slideIndex > 0) {
    slideIndex--;
    const previousSlide = slides[slideIndex];
    const newLeftPosition = previousSlide.offsetLeft;
    console.log(newLeftPosition);
    window.scrollTo({ left: newLeftPosition, behavior: "smooth" });
    rightArrowButton.disabled = false;
  }
}
