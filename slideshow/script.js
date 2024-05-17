const slides = document.querySelectorAll(".slides");

function handleScroll() {
  const slideHeight = window.innerHeight;
  const scrollPosition = window.scrollY;
  slides.forEach(bringForward);

  function bringForward(slide, index) {
    if (
      scrollPosition >= index * slideHeight &&
      scrollPosition < (index + 1) * slideHeight
    ) {
      slides.forEach(sendOthersback);
      slide.classList.add("active");
    }
    // Preload the next slide
    const nextSlide = slides[index + 1];
    if (nextSlide) {
      nextSlide.style.opacity = '1';
    }
  }
  }

  function sendOthersback(slide) {
    slide.classList.remove("active");
  }
}

document.addEventListener("scroll", handleScroll);
// Trigger handleScroll on page load
handleScroll();
