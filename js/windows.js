// Window manager: one content window at a time, with reversible dock animations.
const windows = [...document.querySelectorAll("main > section.panel")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
const idleTerminal = document.getElementById("idle-terminal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeWindow = null;
let transitionQueue = Promise.resolve();
function syncDock() {
  navLinks.forEach((link) => {
    const panel = document.getElementById(link.dataset.nav);
    const active = panel === activeWindow;
    link.classList.toggle("active", active);
    link.dataset.state = panel.dataset.state || "closed";
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
    link.setAttribute("aria-expanded", String(active));
    link.setAttribute("aria-controls", panel.id);
    link.title =
      (active ? "Active: " : "Open ") +
      link.textContent.replace(/\d/g, "").trim();
  });
  document
    .querySelectorAll(".taskbar a")
    .forEach((link) =>
      link.classList.toggle("active", link.hash === "#" + activeWindow?.id),
    );
  idleTerminal.hidden = Boolean(activeWindow);
}
async function animateDock(panel, opening) {
  if (motionIsReduced()) return;
  const target = navLinks.find((link) => link.dataset.nav === panel.id);
  const from = panel.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const docked = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`;
  const keyframes = [
    { transform: "translate(0,0) scale(1)", opacity: 1, filter: "blur(0px)" },
    { transform: docked, opacity: 0.1, filter: "blur(2px)" },
  ];
  const animation = panel.animate(
    opening ? [...keyframes].reverse() : keyframes,
    { duration: 360, easing: "cubic-bezier(.22,.75,.25,1)", fill: "both" },
  );
  try {
    await animation.finished;
  } catch (_) {
  } finally {
    animation.cancel();
  }
}
function requestWindow(id, action = "open", focus = true) {
  transitionQueue = transitionQueue.then(async () => {
    const next = document.getElementById(id);
    if (!windows.includes(next)) return;
    if (action === "open" && activeWindow === next) return;
    if (activeWindow) {
      const previous = activeWindow;
      previous.inert = true;
      await animateDock(previous, false);
      previous.hidden = true;
      previous.inert = false;
      previous.dataset.state =
        action === "close" && next === previous ? "closed" : "minimized";
      activeWindow = null;
    }
    if (action === "open") {
      next.hidden = false;
      next.inert = true;
      next.dataset.state = "open";
      activeWindow = next;
      syncDock();
      await animateDock(next, true);
      next.inert = false;
      if (focus)
        next
          .querySelector(".window-controls button")
          ?.focus({ preventScroll: true });
      history.replaceState(null, "", "#" + id);
    } else {
      history.replaceState(null, "", location.pathname + location.search);
      if (focus)
        navLinks
          .find((link) => link.dataset.nav === id)
          ?.focus({ preventScroll: true });
    }
    syncDock();
    document.getElementById("announcer").textContent = activeWindow
      ? `${id === "work" ? "Projects" : id} window opened`
      : "All windows hidden. Idle terminal running. Choose a window in the left sidebar.";
  });
  return transitionQueue;
}
windows.forEach((panel) => {
  panel.hidden = true;
  panel.dataset.state = "closed";
  panel
    .querySelectorAll("[data-window-action]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        requestWindow(panel.id, button.dataset.windowAction),
      ),
    );
});
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (windows.some((panel) => "#" + panel.id === link.hash))
    link.addEventListener("click", (event) => {
      event.preventDefault();
      requestWindow(link.hash.slice(1));
    });
});
const initial =
  windows.find((panel) => "#" + panel.id === location.hash) || windows[0];
initial.hidden = false;
initial.dataset.state = "open";
activeWindow = initial;
syncDock();
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (windows.some((panel) => panel.id === id)) requestWindow(id);
});

