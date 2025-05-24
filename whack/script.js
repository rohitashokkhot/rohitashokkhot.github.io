let activeDragon = null;
let msg = "";
const msgContainer = document.querySelector("#msg");

function getRandomDragon() {
  let randomDragon = Math.floor(Math.random() * 4) + 1;
  return randomDragon;
}

function showRandomDragon() {
  // first check if the dragon is active
  // if so reset it back to original position
  if (activeDragon) {
    const prev = document.querySelector("#dragon" + activeDragon);
    prev.style.height = "0px";
    prev.style.opacity = "0";
    msgContainer.textContent = "";
  }

  // get a random dragon to slide down
  const id = getRandomDragon();
  const dragon = document.querySelector("#dragon" + id);
  dragon.style.height = "250px"; //adjust the number based on where the buttons are
  dragon.style.opacity = "1";
  activeDragon = id;

  // slide up the dragon or reset to its original position
  setTimeout(() => {
    if (activeDragon === id) {
      dragon.style.height = "0px";
      dragon.style.opacity = "0";
      activeDragon = null;
      msgContainer.textContent = "";
    }
  }, 2000);
}

function whack(id) {
  const dragon = document.querySelector("#dragon" + id);
  // this method allows us to find a sibling,
  // which is nothing but the button corresponding to the dragon
  const button = dragon.nextElementSibling;

  // get dimensions of both dragon and button
  const dragonBox = dragon.getBoundingClientRect();
  const buttonBox = button.getBoundingClientRect();

  //  see if they overlap
  const overlap =
    dragonBox.bottom >= buttonBox.top &&
    dragonBox.top <= buttonBox.bottom &&
    dragonBox.right >= buttonBox.left &&
    dragonBox.left <= buttonBox.right;

  // if overlap, player win or else it is a miss.
  if (id === activeDragon && overlap) {
    msg = "Whack! You got dragon " + id;

    dragon.style.height = "0px";
    dragon.style.opacity = "0";
    activeDragon = null;
  } else {
    msg = "Sorry, you missed!";
  }
  msgContainer.textContent = msg;
}

// run this every 3 seconds
setInterval(showRandomDragon, 3000);
