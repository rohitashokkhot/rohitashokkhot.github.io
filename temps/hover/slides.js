const slides = document.querySelectorAll(".slides");
// const slideContainer = document.querySelector("#slides-container");

let currentSlide = 0;

const prevBtn = document.querySelector("#prev-btn");
prevBtn.addEventListener("click", gotoPrev);
function gotoPrev() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = slides.length - 1;
  }
  const distance = slides[currentSlide].offsetLeft;
  console.log(distance);
  window.scrollTo({ left: distance, behavior: "smooth" });
}

const nextBtn = document.querySelector("#next-btn");
nextBtn.addEventListener("click", gotoNext);
function gotoNext() {
  if (currentSlide < slides.length) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  const distance = slides[currentSlide].offsetLeft;
  console.log(distance);
  window.scrollTo({ left: distance, behavior: "smooth" });
}
