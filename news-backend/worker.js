/**
 * Couple-site news backend — Cloudflare Worker
 * ------------------------------------------------
 * GET /
 * Returns: { lang, source, updatedAt, items: [{ title, link, pub }] }
 *
 * Deploy: see README.md
 * Free, no API key. Caches responses ~6 hours at the edge.
 */

const FEEDS = {
  en: {
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    label: "BBC World",
  },
};

const CACHE_SECONDS = 6 * 60 * 60; // 6 hours
const MAX_ITEMS = 5;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": `public, max-age=${CACHE_SECONDS}`,
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(),
  });
}

function parseRss(xml, limit) {
  const items = [];
  // Minimal RSS parse without DOM (Workers have HTMLRewriter but regex is fine for item blocks)
  const blocks = xml.split(/<item[\s>]/i).slice(1);
  for (const block of blocks) {
    if (items.length >= limit) break;
    const chunk = block.split(/<\/item>/i)[0] || "";
    const title = textBetween(chunk, "title");
    const link =
      textBetween(chunk, "link") || textBetween(chunk, "guid") || "";
    const pub = textBetween(chunk, "pubDate") || "";
    if (title) items.push({ title, link, pub });
  }
  return items;
}

function textBetween(xml, tag) {
  // Handles <title>...</title> and <title><![CDATA[...]]></title>
  const re = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</${tag}>`,
    "i",
  );
  const m = xml.match(re);
  if (!m) return "";
  return (m[1] || m[2] || "").replace(/\s+/g, " ").trim();
}

async function fetchFeed(lang) {
  const conf = FEEDS[lang] || FEEDS.en;
  const res = await fetch(conf.url, {
    headers: {
      "User-Agent": "couple-site-news-worker/1.0",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });
  if (!res.ok) throw new Error("Feed HTTP " + res.status);
  const xml = await res.text();
  const items = parseRss(xml, MAX_ITEMS);
  return {
    lang: FEEDS[lang] ? lang : "en",
    source: conf.label,
    updatedAt: new Date().toISOString(),
    items,
  };
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405);
    }

    const url = new URL(request.url);
    // Health check
    if (url.pathname === "/health") {
      return json({ ok: true });
    }

    const lang = "en";

    // Edge cache by full URL 
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    const hit = await cache.match(cacheKey);
    if (hit) return hit;

    try {
      const payload = await fetchFeed(lang);
      if (!payload.items.length) {
        return json({ error: "No headlines", ...payload }, 502);
      }
      const response = json(payload);
      // Store in edge cache (non-blocking)
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (err) {
      return json(
        {
          error: "Failed to fetch news",
          detail: String(err && err.message ? err.message : err),
        },
        502,
      );
    }
  },
};
