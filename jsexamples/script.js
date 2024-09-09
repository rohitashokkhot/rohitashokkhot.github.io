function checkGrade() {
  const a1 = document.querySelector("#answer1");
  const a1Value = parseFloat(a1.value); // Convert to number
  console.log(a1Value);

  const a2 = document.querySelector("#answer2");
  const a2Value = parseFloat(a2.value); // Convert to number
  console.log(a2Value);

  const total = calculateTotal(a1Value, a2Value);
  console.log(total);
  reportBackGrade(total);
  // a1.value = "";
}

function calculateTotal(a, b) {
  return a + b;
}

function reportBackGrade(score) {
  let report = document.querySelector("#report");
  report.innerHTML = "";
  if (score > 30) {
    report.innerHTML = `You scored <span class="grade">High Distinction </span>!!!`;
  } else if (score > 20 && score <= 30) {
    report.innerHTML = `You scored <span class="grade">Distinction </span>!!!`;
  } else if (score > 10 && score <= 20) {
    report.innerHTML = `You scored <span class="grade">Passing marks </span>!!!`;
  } else {
    report.innerHTML = `Sorry, you <span class="fgrade">failed </span>!!!`;
  }
}
