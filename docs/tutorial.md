# 💚 Couple Website Template — Beginner's Tutorial

A guide to personalizing, running and deploying the site. You do not need to
know how to code for most changes — you mostly edit text in one file.

> **Tip:** in VS Code, press `Cmd/Ctrl + Shift + V` to preview this file nicely.

**Contents:** [1. Tools](#1-tools-you-need) · [2. Project layout](#2-project-layout) ·
[3. The golden rule](#3-the-golden-rule) · [4. Tabs and features](#4-tabs-and-features) ·
[5. Editing content (CONFIG)](#5-editing-content-config) · [6. Access](#6-access) ·
[7. Language](#7-language) · [8. Syncing data](#8-syncing-data) ·
[9. Deploying](#9-deploying-to-github-pages) · [10. Notifications](#10-while-you-were-away-notifications) ·
[11. Local testing](#11-local-testing) · [12. Colors](#12-changing-the-colors) ·
[13. The bouquet](#13-the-bouquet) · [14. Adding to the site](#14-adding-things-to-the-site) ·
[15. Troubleshooting](#15-troubleshooting) · [16. CONFIG reference](#16-config-reference)

---

## 1. Tools you need

1. **VS Code** (free) — <https://code.visualstudio.com/>
2. A modern browser (Chrome, Firefox, Safari, Edge)
3. Recommended: **Git** and a **GitHub** account, for publishing

No Node.js or build tools are needed for normal personalization.

---

## 2. Project layout

```text
couple-website-template/
├── index.html                 Page structure and tabs
├── manifest.json              Installable-app (PWA) name, icons, colors
├── service-worker.js          Offline cache (must stay in the root folder)
├── css/
│   ├── style.css              Base design + components
│   ├── enhancements.css       Scroll panes, depth, motion polish
│   ├── photobooth-studio.css  Photo Booth strip editor
│   └── modern.css             Apple-style redesign — colors live here
├── js/
│   ├── data/
│   │   ├── config.js          ⭐ CONFIG — the file you edit most
│   │   ├── quotes.js          365 daily quotes
│   │   ├── quizzes.js         Quiz questions
│   │   └── games.js           Game card decks
│   ├── app.js                 All the behaviour
│   ├── enhancements.js        Scroll panes, visual polish
│   ├── photobooth-studio.js   Strip editor
│   ├── haptics.js             Phone vibration feedback
│   └── pwa.js                 Registers the service worker
├── assets/
│   ├── photos/                Hero and album photos
│   ├── stickers/              Transparent PNGs (Photo Booth + bouquet)
│   └── icons/                 App icons
├── docs/                      This tutorial and the setup guides
├── news-backend/              Optional Cloudflare Worker (news)
└── .github/workflows/         Automatic deploy
```

| File | What it is | How often you edit it |
|---|---|---|
| `js/data/config.js` | Names, dates, photos, messages, playlists, keys | **Often** |
| `js/data/quizzes.js`, `games.js` | Questions and cards | Sometimes |
| `assets/*` | Your images and stickers | When adding media |
| `css/modern.css` | Colors, fonts, roundness | For design tweaks |
| `index.html`, `js/app.js` | Structure and behaviour | Rarely |

---

## 3. The golden rule

**Most of the time you only need to open `js/data/config.js`.** Everything
personal — names, dates, cities, messages, playlists — is in the `CONFIG`
object at the top. Leave the rest alone unless you want to change how
something *behaves*.

---

## 4. Tabs and features

| Tab | What it does |
|---|---|
| **Our Story** | Hero, "together for…" counter, reunion countdown, weather for both cities with a 7-day forecast and local times, moon phase, Things I Miss, and the **Today** widget: moods, calendar, day card, bouquet, daily quote, news |
| **Our Album** | Photo categories from `CONFIG.album` plus live "Our Memories" uploads |
| **Us** | Favorites, fun facts, "Our Firsts" timeline |
| **Open When…** | Letters for different moods and days |
| **Bucket List** | Shared to-do list and **Movie Nights** (To Watch / Watched, TMDB search, star ratings from each of you) |
| **Quizzes** | Quizzes about each other |
| **Music** | Playlists with a mini-player that keeps playing while you browse |
| **Bouquet** | Build and send a digital bouquet — see [section 13](#13-the-bouquet) |
| **Photo Booth** | Live video call, photo strip and strip editor |
| **Calendar** | Shared events with repeats |
| **Day Cards** | Short notes that expire after 24 hours unless saved |
| **Our Games** | Five card decks for couples |

Extras: dark mode, installable app
(PWA), "While you were away" notifications, tab dots for new shared content,
and phone vibration feedback (switch in the footer).

---

## 5. Editing content (CONFIG)

Open `js/data/config.js`. The examples below show the shape of each part.

### Names, dates, cities

```javascript
// at the very top of the file, above CONFIG:
const NAMES = { partnerA: "Alex", partnerB: "Sam" };

relationshipStart: "2024-02-14T00:00:00",
reunionDate: "2027-06-01T12:00:00",

partnerALocation: { city: "Lisbon, Portugal",  lat: 38.72, lon: -9.14 },
partnerBLocation: { city: "Toronto, Canada",   lat: 43.65, lon: -79.38 },
```

The code always calls the two of you `partnerA` and `partnerB`; `NAMES` is
the only place your real names go, and they show up everywhere (moods,
calendar, quizzes, playlists, footer). The coordinates drive the weather,
forecast, local time and distance.

### Hero

```javascript
hero: {
  eyebrow: "a little place that's just ours",
  title: "For You, My Love",
  subtitle: "...",
  message: "...",
},
```

### Static photos

```javascript
photos: {
  hero: "assets/photos/hero.jpeg",
  final: "assets/photos/final.jpeg",
},
```

Put the image files in `assets/photos/`. Use `null` to hide one.

### Album (static photo folders)

```javascript
album: [
  {
    category: "Us",
    items: [
      { caption: "Us, somewhere ordinary", date: "08/02/2026", img: "assets/photos/us-1.jpeg" },
    ],
  },
],
```

Photos added through the site ("Our Memories") don't go here — they upload to
Cloudinary and appear on both devices.

### Things I Miss, You Made Me Better, Little Things

Simple lists. Edit the text or copy an item to add another.

### Open When…

```javascript
openWhen: [
  { icon: "💚", label: "Open when you're sad", title: "Open When You're Sad", text: "Hey. I know I can't be there..." },
],
```

### Starter lists

`bucketList` and `movieList` only appear the first time the shared database is
empty. After that, everything is live from Firebase.

```javascript
bucketList: [
  { text: "Watch the sunset from a rooftop together", done: false },
],
```

### Music playlists

```javascript
playlists: [
  {
    id: "our-playlist",            // never change once set
    label: "Our Playlist",
    description: "...",
    songs: [
      {
        title: "Song Name",
        artist: "Artist Name",
        youtubeId: "BW9Fzwuf43c",  // only the ID, not the whole URL
        description: "Why this song matters",
          },
    ],
  },
],
```

Some videos block embedding and show a blank player. Songs added on the live
site can also use SoundCloud.

### Photo Booth stickers

After you take Photo Booth photos, the strip opens in an editor whose
**Stickers** tab shows emoji plus your own stickers.

1. Get **transparent PNGs** (only use images you made or may use), roughly
   300–600 px wide.
2. Save them in `assets/stickers/` with short names, no capitals or spaces.
3. List them in `photoBoothStickers`:

   ```javascript
   photoBoothStickers: [
     "assets/stickers/heart.png",
     "assets/stickers/pink-bow.png",
   ],
   ```

   Shortcut to generate the lines (Mac; run from the project folder):

   ```bash
   ls -1 assets/stickers | sed 's|.*|  "assets/stickers/&",|' | pbcopy
   ```

   On Windows use `dir /b assets\stickers | clip` and add the quotes yourself.
4. Commit and push. They appear under **Stickers → My stickers ⭐**.

Good to know: names must match the files exactly (capitals and `.png`
included); files not in the list are simply unused; a sticker can also get a
white cut-out outline in the editor. Stickers need no Firebase or Cloudinary.

### Services (leave the placeholders)

```javascript
firebase:  { apiKey: "__FIREBASE_API_KEY__", /* ... */ },
cloudinary: { cloudName: "__CLOUDINARY_CLOUD_NAME__", uploadPreset: "__CLOUDINARY_UPLOAD_PRESET__" },
```

The deploy replaces every `__PLACEHOLDER__` from GitHub secrets. **Never paste
real keys into a public repository.**

---

## 6. Access

The site has no password screen: anyone who has the link can open it. Don't
put sensitive information on it. If you need to restrict who can see it, use
your hosting provider's access control (see [`SECURITY.md`](../SECURITY.md)).

---

## 7. Language

The site is English-only. All text lives in `index.html` and in `CONFIG`.

---

## 8. Syncing data

| Service | Needed for | Guide |
|---|---|---|
| **Firebase** (Firestore) | Bucket List, Movies, Music, Memories, Calendar, Day Cards, moods, Bouquet, Photo Booth handshake | [`firebase-setup.md`](firebase-setup.md) |
| **Cloudinary** | Photo files uploaded in "Our Memories" | [`cloudinary-setup.md`](cloudinary-setup.md) |
| **TMDB** | Movie search with posters (optional — without it you can add titles by hand) | free key at themoviedb.org → Settings → API |
| **Metered TURN** | Photo Booth between different networks (optional — same wifi works without) | [`turn-setup.md`](turn-setup.md) |

Add the values as **repository secrets**; the deploy injects them.

| Secret | Required? |
|---|---|
| `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID` | For shared features |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_UPLOAD_PRESET` | For photo uploads |
| `TMDB_ACCESS_TOKEN` | Optional |
| `METERED_TURN_DOMAIN`, `METERED_TURN_API_KEY` | Optional |

A missing optional secret just switches that feature off (you will see a
warning in the deploy log).

---

## 9. Deploying to GitHub Pages

### Step by step: your first deploy

**GitHub Actions** is GitHub's built-in automation. The file
`.github/workflows/deploy.yml` tells it to build and publish your site every
time you push to `main`, so you never upload files by hand.

1. **Create the repository.** On GitHub choose **New repository**, give it a
   name, and leave it empty (no README, no `.gitignore`, no license — this
   project already has them).
2. **Push the project.** In the project folder:
   ```bash
   git init
   git add .
   git commit -m "First commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. **Turn on GitHub Pages.** In the repo go to **Settings → Pages**. Under
   **Build and deployment → Source** choose **GitHub Actions**.
   *This step is required — without it nothing is published.*
4. **(Optional) add your secrets.** Go to **Settings → Secrets and variables →
   Actions → New repository secret** and add the Firebase, Cloudinary, TMDB or
   TURN values you want. Skip this to try the site without live features.
5. **Run the workflow.** Open the **Actions** tab, pick **Deploy to GitHub
   Pages**, and press **Run workflow**. (The very first push also starts it, but
   that run fails if you had not done step 3 yet — just re-run it.) A green
   check means it worked.
6. **Open your site** at `https://<username>.github.io/<repo>/`. The link is
   also shown in **Settings → Pages**.

From now on every push to `main` redeploys automatically. A change to a secret
only takes effect on the next run, so press **Run workflow** after editing one.

**If something goes wrong:** open the failed run in the **Actions** tab and
click the red step to read the log. "Get Pages site failed" or "Not Found"
means step 3 was skipped. A 404 right after a green run usually clears in a
minute or two.

The workflow copies only the site files (not docs or backend code), injects
your secrets, stamps the offline cache with the commit id, and publishes to
GitHub Pages.

### The offline cache (PWA)

The site can be installed as an app, and `service-worker.js` caches the code
so it opens instantly and works offline. **You do not have to do anything to
keep it fresh:** every deploy gets a new cache name automatically, so installed
copies pick up the update on their next open (close the app fully and reopen,
or refresh once).

When testing locally, the service worker can serve stale files. In Chrome open
DevTools → **Application → Service Workers** and tick **Update on reload**.
Content added through the site (day cards, bucket items, uploads…) is never
cached this way — it always loads live.

If you add a new code file, also add it to `CORE_ASSETS` in
`service-worker.js` so it works offline.

---

## 10. "While you were away" notifications

When you open the site and shared content changed while you were gone, a
longer-lived notification summarizes it. A change is only reported for **24
hours**; older ones are ignored. Tracking is per browser and needs no push
service or extra Firebase setup. Ordinary action toasts ("Added!") are separate.

---

## 11. Local testing

Never open `index.html` by double-clicking (`file://`): YouTube and other
features break. Use a tiny server:

```bash
cd path/to/couple-website-template
python3 -m http.server 8000
```

Then open <http://localhost:8000>, or use VS Code's **Live Server**. Locally
the service keys are placeholders, so shared features run in local-only mode.

---

## 12. Changing the colors

Colors, fonts and roundness are CSS variables at the top of
**`css/modern.css`** (section "1. DESIGN TOKENS"). Change them once and the whole
site follows. There are two blocks:

- `:root { … }` — light mode
- `html[data-theme="dark"] { … }` — dark mode

| Variable | Controls |
|---|---|
| `--cream` | Page background |
| `--surface` | Cards |
| `--ink`, `--ink-soft`, `--ink-faint` | Text, from strongest to lightest |
| `--green`, `--green-deep` | The main accent (buttons, highlights) and its text-on-tint shade |
| `--sage`, `--sage-dim` | Accent tints |
| `--blush`, `--blush-soft`, `--rose` | Pink accents |
| `--gold`, `--amber`, `--plum` | Secondary accents |
| `--line` | Borders and dividers |
| `--danger` | Delete / error red |
| `--radius-lg`, `--radius-md`, `--radius-sm` | How round panels, cards and controls are |

```css
:root {
  --green: #1a7f54;       /* try #d63384 for a pink theme */
  --green-deep: #0f5c3b;
}
```

Pick a nearby darker shade for `--green-deep`, and adjust the dark-mode block
too so it stays readable. `css/style.css` still declares the original palette,
but `modern.css` loads last and overrides it, so edit `modern.css`.

---

## 13. The bouquet

The **Bouquet** tab lets either of you send the other flowers.

1. Open **Build a bouquet** on the Bouquet tab.
2. Choose a wrap (kraft, white, black, pink or newspaper).
3. Add flowers and bows from the palette — as many as you like.
4. Tap an item on the page to select it. The toolbar makes it smaller or
   bigger, rotates it, sends it to the back or front, or tucks it behind the
   wrap. Drag to move it.
5. Add an optional note (up to 200 characters), choose who it is from, and
   tap **Create this bouquet**.

The bouquet then:

- shows on the tab and in the **Today** widget on the home page with a
  freshness badge;
- stays fresh for **one week**, then wilts and deletes itself;
- is **replaced** as soon as a new one is made (only one exists at a time);
- can be saved as a **PNG**, with or without the notebook page.

Data is stored in the `bouquets` Firestore collection (flower ids and
positions, not images), so make sure your Firebase rules include it — see
[`firebase-setup.md`](firebase-setup.md).

**Adding your own flower:** save a transparent PNG in `assets/stickers/`
(`flower-my-flower.png`) and add one line to `BOUQUET_FLOWERS` in `js/app.js`:

```javascript
{ id: "my-flower", label: "My Flower", src: "assets/stickers/flower-my-flower.png" },
```

Wraps (`BOUQUET_WRAPS`) and bows (`BOUQUET_BOWS`) work the same way. Keep the
`id` values stable once bouquets have been sent.

---

## 14. Adding things to the site

| Goal | Where |
|---|---|
| A quiz question | `js/data/quizzes.js` |
| Game cards | Append to the deck in `js/data/games.js` |
| A daily quote | `js/data/quotes.js` |
| A whole new tab | Advanced: markup in `index.html`, behaviour in `js/app.js`, styles in `css`, and a Firestore rule if it stores data |

For how the pieces fit together, see [`architecture.md`](architecture.md).

---

## 15. Troubleshooting

**Yellow "Not synced" pill / nothing syncs**

- Check the Firebase secrets exist and the latest deploy is green.
- Open the live site, press F12, and look for Firebase errors in the Console.
- Confirm the Firestore rules include every collection ([`firebase-setup.md`](firebase-setup.md)).

**Deploy fails with "secret … is missing"**

- Add the named secret under **Settings → Secrets and variables → Actions**.

**Photos upload but the other person can't see them**

- Cloudinary worked, but the Firestore `memories` metadata didn't sync. Check the rules.

**Bouquet doesn't send or appear**

- Check that `bouquets` is in your Firestore rules.

**Photo Booth: cameras on but never connect**

- Rules need the nested `callerCandidates` / `calleeCandidates` blocks.
- On different networks, set up [`turn-setup.md`](turn-setup.md).

**YouTube player is blank**

- Don't open via `file://`; some videos disallow embedding.

**A sticker doesn't show**

- The path in `photoBoothStickers` must match the file name exactly.

**Site looks broken after an edit**

- Look for leftover git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
- Check the browser Console for the first red error.

**Deployed, but the old version still shows**

- Fully close and reopen the installed app, or refresh once in a browser tab.

---

## 16. CONFIG reference

| Section | Controls |
|---|---|
| `names` | Your names |
| `hero` | Welcome text |
| `relationshipStart` | "Together since" counter |
| `reunionDate` | Countdown target |
| `partnerALocation` / `partnerBLocation` | Cities, weather, local time |
| `photos` | Hero and final photos |
| `photoBoothStickers` | Sticker files for the strip editor |
| `thingsIMiss`, `youMadeMeBetter`, `littleThings` | Story lists |
| `album` | Static photo categories |
| `favorites`, `funFacts`, `firsts` | The Us tab |
| `openWhen` | Open-when letters |
| `bucketList`, `movieList` | Starter items |
| `playlists` | Music categories and songs |
| `tmdb` | Movie search token (injected at deploy) |
| `firebase`, `cloudinary`, `meteredTurn` | Service settings (injected at deploy) |
| `newsBackendUrl` | Optional Cloudflare Worker for news |

---

**You are not building a website from scratch** — you are personalizing one that
already works. Change a little, refresh, and see the result.
