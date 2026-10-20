# Architecture

How the project is organized, for anyone changing more than text.

## Principles

- **No build step.** Plain HTML, CSS and JavaScript served as static files, so
  what you edit is what runs.
- **One global scope.** Scripts are classic (non-module) scripts, so a `const`
  or `function` at the top of one file is visible to the scripts loaded after it.
- **Data separate from logic.** Anything you might personalize or extend lives
  in `js/data/`; behaviour lives in `js/app.js`.
- **Graceful degradation.** Without Firebase, shared features keep data in the
  current browser only. Without TMDB, TURN, Cloudinary or the news worker, the
  matching feature is disabled or falls back.

## Load order

`index.html` loads, in order:

1. `js/data/config.js`, `quotes.js`, `quizzes.js`, `games.js`
2. `js/app.js`
3. `js/enhancements.js`, `js/photobooth-studio.js`, `js/haptics.js`, `js/pwa.js`

Data files must come before `app.js`. The add-on scripts only observe or extend
what `app.js` produced.

Stylesheets load `style.css` → `enhancements.css` → `photobooth-studio.css` →
`modern.css`; later files win, and `modern.css` redefines the colour tokens.

## `js/app.js`

About 14,000 lines. It opens with a table of contents; each section starts with
a banner comment (search for the name, e.g. `BOUQUET` or `SHARED CALENDAR`).
Sections use `typeof someFunction === "function"` guards where they call each
other, because one file's functions may not exist yet at load time, so keep the
existing order when moving code.

Shared-data features follow one pattern:

1. a state array (`calEvents`, `dayCards`, …) rendered by a `render…()` function;
2. a Firestore listener (`onSnapshot`) that updates the array and re-renders;
3. writes go to Firestore; without Firebase they update the array directly;
4. a sync pill and a change toast tell the user what happened.

## Firestore collections

`bucketlist`, `movies`, `musicsongs`, `memories`, `albums`, `calendar`,
`daycards`, `moods`, `bouquets`, `photoboothCalls` (with
`callerCandidates` / `calleeCandidates`). Rules and setup:
[`firebase-setup.md`](firebase-setup.md).

## Configuration and secrets

`CONFIG` in `js/data/config.js` holds `__PLACEHOLDER__` strings for service keys. The deploy workflow copies the site into `_site/`, replaces the
placeholders there from GitHub secrets, and stamps `CACHE_VERSION` in `service-worker.js` with the commit id.
Nothing secret is ever written back to the repository.

Only `index.html`, `manifest.json`, `service-worker.js`, `css/`, `js/` and
`assets/` are published.

## Offline behaviour

`service-worker.js` precaches the code listed in `CORE_ASSETS` and caches
images on demand. If you add or rename a code file, update `CORE_ASSETS`.
`js/pwa.js` registers it and shows an update banner when a new version takes over.

## Adding a feature

1. Markup: a `tab-panel` and nav button in `index.html`.
2. Behaviour: a new banner-headed section in `js/app.js`, with the data (if
   large) in `js/data/`.
3. Style: add to `css/` (or a new file, linked in `index.html` and listed in
   `CORE_ASSETS`).
4. If it stores shared data: a Firestore collection and a rule for it, then add
   it to [`firebase-setup.md`](firebase-setup.md) and `SECURITY.md`.
