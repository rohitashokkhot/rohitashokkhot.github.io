const mainHeading = document.querySelector("h1");

console.log(mainHeading);
mainHeading.style.color = "Blue";
mainHeading.textContent = "this is new heading";

// mainHeading.style.backgroundColor = "beige";

const allParas = document.querySelectorAll(".beige");
console.log(allParas);
for (let i = 0; i < allParas.length; i++) {
  allParas[i].style.color = "green";
  allParas[i].classList.add("redBorder");
  // allParas[i].style.border = "1px solid red";
}
