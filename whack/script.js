let activeDragon = null;

function getRandomDragon() {
  return Math.floor(Math.random() * 4) + 1;
}

function showRandomDragon() {
  if (activeDragon) {
    const prev = document.getElementById("dragon" + activeDragon);
    prev.style.height = "0px";
    prev.style.opacity = "0";
  }

  const id = getRandomDragon();
  const dragon = document.getElementById("dragon" + id);
  dragon.style.height = "250px"; // enough to touch the button
  dragon.style.opacity = "1";
  activeDragon = id;

  setTimeout(() => {
    if (activeDragon === id) {
      dragon.style.height = "0px";
      dragon.style.opacity = "0";
      activeDragon = null;
    }
  }, 2000);
}

function whack(id) {
  const dragon = document.getElementById("dragon" + id);
  const button = dragon.nextElementSibling;

  const dragonBox = dragon.getBoundingClientRect();
  const buttonBox = button.getBoundingClientRect();

  const overlap =
    dragonBox.bottom >= buttonBox.top &&
    dragonBox.top <= buttonBox.bottom &&
    dragonBox.right >= buttonBox.left &&
    dragonBox.left <= buttonBox.right;

  if (id === activeDragon && overlap) {
    alert("Whack! You got dragon " + id);
    dragon.style.height = "0px";
    dragon.style.opacity = "0";
    activeDragon = null;
  } else {
    alert("Miss!");
  }
}

setInterval(showRandomDragon, 3000);
