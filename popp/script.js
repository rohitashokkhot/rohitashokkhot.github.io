//document.addEventListener("DOMContentLoaded", function () {
const clickButton = document.getElementById("clickButton");
const clickSound = document.getElementById("clickSound");

// Function to play the click sound
function playSound() {
  clickSound.play();
}

// Add event listener to the button for click events
clickButton.addEventListener("click", playSound);
//});
