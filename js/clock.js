const clock = document.querySelector("#clock");
function updateClock() {
  const now = new Date();
  clock.textContent =
    now.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) +
    " " +
    now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  document.querySelector("#footer-clock").textContent = now.toLocaleTimeString(
    "en-GB",
    { hour: "2-digit", minute: "2-digit" },
  );
}
updateClock();
setInterval(updateClock, 1000);
