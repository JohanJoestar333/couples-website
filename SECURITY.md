# Security Policy

This repository is a small, non-commercial template for a private website
for two people — not a distributed piece of software. Because of that, this
policy is intentionally simple: it explains what data the site touches and
the trade-offs already made on purpose.

## Supported versions

There are no separate maintained versions or release branches — `main` is
the only version, and it's what's deployed live via GitHub Pages. Security
fixes (if any are ever needed) would go straight into `main`.

## What data this project handles

- **Bucket list items** (text + a done/not-done flag), **a shared movie
  watchlist/watched list** (title, year, TMDB poster path, and each
  partner's star rating), **shared music playlist entries** (song title,
  artist, YouTube video ID, and a short note), and **shared photo
  memories** (a caption, an optional date, and a link to the photo) are
  stored in a Firebase Firestore database so they sync across devices.
  The same database holds the shared calendar (`calendar`), day cards
  (`daycards`), daily moods (`moods`), custom album names (`albums`), the
  weekly bouquet (`bouquets`: which flowers, their positions, and a note).
- **Uploaded photos themselves are hosted on Cloudinary** (a free
  third-party image host), not Firebase — only the resulting photo URL
  is stored in Firestore. Photos are resized/compressed in the browser
  before upload.
- **No user accounts or authentication records** are collected. The site has
  no login and no password screen.
- Weather and moon-phase data are fetched from public, keyless APIs
  (Open-Meteo) at view time and are not stored.

## Known, intentional limitations

This section exists so nobody "discovers" these as if they were surprises —
they're accepted trade-offs for a small personal project, documented here
on purpose:

- **There is no login: anyone with the link can open the site.** Don't keep
  sensitive information on it. If you want to restrict access, use your
  hosting provider's access control (for example a private site or an
  access-protected deployment) rather than relying on a hidden link.
- **The Firebase config (including the API key) is public in this repo,
  and so is the TMDB API key used for movie search.** This is normal and
  expected for client-side apps like this one — neither key alone grants
  write access to anything or costs money to use. Actual access control
  for the database is enforced by **Firestore security rules**,
  configured separately in the Firebase console (not in this repo); the
  TMDB key is read-only search access to public movie data.
- **Firestore rules are intentionally permissive** for the collections
  listed in `docs/firebase-setup.md`, since the site has
  no login system to scope access to. The Photo Booth signaling collections
  are also intentionally open enough for the two-browser WebRTC handshake
  to work. This means anyone who obtained the
  Firebase config could technically read or write to those collections.
  Given the low sensitivity of the data (to-do items, movie ratings, song
  lists, photo captions/links, calendar entries, short notes and
  bouquets), this is an
  accepted trade-off rather than an oversight. Every other path in the
  database is denied by default via an explicit catch-all rule.
- **The Photo Booth does not store live camera video in Firebase.** Firebase
  is used for WebRTC signaling documents; the actual media connection is
  browser-to-browser when possible, or uses the configured TURN relay when
  necessary. Photo Booth strips are assembled and downloaded on the
  device; they are not uploaded anywhere.
- **The Cloudinary upload preset is public and unsigned by design.** This
  means anyone with the preset name could technically upload arbitrary
  images to the associated Cloudinary account, though they could not read,
  edit, or delete anything already there. This is the standard, intended
  way Cloudinary supports uploads from client-side code with no backend.

If any of these assumptions stop being acceptable (e.g. more sensitive
data is added to the database later), the fix is to tighten the Firestore
rules and/or add real authentication — not to treat the current setup as
broken.

## Reporting a vulnerability or concern

If you notice something that seems like a genuine problem beyond what's
already listed above (for example, a way to access data outside the
collections documented in `docs/firebase-setup.md`, or a way to break
the site for other visitors), please open an issue on this repository
rather than exploiting or publicly disclosing it first.

Since this is a low-traffic hobby template, please allow a reasonable
amount of time for a response — this isn't a maintained product with an
on-call security team behind it.
