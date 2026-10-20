/**
 * Optional local Node server (same API as the Worker).
 * Run: node server-node.mjs
 * Then set CONFIG.newsBackendUrl = "http://localhost:8787"
 */
import http from "node:http";

const FEEDS = {
  en: { url: "https://feeds.bbci.co.uk/news/world/rss.xml", label: "BBC World" },
};
const cache = new Map();
const CACHE_MS = 6 * 60 * 60 * 1000;

function textBetween(xml, tag) {
  const re = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</${tag}>`,
    "i",
  );
  const m = xml.match(re);
  return m ? (m[1] || m[2] || "").replace(/\s+/g, " ").trim() : "";
}

function parseRss(xml, limit = 5) {
  const items = [];
  for (const block of xml.split(/<item[\s>]/i).slice(1)) {
    if (items.length >= limit) break;
    const chunk = block.split(/<\/item>/i)[0] || "";
    const title = textBetween(chunk, "title");
    const link = textBetween(chunk, "link") || textBetween(chunk, "guid");
    const pub = textBetween(chunk, "pubDate");
    if (title) items.push({ title, link, pub });
  }
  return items;
}

async function getNews() {
  const key = "en";
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;
  const conf = FEEDS[key];
  const res = await fetch(conf.url, {
    headers: { "User-Agent": "couple-site-news-node/1.0" },
  });
  if (!res.ok) throw new Error("Feed HTTP " + res.status);
  const xml = await res.text();
  const data = {
    lang: key,
    source: conf.label,
    updatedAt: new Date().toISOString(),
    items: parseRss(xml),
  };
  cache.set(key, { at: Date.now(), data });
  return data;
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  const u = new URL(req.url, "http://localhost");
  if (u.pathname === "/health") {
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  try {
    const data = await getNews();
    res.end(JSON.stringify(data));
  } catch (e) {
    res.writeHead(502);
    res.end(JSON.stringify({ error: String(e.message || e) }));
  }
});

server.listen(8787, () =>
  console.log("News backend on http://localhost:8787/"),
);
