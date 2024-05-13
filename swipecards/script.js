// const card = document.querySelector(".card");
// let isDragging = false;
// let startX = 0;

const images = document.querySelectorAll(".image-stack img");
const likeCount = document.querySelector("#like-count");
const dislikeCount = document.querySelector("#dislike-count");
let currentIndex = 0;
let startX = 0;

let likes = 0;
let dislikes = 0;
images.forEach((image) => {
  image.style.display = "none"; // Initially hide all images
});

images[currentIndex].style.display = "block"; // Display the first image

images.forEach((image) => {
  image.addEventListener("mousedown", startDrag);
});

//card.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", endDrag);

// card.addEventListener("dragstart", startDrag);
// document.addEventListener("dragover", drag);
// document.addEventListener("dragend", endDrag);

// function startDrag(event) {
//   isDragging = true;
//   startX = event.clientX;
//   event.preventDefault(); // Prevent default text selection behavior
// }

function startDrag(event) {
  startX = event.clientX;
  event.target.setPointerCapture(event.pointerId); // Capture pointer to continue receiving events
}

function drag(event) {
  const offsetX = event.clientX - startX;
  const image = images[currentIndex];

  if (Math.abs(offsetX) >= 50) {
    if (offsetX > 0) {
      image.classList.add("like");
      likes++;
      likeCount.textContent = likes;
    } else {
      image.classList.add("dislike");
      dislikes++;
      dislikeCount.textContent = dislikes;
    }

    //image.classList.add(offsetX > 0 ? "like" : "dislike");
  } else {
    image.classList.remove("like", "dislike");
    image.style.transform = `translateX(${offsetX}px)`; // Translate image horizontally
  }
}

function endDrag(event) {
  const offsetX = event.clientX - startX;
  const image = images[currentIndex];

  if (Math.abs(offsetX) < 50) {
    image.style.transition = "transform 0.3s"; // Add transition for smooth animation
    image.style.transform = ""; // Reset image position
  } else {
    image.style.transition = "opacity 0.3s"; // Add transition for smooth opacity change
    image.style.opacity = "0"; // Hide current image
    currentIndex++; // Move to the next image
    if (currentIndex < images.length) {
      images[currentIndex].style.display = "block"; // Display the next image
    }
  }

  image.removeEventListener("transitionend", () => {
    image.style.transition = ""; // Reset transition property
  });
}

// function drag(event) {
//   if (!isDragging) return;
//   const card = images[currentIndex];
//   const offsetX = event.clientX - startX;
//   card.style.transform = `translateX(${offsetX}px) rotate(${offsetX * 0.1}deg)`;
// }

function endDrag1(event) {
  if (!isDragging) return;
  const card = images[currentIndex];
  const offsetX = event.clientX - startX;

  if (offsetX > 50) {
    card.classList.add("like", "fade-out");
  } else if (offsetX < -50) {
    card.classList.add("dislike", "fade-out");
  } else {
    resetCardPosition();
  }

  isDragging = false;
  currentIndex++; // Move to the next image
  if (currentIndex < images.length) {
    images[currentIndex].style.display = "block"; // Display the next image
  }
}

function resetCardPosition() {
  const card = images[currentIndex];
  card.remove();
  //card.style.transform = "";
  //card.classList.remove("like", "dislike", "fade-out");
}
