const COLORS = [
  "#e94560",
  "#f5a623",
  "#f7dc6f",
  "#58d68d",
  "#5dade2",
  "#af7ac5",
  "#f1948a",
  "#ffffff",
  "#1abc9c",
  "#e67e22",
  "#3498db",
  "#e84393",
];

const grid = document.getElementById("grid");
const palette = document.getElementById("palette");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const modeLabel = document.getElementById("modeLabel");

let selectedColor = null;
let erasing = false;
let painting = false; // for click-drag

// ── Build palette ──
COLORS.forEach((hex, i) => {
  const sw = document.createElement("div");
  sw.className = "swatch";
  sw.style.background = hex;
  sw.dataset.color = hex;
  sw.addEventListener("click", () => pickColor(hex));
  palette.appendChild(sw);
});

function pickColor(hex) {
  selectedColor = hex;
  erasing = false;
  eraserBtn.classList.remove("selected");
  document
    .querySelectorAll(".swatch")
    .forEach((s) => s.classList.toggle("selected", s.dataset.color === hex));
  modeLabel.textContent = "— drawing —";
  modeLabel.classList.remove("eraser");
}

// ── Build 10×10 grid ──
for (let i = 0; i < 100; i++) {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.addEventListener("mousedown", (e) => {
    e.preventDefault();
    painting = true;
    applyDot(dot);
  });
  dot.addEventListener("mouseenter", () => {
    if (painting) applyDot(dot);
  });
  grid.appendChild(dot);
}

document.addEventListener("mouseup", () => {
  painting = false;
});

function applyDot(dot) {
  if (erasing) {
    dot.style.background = "";
    dot.classList.remove("active");
  } else if (selectedColor) {
    dot.style.background = selectedColor;
    dot.classList.add("active");
  }
}

// ── Eraser toggle ──
eraserBtn.addEventListener("click", () => {
  erasing = !erasing;
  if (erasing) {
    selectedColor = null;
    eraserBtn.classList.add("selected");
    document
      .querySelectorAll(".swatch")
      .forEach((s) => s.classList.remove("selected"));
    modeLabel.textContent = "— eraser mode —";
    modeLabel.classList.add("eraser");
  } else {
    modeLabel.textContent = "— select a color —";
    modeLabel.classList.remove("eraser");
  }
});

// ── Clear ──
clearBtn.addEventListener("click", () => {
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.style.background = "";
    dot.classList.remove("active");
  });
});

// ── Save as PNG ──
saveBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const dotSize = 42;
  const gap = 6;
  const padding = 18;
  const gridSize = 10;

  // Canvas size: 10 dots × (dot size + gap) - gap + 2×padding
  const canvasSize = gridSize * (dotSize + gap) - gap + 2 * padding;
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue("--surface")
    .trim();
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw each dot
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const x = padding + col * (dotSize + gap) + dotSize / 2;
    const y = padding + row * (dotSize + gap) + dotSize / 2;

    const bg =
      dot.style.background ||
      getComputedStyle(document.documentElement)
        .getPropertyValue("--surface-light")
        .trim();

    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixel-art-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
});
