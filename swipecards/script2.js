const images = document.querySelectorAll(".image-container img");
let currentIndex = 0;
let startX = 0;
let isDragging = false;

const likeCount = document.querySelector("#like-count");
const dislikeCount = document.querySelector("#dislike-count");
let likes = 0;
let dislikes = 0;

images.forEach((image, index) => {
  image.style.zIndex = images.length - index; // Adjust z-index to stack images on top of each other
});

images.forEach((image) => {
  image.addEventListener("mousedown", startDrag);
});

document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", endDrag);

function startDrag(event) {
  startX = event.clientX;
  // event.target.setPointerCapture(event.pointerId);
  isDragging = true;
  event.preventDefault();
}

function drag(event) {
  if (!isDragging) return;

  const offsetX = event.clientX - startX;
  const image = images[currentIndex];
  image.style.transform = `translateX(${offsetX}px) rotate(${
    offsetX * 0.1
  }deg)`;

  // if (Math.abs(offsetX) >= 50) {
  //   image.classList.add(offsetX > 0 ? "like" : "dislike");
  // } else {
  //   image.classList.remove("like", "dislike");
  //   image.style.transform = `translateX(${offsetX}px) rotate(${
  //     offsetX * 0.1
  //   }deg)`;
  // }
}

function endDrag(event) {
  if (!isDragging) return;

  const offsetX = event.clientX - startX;
  const image = images[currentIndex];

  if (Math.abs(offsetX) < 50) {
    image.style.transition = "transform 0.3s";
    image.style.transform = "";
  } else {
    image.style.transition = "opacity 0.3s";
    image.style.opacity = "0";
    currentIndex++;
    if (offsetX > 0) {
      //image.classList.add("like");
      likes++;
      likeCount.textContent = likes;
    } else {
      //image.classList.add("dislike");
      dislikes++;
      dislikeCount.textContent = dislikes;
    }
    if (currentIndex < images.length) {
      images[currentIndex].style.display = "block";
    }
  }

  image.removeEventListener("transitionend", () => {
    image.style.transition = "";
  });

  isDragging = false;
}
