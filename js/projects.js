const dialog = document.querySelector("#project-dialog");
document.querySelectorAll("[data-project]").forEach((button) =>
  button.addEventListener("click", async () => {
    if (dialog.open || button.disabled) return;
    const original = button.innerHTML;
    button.disabled = true;
    try {
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
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
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

