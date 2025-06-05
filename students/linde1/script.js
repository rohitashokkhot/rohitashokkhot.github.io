const stepInstructions = [
  { next: "Fold bottom up", prev: "Let's start!", icon: "up" },
  { next: "Fold top down", prev: "Fold bottom up", icon: "down" },
  { next: "Fold right corner", prev: "Fold top down", icon: "right" },
  { next: "Flip over", prev: "Fold right corner", icon: "rotate" },
  { next: "Fold left edge in", prev: "Flip over", icon: "left" },
  { next: "Shape heart", prev: "Fold left edge in", icon: "heart" },
  { next: "Done!", prev: "Shape heart", icon: "" },
];

function getArrowSVG(direction) {
  const arrows = {
    up: `<svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle;"><path d="M12 4l-6 6h4v6h4v-6h4z" fill="currentColor"/></svg>`,
    down: `<svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle;"><path d="M12 20l6-6h-4v-6h-4v6h-4z" fill="currentColor"/></svg>`,
    left: `<svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle;"><path d="M4 12l6-6v4h8v4h-8v4z" fill="currentColor"/></svg>`,
    right: `<svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle;"><path d="M20 12l-6 6v-4H6v-4h8V6z" fill="currentColor"/></svg>`,
    rotate: `<svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle;"><path d="M12 6V2L8 6l4 4V7c3.31 0 6 2.69 6 6a6 6 0 1 1-6-6z" fill="currentColor"/></svg>`,
    heart: `<svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 12 4.5a5.5 5.5 0 0 1 10 4c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>`,
  };
  return arrows[direction] || "";
}

// for the orgimani I chose a simple tutorial with minimal steps
//  the tutorial I chose to replicate with my application is the following video: https://www.youtube.com/watch?v=PlebdXZRqP0
// It is a tutorial for a paper heart,

// flip the paper to front and back
const paper = document.querySelector(".paper");
console.log(paper);

// had this function to make sure the 2 sides of the paper where stuck together

// paper.addEventListener("click", function () {
//   paper.classList.toggle("flip");
// });

// I start by calling all the objects I later need in my function to connect the SVG's and buttons to each other

// buttons from the individual steps
const step1 = document.querySelector("#circle1");
console.log(step1);

const step2 = document.querySelector("#circle2");
console.log(step2);

const step3 = document.querySelector("#circle3");
console.log(step3);

const step4 = document.querySelector("#circle4");
console.log(step4);

const step5 = document.querySelector("#circle5");
console.log(step5);

const step6 = document.querySelector("#circle6");
console.log(step6);

const step7 = document.querySelector("#circle7");
console.log(step7);

// put all the step buttons in an array
const steps = [step1, step2, step3, step4, step5, step6, step7];
console.log(steps);

// Buttons from the footer
const prevButton = document.querySelector("#previous");
console.log(prevButton);

const nextButton = document.querySelector("#next");
console.log(nextButton);

const resetButton = document.querySelector("#reset");
console.log(resetButton);

// need an element to keep track of where in the tutorial the user is.
let currentStep = 1;
console.log(currentStep);

const totalSteps = 7;
console.log(totalSteps);

const path = document.querySelector("#fold-path");
console.log(path);

// Put all the paths in an array
const paths = [
  "M 437.19999980926514 676.7750015258789 L 995.1999998092651 665.7750015258789 L 972.1999998092651 150.7750015258789 L 452.19999980926514 148.77499771118164 L 435.19999980926514 675.7750015258789 Z",
  "M 437.19999980926514 676.7750015258789 L 995.1999998092651 665.7750015258789 L 972.1999998092651 150.7750015258789 L 452.19999980926514 148.77499771118164 L 435.19999980926514 675.7750015258789 Z",
  "M 450.19999980926514 147.5749969482422 L 595.1999998092651 150.5749969482422 L 693.1999998092651 56.57499694824219 L 766.1999998092651 147.5749969482422 L 964.1999998092651 150.5749969482422 L 976.1999998092651 291.5749969482422 L 430.19999980926514 535.5749969482422 L 324.19999980926514 443.5749969482422 L 445.19999980926514 335.5749969482422 L 449.19999980926514 155.5749969482422 Z",
  "M 448.19999980926514 147.375 L 595.1999998092651 143.375 L 720.1999998092651 404.375 L 426.19999980926514 540.375 L 325.19999980926514 440.375 L 443.19999980926514 334.375 L 447.19999980926514 148.375 Z",
  "M 455.19999980926514 202.7750015258789 L 498.19999980926514 146.7750015258789 L 595.1999998092651 146.7750015258789 L 718.1999998092651 398.7750015258789 L 433.19999980926514 535.7750015258789 L 365.19999980926514 462.7750015258789 L 369.19999980926514 414.7750015258789 L 453.19999980926514 337.1750030517578 L 453.19999980926514 205.1750030517578 Z",
  "M 452.59999990463257 207.375 L 492.59999990463257 148.375 L 556.5999999046326 152.375 L 614.5999999046326 179.375 L 719.5999999046326 398.375 L 465.59999990463257 499.375 L 405.59999990463257 505.375 L 368.59999990463257 462.375 L 371.59999990463257 404.375 L 453.59999990463257 307.375 L 448.59999990463257 203.375 Z",
];

// use a for loop to go through all the step buttons
// https://www.w3schools.com/tags/att_data-.asp

//I used a for loop to go through all the circle buttons, using the data marker to keep track on which step the user is and what button has been clicked (https://www.w3schools.com/tags/att_data-.asp, used this specific source to create the data tag).
// I used the same setup and logic as I used for assignment 2, and applied it to this scenario.
// The loop reads which button has been clicked, 1 is added to the number (to account for an array starting at 0, and my counting in the html at 1), this number compared to make sure it is the newest step
// If that is the case the button gets marked as complete and the next one is revealed. At the same time, the path gets replaced, and thus the animation gets updated.

steps.forEach(function (button) {
  button.addEventListener("click", function () {
    const clickedStep = parseInt(button.dataset.phase);
    console.log(clickedStep);

    steps.forEach(function (button, index) {
      const stepNumber = index + 1;

      if (stepNumber == clickedStep && clickedStep == currentStep) {
        button.classList.add("completed");
        currentStep++;
        path.setAttribute("d", paths[currentStep]);
        if (currentStep <= totalSteps) {
          steps[currentStep - 1].classList.remove("hidden");
          path.setAttribute("d", paths[currentStep]);
        }
      }
    });
  });
});

// For the buttons in the footer I used a similair logic as above. the number of current step is lowered of highered (depending on the button) and the state of the previous/next button is switched,
// just like the path that gets updated. For the reset button everthing is hidden again, except for the first button in the array.

prevButton.addEventListener("click", function () {
  if (currentStep > 1) {
    currentStep--;
    steps[currentStep].classList.add("hidden");
    steps[currentStep].classList.remove("completed");
    if (currentStep > 0) {
      steps[currentStep - 1].classList.remove("completed");
    }
    console.log(currentStep);
    path.setAttribute("d", paths[currentStep]);
    updateFooterButtons();
  }
});

nextButton.addEventListener("click", function () {
  if (currentStep < totalSteps) {
    steps[currentStep].classList.remove("hidden");
    steps[currentStep - 1].classList.add("completed");
    currentStep++;
    console.log(currentStep);
    path.setAttribute("d", paths[currentStep]);
    updateFooterButtons();
  }
});

resetButton.addEventListener("click", function () {
  currentStep = 1;
  console.log(currentStep);

  steps.forEach(function (step, index) {
    step.classList.remove("completed");
    step.classList.add("hidden");
    path.setAttribute("d", paths[currentStep]);
  });

  steps[0].classList.remove("hidden");
  steps[0].classList.add("active");
  path.setAttribute("d", paths[0]);
  updateFooterButtons();
});

function updateFooterButtons() {
  const step = stepInstructions[currentStep - 1]; // currentStep is 1-based
  if (step.prev && step.prev !== "Let's start!") {
    prevButton.innerHTML = `${getArrowSVG("left")} ${step.prev}`;
    prevButton.disabled = false;
  } else {
    prevButton.innerHTML = `${step.prev}`;
    prevButton.disabled = true;
  }

  if (step.next && step.next !== "Done!") {
    nextButton.innerHTML = `${getArrowSVG(step.icon)} ${step.next}`;
    nextButton.disabled = false;
  } else {
    nextButton.innerHTML = `${step.next}`;
    nextButton.disabled = true;
  }
}

updateFooterButtons();
