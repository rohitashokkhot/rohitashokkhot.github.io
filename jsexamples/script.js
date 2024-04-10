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
  if (score > 20) {
    answerBox.textContent = "You scored High Distinction!!!";
  } else if (score > 10 && score <= 20) {
    answerBox.textContent = "You scored Distinction!!!";
  } else if (score > 5 && score <= 10) {
    answerBox.textContent = "You scored passing marks!!!";
  } else {
    answerBox.textContent = "Sorry, you failed!!!";
  }
}
