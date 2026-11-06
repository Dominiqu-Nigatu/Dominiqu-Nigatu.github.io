// A continuous page: the active navigation item follows the reading position.
const sectionLinks = [...document.querySelectorAll('[data-section]')];
const contentSections = sectionLinks.map(link => document.getElementById(link.dataset.section));
function syncNavigation() {
  let current = contentSections[0];
  const threshold = window.innerHeight * 0.3;
  contentSections.forEach(section => {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = contentSections.at(-1);
  sectionLinks.forEach(link => {
    if (link.dataset.section === current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let scrollQueued = false;
window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => { syncNavigation(); scrollQueued = false; });
}, { passive: true });
window.addEventListener('resize', syncNavigation);
syncNavigation();
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('pointermove', event => {
  if (motionPreference.matches || event.pointerType !== 'mouse') return;
  document.documentElement.style.setProperty('--spot-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--spot-y', `${event.clientY}px`);
}, { passive: true });
