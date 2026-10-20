# Firebase setup

Firebase (Firestore) is what makes the site *shared*: both of you see the same
Bucket List, Movies, Music, Memories, Calendar, Day Cards, moods and Bouquet,
live. The Photo Booth also uses it briefly to connect your two cameras.

> ⚠️ **Treat the site link as public.** The site has no login, and the security
> rules in [step 5](#5-security-rules) let anyone who has the link and your
> Firebase project read and change the shared data. Don't store anything private
> in it (addresses, health details, passwords, private photos), and don't share
> the link widely. See [`SECURITY.md`](../SECURITY.md).

Everything here is on the free **Spark** plan. Without Firebase the site still
works, but each device only sees its own changes and the sync pill on shared
tabs shows **Not synced**.

**Contents:** [1. Create the project](#1-create-the-project) ·
[2. Enable Firestore](#2-enable-firestore) ·
[3. Register the web app](#3-register-the-web-app) ·
[4. Give the site your config](#4-give-the-site-your-config) ·
[5. Security rules](#5-security-rules) · [6. Test it](#6-test-it) ·
[7. Troubleshooting](#7-troubleshooting) · [8. Checking the data](#8-checking-the-data)

---

## What lives in Firestore

| Collection | Used by |
|---|---|
| `bucketlist` | Bucket List items |
| `movies` | Movie Nights (watchlist, watched, ratings) |
| `musicsongs` | Music playlists |
| `memories` | Our Memories (caption, date, Cloudinary URL) |
| `albums` | Custom album names |
| `calendar` | Shared calendar events |
| `daycards` | Day Cards (expire after 24 h unless saved) |
| `moods` | Daily moods in the Today widget |
| `bouquets` | The current bouquet (one live document, wilts after a week) |
| `photoboothCalls` | Photo Booth handshake, with sub-collections `callerCandidates` and `calleeCandidates` |

No camera video is ever sent to or stored in Firestore. Photos themselves live
on Cloudinary; Firestore only keeps their URLs. The "While you were away"
notifications need no collection — the browser tracks them itself.

---

## 1. Create the project

1. Open <https://console.firebase.google.com> and sign in with a Google account.
2. **Create a project** (or open an existing one). Analytics is not needed.

## 2. Enable Firestore

1. Left menu: **Build → Firestore Database → Create database**.
2. Choose a location close to you (it cannot be changed later).
3. Start in **production mode**; you will replace the rules in step 5.

## 3. Register the web app

1. **Project settings** (gear icon) → **General** → **Your apps** → **Web** (`</>`).
2. Give it a nickname. Skip Firebase Hosting.
3. Copy the `firebaseConfig` values shown: `apiKey`, `authDomain`, `projectId`,
   `storageBucket`, `messagingSenderId`, `appId`.

## 4. Give the site your config

**For the deployed site (recommended):** add each value as a GitHub repository
secret under **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `FIREBASE_API_KEY` | `apiKey` |
| `FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `FIREBASE_PROJECT_ID` | `projectId` |
| `FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `FIREBASE_APP_ID` | `appId` |

The deploy workflow replaces the `__FIREBASE_*__` placeholders in
`js/data/config.js`. Push to `main` (or re-run the workflow).

**For local testing:** temporarily paste the values into `CONFIG.firebase` in
`js/data/config.js`. **Do not commit them.**

> **Is the API key secret?** No. A Firebase web API key only identifies your
> project; access is controlled by the security rules below. Keeping it in
> secrets is tidiness, not protection. See [`../SECURITY.md`](../SECURITY.md).

## 5. Security rules

**Firestore Database → Rules**, replace everything with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Shared features
    match /bucketlist/{docId}    { allow read, write: if true; }
    match /movies/{docId}        { allow read, write: if true; }
    match /musicsongs/{docId}    { allow read, write: if true; }
    match /memories/{docId}      { allow read, write: if true; }
    match /albums/{docId}        { allow read, write: if true; }
    match /calendar/{docId}      { allow read, write: if true; }
    match /daycards/{docId}      { allow read, write: if true; }
    match /moods/{docId}         { allow read, write: if true; }
    match /bouquets/{docId}      { allow read, write: if true; }

    // Photo Booth handshake. Sub-collections need their own rules.
    match /photoboothCalls/{callId} {
      allow read, write: if true;

      match /callerCandidates/{candId} { allow read, write: if true; }
      match /calleeCandidates/{candId} { allow read, write: if true; }
    }

    // Everything else is blocked.
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click **Publish**.

**Why `if true`?** The site has no user accounts, so there is nothing to scope
access to. Only the collections listed above are open, and the data is
low-sensitivity (to-do items, captions, song titles). If you ever store
anything more private, add real authentication and tighten these rules.

> **Classic mistake: cameras turn on but never connect.** Firestore rules are
> *not* inherited by sub-collections. If `photoboothCalls` has no nested
> `callerCandidates` / `calleeCandidates` blocks, the offer/answer syncs (so it
> looks fine) but every connection candidate is silently rejected, and each of
> you only sees your own camera. A `permission-denied` message in the Photo
> Booth status almost always means this.

**Indexes:** the site only uses simple ordering on a single field, so you do
not need to create indexes. If Firestore ever offers a *Create index* link
after a `FAILED_PRECONDITION` error, use that link; do not create indexes
speculatively.

## 6. Test it

1. Serve the site (`python3 -m http.server 8000`) or open the deployed URL.
   Do **not** open `index.html` via `file://`.
2. Open the site on two devices, or in two browsers.
3. **Bucket List:** add an item; it should appear on the other device within
   a second or two, and the sync pill should say it is live.
4. **Music, Calendar, Day Cards, Bouquet:** do the same.
5. **Photo Booth:** open the tab on both; the second person should see the
   first person's camera. (Different networks may also need
   [`turn-setup.md`](turn-setup.md).)

## 7. Troubleshooting

**The pill stays on "Not synced".** Check that all six values are present and
correct, that the secrets deployed (Actions run is green and you hard-refreshed
or reopened the installed app), and that `CONFIG.firebase` has no missing
comma, quote or brace.

**"Missing or insufficient permissions".** The rules are missing or were not
published, or a collection is not in the list above. Compare with step 5.

**One feature syncs but another does not.** That collection's `match` block is
missing from the rules.

**Data disappears after a refresh.** It was saved locally only; Firebase is not
connected. Fix the config and check the pill.

**Works on desktop but not on the phone.** The phone is probably showing an
old cached copy of the app. Close and reopen it (or clear the site's data). The
deploy stamps a new cache version on every push, so a normal reopen after the
new deploy finishes should update it.

## 8. Checking the data

In the Firebase Console: **Firestore Database → Data**. You should see the
collections from the table above, created as you use each feature. You can
edit or delete documents there if you ever need to clean something up.
