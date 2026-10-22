const heroArt = document.getElementById("hero-ascii");
const artLabel = document.getElementById("art-label");
const artCursor = document.getElementById("art-cursor");
const globePause = document.getElementById("pause-globe");
const asciiArt = {
  monogram: [
    "██████╗  ███╗   ██╗",
    "██╔══██╗ ████╗  ██║",
    "██║  ██║ ██╔██╗ ██║",
    "██║  ██║ ██║╚██╗██║",
    "██████╔╝ ██║ ╚████║",
    "╚═════╝  ╚═╝  ╚═══╝",
  ],
  computer: [
    "   ╭──────────────────────╮",
    "   │ DOM / WORKSTATION    │",
    "   ├──────────────────────┤",
    "   │                      │",
    "   │  > hello, world_     │",
    "   │  > build something   │",
    "   │  > make it matter.   │",
    "   │                      │",
    "   ╰──────────┬─┬─────────╯",
    "          ╭───┴─┴───╮",
    "          ╰─────────╯",
    "   ░▒▓ [ DOMINIQU OS ] ▓▒░",
  ],
};
let globeAngle = 0;
let globePaused = false;
const landShapes = [
  [
    [-168, 65],
    [-130, 72],
    [-108, 55],
    [-54, 48],
    [-80, 18],
    [-110, 25],
    [-125, 48],
  ],
  [
    [-82, 12],
    [-48, 5],
    [-35, -10],
    [-62, -55],
    [-77, -28],
  ],
  [
    [-18, 34],
    [12, 37],
    [40, 12],
    [49, -12],
    [22, -35],
    [5, -26],
    [-17, 7],
  ],
  [
    [-12, 38],
    [8, 60],
    [45, 72],
    [105, 72],
    [165, 55],
    [145, 32],
    [120, 5],
    [78, 8],
    [42, 32],
  ],
  [
    [112, -12],
    [151, -10],
    [155, -38],
    [118, -36],
  ],
  [
    [-55, 60],
    [-25, 63],
    [-40, 83],
    [-63, 78],
  ],
];
function insideShape(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i],
      b = points[j];
    if (
      a[1] > y !== b[1] > y &&
      x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]
    )
      inside = !inside;
  }
  return inside;
}
function drawGlobe() {
  const rows = [];
  const width = 34,
    height = 17;
  for (let y = 0; y < height; y++) {
    let line = "";
    const py = (y - (height - 1) / 2) / (height / 2);
    for (let x = 0; x < width; x++) {
      const px = (x - (width - 1) / 2) / (width / 2);
      const radius = px * px + py * py;
      if (radius > 1) {
        line += " ";
        continue;
      }
      const z = Math.sqrt(1 - radius);
      const lat = (Math.asin(-py) * 180) / Math.PI;
      let lon = ((Math.atan2(px, z) + globeAngle) * 180) / Math.PI;
      lon = ((lon + 540) % 360) - 180;
      const land = landShapes.some((shape) => insideShape(lon, lat, shape));
      const rim = z < 0.24;
      const grid = Math.abs(lat % 30) < 4 || Math.abs(lon % 30) < 5;
      line += rim ? ":" : land ? (z > 0.6 ? "▓" : "▒") : grid ? "·" : ".";
    }
    rows.push(line);
  }
  heroArt.textContent = rows.join("\n");
}
function updateArtwork() {
  if (!["monogram", "computer", "globe"].includes(preferences.artwork))
    preferences.artwork = "monogram";
  const choice = preferences.artwork;
  document.querySelector(".hero-artwork").dataset.artwork = choice;
  document
    .querySelectorAll("[data-artwork]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.artwork === choice)),
    );
  artLabel.textContent = {
    monogram: "DN / PERSONAL SIGNATURE",
    computer: "PC / HELLO, WORLD",
    globe: "EARTH / ALWAYS EXPLORING",
  }[choice];
  artCursor.hidden = choice === "globe";
  globePause.hidden = choice !== "globe" || motionIsReduced();
  globePause.textContent = globePaused ? "Resume rotation" : "Pause rotation";
  globePause.setAttribute("aria-pressed", String(globePaused));
  document.getElementById("art-description").textContent = {
    monogram: "Decorative DN monogram.",
    computer: "Decorative retro computer.",
    globe: motionIsReduced() ? "Static ASCII globe." : "Rotating ASCII globe.",
  }[choice];
  if (choice === "globe") drawGlobe();
  else heroArt.textContent = asciiArt[choice].join("\n");
}
document.querySelectorAll("[data-artwork]").forEach((button) =>
  button.addEventListener("click", () => {
    preferences.artwork = button.dataset.artwork;
    savePreferences();
    updateArtwork();
  }),
);
globePause.addEventListener("click", () => {
  globePaused = !globePaused;
  updateArtwork();
});
document.addEventListener("portfolio-preferences", updateArtwork);
setInterval(() => {
  if (
    preferences.artwork === "globe" &&
    !globePaused &&
    !motionIsReduced() &&
    !document.hidden &&
    activeWindow?.id === "home" &&
    bootScreen.hidden
  ) {
    globeAngle += 0.055;
    drawGlobe();
  }
}, 140);
updateArtwork();
