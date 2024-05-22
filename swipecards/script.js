const imageList = document.querySelectorAll(".image-container img");
console.log(imageList);

let isDragging = false;
let currentIndex = 0;

const likeImg = document.querySelector("#like-img");
console.log(likeImg);
const dislikeImg = document.querySelector("#dislike-img");
console.log(dislikeImg);
const likeCount = document.querySelector("#like-count");
const dislikeCount = document.querySelector("#dislike-count");
let likes = 0;
let dislikes = 0;

imageList.forEach(stackIt);
// Adjust z-index to stack images on top of each other
function stackIt(image, index) {
  image.style.zIndex = imageList.length - index;
  image.addEventListener("mousedown", startDrag);
}

document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", endDrag);

function startDrag(event) {
  event.preventDefault();
  startX = event.clientX;
  isDragging = true;
  console.log(startX);
}

function drag(event) {
  if (!isDragging) return;

  const offsetX = event.clientX - startX;
  console.log(offsetX);
  const image = imageList[currentIndex];
  image.style.translate = offsetX + "px";
  image.style.rotate = offsetX * 0.1 + "deg";
  if (offsetX > 0) {
    likeImg.style.scale = "1.2";
    likeImg.style.translate = "0x -10px";
  } else {
    dislikeImg.style.scale = "1.2";
    dislikeImg.style.translate = "0x -10px";
  }
  //console.log(image.src);

  // image.style.transform = `translateX(${offsetX}px) rotate(${
  //   offsetX * 0.1
  // }deg)`;
}

function endDrag(event) {
  if (!isDragging) return;
  isDragging = false;
  const offsetX = event.clientX - startX;
  console.log(offsetX);
  const image = imageList[currentIndex];
  if (Math.abs(offsetX) > 50) {
    image.style.opacity = "0";
    currentIndex++;
    if (offsetX > 0) {
      likes++;
      likeCount.textContent = likes;
      likeImg.style.scale = "1";
      likeImg.style.translate = "0x 0px";
    } else {
      dislikes++;
      dislikeCount.textContent = dislikes;
      dislikeImg.style.scale = "1";
      dislikeImg.style.translate = "0x 0px";
    }
  }
}
