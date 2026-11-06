# Dominiqu Nigatu — Portfolio OS

A terminal-inspired portfolio built with HTML, CSS, and vanilla JavaScript.

## Structure

The site stays dependency-free and uses deferred browser scripts in a deliberate
order. JavaScript is grouped by responsibility in `js/`: preferences,
projects, contact, clock, windows, terminal, settings, boot, and artwork.
Styles are grouped into `css/` as base rules, components, animations, and
responsive overrides. The root `styles.css` file only imports those stylesheets.

## Features
- One content window at a time with animated minimize/close to the left sidebar and reopen controls.
- Enlarged typography and a saved text-size preference.
- Green, amber, and blue themes, saved in browser-local storage.
- Motion preferences (device default, reduced, full) and optional scanlines.
- Skippable boot sequence on every page load; replay from Settings. Automatic intro is bypassed when reduced motion is active.
- Animated project launch with accessible case-study dialogs.
- Five real GitHub project summaries: Moyo Client Portal, FilmLog, CampusBuzz, Nuxt Portfolio, and Swift Courier.
- GitHub source links and case-study source notes. Code previews are illustrations, not app screenshots.
- Interactive terminal commands including `help`, `projects`, and `settings`.
- Simulated idle code output with pause/resume when all main windows are hidden.
- Existing EmailJS contact configuration retained.

## Preview
Run `python3 -m http.server 8765 --bind 127.0.0.1` in this directory. Open http://127.0.0.1:8765.

## Validation
Browser-tested: theme changes, extra-large text setting, persistence after reload, reduced-motion preference, boot replay/skip, case-study launch with matching title and GitHub URL, one-window navigation. No horizontal overflow at 1466px on the tested settings screen. Earlier close/minimize/reopen checks also passed. Mobile styles are implemented but not browser-tested.

GitHub source review is not runtime validation of those projects. No project apps were installed or executed, no automated test results are claimed, no production demo URLs are invented, and individual contributions are not inferred from account ownership. Swift Courier is labeled collaborative coursework based on HTML author metadata. See `project-evidence.md` for source evidence and exclusions.

Contact delivery was not tested: submitting the form sends a real email. No GitHub content was modified or pushed during this update.

## Security follow-up
The public CampusBuzz README contains a development credential. It was not copied into the portfolio. If valid, rotate it and remove the exposed value from repository history. This update did not change that repository.

## Hero artwork options
Home offers DN, PC, and Globe buttons to compare a personal monogram, retro ASCII workstation, and rotating ASCII Earth. Selection persists locally. Globe rotation pauses when hidden and provides a manual pause button; reduced-motion mode shows a static globe. No first-visit storage flag gates the boot animation.

## Command Prompt appearance
The default is now classic light-gray text on black, with Consolas-style monospace
type, square borders, flat title bars, inverted selections, and Windows-style
prompts. `css/command-prompt.css` is the final theme layer. Green, amber, and blue
remain optional text palettes on black in Settings. Scanlines default to off.
Existing browser preferences migrate once to the classic theme while retaining
text-size, motion, and artwork settings.
