# News backend (Cloudflare Worker)

A small backend for the site's **Today → World news** widget.

- Reads the BBC RSS feed (English only)
- Returns clean JSON
- Edge cache of about 6 hours
- **Free** on Cloudflare's free plan
- **No API key**

## 1. Create an account
1. Go to https://dash.cloudflare.com and sign up (free)
2. In a terminal on your computer:

```bash
npm i -g wrangler
wrangler login
```

## 2. Deploy

```bash
cd news-backend
wrangler deploy
```

When it finishes, you'll see a URL like:

```text
https://couple-news.<your-user>.workers.dev
```

## 3. Connect it to the site

In `js/data/config.js`, inside `CONFIG`:

```js
newsBackendUrl: "https://couple-news.YOUR_USER.workers.dev",
```

(no trailing slash)

## 4. Test it

Open these in your browser:

```text
https://couple-news.YOUR_USER.workers.dev/
https://couple-news.YOUR_USER.workers.dev/health
```

You should see JSON with `items: [{ title, link, pub }, ...]`.

## Endpoints

| Method | URL | Response |
|--------|-----|----------|
| GET | `/` | World headlines (BBC World, English) |
| GET | `/health` | `{ ok: true }` |

## Notes
- The site also keeps a **local cache** (localStorage), so even if Today is opened many times it makes very few requests.
- This is not CNN10 (copyright); it's an automatic brief of general headlines.
- If the Worker is offline, the site falls back to the old proxies.
- After changing the Worker code, run `wrangler deploy` again so the live version matches (for example, to drop the old Portuguese feed).
