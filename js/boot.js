// Skippable intro on every page load; reduced-motion visitors bypass it.
const bootScreen = document.getElementById("boot-screen");
const bootLines = document.getElementById("boot-lines");
const skipBoot = document.getElementById("skip-boot");
let bootTimers = [];
let bootReturnFocus = null;
function finishBoot() {
  bootTimers.forEach(clearTimeout);
  bootTimers = [];
  bootScreen.hidden = true;
  document.querySelector(".desktop").inert = false;
  if (bootReturnFocus?.isConnected)
    bootReturnFocus.focus({ preventScroll: true });
}
function startBoot(force = false) {
  if (!force && motionIsReduced()) return;
  bootTimers.forEach(clearTimeout);
  bootTimers = [];
  bootReturnFocus = document.activeElement;
  bootLines.replaceChildren();
  bootScreen.hidden = false;
  document.querySelector(".desktop").inert = true;
  skipBoot.focus();
  const messages = [
    "[OK] loading interface modules",
    "[OK] mounting project repositories",
    "[OK] restoring workspace preferences",
    "[OK] all systems ready — welcome, guest",
  ];
  if (motionIsReduced()) {
    messages.forEach((text) => {
      const line = document.createElement("p");
      line.textContent = text;
      bootLines.append(line);
    });
  } else
    messages.forEach((text, index) =>
      bootTimers.push(
        setTimeout(() => {
          const line = document.createElement("p");
          line.textContent = text;
          bootLines.append(line);
        }, index * 420),
      ),
    );
  bootTimers.push(setTimeout(finishBoot, motionIsReduced() ? 900 : 2300));
}
skipBoot.addEventListener("click", finishBoot);
bootScreen.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    finishBoot();
  }
  if (event.key === "Tab") {
    event.preventDefault();
    skipBoot.focus();
  }
});
document
  .getElementById("replay-boot")
  .addEventListener("click", () => startBoot(true));
startBoot();

// Three comparable, browser-local artwork choices. Rendering stops off-screen.
