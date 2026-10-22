applyPreferences();
const filters = document.querySelectorAll("[data-filter]");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    let count = 0;
    document.querySelectorAll(".project").forEach((project) => {
      project.hidden =
        button.dataset.filter !== "all" &&
        project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    document.querySelector("#announcer").textContent =
      `${count} projects shown`;
  }),
);
const dialog = document.querySelector("#project-dialog");
document.querySelectorAll("[data-project]").forEach((button) =>
  button.addEventListener("click", async () => {
    if (dialog.open || button.disabled) return;
    const original = button.innerHTML;
    button.disabled = true;
    try {
      if (!motionIsReduced()) {
        button.classList.add("launching");
        const launch = document.createElement("span");
        launch.className = "launch-status";
        launch.textContent = "> loading project files...";
        button.append(launch);
        const animation = launch.animate(
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 420, easing: "ease-out" },
        );
        await animation.finished;
      }
      document
        .querySelector("#dialog-content")
        .replaceChildren(
          document
            .querySelector(`#project-${button.dataset.project}`)
            .content.cloneNode(true),
        );
      dialog.setAttribute("aria-labelledby", "dialog-title");
      dialog.querySelector("h2").id = "dialog-title";
      dialog.showModal();
      if (!motionIsReduced())
        dialog.animate(
          [
            { opacity: 0, transform: "translateY(18px) scale(.97)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 240, easing: "ease-out" },
        );
    } finally {
      button.innerHTML = original;
      button.classList.remove("launching");
      button.disabled = false;
    }
  }),
);
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      dialog.close();
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();

