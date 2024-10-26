// **COMMENTS**

//declaring buttons
//eyes
const eyeSelectionButton = document.getElementById("button-eyes");
const eyeColour1 = document.getElementById("eye-colour-1");
const eyeColour2 = document.getElementById("eye-colour-2");
const eyeColour3 = document.getElementById("eye-colour-3");
const eyeColour4 = document.getElementById("eye-colour-4");
const eyeColour5 = document.getElementById("eye-colour-5");

//hair
const hairSelectionButton = document.getElementById("button-hair");
const hairColour1 = document.getElementById("hair-colour-1");
const hairColour2 = document.getElementById("hair-colour-2");
const hairColour3 = document.getElementById("hair-colour-3");
const hairColour4 = document.getElementById("hair-colour-4");
const hairColour5 = document.getElementById("hair-colour-5");

//skin
const skinSelectionButton = document.getElementById("button-skin");
const skinColour1 = document.getElementById("skin-colour-1");
const skinColour2 = document.getElementById("skin-colour-2");
const skinColour3 = document.getElementById("skin-colour-3");
const skinColour4 = document.getElementById("skin-colour-4");
const skinColour5 = document.getElementById("skin-colour-5");

//hat
const hatSelectionButton = document.getElementById("button-hat");
const hatColour1 = document.getElementById("hat-colour-1");
const hatColour2 = document.getElementById("hat-colour-2");
const hatColour3 = document.getElementById("hat-colour-3");
const hatColour4 = document.getElementById("hat-colour-4");
const hatColour5 = document.getElementById("hat-colour-5");

//shirt
const shirtSelectionButton = document.getElementById("button-shirt");
const shirtColour1 = document.getElementById("shirt-colour-1");
const shirtColour2 = document.getElementById("shirt-colour-2");
const shirtColour3 = document.getElementById("shirt-colour-3");
const shirtColour4 = document.getElementById("shirt-colour-4");
const shirtColour5 = document.getElementById("shirt-colour-5");

//piercings
const piercingsSelectionButton = document.getElementById("button-piercings");
const piercingsColour1 = document.getElementById("piercings-colour-1");
const piercingsColour2 = document.getElementById("piercings-colour-2");

//function - making the buttons visible
//eyes
eyeSelectionButton.addEventListener("click", selectEyeColourAvailable);

function selectEyeColourAvailable() {
  eyeColour1.style.display = "block"; // all revealed once 'eyes' is clicked on
  eyeColour2.style.display = "block";
  eyeColour3.style.display = "block";
  eyeColour4.style.display = "block";
  eyeColour5.style.display = "block";

  //making all others invisible
  hairColour1.style.display = "none";
  hairColour2.style.display = "none";
  hairColour3.style.display = "none";
  hairColour4.style.display = "none";
  hairColour5.style.display = "none";

  skinColour1.style.display = "none";
  skinColour2.style.display = "none";
  skinColour3.style.display = "none";
  skinColour4.style.display = "none";
  skinColour5.style.display = "none";

  hatColour1.style.display = "none";
  hatColour2.style.display = "none";
  hatColour3.style.display = "none";
  hatColour4.style.display = "none";
  hatColour5.style.display = "none";

  piercingsColour1.style.display = "none";
  piercingsColour2.style.display = "none";

  shirtColour1.style.display = "none";
  shirtColour2.style.display = "none";
  shirtColour3.style.display = "none";
  shirtColour4.style.display = "none";
  shirtColour5.style.display = "none";
}

//hair
function selectHairColourAvailable() {
  hairColour1.style.display = "block"; // all revealed once 'hair' is clicked on
  hairColour2.style.display = "block";
  hairColour3.style.display = "block";
  hairColour4.style.display = "block";
  hairColour5.style.display = "block";

  //making all others invisible
  eyeColour1.style.display = "none";
  eyeColour2.style.display = "none";
  eyeColour3.style.display = "none";
  eyeColour4.style.display = "none";
  eyeColour5.style.display = "none";

  skinColour1.style.display = "none";
  skinColour2.style.display = "none";
  skinColour3.style.display = "none";
  skinColour4.style.display = "none";
  skinColour5.style.display = "none";

  hatColour1.style.display = "none";
  hatColour2.style.display = "none";
  hatColour3.style.display = "none";
  hatColour4.style.display = "none";
  hatColour5.style.display = "none";

  piercingsColour1.style.display = "none";
  piercingsColour2.style.display = "none";

  shirtColour1.style.display = "none";
  shirtColour2.style.display = "none";
  shirtColour3.style.display = "none";
  shirtColour4.style.display = "none";
  shirtColour5.style.display = "none";
}

//Skin
skinSelectionButton.addEventListener("click", selectSkinColourAvailable);

function selectSkinColourAvailable() {
  skinColour1.style.display = "block"; // all revealed once 'skin' is clicked on
  skinColour2.style.display = "block";
  skinColour3.style.display = "block";
  skinColour4.style.display = "block";
  skinColour5.style.display = "block";

  //making all others invisible
  eyeColour1.style.display = "none";
  eyeColour2.style.display = "none";
  eyeColour3.style.display = "none";
  eyeColour4.style.display = "none";
  eyeColour5.style.display = "none";

  hairColour1.style.display = "none";
  hairColour2.style.display = "none";
  hairColour3.style.display = "none";
  hairColour4.style.display = "none";
  hairColour5.style.display = "none";

  hatColour1.style.display = "none";
  hatColour2.style.display = "none";
  hatColour3.style.display = "none";
  hatColour4.style.display = "none";
  hatColour5.style.display = "none";

  piercingsColour1.style.display = "none";
  piercingsColour2.style.display = "none";

  shirtColour1.style.display = "none";
  shirtColour2.style.display = "none";
  shirtColour3.style.display = "none";
  shirtColour4.style.display = "none";
  shirtColour5.style.display = "none";
}

//HAT
hatSelectionButton.addEventListener("click", selectHatColourAvailable);

function selectHatColourAvailable() {
  hatColour1.style.display = "block"; // all revealed once 'hat' is clicked on
  hatColour2.style.display = "block";
  hatColour3.style.display = "block";
  hatColour4.style.display = "block";
  hatColour5.style.display = "block";

  //making all others invisible
  eyeColour1.style.display = "none";
  eyeColour2.style.display = "none";
  eyeColour3.style.display = "none";
  eyeColour4.style.display = "none";
  eyeColour5.style.display = "none";

  hairColour1.style.display = "none";
  hairColour2.style.display = "none";
  hairColour3.style.display = "none";
  hairColour4.style.display = "none";
  hairColour5.style.display = "none";

  skinColour1.style.display = "none";
  skinColour2.style.display = "none";
  skinColour3.style.display = "none";
  skinColour4.style.display = "none";
  skinColour5.style.display = "none";

  piercingsColour1.style.display = "none";
  piercingsColour2.style.display = "none";

  shirtColour1.style.display = "none";
  shirtColour2.style.display = "none";
  shirtColour3.style.display = "none";
  shirtColour4.style.display = "none";
  shirtColour5.style.display = "none";
}

// PIERCINGS
piercingsSelectionButton.addEventListener(
  "click",
  selectPiercingsColourAvailable
);

function selectPiercingsColourAvailable() {
  piercingsColour1.style.display = "block"; // all revealed once 'piercing' is clicked on
  piercingsColour2.style.display = "block";

  //making all others invisible
  eyeColour1.style.display = "none";
  eyeColour2.style.display = "none";
  eyeColour3.style.display = "none";
  eyeColour4.style.display = "none";
  eyeColour5.style.display = "none";

  hairColour1.style.display = "none";
  hairColour2.style.display = "none";
  hairColour3.style.display = "none";
  hairColour4.style.display = "none";
  hairColour5.style.display = "none";

  skinColour1.style.display = "none";
  skinColour2.style.display = "none";
  skinColour3.style.display = "none";
  skinColour4.style.display = "none";
  skinColour5.style.display = "none";

  hatColour1.style.display = "none";
  hatColour2.style.display = "none";
  hatColour3.style.display = "none";
  hatColour4.style.display = "none";
  hatColour5.style.display = "none";

  shirtColour1.style.display = "none";
  shirtColour2.style.display = "none";
  shirtColour3.style.display = "none";
  shirtColour4.style.display = "none";
  shirtColour5.style.display = "none";
}

//SHIRT
shirtSelectionButton.addEventListener("click", selectShirtColourAvailable);

function selectShirtColourAvailable() {
  shirtColour1.style.display = "block"; // all revealed once 'shirt' is clicked on
  shirtColour2.style.display = "block";
  shirtColour3.style.display = "block";
  shirtColour4.style.display = "block";
  shirtColour5.style.display = "block";

  //making all others invisible
  eyeColour1.style.display = "none";
  eyeColour2.style.display = "none";
  eyeColour3.style.display = "none";
  eyeColour4.style.display = "none";
  eyeColour5.style.display = "none";

  hairColour1.style.display = "none";
  hairColour2.style.display = "none";
  hairColour3.style.display = "none";
  hairColour4.style.display = "none";
  hairColour5.style.display = "none";

  skinColour1.style.display = "none";
  skinColour2.style.display = "none";
  skinColour3.style.display = "none";
  skinColour4.style.display = "none";
  skinColour5.style.display = "none";

  hatColour1.style.display = "none";
  hatColour2.style.display = "none";
  hatColour3.style.display = "none";
  hatColour4.style.display = "none";
  hatColour5.style.display = "none";

  piercingsColour1.style.display = "none";
  piercingsColour2.style.display = "none";
}

//allowing for colour to be clicked on to swap the image

//HAIR

// //blonde hair selected
const blondeHairSelected = document.getElementById("blonde-hair");

hairColour1.addEventListener("click", chooseHairColour1);

function chooseHairColour1() {
  blondeHairSelected.style.display = "block";
}

// //brown hair selected
const brownHairSelected = document.getElementById("brown-hair");

hairColour2.addEventListener("click", chooseHairColour2);

function chooseHairColour2() {
  brownHairSelected.style.display = "block";
}

// //green hair selected
const greenHairSelected = document.getElementById("green-hair");

hairColour3.addEventListener("click", chooseHairColour3);

function chooseHairColour3() {
  greenHairSelected.style.display = "block";
}

// //purple hair selected
const purpleHairSelected = document.getElementById("purple-hair");

hairColour4.addEventListener("click", chooseHairColour4);

function chooseHairColour4() {
  purpleHairSelected.style.display = "block";
}

// //red hair selected
const redHairSelected = document.getElementById("red-hair");

hairColour5.addEventListener("click", chooseHairColour5);

function chooseHairColour5() {
  redHairSelected.style.display = "block";
}

//SKIN FUNCTIONS
// very pale skin selected
const veryPaleSkinSelected = document.getElementById("verypale-skin");

skinColour1.addEventListener("click", chooseSkinColour1);

function chooseSkinColour1() {
  veryPaleSkinSelected.style.display = "block";
}

// pale skin selected
const paleSkinSelected = document.getElementById("pale-skin");

skinColour2.addEventListener("click", chooseSkinColour2);

function chooseSkinColour2() {
  paleSkinSelected.style.display = "block";
}

//tan skin selected
const tanSkinSelected = document.getElementById("tan-skin");

skinColour3.addEventListener("click", chooseSkinColour3);

function chooseSkinColour3() {
  tanSkinSelected.style.display = "block";
}

//dark tan skin selected
const darkTanSkinSelected = document.getElementById("darktan-skin");

skinColour4.addEventListener("click", chooseSkinColour4);

function chooseSkinColour4() {
  darkTanSkinSelected.style.display = "block";
}

//dark skin selected
const darkSkinSelected = document.getElementById("dark-skin");

skinColour5.addEventListener("click", chooseSkinColour5);

function chooseSkinColour5() {
  darkSkinSelected.style.display = "block";
}

//HAT FUNCTIONS
//blue hat selected
const blueHatSelected = document.getElementById("blue-hat");

hatColour1.addEventListener("click", chooseHatColour1);

function chooseHatColour1() {
  blueHatSelected.style.display = "block";
}

//green hat selected
const greenHatSelected = document.getElementById("green-hat");

hatColour2.addEventListener("click", chooseHatColour2);

function chooseHatColour2() {
  greenHatSelected.style.display = "block";
}

//pink hat selected
const pinkHatSelected = document.getElementById("pink-hat");

hatColour3.addEventListener("click", chooseHatColour3);

function chooseHatColour3() {
  pinkHatSelected.style.display = "block";
}

//red hat selected
const redHatSelected = document.getElementById("red-hat");

hatColour4.addEventListener("click", chooseHatColour4);

function chooseHatColour4() {
  redHatSelected.style.display = "block";
}
//tan hat selected
const tanHatSelected = document.getElementById("tan-hat");

hatColour5.addEventListener("click", chooseHatColour5);

function chooseHatColour5() {
  tanHatSelected.style.display = "block";
}

//SHIRT FUNCTIONS
//blue shirt selected
const blueShirtSelected = document.getElementById("blue-shirt");

shirtColour1.addEventListener("click", chooseShirtColour1);

function chooseShirtColour1() {
  blueShirtSelected.style.display = "block";
}

//cream shirt selected
const creamShirtSelected = document.getElementById("cream-shirt");

shirtColour2.addEventListener("click", chooseShirtColour2);

function chooseShirtColour2() {
  creamShirtSelected.style.display = "block";
}

//green shirt selected
const greenShirtSelected = document.getElementById("green-shirt");

shirtColour3.addEventListener("click", chooseShirtColour3);

function chooseShirtColour3() {
  greenShirtSelected.style.display = "block";
}

//red shirt selected
const redShirtSelected = document.getElementById("red-shirt");

shirtColour4.addEventListener("click", chooseShirtColour4);

function chooseShirtColour4() {
  redShirtSelected.style.display = "block";
}

//tan shirt selected
const tanShirtSelected = document.getElementById("tan-shirt");

shirtColour5.addEventListener("click", chooseShirtColour5);

function chooseShirtColour5() {
  tanShirtSelected.style.display = "block";
}

//PIERCING FUNCTIONS
//gold piercings
const goldPiercingsSelected = document.getElementById("gold-piercings");

piercingsColour1.addEventListener("click", choosePiercingsColour1);

function choosePiercingsColour1() {
  goldPiercingsSelected.style.display = "block";
}

//silver piercings
const silverPiercingsSelected = document.getElementById("silver-piercings");

piercingsColour2.addEventListener("click", choosePiercingsColour2);

function choosePiercingsColour2() {
  silverPiercingsSelected.style.display = "block";
}

//EYES
//blue eyes selected
const blueEyeSelected = document.getElementById("eyes_blue");
const brownEyeSelected = document.getElementById("eyes_brown");
const greenEyeSelected = document.getElementById("eyes_green");
const greyEyeSelected = document.getElementById("eyes_grey");
const pastelblueEyeSelected = document.getElementById("eyes_pastelblue");

eyeColour1.addEventListener("click", chooseEyeColour1);

function chooseEyeColour1() {
  pastelblueEyeSelected.style.display = "none";
  greyEyeSelected.style.display = "none";
  greenEyeSelected.style.display = "none";
  brownEyeSelected.style.display = "none";
  blueEyeSelected.style.display = "block";
}

//brown eyes selected

eyeColour2.addEventListener("click", chooseEyeColour2);

function chooseEyeColour2() {
  pastelblueEyeSelected.style.display = "none";
  greyEyeSelected.style.display = "none";
  greenEyeSelected.style.display = "none";
  brownEyeSelected.style.display = "block";
  blueEyeSelected.style.display = "none";
}
//green eyes selected

eyeColour3.addEventListener("click", chooseEyeColour3);

function chooseEyeColour3() {
  pastelblueEyeSelected.style.display = "none";
  greyEyeSelected.style.display = "none";
  greenEyeSelected.style.display = "block";
  brownEyeSelected.style.display = "none";
  blueEyeSelected.style.display = "none";
}

//grey eyes selected

eyeColour4.addEventListener("click", chooseEyeColour4);

function chooseEyeColour4() {
  pastelblueEyeSelected.style.display = "none";
  greyEyeSelected.style.display = "block";
  greenEyeSelected.style.display = "none";
  brownEyeSelected.style.display = "none";
  blueEyeSelected.style.display = "none";
}

//pastel blue eyes selected

eyeColour5.addEventListener("click", chooseEyeColour5);

function chooseEyeColour5() {
  pastelblueEyeSelected.style.display = "block";
  greyEyeSelected.style.display = "none";
  greenEyeSelected.style.display = "none";
  brownEyeSelected.style.display = "none";
  blueEyeSelected.style.display = "none";
}
