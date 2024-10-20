const drawerButton = document.querySelector("#drawer-button");
const sideDrawer = document.querySelector("#side-drawer");
console.log(sideDrawer);
let isOpen = false;
drawerButton.addEventListener("click", openDrawer);

function openDrawer() {
  console.log("i am clicked");
  if (!isOpen) {
    // sideDrawer.style.transform = `translateX(200px)`;
    sideDrawer.style.translate = "200px";
    isOpen = true;
  } else {
    sideDrawer.style.translate = "-200px";
    // sideDrawer.style.transform = `translateX(-200px)`;
    isOpen = false;
  }
}

const rdrawerButton = document.querySelector("#rdrawer-button");
const rsideDrawer = document.querySelector("#rside-drawer");
console.log(rsideDrawer);
let isrOpen = false;
rdrawerButton.addEventListener("click", openRDrawer);

function openRDrawer() {
  console.log("i am clicked");
  if (!isrOpen) {
    // sideDrawer.style.transform = `translateX(200px)`;
    rsideDrawer.style.translate = "-200px";
    isrOpen = true;
  } else {
    rsideDrawer.style.translate = "200px";
    // sideDrawer.style.transform = `translateX(-200px)`;
    isrOpen = false;
  }
}
