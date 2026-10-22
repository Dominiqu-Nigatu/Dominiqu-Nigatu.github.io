// Decorative, simulated terminal output. No real commands or network requests run.
const codeStream = document.getElementById("code-stream");
const snippets = [
  "$ node workspace.js --watch",
  'const developer = "Dominiqu Nigatu";',
  'await workspace.connect({ mode: "creative" });',
  "[OK] interface modules loaded",
  "function buildIdea(thought) {",
  "  return thought.map(design).map(develop).map(refine);",
  "}",
  'const stack = ["HTML", "CSS", "JavaScript"];',
  "for (const detail of experience) {",
  "  await improve(detail, { accessibility: true });",
  "}",
  "[watch] waiting for the next good idea...",
  "> compiling curiosity.module...",
  "[OK] responsive layouts ready",
  "export default { keepLearning: true };",
  "> system heartbeat: nominal",
];
let streamIndex = 0;
let codePaused = motionIsReduced();
const lines = [];
function addCodeLine() {
  const time = new Date().toLocaleTimeString("en-GB");
  lines.push(`[${time}]  ${snippets[streamIndex++ % snippets.length]}`);
  if (lines.length > 45) lines.shift();
  codeStream.textContent = lines.join("\n") + "\n▌";
  codeStream.scrollTop = codeStream.scrollHeight;
}
for (let i = 0; i < 20; i++) addCodeLine();
setInterval(() => {
  if (!activeWindow && !codePaused && !document.hidden) addCodeLine();
}, 650);
const pauseCode = document.getElementById("pause-code");
function syncPause() {
  pauseCode.textContent = codePaused ? "Resume output" : "Pause output";
  pauseCode.setAttribute("aria-pressed", String(codePaused));
}
pauseCode.addEventListener("click", () => {
  codePaused = !codePaused;
  syncPause();
});
reducedMotion.addEventListener("change", () => {
  applyPreferences();
  codePaused = motionIsReduced();
  syncPause();
});
syncPause();
