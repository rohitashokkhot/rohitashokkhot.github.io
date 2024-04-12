let display = document.querySelector("input");
let total = null;
function addToDisplay(value) {
  if (total || display.value === "Error") {
    display.value = "";
    total = null;
  }
  display.value += value;
}

function clearDisplay(value) {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
    total = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

function recallValue(value) {
  display.value = total;
}
