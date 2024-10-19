const hoverImages = [
  "su.png",
  "ka.png",
  "sl.png",
  "ri.png",
  "pa.png",
  "ja.png",
  "ba.png",
  "nt.png",
];

const islands = document.querySelectorAll(".island");

for (i = 0; i < islands.length; i++) {
  const originalSrc = islands[i].src;
  const hoverSrc = originalSrc.replace(originalImages[i], hoverImages[i]);

  islands[i].addEventListener("mouseover", hoverActive);
  function hoverActive() {
    islands[i].src = hoverSrc;
  }

  islands[i].addEventListener("mouseout", hoverInactive);
  function hoverInactive() {
    islands[i].src = originalSrc;
  }
}
