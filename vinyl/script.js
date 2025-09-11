const cover1 = document.querySelector("#cover-1");
console.log(cover1);

const vinyl1 = document.querySelector("#vinyl-1");
console.log(vinyl1);

const song1 = document.querySelector("#song-1");
console.log(song1);

cover1.addEventListener("mouseenter", openRecord);
cover1.addEventListener("mouseleave", closeRecord);
cover1.addEventListener("click", playRecord);
function openRecord() {
  vinyl1.classList.add("openrecord");
}

function closeRecord() {
  vinyl1.classList.remove("openrecord");
}

function playRecord() {
  vinyl1.classList.toggle("playrecord");
  if (song1.paused || song1.ended) {
    song1.play();
  } else {
    song1.pause();
  }
}
