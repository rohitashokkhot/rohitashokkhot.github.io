const abcButton = document.querySelector("#abc-button");
console.log(abcButton);

abcButton.addEventListener("click", gotoABC);

function gotoABC() {
  window.location.href = "https://www.abc.net.au/";
}

const footerButton = document.querySelector("#footer-button");
console.log(footerButton);

footerButton.addEventListener("click", gotoFooter);

function gotoFooter() {
  window.location.href = "#bottom";
}
