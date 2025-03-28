document.querySelector("#hover-button").addEventListener("click", toggleMe);
const menu = document.querySelector("#profile-menu");
console.log(menu);
function toggleMe() {
  const moreInfo = document.querySelector("#more-info");
  moreInfo.classList.toggle("show");
}

document.querySelector("#profile-button").addEventListener("click", toggleMenu);

function toggleMenu() {
  console.log("hi");

  menu.classList.toggle("show");
}

document.querySelector("#gotoLastBtn").addEventListener("click", gotoLast);

function gotoLast() {
  window.location.href = "#last";
}

const scrollContent = document.querySelector("#scroll-content");

const hscrollButton = document.querySelector("#hscroll-button");
console.log(hscrollButton);

hscrollButton.addEventListener("click", getHScroll);

const hscroll = document.querySelector("#hscroll");

function getHScroll() {
  hscroll.textContent = scrollContent.scrollLeft;
}

const vscrollButton = document.querySelector("#vscroll-button");
console.log(vscrollButton);

vscrollButton.addEventListener("click", getVScroll);

const vscroll = document.querySelector("#vscroll");

function getVScroll() {
  vscroll.textContent = scrollContent.scrollTop;
}

const hscroll150Button = document.querySelector("#hscroll150-button");
console.log(hscroll150Button);

hscroll150Button.addEventListener("click", gotoHScroll150);

function gotoHScroll150() {
  scrollContent.scrollTo({ left: 150, behavior: "smooth" });
}

const vscroll300Button = document.querySelector("#vscroll300-button");
console.log(vscroll300Button);

vscroll300Button.addEventListener("click", gotoVScroll300);

function gotoVScroll300() {
  scrollContent.scrollTo({ top: 300, behavior: "smooth" });
}

const wvscrollButton = document.querySelector("#wvscroll-button");
console.log(wvscrollButton);

wvscrollButton.addEventListener("click", getWVScroll);

const wvscroll = document.querySelector("#wvscroll");

function getWVScroll() {
  wvscroll.textContent = window.scrollY;
}

let draggedElement = null;
const dropBox = document.querySelector("#dropbox");

const purpleBox = document.querySelector("#purplebox");
purpleBox.addEventListener("dragstart", selectPurple);
function selectPurple() {
  draggedElement = purpleBox;
}

const coralBox = document.querySelector("#coralbox");
coralBox.addEventListener("dragstart", selectCoral);
function selectCoral() {
  draggedElement = coralBox;
}

dropBox.addEventListener("dragover", endDrag);

function endDrag() {
  event.preventDefault();
}

dropBox.addEventListener("drop", handleDrop);

function handleDrop() {
  if (draggedElement) {
    const color = window
      .getComputedStyle(draggedElement)
      .getPropertyValue("background-color");
    dropBox.style.backgroundColor = color;
    dropBox.textContent = "Dropped!";
    draggedElement = null;
  }
}

const resizableBox = document.querySelector(".resizable");
const resizer = document.querySelector("#resize-pointer");

let isResizing = false;

resizer.addEventListener("mousedown", startResize);

function startResize(event) {
  isResizing = true;

  // Attach event listeners for mousemove and mouseup events
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
}

function resize(event) {
  if (isResizing) {
    const boxRect = resizableBox.getBoundingClientRect();
    const newWidth = event.clientX - boxRect.left;
    const newHeight = event.clientY - boxRect.top;

    resizableBox.style.width = newWidth + "px";
    resizableBox.style.height = newHeight + "px";
  }
}

function stopResize() {
  isResizing = false;

  // Remove event listeners for mousemove and mouseup events
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}
