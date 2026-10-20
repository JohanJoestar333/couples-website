# TURN Relay Setup — Photo Booth across different networks

This guide explains how to fix the Photo Booth so it works when you and your
partner are on **different networks** (e.g. one of you on home wifi, the
other on mobile data, or in different cities).

## Why this is needed

- **On the same wifi**, the Photo Booth's live video call connects directly
  between your two devices — no relay server needed.
- **On different networks**, WebRTC (the video-call tech the booth uses)
  almost always needs a **TURN relay server** to get through routers/
  firewalls. Without one, the call gets stuck and you see:

  > Partner disconnected or the connection failed. Waiting to reconnect…

- This site used to rely on a **shared public TURN server**
  (`openrelay.metered.ca`) that anyone on the internet could use for free
  with no signup. That shared server has become unreliable over time — it's
  a free community resource, not something dedicated to this site — which is
  the reason the booth stopped connecting across networks.
- The fix is to get your **own free TURN credentials**. It takes about 5
  minutes, needs no credit card, and once it's set up, cross-network calls
  should work reliably again.

---

## 1. Create a free Metered account

1. Go to **<https://dashboard.metered.ca/signup>** and sign up (email + password,
   or Google login).
2. Once logged in, click **"Add Application"**.
3. Give it any name you like (e.g. "photobooth") and confirm.

## 2. Create a TURN credential and copy its credential API key

Open the application you just created and go to its **TURN Server / TURN Credentials** section.

Create a TURN credential (you can give it a label such as `photobooth`). Then copy:

- **App Domain** — looks like `photobooth123.metered.live`
- **TURN Credential API Key** — use **Show API Key** next to the TURN credential

**Important:** do **not** use the account-level **Secret Key** from **Dashboard → Developers** for the browser site's `METERED_TURN_API_KEY`.

Metered's `/api/v1/turn/credentials` endpoint specifically expects the API key generated for the TURN credential. Metered documents this credential API key as credential-scoped and safe to use in frontend code; the account Secret Key is server-side only.

## 3. Add them to the site

**If you're running the site locally or editing files directly:**

Open `js/data/config.js` and find this block (search for `meteredTurn`):

```js
meteredTurn: {
  domain: "__METERED_TURN_DOMAIN__",
  apiKey: "__METERED_TURN_API_KEY__",
},
```

Replace the two placeholder strings with what you copied:

```js
meteredTurn: {
  domain: "photobooth123.metered.live",
  apiKey: "your-turn-credential-api-key-here",
},
```

Save the file and deploy the site as usual (or just refresh, if you're
running it locally).

**If you're deploying with the included GitHub Action** (the same way the
Firebase/Cloudinary/TMDB values are handled): go to your repo's
**Settings → Secrets and variables → Actions** and add two repository
secrets:

- `METERED_TURN_DOMAIN` — e.g. `photobooth123.metered.live`
- `METERED_TURN_API_KEY` — the **TURN Credential API Key** you copied with **Show API Key**

The deploy workflow will inject them into the published `config.js` automatically on the
next push to `main`. This is optional — if you skip it, the placeholders
stay in place and the booth just keeps working same-wifi-only until you add
the secrets.

## 4. Wait briefly, then test it

New Metered TURN credentials can take up to about **2 minutes** to propagate. After creating one, wait a couple of minutes before testing.

- Ask your partner to open the Photo Booth from a **different network**
  than you (e.g. turn off their wifi and use mobile data).
- Start a booth session. It should connect within a few seconds instead of
  showing the black screen.

If it still doesn't connect after a minute or two, double-check the domain
and key were pasted correctly (no extra spaces/quotes), and see
`SECURITY.md` for how this key is used (it's safe to have in the public
repo, the same way the Firebase and TMDB keys already are — it can only be
used to relay WebRTC traffic, not to access any of your data).

Metered's free plan includes a generous monthly data allowance, more than
enough for occasional photo booth calls between two people.
