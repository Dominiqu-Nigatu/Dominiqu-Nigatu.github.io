# Project evidence

Reviewed 22 October 2026 using public GitHub trees, READMEs, manifests, and source. These are code reviews, not runtime validation.

## Moyo Client Portal

https://github.com/Domy05/MoyoClientPortal

An online-order client portal connecting an Angular interface to an ASP.NET Core API. The repository documents product browsing, a shopping cart, order creation, and order history.

Repository case study. Deployment configuration is documented; a running production deployment has not been verified.

Sources: README.md, docs/requirements-implementation.md

## FilmLog

https://github.com/Domy05/FilmLog-assignment2-INF345

A film-tracking coursework app with movie search, detail pages, a watchlist, and a watched collection. The source uses Ionic and Angular with browser-local persistence.

Coursework implementation. User and collection data are stored locally in the browser; this is not presented as production authentication.

Sources: src/app/services/movie.ts, src/app/services/storage.ts

## CampusBuzz

https://github.com/Domy05/CAMPUSBUZZ-INF354

An event-management coursework project with an Angular frontend and an ASP.NET Core API. The code supports listing, creating, editing, and deleting events.

Source reviewed; the application and its automated tests were not run during this portfolio update.

Sources: CampusBuzzAPI/Controllers/EventController.cs, CampusBuzzAngular/src/app/components/event-listing/event-listing.ts

## Nuxt Portfolio

https://github.com/Domy05/imyAss2

A Nuxt portfolio with biography, projects, and contact routes. Its projects page integrates a cat-fact service and current weather for Pretoria.

An earlier coursework portfolio. Historical biography text is not used as evidence of current study year.

Sources: pages/projects.vue, composer/weatherInformation.js, composer/catInformation.js

## Swift Courier

https://github.com/Domy05/HW_assignmentCOS216

A collaborative courier-themed coursework repository. The HTML landing page routes visitors to separate customer and courier pages, and explicitly credits Dominiqu Nigatu and Nathan Chisadza.

Early coursework prototype. End-to-end delivery booking and tracking are not claimed. Individual task ownership is not documented in the reviewed files.

Sources: index.html, customer.html, courier.html

## Additional public repositories reviewed

### imy220project

https://github.com/Domy05/imy220project

The public manifest identifies a React application using React Router, an
Express backend, Webpack, Babel, and CSS loaders. The repository README does
not describe the application scope, so no additional project claims are made.

Sources: package.json

### IMYASS3

https://github.com/Domy05/IMYASS3

A Strapi backend configured with the users-permissions plugin, SQLite through
better-sqlite3, React dependencies, styled-components, and TypeScript
development tooling. The repository README is the default Strapi guide, so
this is technology evidence rather than a product case study.

Sources: package.json, README.md

### imy220project, IMYASS3, and CampusBuzz infrastructure

The public repositories also provide evidence of Node/npm workflows, Docker
configuration, SQL Server development, and Azure/GitHub Actions deployment
planning. These are listed as technologies used or configured in repositories;
they are not presented as independently verified production operations.

Sources: imy220project/package.json, IMYASS3/package.json,
CampusBuzz README, Moyo Client Portal/README.md,
Moyo Client Portal/docs/production-deployment.md

## Exclusions

Private repositories were not inspected. inf272-RAC9 is public but empty. The
public imy220project and IMYASS3 repositories have limited application source;
archived ZIPs were not unpacked. Smart-File-Manager is a fork; individual
contribution is unverified. No verified demo URLs or application screenshots
were found for selected entries. Public development credentials were not
copied into the portfolio.
