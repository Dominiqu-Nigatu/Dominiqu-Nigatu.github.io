const output = document.querySelector("#terminal-output");
document.querySelector("#terminal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#command-input");
  const value = input.value.trim().toLowerCase();
  if (!value) return;
  input.value = "";
  if (value === "clear") {
    output.replaceChildren();
    return;
  }
  const line = document.createElement("p");
  line.textContent = "> " + value;
  output.append(line);
  const response = document.createElement("p");
  const destinations = {
    home: "home",
    about: "about",
    projects: "work",
    skills: "skills",
    approach: "approach",
    contact: "contact",
    settings: "settings",
  };
  if (destinations[value]) {
    requestWindow(destinations[value]);
    response.textContent = "Opening " + value + "...";
  } else if (value === "help")
    response.textContent =
      "Commands: home · about · projects · skills · approach · contact · settings · whoami · date · clear";
  else if (value === "whoami")
    response.textContent =
      "Dominiqu Nigatu — developer, digital maker, always learning.";
  else if (value === "date") response.textContent = new Date().toLocaleString();
  else
    response.textContent =
      "Command not found. Type help for available commands.";
  output.append(response);
  while (output.children.length > 8) output.firstElementChild.remove();
});
document.querySelector("#effects-toggle").addEventListener("click", () => {
  preferences.crt = !preferences.crt;
  applyPreferences();
  savePreferences();
});
function preferencesChanged() {
  applyPreferences();
  savePreferences();
  if (motionIsReduced()) {
    codePaused = true;
    syncPause();
  }
  document.getElementById("settings-status").textContent =
    "Preferences applied.";
}
document.querySelectorAll("[data-theme-choice]").forEach((button) =>
  button.addEventListener("click", () => {
    preferences.theme = button.dataset.themeChoice;
    preferencesChanged();
  }),
);
document.getElementById("text-size").addEventListener("change", (event) => {
  preferences.textSize = event.target.value;
  preferencesChanged();
});
document
  .getElementById("motion-setting")
  .addEventListener("change", (event) => {
    preferences.motion = event.target.value;
    preferencesChanged();
  });
document.getElementById("crt-setting").addEventListener("change", (event) => {
  preferences.crt = event.target.checked;
  preferencesChanged();
});
document.getElementById("reset-settings").addEventListener("click", () => {
  preferences = { ...defaultPreferences };
  preferencesChanged();
});

