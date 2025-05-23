const clickButton = document.querySelector("#click-button");
console.log(clickButton);
let likeCount = 0;
const likes = document.querySelector("#likes");
console.log(likes);

clickButton.addEventListener("click", increaseLikes);

function increaseLikes() {
  likeCount++;
  likes.textContent = likeCount;
}
