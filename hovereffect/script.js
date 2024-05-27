const hoverButton = document.querySelector("#hover-button");
console.log(hoverButton);

const moreInfo = document.querySelector("#more-info");
console.log(moreInfo);

hoverButton.addEventListener("mouseover", showMoreInfo);
hoverButton.addEventListener("mouseout", hideMoreInfo);

function showMoreInfo() {
  moreInfo.classList.add("show");
}

function hideMoreInfo() {
  moreInfo.classList.remove("show");
}
