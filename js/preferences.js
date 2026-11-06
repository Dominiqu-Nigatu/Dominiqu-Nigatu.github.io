// Browser-local preferences, with safe defaults when storage is blocked.
const defaultPreferences = {
  theme: "classic",
  themeRevision: "cmd-1",
  textSize: "standard",
  motion: "system",
  crt: false,
  artwork: "monogram",
};
let preferences = { ...defaultPreferences };
try {
  const saved = JSON.parse(
    localStorage.getItem("dominiqu-portfolio-preferences") || "null",
  );
  if (saved && typeof saved === "object")
    preferences = { ...preferences, ...saved, themeRevision: saved.themeRevision };
} catch (_) {}
// Apply the new default once, without discarding text-size or artwork choices.
if (preferences.themeRevision !== "cmd-1") {
  preferences.theme = "classic";
  preferences.crt = false;
  preferences.themeRevision = "cmd-1";
  savePreferences();
}
function motionIsReduced() {
  return (
    preferences.motion === "reduce" ||
    (preferences.motion !== "full" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );
}
function savePreferences() {
  try {
    localStorage.setItem(
      "dominiqu-portfolio-preferences",
      JSON.stringify(preferences),
    );
  } catch (_) {}
}
function applyPreferences() {
  if (!["classic", "green", "amber", "blue"].includes(preferences.theme))
    preferences.theme = "classic";
  if (!["standard", "large", "larger"].includes(preferences.textSize))
    preferences.textSize = "standard";
  if (!["system", "reduce", "full"].includes(preferences.motion))
    preferences.motion = "system";
  document.documentElement.dataset.theme = preferences.theme;
  document.documentElement.dataset.textSize = preferences.textSize;
  document.documentElement.classList.toggle("reduce-motion", motionIsReduced());
  document.body.classList.toggle("effects-off", !preferences.crt);
  document
    .querySelectorAll("[data-theme-choice]")
    .forEach((b) =>
      b.setAttribute(
        "aria-pressed",
        String(b.dataset.themeChoice === preferences.theme),
      ),
    );
  document.getElementById("text-size").value = preferences.textSize;
  document.getElementById("motion-setting").value = preferences.motion;
  document.getElementById("crt-setting").checked = preferences.crt;
  document.dispatchEvent(new Event("portfolio-preferences"));
  const crt = document.getElementById("effects-toggle");
  crt.textContent = preferences.crt ? "CRT: ON" : "CRT: OFF";
  crt.setAttribute("aria-pressed", String(preferences.crt));
}
