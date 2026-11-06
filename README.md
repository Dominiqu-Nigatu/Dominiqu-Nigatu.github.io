# Dominiqu Nigatu — Portfolio

A responsive, single-page portfolio built with HTML, CSS, and vanilla JavaScript.
The layout is inspired by Brittany Chiang's portfolio, with Dominiqu's own copy,
project summaries, source links, and contact form. No employment history is invented.

## Design
- Navy Blue (#072D59) background, Seal Blue (#DBF2FC) text, and Golden Yellow (#FFD166) accents.
- Sticky profile and section navigation on desktop; stacked content on smaller screens.
- About, Projects, Skills, and Contact sections on one continuous page.
- Five project detail dialogs and direct GitHub repository links.
- No terminal chrome, boot intro, code previews, project filters, or window manager.
- Active section tracking, subtle pointer spotlight, and reduced-motion support.
- Original EmailJS configuration and contact submission flow retained.

## Files
- `index.html`: page content, project cards, case-study templates, and contact form.
- `styles.css`: stylesheet entry point.
- `css/base.css`, `css/components.css`, `css/responsive.css`, `css/animations.css`: visual styles.
- `js/navigation.js`: section tracking and pointer highlight.
- `js/projects.js`: project dialogs and copyright year.
- `js/contact.js`: EmailJS integration and form handling.

## Preview
Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory.
Open http://127.0.0.1:8765.

## Validation
Desktop browser checks verified section navigation, sticky profile positioning,
all five project cards, project detail opening with the matching repository,
contact field presence, and no horizontal overflow at the tested viewport.
A static 390px-wide rendering was visually checked; mobile interactions were not
browser-tested. JavaScript syntax checks and git diff whitespace checks passed.
No real contact form submission was made and no deployment was performed.

GitHub source review is not runtime validation of those projects. No project apps were installed or executed, no automated test results are claimed, no production demo URLs are invented, and individual contributions are not inferred from account ownership. Swift Courier is labeled collaborative coursework based on HTML author metadata. See `project-evidence.md` for source evidence and exclusions.

Contact delivery was not tested: submitting the form sends a real email. No GitHub content was modified or pushed during this update.

## Security follow-up
The public CampusBuzz README contains a development credential. It was not copied into the portfolio. If valid, rotate it and remove the exposed value from repository history. This update did not change that repository.
