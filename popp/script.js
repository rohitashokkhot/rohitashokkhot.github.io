// In order to play audio sound on clicking of a button,
// first we must select both button and audio from the DOM.
const clickButton = document.querySelector("#clickButton");
const clickSound = document.querySelector("#clickSound");

// We added a click event on the button and added a callback to play sound
clickButton.addEventListener("click", playSound);

// Function to play the click sound
function playSound() {
  // we use the play method to play the sound
  clickSound.play();
}
