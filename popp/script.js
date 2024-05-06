const clickButton = document.querySelector("#clickButton");
const clickSound = document.querySelector("#clickSound");

// Add event listener to the button for click events
clickButton.addEventListener("click", playSound);

// Function to play the click sound
function playSound() {
  clickSound.play();
}
