# Setting up photo uploads for "Our Memories"

The "Our Memories" section on the Album tab lets either of you upload a
photo directly from the live site — no GitHub needed. It works right away
in "local-only" mode (uploads only stay on your device), but to make
photos actually upload and sync between both of you, you need a free
Cloudinary account. Takes about 5 minutes, no credit card required.

## Why Cloudinary instead of Firebase?

Firebase Storage (Firebase's own image-hosting feature) now requires the
paid "Blaze" plan even for tiny personal projects — a change Google made
a while back. Cloudinary's free tier (25 GB storage, 25 GB bandwidth a
month) is more than enough for a personal site like this and needs no
billing information at all.

Firestore still handles the *text* side of things as normal (caption,
date, and the photo's URL) — only the actual image bytes go to
Cloudinary instead.

## 1. Create a free Cloudinary account

1. Go to **<https://cloudinary.com>** and sign up (no credit card needed).
2. Once logged in, your **Dashboard** shows a "Cloud name" near the top —
   copy that, you'll need it in a moment.

## 2. Create an "unsigned" upload preset

This is the part that lets your website upload photos directly from the
browser, with no backend server and no secret key involved.

1. In the Cloudinary dashboard, click the gear icon (Settings) →
   **Upload** tab.
2. Scroll to **"Upload presets"** → click **"Add upload preset"**.
3. Set **Signing Mode** to **"Unsigned"** — this is the key setting.
4. (Optional but recommended) Under "Upload Manipulations", you can cap
   the max file size or restrict formats if you want extra guardrails,
   though the site already compresses images before sending them.
5. Save. Copy the **preset name** it gives you (or the custom name you
   set).

## 3. Add both values to the site

Open `js/data/config.js`, find `CONFIG.cloudinary`, and replace the
placeholders:

```javascript
cloudinary: {
  cloudName: "YOUR_CLOUD_NAME",
  uploadPreset: "YOUR_UPLOAD_PRESET"
},
```

with your actual values, e.g.:

```javascript
cloudinary: {
  cloudName: "dxy1a2bcd",
  uploadPreset: "our_website_unsigned"
},
```

Save, commit and push. (The deploy workflow can also inject them from the
`CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` repository secrets, if
you prefer to keep them out of the file.)

## A note on these two values being public

Unlike the Firebase config values, **these two don't need to be hidden**. An unsigned upload preset is
specifically designed by Cloudinary to be safe sitting in plain,
public, client-side code — anyone can only *upload* through it (subject
to whatever limits you set on the preset), not read, edit, or delete
anything in your account.

## Testing it

1. Open your live site → Album tab → scroll to "Our Memories".
2. You should see a green **"🟢 Synced"** pill once Cloudinary and
   Firebase are both configured. If it still says yellow
   **"Not synced yet"**, double-check your Firebase setup from
   `FIREBASE_SETUP.md` — that part is separate from Cloudinary.
3. Pick a photo, add a caption, click **"Add Memory ♥"**. It should
   upload, show a toast notification, and appear in the grid within a
   few seconds — and show up on the other person's device too.

## Troubleshooting

- **"Couldn't upload. Try again."** — Usually means the cloud name or
  preset name has a typo, or the preset isn't actually set to
  "Unsigned". Double check both in Cloudinary's dashboard.
- **Photos upload but never show for the other person** — that's a
  Firebase/Firestore sync issue, not a Cloudinary one. Confirm the
  "🟢 Synced" pill is showing, and that your Firestore rules (in the
  Firebase console) still allow read/write on the `memories` collection.
- **Uploads feel slow** — that's expected on a slow connection for the
  first upload of a large photo; the app resizes/compresses it in your
  browser first (down to 1600px on the long edge), which usually keeps
  uploads under a couple of seconds on normal wifi.
