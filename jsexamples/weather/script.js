let body = document.querySelector("body");
function getValue() {
  const input = document.querySelector("#myanswer");
  const inputValue = input.value;
  console.log(inputValue);
  checkGrade(inputValue);
  input.value = "";
}

function checkGrade(score) {
  let answerBox = document.querySelector("#answer");
  answerBox.textContent = "";
  if (score > 30) {
    answerBox.textContent = "It's boiling, really hot!!!";
    body.style.backgroundColor = "crimson";
  } else if (score > 20 && score <= 30) {
    answerBox.textContent = "You feels warm and sunny!!!";
    body.style.backgroundColor = "orange";
  } else if (score > 10 && score <= 20) {
    answerBox.textContent = "You feels cool and breezy!!!";
    body.style.backgroundColor = "lightblue";
  } else {
    answerBox.textContent = "I am shivering!!!";
    body.style.backgroundColor = "gray";
  }
}
