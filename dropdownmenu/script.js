const profileButton = document.querySelector("#my-profile");
console.log(profileButton);

const profileContent = document.querySelector("#profile-content");
console.log(profileContent);

profileButton.addEventListener("click", toggleContent);

function toggleContent() {
  console.log("I am clicked");
  profileContent.classList.toggle("show");
}
