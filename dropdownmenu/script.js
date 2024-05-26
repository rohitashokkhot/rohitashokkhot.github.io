const profileButton = document.querySelector("#my-profile");
console.log(profileButton);

const profileContent = document.querySelector("#profile-content");
console.log(profileContent);

profileButton.addEventListener("click", toggleContent);

function toggleContent() {
  console.log("I am clicked");
  profileContent.classList.toggle("show");
}

// // Close the dropdown if the user clicks outside of it
// window.addEventListener("click", (event) => {
//   if (!dropdown.contains(event.target)) {
//     dropdown.classList.remove("show");
//   }
// });
