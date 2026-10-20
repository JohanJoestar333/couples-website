/*!
 * Photo Booth Studio — the strip editor for the Photo Booth tab.
 *
 * Loaded after app.js. app.js exposes window.PBStudioBridge (the captured
 * shots, solo/duo flag, translation helper); this file owns everything that
 * happens once the shots are taken: layout, filters, dot art, spot windows,
 * stickers, text, backdrop, and exporting PNG / GIF / video.
 *
 * Coordinates: everything is stored in "logical units" (LU) — the strip is
 * 336 LU wide — and only turned into pixels at render time, so the preview
 * and the 1080×1920 export always agree.
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     constants
  ------------------------------------------------------------------ */
  var PAD = 18; // padding around the frames inside the strip
  var FRAME_W = 300; // width of one photo frame
  var GUTTER = 12; // gap between frames when "Gutters" is on
  var CUT_GAP = 30; // extra space between pieces when the strip is snipped
  var POLAROID_EXTRA = 14; // taller bottom band in polaroid mode
  var BACKDROP_W = 1080;
  var BACKDROP_H = 1920;
  var HIST_MAX = 60;
  var EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

  function bridge() {
    return window.PBStudioBridge || {};
  }

  /* ------------------------------------------------------------------
     small helpers
  ------------------------------------------------------------------ */
  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function hexToRgb(hex) {
    var c = String(hex || "#000000").replace("#", "");
    if (c.length === 3) c = c.split("").map(function (x) { return x + x; }).join("");
    var n = parseInt(c, 16) || 0;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(function (v) {
      v = clamp(Math.round(v), 0, 255);
      return (v < 16 ? "0" : "") + v.toString(16);
    }).join("");
  }
  // amt < 0 darkens, amt > 0 lightens (mixes toward white)
  function shade(hex, amt) {
    var c = hexToRgb(hex);
    if (amt < 0) return rgbToHex(c[0] * (1 + amt), c[1] * (1 + amt), c[2] * (1 + amt));
    return rgbToHex(c[0] + (255 - c[0]) * amt, c[1] + (255 - c[1]) * amt, c[2] + (255 - c[2]) * amt);
  }
  function luminance(hex) {
    var c = hexToRgb(hex);
    return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
  }
  function rgba(hex, a) {
    var c = hexToRgb(hex);
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  }
  function seeded(seed) {
    var s = seed | 0;
    return function () {
      s = (s + 0x6d2b79f5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var _uid = 0;
  function uid() {
    return "o" + ++_uid + Math.floor(Math.random() * 1e4).toString(36);
  }
  function newCanvas(w, h) {
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w));
    c.height = Math.max(1, Math.round(h));
    return c;
  }

  // Tiny DOM builder: h("div", {class:"x", onclick:fn}, child, "text", [more])
  function h(tag, props) {
    var node = document.createElement(tag);
    if (props) {
      for (var k in props) {
        var v = props[k];
        if (v == null || v === false) continue;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
        else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      }
    }
    for (var i = 2; i < arguments.length; i++) appendKid(node, arguments[i]);
    return node;
  }
  function appendKid(node, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { appendKid(node, x); });
    else node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  /* ------------------------------------------------------------------
     filters — pure pixel maths so previews, spots and exports always
     match (canvas ctx.filter is not available everywhere)
  ------------------------------------------------------------------ */
  var FILTERS = [
    { id: "normal", label: "Normal" },
    { id: "bw", label: "Mono", gray: 1, contrast: 1.05 },
    { id: "noir", label: "Noir", gray: 1, contrast: 1.4, bright: 0.94 },
    { id: "sepia", label: "Sepia", sepia: 0.75, contrast: 1.05, sat: 1.1 },
    { id: "vintage", label: "Vintage", sepia: 0.3, contrast: 0.9, bright: 1.05, sat: 0.85, fade: 0.05 },
    { id: "instant", label: "Instant", contrast: 0.94, sat: 0.92, fade: 0.09, tint: [10, 2, -8] },
    { id: "film", label: "Film", contrast: 1.12, sat: 1.15, fade: 0.03, tint: [8, 3, -10] },
    { id: "golden", label: "Golden hour", bright: 1.04, sat: 1.1, tint: [20, 8, -16] },
    { id: "icy", label: "Icy", bright: 1.02, sat: 0.95, tint: [-12, 0, 18] },
    { id: "rose", label: "Rosé", bright: 1.04, sat: 1.05, fade: 0.04, tint: [18, -6, 4] },
    { id: "mint", label: "Mint", bright: 1.03, fade: 0.03, tint: [-10, 10, 4] },
    { id: "vivid", label: "Vivid", sat: 1.6, contrast: 1.1 },
    { id: "dreamy", label: "Dreamy", bright: 1.1, contrast: 0.9, sat: 0.95, fade: 0.04, tint: [6, 0, 8] },
    { id: "cdcam", label: "CD cam", bright: 1.06, contrast: 0.92, sat: 0.9, fade: 0.06, tint: [-6, 6, 12] },
    { id: "lowlight", label: "Low light", bright: 0.82, contrast: 1.15, sat: 0.85, tint: [-8, -2, 14] },
    { id: "flash", label: "Flash", bright: 1.1, contrast: 1.25, sat: 0.92, tint: [4, 2, 0] },
    { id: "y2k", label: "Y2K", bright: 1.06, contrast: 1.05, sat: 1.35, tint: [6, -6, 14] },
    { id: "sunday", label: "Sunday film", contrast: 1.08, sat: 1.2, fade: 0.04, tint: [14, 6, -12] },
    { id: "faded", label: "Faded", bright: 1.05, contrast: 0.82, sat: 0.7, fade: 0.12 },
    { id: "peach", label: "Peach", bright: 1.06, sat: 1.05, fade: 0.05, tint: [16, 6, -2] },
    { id: "lavender", label: "Lavender haze", sat: 0.95, fade: 0.05, tint: [8, -4, 16] },
    { id: "midnight", label: "Midnight", gray: 0.7, bright: 0.9, contrast: 1.2, tint: [-6, 0, 18] },
    { id: "cyano", label: "Cyanotype", duo: [[8, 32, 58], [214, 238, 255]] },
    { id: "plum", label: "Plum duo", duo: [[38, 16, 58], [255, 205, 222]] },
    { id: "sun", label: "Sunburn duo", duo: [[58, 18, 24], [255, 224, 160]] }
  ];
  function filterById(id) {
    for (var i = 0; i < FILTERS.length; i++) if (FILTERS[i].id === id) return FILTERS[i];
    return FILTERS[0];
  }

  // data is an ImageData.data (Uint8ClampedArray → assignments clamp for free)
  function applyFilterPixels(data, f, k) {
    if (!f || f.id === "normal" || k <= 0) return;
    var gr = f.gray || 0, sp = f.sepia || 0;
    var sat = f.sat == null ? 1 : f.sat;
    var br = f.bright == null ? 1 : f.bright;
    var ct = f.contrast == null ? 1 : f.contrast;
    var fd = f.fade || 0, tn = f.tint, duo = f.duo;
    var d0 = duo && duo[0], d1 = duo && duo[1];
    for (var i = 0; i < data.length; i += 4) {
      var r = data[i], g = data[i + 1], b = data[i + 2];
      var R = r, G = g, B = b;
      if (duo) {
        var l = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
        l = clamp((l - 0.5) * 1.1 + 0.5, 0, 1);
        R = d0[0] + (d1[0] - d0[0]) * l;
        G = d0[1] + (d1[1] - d0[1]) * l;
        B = d0[2] + (d1[2] - d0[2]) * l;
      } else {
        if (gr) {
          var y = 0.299 * R + 0.587 * G + 0.114 * B;
          R += (y - R) * gr; G += (y - G) * gr; B += (y - B) * gr;
        }
        if (sp) {
          var sr = R * 0.393 + G * 0.769 + B * 0.189;
          var sg = R * 0.349 + G * 0.686 + B * 0.168;
          var sb = R * 0.272 + G * 0.534 + B * 0.131;
          R += (sr - R) * sp; G += (sg - G) * sp; B += (sb - B) * sp;
        }
        if (sat !== 1) {
          var y2 = 0.299 * R + 0.587 * G + 0.114 * B;
          R = y2 + (R - y2) * sat; G = y2 + (G - y2) * sat; B = y2 + (B - y2) * sat;
        }
        if (br !== 1) { R *= br; G *= br; B *= br; }
        if (ct !== 1) { R = (R - 128) * ct + 128; G = (G - 128) * ct + 128; B = (B - 128) * ct + 128; }
        if (fd) { R = R * (1 - fd) + 235 * fd; G = G * (1 - fd) + 235 * fd; B = B * (1 - fd) + 235 * fd; }
        if (tn) { R += tn[0]; G += tn[1]; B += tn[2]; }
      }
      if (k < 1) { R = r + (R - r) * k; G = g + (G - g) * k; B = b + (B - b) * k; }
      data[i] = R; data[i + 1] = G; data[i + 2] = B;
    }
  }

  function applyGrain(data, amount, seed) {
    var rand = seeded(seed);
    var a = amount * 70;
    for (var i = 0; i < data.length; i += 4) {
      var n = (rand() - 0.5) * a;
      data[i] += n; data[i + 1] += n; data[i + 2] += n;
    }
  }

  function paintVignette(ctx, w, h, amt) {
    var g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.32, w / 2, h / 2, Math.hypot(w, h) * 0.52);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0," + (amt * 0.78).toFixed(3) + ")");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  // Orange disposable-camera date, bottom-right of each photo.
  function paintStamp(ctx, w, h) {
    var d = new Date();
    var txt = "'" + String(d.getFullYear()).slice(2) + " " + (d.getMonth() + 1) + " " + d.getDate();
    var fs = Math.round(h * 0.075);
    ctx.save();
    ctx.font = "700 " + fs + "px 'Special Elite','Courier New',monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";
    ctx.shadowColor = "rgba(255,110,20,0.75)";
    ctx.shadowBlur = fs * 0.5;
    ctx.fillStyle = "#ff9a3c";
    ctx.fillText(txt, w - fs * 0.8, h - fs * 0.7);
    ctx.restore();
  }

  /* ------------------------------------------------------------------
     background patterns (drawn in LU; ctx is already scaled)
  ------------------------------------------------------------------ */
  var PATTERNS = [
    { id: "none", label: "Plain" },
    { id: "stripes", label: "Stripes" },
    { id: "checker", label: "Checkers" },
    { id: "gingham", label: "Gingham" },
    { id: "grid", label: "Grid" }
  ];

  function starPath(cx, cy, R, r, n, rot) {
    var p = [];
    for (var i = 0; i < n * 2; i++) {
      var a = (rot || 0) + (Math.PI * i) / n - Math.PI / 2;
      var rad = i % 2 ? r : R;
      p.push((i ? "L" : "M") + (cx + Math.cos(a) * rad).toFixed(2) + " " + (cy + Math.sin(a) * rad).toFixed(2));
    }
    return p.join(" ") + " Z";
  }
  function raysPath(cx, cy, r1, r2, n, rot) {
    var p = [];
    for (var i = 0; i < n; i++) {
      var a = (rot || 0) + (Math.PI * 2 * i) / n;
      p.push("M" + (cx + Math.cos(a) * r1).toFixed(2) + " " + (cy + Math.sin(a) * r1).toFixed(2) +
        " L" + (cx + Math.cos(a) * r2).toFixed(2) + " " + (cy + Math.sin(a) * r2).toFixed(2));
    }
    return p.join(" ");
  }
  function circlePath(cx, cy, r) {
    return "M" + (cx - r) + " " + cy + " A" + r + " " + r + " 0 1 0 " + (cx + r) + " " + cy +
      " A" + r + " " + r + " 0 1 0 " + (cx - r) + " " + cy + " Z";
  }
  var HEART_D = "M50 90 C18 66 5 48 5 31 C5 17 16 8 29 8 C39 8 46 13 50 21 C54 13 61 8 71 8 C84 8 95 17 95 31 C95 48 82 66 50 90 Z";
  var SPARK_D = "M50 0 C53 30 70 47 100 50 C70 53 53 70 50 100 C47 70 30 53 0 50 C30 47 47 30 50 0 Z";
  var HEART_P = null, SPARK_P = null;

  function fillHeart(ctx, cx, cy, size) {
    if (!HEART_P) HEART_P = new Path2D(HEART_D);
    ctx.save();
    ctx.translate(cx - size / 2, cy - size / 2 - size * 0.02);
    ctx.scale(size / 90, size / 90);
    ctx.translate(-5, -8);
    ctx.fill(HEART_P);
    ctx.restore();
  }
  function fillStar(ctx, cx, cy, R, r, rot) {
    var p = new Path2D(starPath(cx, cy, R, r, 5, rot));
    ctx.fill(p);
  }

  function paintPattern(ctx, id, color, w, h) {
    var x, y, rand, i;
    if (id === "stripes") {
      ctx.fillStyle = color;
      for (x = 0; x < w; x += 22) ctx.fillRect(x, 0, 9, h);
    } else if (id === "checker") {
      ctx.fillStyle = color;
      var cs = 22;
      for (y = 0; y * cs < h; y++) for (x = 0; x * cs < w; x++) if ((x + y) % 2 === 0) ctx.fillRect(x * cs, y * cs, cs, cs);
    } else if (id === "gingham") {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.28;
      for (x = 0; x < w; x += 36) ctx.fillRect(x, 0, 18, h);
      for (y = 0; y < h; y += 36) ctx.fillRect(0, y, w, 18);
      ctx.globalAlpha = 1;
    } else if (id === "grid") {
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (x = 0; x <= w; x += 20) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
      for (y = 0; y <= h; y += 20) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  /* ------------------------------------------------------------------
     dot art (halftone). Works on a finished photo layer.
  ------------------------------------------------------------------ */
  var DOT_SHAPES = [
    { id: "circle", label: "Dots" },
    { id: "heart", label: "Hearts" },
    { id: "star", label: "Stars" },
    { id: "square", label: "Squares" }
  ];

  function drawDot(ctx, shape, cx, cy, r) {
    if (r <= 0.15) return;
    if (shape === "square") ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    else if (shape === "heart") fillHeart(ctx, cx, cy, r * 2.3);
    else if (shape === "star") fillStar(ctx, cx, cy, r * 1.25, r * 0.55, 0);
    else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); }
  }

  function applyDotArt(cv, opts, S) {
    var w = cv.width, hgt = cv.height;
    var cell = Math.max(3, opts.size * S);
    var cols = Math.max(2, Math.ceil(w / cell)), rows = Math.max(2, Math.ceil(hgt / cell));
    var small = newCanvas(cols, rows);
    var sctx = small.getContext("2d");
    sctx.imageSmoothingEnabled = true;
    sctx.drawImage(cv, 0, 0, cols, rows);
    var px = sctx.getImageData(0, 0, cols, rows).data;

    var out = newCanvas(w, hgt);
    var octx = out.getContext("2d");
    var ink = opts.mode === "ink";
    octx.fillStyle = ink ? "#fbf7ef" : "#0e0e12";
    octx.fillRect(0, 0, w, hgt);
    if (ink) octx.fillStyle = opts.ink || "#2b2622";

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var off = r % 2 ? 0.5 : 0;
        var sc = Math.min(cols - 1, Math.floor(c + off));
        var i = (r * cols + sc) * 4;
        var R = px[i], G = px[i + 1], B = px[i + 2];
        var lum = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
        var rad;
        if (ink) {
          rad = cell * 0.62 * Math.sqrt(1 - lum) + 0.2;
        } else {
          rad = cell * 0.62 * (0.35 + 0.65 * Math.sqrt(lum));
          // push the colour a little so the dots read as "lit"
          var y = lum * 255;
          octx.fillStyle = "rgb(" + clamp(y + (R - y) * 1.25, 0, 255) + "," + clamp(y + (G - y) * 1.25, 0, 255) + "," + clamp(y + (B - y) * 1.25, 0, 255) + ")";
        }
        drawDot(octx, opts.shape, (c + off) * cell + cell / 2, r * cell + cell / 2, rad);
      }
    }
    var ctx = cv.getContext("2d");
    ctx.save();
    ctx.globalAlpha = clamp(opts.mix, 0, 1);
    ctx.drawImage(out, 0, 0);
    ctx.restore();
  }

  /* ------------------------------------------------------------------
     stickers — emoji, plus the images you add (uploaded in the editor or
     listed in CONFIG.photoBoothStickers)
  ------------------------------------------------------------------ */
  var STICKERS = [];
  var STICKER_CATS = [
    { id: "all", label: "All" },
    { id: "emoji", label: "Emoji" },
    { id: "mine", label: "My stickers" }
  ];

  function addSticker(id, cat, aspect, color, spec, tint) {
    var def = { id: id, cat: cat, aspect: aspect, color: color, tint: tint !== false };
    if (Array.isArray(spec)) def.shapes = spec;
    else def.fn = spec;
    STICKERS.push(def);
  }

  // ---- emoji ----
  ["💖", "✨", "🌸", "🎀", "🍒", "🦋", "🌈", "⭐", "🔥", "💌", "📸", "🎞️", "🧸", "🍓", "💫", "🎈", "🌙", "🍀", "🥂", "🍰", "🌹", "💋", "🐣", "🎧"].forEach(function (e, i) {
    addSticker("e" + i, "emoji", 1, "#ffffff", function (ctx, w) {
      ctx.font = w * 0.8 + "px " + EMOJI_FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(e, 0, w * 0.04);
    }, false);
  });

  var STICKER_INDEX = {};
  STICKERS.forEach(function (d) { STICKER_INDEX[d.id] = d; });

  // white copy of an uploaded sticker, used for the cut-out outline
  function silhouette(def) {
    if (def._sil) return def._sil;
    var im = def.img, c = newCanvas(im.width, im.height), x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    x.globalCompositeOperation = "source-in";
    x.fillStyle = "#ffffff";
    x.fillRect(0, 0, c.width, c.height);
    def._sil = c;
    return c;
  }
  function drawImageSticker(ctx, def, w, outline) {
    var hh = w / def.aspect, x = -w / 2, y = -hh / 2;
    if (outline) {
      var sil = silhouette(def), r = w * 0.03;
      for (var i = 0; i < 20; i++) {
        var a = (i / 20) * Math.PI * 2;
        ctx.drawImage(sil, x + Math.cos(a) * r, y + Math.sin(a) * r, w, hh);
      }
    }
    ctx.drawImage(def.img, x, y, w, hh);
  }

  // Draws sticker centred on the origin, `w` wide.
  function drawSticker(ctx, def, w, color, flip, outline) {
    ctx.save();
    if (flip) ctx.scale(-1, 1);
    color = color || def.color;
    if (def.img) {
      drawImageSticker(ctx, def, w, outline);
    } else {
      def.fn(ctx, w, w / def.aspect, color);
    }
    ctx.restore();
  }


  /* ---- stickers from the project's stickers/ folder ---- */
  function registerCustomSticker(rec) {
    return new Promise(function (res) {
      if (STICKER_INDEX[rec.id]) { res(STICKER_INDEX[rec.id]); return; }
      var im = new Image();
      im.onload = function () {
        var def = { id: rec.id, cat: "mine", aspect: im.width / im.height, color: "#ffffff", tint: false, custom: true, pack: !!rec.url, img: im };
        STICKERS.push(def);
        STICKER_INDEX[rec.id] = def;
        res(def);
      };
      im.onerror = function () { res(null); };
      im.src = rec.url;
    });
  }

  /* ------------------------------------------------------------------
     text objects
  ------------------------------------------------------------------ */
  var FONTS = [
    { id: "sans", label: "Clean", css: "Karla, 'Trebuchet MS', sans-serif", w: 800 },
    { id: "script", label: "Script", css: "'Dancing Script', cursive", w: 700 },
    { id: "hand", label: "Handwritten", css: "Caveat, 'Comic Sans MS', cursive", w: 700 },
    { id: "marker", label: "Marker", css: "'Permanent Marker', Impact, sans-serif", w: 400 },
    { id: "serif", label: "Serif", css: "'Cormorant Garamond', Georgia, serif", w: 600, style: "italic" },
    { id: "type", label: "Typewriter", css: "'Special Elite', 'Courier New', monospace", w: 400 },
    { id: "bubble", label: "Bubbly", css: "Pacifico, 'Brush Script MT', cursive", w: 400 },
    { id: "condensed", label: "Poster", css: "'Bebas Neue', Impact, sans-serif", w: 400 },
    { id: "retro", label: "Diner", css: "Lobster, 'Brush Script MT', cursive", w: 400 },
    { id: "pixel", label: "Pixel", css: "'Press Start 2P', 'Courier New', monospace", w: 400 }
  ];
  var FX = [
    { id: "none", label: "Plain" },
    { id: "shadow", label: "Shadow" },
    { id: "outline", label: "Outline" },
    { id: "sticker", label: "Cutout" },
    { id: "highlight", label: "Highlight" },
    { id: "neon", label: "Neon" },
    { id: "gradient", label: "Gradient" },
    { id: "retro", label: "Retro 3D" },
    { id: "glitch", label: "Glitch" },
    { id: "stamp", label: "Stamp" }
  ];
  var TEXT_COLORS = ["#ffffff", "#2b2622", "#ff5a7a", "#ff8fab", "#ffb627", "#ffe066", "#5fb760", "#3fb8af", "#5cc8ff", "#7a5bb0"];
  var TEXT_PRESETS = [
    { label: "Sweet", text: "sweet moments", font: "script", color: "#ffffff", fx: "shadow", size: 34 },
    { label: "Marker", text: "best day", font: "marker", color: "#ff5a7a", fx: "sticker", size: 34 },
    { label: "Date stamp", text: function () { var d = new Date(); return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear(); }, font: "type", color: "#2b2622", fx: "highlight", size: 24, hl: "#ffe066" },
    { label: "Neon", text: "love", font: "bubble", color: "#ff5fa2", fx: "neon", size: 40 },
    { label: "Cutout", text: "us", font: "sans", color: "#ff8fab", fx: "sticker", size: 46 },
    { label: "Elegant", text: "Forever", font: "serif", color: "#ffffff", fx: "shadow", size: 40 },
    { label: "Handwritten", text: "hi you", font: "hand", color: "#2b2622", fx: "none", size: 36 },
    { label: "Y2K", text: "2 cute", font: "pixel", color: "#ff5fa2", fx: "glitch", size: 22 },
    { label: "Poster", text: "BEST FRIENDS", font: "condensed", color: "#ffffff", fx: "retro", size: 36 },
    { label: "Diner", text: "diner date", font: "retro", color: "#ffb627", fx: "retro", size: 34 },
    { label: "Stamp", text: "MEMORY", font: "type", color: "#c1121f", fx: "stamp", size: 30 },
    { label: "Sunset", text: "golden hour", font: "script", color: "#ff7a45", fx: "gradient", size: 40 }
  ];
  function fontDef(id) {
    for (var i = 0; i < FONTS.length; i++) if (FONTS[i].id === id) return FONTS[i];
    return FONTS[0];
  }
  function fontCss(fontId, size) {
    var f = fontDef(fontId);
    return (f.style ? f.style + " " : "") + f.w + " " + size + "px " + f.css;
  }
  var _mctx = null;
  function mctx() {
    if (!_mctx) _mctx = newCanvas(4, 4).getContext("2d");
    return _mctx;
  }
  function textWidth(o) {
    var c = mctx();
    c.font = fontCss(o.font, o.size);
    return c.measureText(o.text || " ").width;
  }
  function textBox(o) {
    return { w: textWidth(o) + o.size * 0.5, h: o.size * 1.4 };
  }

  // Draws text centred on the origin. ctx is scaled by S (shadow blur is not).
  function drawText(ctx, o, S) {
    var size = o.size, txt = o.text || "";
    ctx.save();
    ctx.font = fontCss(o.font, size);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.miterLimit = 2;
    var col = o.color, y = size * 0.04;
    var contrast = luminance(col) > 0.6 ? "#2b2622" : "#ffffff";
    if (o.fx === "shadow") {
      ctx.shadowColor = "rgba(0,0,0,0.42)";
      ctx.shadowBlur = size * 0.14 * S;
      ctx.shadowOffsetY = size * 0.05 * S;
      ctx.fillStyle = col;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "outline") {
      ctx.strokeStyle = contrast;
      ctx.lineWidth = size * 0.16;
      ctx.strokeText(txt, 0, y);
      ctx.fillStyle = col;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "sticker") {
      ctx.shadowColor = "rgba(0,0,0,0.28)";
      ctx.shadowBlur = size * 0.1 * S;
      ctx.shadowOffsetY = size * 0.04 * S;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = size * 0.3;
      ctx.strokeText(txt, 0, y);
      ctx.shadowColor = "transparent";
      ctx.fillStyle = col;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "highlight") {
      var tw = textWidth(o);
      roundRectPath(ctx, -tw / 2 - size * 0.22, -size * 0.62, tw + size * 0.44, size * 1.24, size * 0.16);
      ctx.fillStyle = o.hl || col;
      ctx.fill();
      ctx.fillStyle = luminance(o.hl || col) > 0.6 ? "#2b2622" : "#ffffff";
      if (!o.hl) ctx.fillStyle = contrast;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "neon") {
      ctx.shadowColor = col;
      ctx.shadowBlur = size * 0.55 * S;
      ctx.strokeStyle = col;
      ctx.lineWidth = size * 0.06;
      ctx.strokeText(txt, 0, y);
      ctx.shadowBlur = size * 0.22 * S;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(txt, 0, y);
      ctx.shadowBlur = 0;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "gradient") {
      var gr = ctx.createLinearGradient(0, -size * 0.5, 0, size * 0.55);
      gr.addColorStop(0, shade(col, 0.6));
      gr.addColorStop(1, col);
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = size * 0.1 * S;
      ctx.shadowOffsetY = size * 0.04 * S;
      ctx.fillStyle = gr;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "retro") {
      var dark = shade(col, -0.5);
      ctx.fillStyle = dark;
      for (var k = 5; k >= 1; k--) ctx.fillText(txt, k * size * 0.022, y + k * size * 0.022);
      ctx.strokeStyle = dark;
      ctx.lineWidth = size * 0.05;
      ctx.strokeText(txt, 0, y);
      ctx.fillStyle = col;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "glitch") {
      var dx = size * 0.045;
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "#00e5ff";
      ctx.fillText(txt, -dx, y);
      ctx.fillStyle = "#ff2d75";
      ctx.fillText(txt, dx, y);
      ctx.globalAlpha = 1;
      ctx.fillStyle = col;
      ctx.fillText(txt, 0, y);
    } else if (o.fx === "stamp") {
      var sw = textWidth(o), padx = size * 0.32;
      ctx.strokeStyle = col;
      ctx.fillStyle = col;
      ctx.lineWidth = size * 0.07;
      roundRectPath(ctx, -sw / 2 - padx, -size * 0.6, sw + padx * 2, size * 1.2, size * 0.12);
      ctx.stroke();
      ctx.globalAlpha = 0.92;
      ctx.fillText(txt, 0, y);
    } else {
      ctx.fillStyle = col;
      ctx.fillText(txt, 0, y);
    }
    ctx.restore();
  }

  /* ------------------------------------------------------------------
     spot windows — shapes are unit paths (−0.5…0.5) scaled to w × h
  ------------------------------------------------------------------ */
  var SPOT_SHAPES = [
    { id: "circle", label: "Circle" },
    { id: "rounded", label: "Rounded" },
    { id: "heart", label: "Heart" },
    { id: "star", label: "Star" }
  ];
  var _spotPaths = {};
  function spotPath(shape) {
    if (_spotPaths[shape]) return _spotPaths[shape];
    var p = new Path2D();
    if (shape === "rounded") {
      var r = 0.2;
      p.moveTo(-0.5 + r, -0.5); p.lineTo(0.5 - r, -0.5); p.quadraticCurveTo(0.5, -0.5, 0.5, -0.5 + r);
      p.lineTo(0.5, 0.5 - r); p.quadraticCurveTo(0.5, 0.5, 0.5 - r, 0.5);
      p.lineTo(-0.5 + r, 0.5); p.quadraticCurveTo(-0.5, 0.5, -0.5, 0.5 - r);
      p.lineTo(-0.5, -0.5 + r); p.quadraticCurveTo(-0.5, -0.5, -0.5 + r, -0.5);
      p.closePath();
    } else if (shape === "heart") {
      var hp = new Path2D(HEART_D);
      p.addPath(hp, new DOMMatrix([1 / 90, 0, 0, 1 / 82, -0.5 - 5 / 90, -0.5 - 8 / 82]));
    } else if (shape === "star") {
      var sp = new Path2D(starPath(50, 54, 48, 21, 5, 0));
      p.addPath(sp, new DOMMatrix([1 / 96, 0, 0, 1 / 90, -0.5 - 2 / 96, -0.5 - 6 / 90]));
    } else {
      p.ellipse(0, 0, 0.5, 0.5, 0, 0, Math.PI * 2);
    }
    _spotPaths[shape] = p;
    return p;
  }

  /* ------------------------------------------------------------------
     state
  ------------------------------------------------------------------ */
  function defaultState() {
    return {
      bg: "#ffffff", accent: "#111111", pattern: "none", border: true, polaroid: false,
      caption: "", captionFont: "sans", autoCaption: true,
      gutters: true, cuts: [], zoom: 1, eye: 0,
      filter: "normal", filterK: 1, grain: 0, vignette: 0, stamp: false,
      dot: { on: false, shape: "circle", size: 8, mode: "colour", ink: "#2b2622", mix: 1 },
      backdrop: { mode: "none", color: "#f3e6d8", pic: "sunset", tilt: 0, size: 1, shadow: true },
      objs: []
    };
  }

  var st = defaultState();
  var shots = []; // decoded Image objects
  var solo = false;
  var L = null; // current layout
  var userBackdropImg = null;
  var backdropVer = 0;
  var selId = null;
  var cutMode = false;
  var eyeGuide = false;

  var _imgIds = new WeakMap();
  var _imgSeq = 0;
  function imgId(img) {
    var id = _imgIds.get(img);
    if (!id) { id = ++_imgSeq; _imgIds.set(img, id); }
    return id;
  }

  function frameH() { return solo ? 300 : 200; }

  function captionText() {
    if (st.caption) return st.caption;
    if (!st.autoCaption) return "";
    var b = bridge();
    var name = typeof b.defaultCaption === "function" ? b.defaultCaption() : "Photo Booth";
    return name + " · " + new Date().toLocaleDateString();
  }
  function captionHeight() {
    return st.caption ? 46 : st.autoCaption ? 24 : 6;
  }

  /* ------------------------------------------------------------------
     layout
  ------------------------------------------------------------------ */
  function computeLayout() {
    var n = shots.length, FH = frameH();
    var gap = st.gutters ? GUTTER : 0;
    var capH = captionHeight();
    var groups = [], cur = [];
    for (var i = 0; i < n; i++) {
      cur.push(i);
      if (i < n - 1 && st.cuts[i]) { groups.push(cur); cur = []; }
    }
    groups.push(cur);
    var hasCuts = groups.length > 1;
    var margin = hasCuts ? 16 : 0;
    var W = FRAME_W + PAD * 2;
    var y = margin, pieces = [], frames = [], gutters = [];
    groups.forEach(function (idxs, pi) {
      var last = pi === groups.length - 1;
      var ph = PAD + idxs.length * FH + (idxs.length - 1) * gap + PAD + (last ? capH : 0);
      var rect = { x: margin, y: y, w: W, h: ph };
      var rnd = seeded(n * 7 + pi * 13 + 3);
      var tilt = hasCuts ? ((rnd() - 0.5) * 3.2 * Math.PI) / 180 : 0;
      var pf = idxs.map(function (idx, k) {
        var f = { i: idx, x: rect.x + PAD, y: rect.y + PAD + k * (FH + gap), w: FRAME_W, h: FH };
        frames.push(f);
        return f;
      });
      pieces.push({ rect: rect, frames: pf, last: last, tilt: tilt });
      y += ph + (last ? 0 : CUT_GAP);
    });
    for (var g = 0; g < n - 1; g++) {
      var a = frames[g], b = frames[g + 1];
      gutters.push({ i: g, y: (a.y + a.h + b.y) / 2, x0: margin, x1: margin + W, cut: !!st.cuts[g] });
    }
    return { w: W + margin * 2, h: y + margin, margin: margin, pieces: pieces, frames: frames, gutters: gutters, FH: FH };
  }

  /* ------------------------------------------------------------------
     rendering
  ------------------------------------------------------------------ */
  var layerCache = new Map();
  var LAYER_CACHE_MAX = 40;

  function dotKey() {
    var d = st.dot;
    return d.on ? [d.shape, d.size, d.mode, d.ink, d.mix].join(",") : "off";
  }

  // One photo, cropped/zoomed, with filter + grain + dot art + vignette + stamp.
  function frameLayer(i, w, hgt, S, noCache) {
    var img = shots[i];
    var key = [imgId(img), w, hgt, S, st.zoom, st.eye, st.filter, st.filterK, st.grain, st.vignette, st.stamp ? 1 : 0, dotKey()].join("|");
    if (!noCache) {
      var hit = layerCache.get(key);
      if (hit) { layerCache.delete(key); layerCache.set(key, hit); return hit; }
    }
    var cw = Math.round(w * S), ch = Math.round(hgt * S);
    var cv = newCanvas(cw, ch);
    var ctx = cv.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    var target = w / hgt, sr = iw / ih, sw, sh;
    if (sr > target) { sh = ih; sw = ih * target; } else { sw = iw; sh = iw / target; }
    var z = Math.max(st.zoom, 1 + 0.25 * Math.abs(st.eye));
    sw /= z; sh /= z;
    var sx = (iw - sw) / 2;
    var sy = clamp((ih - sh) / 2 + st.eye * (ih - sh) / 2, 0, ih - sh);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);

    var f = filterById(st.filter);
    var needFilter = f.id !== "normal" && st.filterK > 0;
    if (needFilter || st.grain > 0) {
      var id = ctx.getImageData(0, 0, cw, ch);
      if (needFilter) applyFilterPixels(id.data, f, st.filterK);
      if (st.grain > 0) applyGrain(id.data, st.grain, 1000 + i * 17);
      ctx.putImageData(id, 0, 0);
    }
    if (st.dot.on) applyDotArt(cv, st.dot, S);
    if (st.vignette > 0) paintVignette(ctx, cw, ch, st.vignette);
    if (st.stamp) paintStamp(ctx, cw, ch);

    if (!noCache) {
      layerCache.set(key, cv);
      if (layerCache.size > LAYER_CACHE_MAX) layerCache.delete(layerCache.keys().next().value);
    }
    return cv;
  }

  function drawCaption(ctx, p) {
    var txt = captionText();
    if (!txt) return;
    var r = p.rect;
    ctx.save();
    ctx.fillStyle = luminance(st.bg) > 0.6 ? "#2b2622" : "#f4f1ea";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    if (st.caption) {
      ctx.font = fontCss(st.captionFont, 17);
      ctx.fillText(txt, r.x + r.w / 2, r.y + r.h - 16);
    } else {
      ctx.font = "500 11px Karla, sans-serif";
      ctx.globalAlpha = 0.6;
      ctx.fillText(txt, r.x + r.w / 2, r.y + r.h - 9);
    }
    ctx.restore();
  }

  function drawFrameBox(ctx, f, S, reveal, noCache) {
    var extra = st.polaroid ? POLAROID_EXTRA : 0;
    var ph = f.h - extra;
    if (st.polaroid) {
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.2)";
      ctx.shadowBlur = 6 * S;
      ctx.shadowOffsetY = 2 * S;
      ctx.fillStyle = st.bg;
      ctx.fillRect(f.x - 3, f.y - 3, f.w + 6, f.h + 6);
      ctx.restore();
    }
    if (f.i < reveal) {
      ctx.drawImage(frameLayer(f.i, f.w, ph, S, noCache), f.x, f.y, f.w, ph);
    } else {
      ctx.fillStyle = rgba(st.accent, 0.1);
      ctx.fillRect(f.x, f.y, f.w, ph);
    }
    if (st.border && !st.polaroid) {
      ctx.strokeStyle = st.accent;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(f.x, f.y, f.w, ph);
    }
  }

  // Strip without spots/stickers.
  function renderBase(S, reveal, noCache) {
    var cv = newCanvas(Math.ceil(L.w * S), Math.ceil(L.h * S));
    var ctx = cv.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.scale(S, S);
    var cut = L.pieces.length > 1;
    L.pieces.forEach(function (p) {
      ctx.save();
      var cx = p.rect.x + p.rect.w / 2, cy = p.rect.y + p.rect.h / 2;
      ctx.translate(cx, cy);
      ctx.rotate(p.tilt);
      ctx.translate(-cx, -cy);
      if (cut) {
        ctx.shadowColor = "rgba(0,0,0,0.25)";
        ctx.shadowBlur = 8 * S;
        ctx.shadowOffsetY = 2 * S;
      }
      ctx.fillStyle = st.bg;
      ctx.fillRect(p.rect.x, p.rect.y, p.rect.w, p.rect.h);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      if (st.pattern !== "none") {
        ctx.save();
        ctx.beginPath();
        ctx.rect(p.rect.x, p.rect.y, p.rect.w, p.rect.h);
        ctx.clip();
        ctx.translate(p.rect.x, p.rect.y);
        paintPattern(ctx, st.pattern, st.accent, p.rect.w, p.rect.h);
        ctx.restore();
      }
      p.frames.forEach(function (f) { drawFrameBox(ctx, f, S, reveal, noCache); });
      if (p.last) drawCaption(ctx, p);
      ctx.restore();
    });
    return cv;
  }

  function spots() {
    return st.objs.filter(function (o) { return o.t === "spot"; });
  }

  // Applies each spot's filter inside its shape.
  function renderSpots(base, S) {
    var list = spots();
    if (!list.length) return base;
    var cv = newCanvas(base.width, base.height);
    var ctx = cv.getContext("2d");
    ctx.drawImage(base, 0, 0);
    list.forEach(function (o) {
      var bb = objBounds(o);
      var x0 = Math.floor(clamp(bb.x0 * S, 0, cv.width)), y0 = Math.floor(clamp(bb.y0 * S, 0, cv.height));
      var x1 = Math.ceil(clamp(bb.x1 * S, 0, cv.width)), y1 = Math.ceil(clamp(bb.y1 * S, 0, cv.height));
      var w = x1 - x0, hh = y1 - y0;
      if (w < 2 || hh < 2) return;
      var tmp = newCanvas(w, hh);
      var tctx = tmp.getContext("2d");
      tctx.drawImage(base, x0, y0, w, hh, 0, 0, w, hh);
      var id = tctx.getImageData(0, 0, w, hh);
      applyFilterPixels(id.data, filterById(o.filter), o.k);
      tctx.putImageData(id, 0, 0);

      var rp = new Path2D();
      rp.addPath(spotPath(o.shape), new DOMMatrix([o.w * S, 0, 0, o.h * S, 0, 0]));
      ctx.save();
      ctx.translate(o.x * S, o.y * S);
      ctx.rotate(o.rot || 0);
      ctx.clip(rp);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(tmp, x0, y0);
      ctx.restore();

      if (o.ring) {
        ctx.save();
        ctx.translate(o.x * S, o.y * S);
        ctx.rotate(o.rot || 0);
        ctx.lineWidth = 2.2 * S;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = 4 * S;
        ctx.stroke(rp);
        ctx.restore();
      }
    });
    return cv;
  }

  function drawObjects(ctx, S) {
    st.objs.forEach(function (o) {
      if (o.t === "spot") return;
      ctx.save();
      ctx.translate(o.x * S, o.y * S);
      ctx.rotate(o.rot || 0);
      ctx.scale(S, S);
      if (o.t === "sticker") {
        var def = STICKER_INDEX[o.sid];
        if (def) drawSticker(ctx, def, o.w, o.color, o.flip, o.outline);
      } else if (o.t === "text") {
        drawText(ctx, o, S);
      }
      ctx.restore();
    });
  }

  function objBox(o) {
    if (o.t === "sticker") {
      var d = STICKER_INDEX[o.sid];
      return { w: o.w, h: o.w / (d ? d.aspect : 1) };
    }
    if (o.t === "text") return textBox(o);
    return { w: o.w, h: o.h };
  }
  function objBounds(o) {
    var b = objBox(o), c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
    var hw = (Math.abs(c) * b.w + Math.abs(s) * b.h) / 2;
    var hh = (Math.abs(s) * b.w + Math.abs(c) * b.h) / 2;
    return { x0: o.x - hw, x1: o.x + hw, y0: o.y - hh, y1: o.y + hh };
  }

  /* ---- caches so dragging a sticker doesn't re-filter every photo ---- */
  var cache = { baseKey: "", base: null, spotKey: "", spots: null, work: null, bd: null, bdKey: "" };
  function baseSig() {
    return JSON.stringify([
      st.bg, st.accent, st.pattern, st.border, st.polaroid, st.caption, st.captionFont, st.autoCaption,
      st.gutters, st.cuts, st.zoom, st.eye, st.filter, st.filterK, st.grain, st.vignette, st.stamp, st.dot,
      solo, shots.map(imgId), captionText(), L.w, L.h
    ]);
  }
  function invalidate() {
    cache.baseKey = "";
    cache.spotKey = "";
  }

  // The finished strip (photos + spots + stickers + text) at S px per LU.
  function buildStrip(S, useCache, reveal) {
    var full = reveal == null || reveal >= shots.length;
    var base;
    var key = useCache && full ? baseSig() + "|" + S : "";
    if (key && cache.baseKey === key && cache.base) {
      base = cache.base;
    } else {
      base = renderBase(S, full ? shots.length : reveal, !useCache);
      if (key) { cache.baseKey = key; cache.base = base; cache.spotKey = ""; }
    }
    var withSpots;
    if (!full) {
      withSpots = base;
    } else {
      var sKey = key ? key + JSON.stringify(spots()) : "";
      if (sKey && cache.spotKey === sKey && cache.spots) {
        withSpots = cache.spots;
      } else {
        withSpots = renderSpots(base, S);
        if (sKey) { cache.spotKey = sKey; cache.spots = withSpots; }
      }
    }
    var out;
    if (useCache) {
      if (!cache.work || cache.work.width !== withSpots.width || cache.work.height !== withSpots.height) {
        cache.work = newCanvas(withSpots.width, withSpots.height);
      }
      out = cache.work;
    } else {
      out = newCanvas(withSpots.width, withSpots.height);
    }
    var octx = out.getContext("2d");
    octx.clearRect(0, 0, out.width, out.height);
    octx.drawImage(withSpots, 0, 0);
    if (full) drawObjects(octx, S);
    return out;
  }

  /* ------------------------------------------------------------------
     stage geometry + backdrop
  ------------------------------------------------------------------ */
  function hasBackdrop() {
    return st.backdrop.mode !== "none";
  }
  function geometry(targetW) {
    var W = Math.round(targetW), H, S, rot = 0;
    if (hasBackdrop()) {
      H = Math.round((W * BACKDROP_H) / BACKDROP_W);
      var k = W / BACKDROP_W;
      var fit = Math.min((BACKDROP_H * 0.9) / L.h, (BACKDROP_W * 0.8) / L.w);
      S = fit * k * st.backdrop.size;
      rot = (st.backdrop.tilt * Math.PI) / 180;
    } else {
      S = W / L.w;
      H = Math.round(L.h * S);
    }
    return { W: W, H: H, S: S, ox: W / 2, oy: H / 2, rot: rot };
  }

  var BACKDROP_SOLIDS = [
    { id: "classic", label: "Classic", c: "#f3e6d8" },
    { id: "dark", label: "Dark", c: "#1b1b1f" },
    { id: "vintage", label: "Vintage", c: "#cdb891" },
    { id: "pink", label: "Pink", c: "#f7c6d4" },
    { id: "mint", label: "Mint", c: "#c7e8d7" },
    { id: "slate", label: "Slate", c: "#4a5568" },
    { id: "lilac", label: "Lilac", c: "#d9ccef" }
  ];
  var BACKDROP_PICS = [
    { id: "sunset", label: "Sunset" },
    { id: "night", label: "Night sky" },
    { id: "aurora", label: "Aurora" },
    { id: "paper", label: "Paper" },
    { id: "gingham", label: "Gingham" },
    { id: "grid", label: "Notebook" },
    { id: "confetti", label: "Confetti" },
    { id: "hearts", label: "Hearts" },
    { id: "blur", label: "Your photo" }
  ];

  function coverDraw(ctx, img, W, H) {
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    var s = Math.max(W / iw, H / ih);
    var dw = iw * s, dh = ih * s;
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  }

  function paintBackdropPicture(ctx, id, W, H) {
    var k = W / BACKDROP_W, i, x, y, g, rand;
    if (id === "sunset") {
      g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#ffd9a8"); g.addColorStop(0.5, "#ffb3c6"); g.addColorStop(1, "#b7a3e6");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    } else if (id === "night") {
      g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0d1330"); g.addColorStop(1, "#33366f");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      rand = seeded(42);
      for (i = 0; i < 150; i++) {
        ctx.fillStyle = "rgba(255,248,220," + (0.35 + rand() * 0.6) + ")";
        ctx.beginPath(); ctx.arc(rand() * W, rand() * H, (0.8 + rand() * 2.2) * k, 0, Math.PI * 2); ctx.fill();
      }
    } else if (id === "aurora") {
      ctx.fillStyle = "#0f1c36"; ctx.fillRect(0, 0, W, H);
      [[0.2, 0.25, "#39d0b4"], [0.85, 0.5, "#ff7ab6"], [0.35, 0.85, "#7a5bff"]].forEach(function (b) {
        var rg = ctx.createRadialGradient(W * b[0], H * b[1], 0, W * b[0], H * b[1], W * 0.9);
        rg.addColorStop(0, rgba(b[2], 0.75)); rg.addColorStop(1, rgba(b[2], 0));
        ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
      });
    } else if (id === "paper") {
      ctx.fillStyle = "#f5efe3"; ctx.fillRect(0, 0, W, H);
      rand = seeded(7);
      for (i = 0; i < 900; i++) {
        ctx.fillStyle = "rgba(120,100,70," + (rand() * 0.09) + ")";
        ctx.fillRect(rand() * W, rand() * H, (1 + rand() * 2.5) * k, (1 + rand() * 2.5) * k);
      }
    } else if (id === "gingham") {
      ctx.fillStyle = "#fde6ec"; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(240,120,150,0.32)";
      var cs = 90 * k;
      for (x = 0; x < W; x += cs * 2) ctx.fillRect(x, 0, cs, H);
      for (y = 0; y < H; y += cs * 2) ctx.fillRect(0, y, W, cs);
    } else if (id === "grid") {
      ctx.fillStyle = "#fbf8f1"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(110,160,200,0.45)"; ctx.lineWidth = Math.max(1, 2 * k);
      ctx.beginPath();
      for (x = 0; x < W; x += 60 * k) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (y = 0; y < H; y += 60 * k) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();
      ctx.strokeStyle = "rgba(235,120,120,0.6)";
      ctx.beginPath(); ctx.moveTo(120 * k, 0); ctx.lineTo(120 * k, H); ctx.stroke();
    } else if (id === "confetti") {
      ctx.fillStyle = "#ffe9ef"; ctx.fillRect(0, 0, W, H);
      rand = seeded(11);
      var pal = ["#ff8fab", "#ffd166", "#8ecae6", "#b8e0a8", "#c3a6f2"];
      for (i = 0; i < 160; i++) {
        ctx.save();
        ctx.translate(rand() * W, rand() * H); ctx.rotate(rand() * Math.PI);
        ctx.fillStyle = pal[Math.floor(rand() * pal.length)];
        if (rand() > 0.5) ctx.fillRect(-14 * k, -5 * k, 28 * k, 10 * k);
        else { ctx.beginPath(); ctx.arc(0, 0, 8 * k, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
    } else if (id === "hearts") {
      ctx.fillStyle = "#f9d3dc"; ctx.fillRect(0, 0, W, H);
      var row = 0;
      for (y = 60 * k; y < H + 60 * k; y += 110 * k, row++) {
        for (x = (row % 2 ? 0 : 55 * k); x < W + 60 * k; x += 110 * k) {
          ctx.fillStyle = row % 2 ? "#f4a1b6" : "#f7b8c8";
          fillHeart(ctx, x, y, 50 * k);
        }
      }
    } else if (id === "blur" && shots[0]) {
      var tiny = newCanvas(20, 36), tctx = tiny.getContext("2d");
      coverDraw(tctx, shots[0], 20, 36);
      var mid = newCanvas(120, 213), mctx2 = mid.getContext("2d");
      mctx2.imageSmoothingQuality = "high";
      mctx2.drawImage(tiny, 0, 0, 120, 213);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(mid, 0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,0.18)"; ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = "#f3e6d8"; ctx.fillRect(0, 0, W, H);
    }
  }

  function paintBackdrop(ctx, W, H) {
    var b = st.backdrop;
    if (b.mode === "solid") { ctx.fillStyle = b.color; ctx.fillRect(0, 0, W, H); return; }
    if (b.pic === "upload" && userBackdropImg) { coverDraw(ctx, userBackdropImg, W, H); return; }
    paintBackdropPicture(ctx, b.pic, W, H);
  }

  // Draws the whole stage (backdrop + strip) into ctx for geometry g.
  function paintStage(ctx, g, opts) {
    opts = opts || {};
    ctx.clearRect(0, 0, g.W, g.H);
    var bd = hasBackdrop();
    if (bd) {
      if (opts.cache) {
        var bk = JSON.stringify(st.backdrop) + "|" + g.W + "|" + (shots[0] ? imgId(shots[0]) : 0) + "|" + backdropVer;
        if (cache.bdKey !== bk || !cache.bd) {
          cache.bd = newCanvas(g.W, g.H);
          paintBackdrop(cache.bd.getContext("2d"), g.W, g.H);
          cache.bdKey = bk;
        }
        ctx.drawImage(cache.bd, 0, 0);
      } else {
        paintBackdrop(ctx, g.W, g.H);
      }
    }
    var strip = buildStrip(g.S, !!opts.cache, opts.reveal);
    ctx.save();
    ctx.translate(g.ox, g.oy);
    ctx.rotate(g.rot);
    if (bd && st.backdrop.shadow) {
      ctx.shadowColor = "rgba(0,0,0,0.38)";
      ctx.shadowBlur = g.S * 16;
      ctx.shadowOffsetY = g.S * 6;
    }
    ctx.drawImage(strip, (-L.w * g.S) / 2, (-L.h * g.S) / 2, L.w * g.S, L.h * g.S);
    ctx.restore();
  }

  /* ------------------------------------------------------------------
     stage, history, selection, pointer + keyboard editing
  ------------------------------------------------------------------ */
  var rootEl = null, canvasEl = null, overlayEl = null, stageEl = null, canvasWrapEl = null;
  var view = null;
  var raf = 0;
  var hist = [], hIdx = -1;
  var syncers = [];
  var dropIdx = 0;
  var OV_M = 30; // the overlay reaches this many px past the strip so handles near an edge stay clickable

  function requestRender() {
    if (raf) return;
    raf = requestAnimationFrame(render);
  }

  function render() {
    raf = 0;
    if (!canvasEl || !shots.length) return;
    L = computeLayout();
    var scs = getComputedStyle(stageEl);
    var wrapW = stageEl.clientWidth - parseFloat(scs.paddingLeft) - parseFloat(scs.paddingRight);
    if (wrapW < 40) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var aspect = hasBackdrop() ? BACKDROP_W / BACKDROP_H : L.w / L.h;
    var wide = window.innerWidth >= 900;
    var cssW;
    if (wide) {
      // the stage column is sticky, so keep the whole column inside the viewport
      var col = stageEl.parentNode;
      var chrome = col.offsetHeight - canvasWrapEl.offsetHeight;
      if (!(chrome > 60 && chrome < 500)) chrome = 230;
      var maxH = clamp(window.innerHeight - 84 - chrome - 14, 380, 1100);
      cssW = Math.min(wrapW - 8, maxH * aspect);
    } else {
      cssW = Math.min(wrapW, 440);
    }
    cssW = Math.max(120, Math.floor(cssW));
    var W = Math.min(Math.round(cssW * dpr), 1500);
    var g = geometry(W);
    var cssH = (cssW * g.H) / g.W;
    if (canvasEl.width !== g.W || canvasEl.height !== g.H) {
      canvasEl.width = g.W; canvasEl.height = g.H;
    }
    var ws = cssW + "px", hs = cssH.toFixed(1) + "px";
    [canvasWrapEl, canvasEl].forEach(function (n) { n.style.width = ws; n.style.height = hs; });
    var pxr = g.W / cssW;
    var ovW = Math.round((cssW + OV_M * 2) * pxr), ovH = Math.round((cssH + OV_M * 2) * pxr);
    if (overlayEl.width !== ovW || overlayEl.height !== ovH) { overlayEl.width = ovW; overlayEl.height = ovH; }
    overlayEl.style.width = cssW + OV_M * 2 + "px";
    overlayEl.style.height = (cssH + OV_M * 2).toFixed(1) + "px";
    overlayEl.style.left = -OV_M + "px";
    overlayEl.style.top = -OV_M + "px";
    view = { pxr: pxr, cssS: g.S / pxr, cx: g.ox / pxr, cy: g.oy / pxr, rot: g.rot };
    paintStage(canvasEl.getContext("2d"), g, { cache: true });
    canvasWrapEl.classList.toggle("has-backdrop", hasBackdrop());
    drawOverlay();
  }

  /* ---- coordinate mapping (LU <-> overlay CSS px) ---- */
  function luToCss(x, y) {
    var vx = (x - L.w / 2) * view.cssS, vy = (y - L.h / 2) * view.cssS;
    var c = Math.cos(view.rot), s = Math.sin(view.rot);
    return { x: view.cx + vx * c - vy * s, y: view.cy + vx * s + vy * c };
  }
  function cssDeltaToLu(dx, dy) {
    var c = Math.cos(-view.rot), s = Math.sin(-view.rot);
    return { x: (dx * c - dy * s) / view.cssS, y: (dx * s + dy * c) / view.cssS };
  }

  /* ---- history ---- */
  function snapshot() { return JSON.stringify(st); }
  function resetHistory() { hist = [snapshot()]; hIdx = 0; updateHistoryUI(); }
  function commit() {
    var s = snapshot();
    if (s === hist[hIdx]) return;
    hist = hist.slice(0, hIdx + 1);
    hist.push(s);
    if (hist.length > HIST_MAX) hist.shift();
    hIdx = hist.length - 1;
    updateHistoryUI();
  }
  function restoreHistory(i) {
    hIdx = i;
    st = JSON.parse(hist[i]);
    if (selId && !getObj(selId)) selId = null;
    cutMode = cutMode && shots.length > 1;
    updateHistoryUI();
    syncUI();
    requestRender();
  }
  function undo() { if (hIdx > 0) restoreHistory(hIdx - 1); }
  function redo() { if (hIdx < hist.length - 1) restoreHistory(hIdx + 1); }

  /* ---- objects ---- */
  function getObj(id) {
    for (var i = 0; i < st.objs.length; i++) if (st.objs[i].id === id) return st.objs[i];
    return null;
  }
  function getSel() { return selId ? getObj(selId) : null; }

  function selectObj(id, opts) {
    selId = id;
    var o = getSel();
    if (o && !(opts && opts.keepTab)) showTab(o.t === "sticker" ? "stickers" : o.t === "text" ? "text" : "spot");
    syncUI();
    if (overlayEl) overlayEl.style.touchAction = selId ? "none" : "pan-y";
    requestRender();
  }

  function dropPoint() {
    if (!L) L = computeLayout();
    var f = L.frames[dropIdx++ % L.frames.length];
    return { x: L.w / 2 + (Math.random() - 0.5) * 36, y: f.y + f.h / 2 + (Math.random() - 0.5) * 36 };
  }
  function pushObj(o) {
    o.id = uid();
    st.objs.push(o);
    commit();
    selectObj(o.id);
    return o;
  }
  function addSticker_(sid) {
    var def = STICKER_INDEX[sid];
    if (!def) return;
    var p = dropPoint();
    var w = def.custom ? (def.aspect >= 1 ? 120 : 120 * def.aspect + 20)
      : def.aspect > 2.2 ? (def.cat === "words" ? 130 : 170) : def.cat === "emoji" ? 70 : 92;
    var o = { t: "sticker", sid: sid, x: p.x, y: p.y, w: w, rot: (Math.random() - 0.5) * 0.3, color: def.color, flip: false };
    // White cut-out outline is OFF by default; it can still be switched on per sticker
    // in the editor ("White cut-out outline" toggle).
    if (def.custom) o.outline = false;
    pushObj(o);
  }
  function addTextObj(spec) {
    var p = dropPoint();
    var o = { t: "text", text: spec.text, font: spec.font, color: spec.color, fx: spec.fx, size: spec.size, x: p.x, y: p.y, rot: 0 };
    if (spec.hl) o.hl = spec.hl;
    pushObj(o);
  }
  function addSpotObj(spec) {
    var p = dropPoint();
    pushObj({ t: "spot", shape: spec.shape, x: p.x, y: p.y, w: 130, h: 130, rot: 0, filter: spec.filter, k: spec.k, ring: spec.ring });
  }
  function removeObj(id) {
    st.objs = st.objs.filter(function (o) { return o.id !== id; });
    if (selId === id) selId = null;
    commit();
    syncUI();
    if (overlayEl) overlayEl.style.touchAction = selId ? "none" : "pan-y";
    requestRender();
  }
  function duplicateObj(id) {
    var o = getObj(id);
    if (!o) return;
    var c = JSON.parse(JSON.stringify(o));
    c.x += 16; c.y += 16;
    pushObj(c);
  }
  function moveZ(id, dir) {
    var i = st.objs.findIndex(function (o) { return o.id === id; });
    var j = i + dir;
    if (i < 0 || j < 0 || j >= st.objs.length) return;
    var t = st.objs[i]; st.objs[i] = st.objs[j]; st.objs[j] = t;
    commit();
    requestRender();
  }
  function clearAllObjs() {
    if (!st.objs.length) return;
    st.objs = [];
    selId = null;
    commit();
    syncUI();
    requestRender();
  }

  // Runs a layout-changing edit (gutters / cuts) while keeping stickers, text
  // and spots attached to the frame they were placed on.
  function changeLayout(fn) {
    var oldL = computeLayout();
    var anchors = st.objs.map(function (o) {
      var best = 0, bd = Infinity;
      oldL.frames.forEach(function (f, i) {
        var d = Math.abs(o.y - (f.y + f.h / 2));
        if (d < bd) { bd = d; best = i; }
      });
      return { fi: best, dy: o.y - oldL.frames[best].y };
    });
    fn();
    var nl = computeLayout();
    st.objs.forEach(function (o, i) {
      var a = anchors[i], f = nl.frames[Math.min(a.fi, nl.frames.length - 1)];
      o.y = f.y + a.dy;
      o.x += nl.margin - oldL.margin;
    });
    L = nl;
    commit();
    requestRender();
  }
  function setGutters(on) { changeLayout(function () { st.gutters = !!on; }); }
  function toggleCut(i) { changeLayout(function () { st.cuts[i] = !st.cuts[i]; }); }
  function resetLayoutTools() {
    changeLayout(function () { st.gutters = true; st.cuts = []; st.zoom = 1; st.eye = 0; });
    syncUI();
  }

  /* ---- overlay drawing ---- */
  var SEL_PAD = 5, HANDLE_R = 11;

  function selGeom(o) {
    var b = objBox(o), c = luToCss(o.x, o.y);
    return { cx: c.x, cy: c.y, rot: (o.rot || 0) + view.rot, bw: b.w * view.cssS, bh: b.h * view.cssS };
  }
  function toLocal(g, px, py) {
    var dx = px - g.cx, dy = py - g.cy, c = Math.cos(-g.rot), s = Math.sin(-g.rot);
    return { x: dx * c - dy * s, y: dx * s + dy * c };
  }

  function drawHandle(ctx, x, y, kind) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, HANDLE_R, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = kind === "del" ? "#e0405f" : "#4f6f52";
    ctx.stroke();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 1.8;
    if (kind === "del") {
      ctx.beginPath(); ctx.moveTo(-4, -4); ctx.lineTo(4, 4); ctx.moveTo(4, -4); ctx.lineTo(-4, 4); ctx.stroke();
    } else if (kind === "resize") {
      ctx.beginPath();
      ctx.moveTo(-4, -4); ctx.lineTo(4, 4);
      ctx.moveTo(4, 4); ctx.lineTo(0.5, 4); ctx.moveTo(4, 4); ctx.lineTo(4, 0.5);
      ctx.moveTo(-4, -4); ctx.lineTo(-0.5, -4); ctx.moveTo(-4, -4); ctx.lineTo(-4, -0.5);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, 4.4, -Math.PI * 0.8, Math.PI * 0.55);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(3.6, 2.6); ctx.lineTo(4.6, -0.6); ctx.lineTo(1.2, 0.6);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSelection(ctx, o) {
    var g = selGeom(o);
    var hw = g.bw / 2 + SEL_PAD, hh = g.bh / 2 + SEL_PAD;
    ctx.save();
    ctx.translate(g.cx, g.cy);
    ctx.rotate(g.rot);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.setLineDash([]);
    ctx.strokeRect(-hw, -hh, hw * 2, hh * 2);
    ctx.strokeStyle = "#4f6f52";
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(-hw, -hh, hw * 2, hh * 2);
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(0, -hh); ctx.lineTo(0, -hh - 26 + HANDLE_R);
    ctx.strokeStyle = "#4f6f52"; ctx.stroke();
    drawHandle(ctx, -hw, -hh, "del");
    drawHandle(ctx, hw, hh, "resize");
    drawHandle(ctx, 0, -hh - 26, "rotate");
    ctx.restore();
  }

  function drawOverlay() {
    if (!overlayEl || !view || !L) return;
    var ctx = overlayEl.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, overlayEl.width, overlayEl.height);
    ctx.scale(view.pxr, view.pxr);
    ctx.translate(OV_M, OV_M);

    if (eyeGuide) {
      ctx.save();
      ctx.strokeStyle = "rgba(255,90,122,0.9)";
      ctx.lineWidth = 1.4;
      ctx.setLineDash([6, 4]);
      L.frames.forEach(function (f) {
        var a = luToCss(f.x - 6, f.y + f.h * 0.4), b = luToCss(f.x + f.w + 6, f.y + f.h * 0.4);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      ctx.restore();
    }

    if (cutMode) {
      L.gutters.forEach(function (gt) {
        var a = luToCss(gt.x0 - 4, gt.y), b = luToCss(gt.x1 + 4, gt.y);
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = gt.cut ? "#e0405f" : "rgba(255,255,255,0.95)";
        ctx.shadowColor = "rgba(0,0,0,0.45)";
        ctx.shadowBlur = 3;
        ctx.setLineDash(gt.cut ? [] : [7, 5]);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.shadowColor = "transparent";
        var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        ctx.beginPath(); ctx.arc(mx, my, 13, 0, Math.PI * 2);
        ctx.fillStyle = gt.cut ? "#e0405f" : "#ffffff";
        ctx.fill();
        ctx.font = "15px " + EMOJI_FONT;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = gt.cut ? "#ffffff" : "#2b2622";
        ctx.fillText("✂", mx, my + 1);
        ctx.restore();
      });
    }

    var o = getSel();
    if (o && !cutMode) drawSelection(ctx, o);
  }

  /* ---- hit testing ---- */
  function hitHandle(o, px, py) {
    var g = selGeom(o), l = toLocal(g, px, py);
    var hw = g.bw / 2 + SEL_PAD, hh = g.bh / 2 + SEL_PAD, R = HANDLE_R + 6;
    function near(x, y) { return Math.hypot(l.x - x, l.y - y) <= R; }
    if (near(-hw, -hh)) return "del";
    if (near(hw, hh)) return "resize";
    if (near(0, -hh - 26)) return "rotate";
    return null;
  }
  function hitObj(px, py) {
    var order = st.objs.filter(function (o) { return o.t !== "spot"; }).reverse()
      .concat(st.objs.filter(function (o) { return o.t === "spot"; }).reverse());
    for (var i = 0; i < order.length; i++) {
      var g = selGeom(order[i]), l = toLocal(g, px, py);
      if (Math.abs(l.x) <= g.bw / 2 + SEL_PAD && Math.abs(l.y) <= g.bh / 2 + SEL_PAD) return order[i];
    }
    return null;
  }

  /* ---- pointer handling ---- */
  var pointers = new Map();
  var drag = null;
  var pinch = null;

  function pt(e) {
    var r = overlayEl.getBoundingClientRect();
    return { x: e.clientX - r.left - OV_M, y: e.clientY - r.top - OV_M };
  }
  function scaleObj(o, f0, o0) {
    if (o.t === "sticker") o.w = clamp(o0.w * f0, 14, 700);
    else if (o.t === "text") o.size = clamp(o0.size * f0, 8, 320);
    else { o.w = clamp(o0.w * f0, 24, 700); o.h = clamp(o0.h * f0, 24, 700); }
  }

  function onPointerDown(e) {
    if (!view) return;
    overlayEl.focus({ preventScroll: true });
    var p = pt(e);
    pointers.set(e.pointerId, p);
    try { overlayEl.setPointerCapture(e.pointerId); } catch (err) {}

    var sel = getSel();
    if (pointers.size === 2 && sel && !cutMode) {
      var ps = Array.from(pointers.values());
      pinch = {
        d0: Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y) || 1,
        a0: Math.atan2(ps[1].y - ps[0].y, ps[1].x - ps[0].x),
        o0: JSON.parse(JSON.stringify(sel)), id: sel.id
      };
      drag = null;
      return;
    }
    if (cutMode) {
      var best = null, bd = 26;
      L.gutters.forEach(function (gt) {
        var c = luToCss((gt.x0 + gt.x1) / 2, gt.y);
        var d = Math.abs(p.y - c.y);
        if (d < bd) { bd = d; best = gt; }
      });
      if (best) toggleCut(best.i);
      return;
    }
    var hnd = sel && hitHandle(sel, p.x, p.y);
    if (hnd === "del") { removeObj(sel.id); return; }
    if (hnd === "resize" || hnd === "rotate") {
      var g = selGeom(sel);
      drag = { mode: hnd, id: sel.id, o0: JSON.parse(JSON.stringify(sel)), cx: g.cx, cy: g.cy,
               d0: Math.hypot(p.x - g.cx, p.y - g.cy) || 1, changed: false };
      e.preventDefault();
      return;
    }
    var hit = hitObj(p.x, p.y);
    if (hit) {
      if (hit.id !== selId) selectObj(hit.id);
      drag = { mode: "move", id: hit.id, sx: p.x, sy: p.y, ox: hit.x, oy: hit.y, changed: false };
      e.preventDefault();
    } else if (selId) {
      selectObj(null);
    }
  }

  function onPointerMove(e) {
    if (!pointers.has(e.pointerId)) {
      if (view) {
        var q = pt(e), s0 = getSel(), h0 = s0 && !cutMode && hitHandle(s0, q.x, q.y);
        overlayEl.style.cursor = cutMode ? "row-resize" : h0 === "del" ? "pointer" : h0 === "resize" ? "nwse-resize" : h0 === "rotate" ? "grab" : hitObj(q.x, q.y) ? "move" : "default";
      }
      return;
    }
    var p = pt(e);
    pointers.set(e.pointerId, p);
    var o;
    if (pinch && pointers.size >= 2) {
      o = getObj(pinch.id);
      if (!o) return;
      var ps = Array.from(pointers.values());
      var d = Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y) || 1;
      var a = Math.atan2(ps[1].y - ps[0].y, ps[1].x - ps[0].x);
      scaleObj(o, d / pinch.d0, pinch.o0);
      o.rot = (pinch.o0.rot || 0) + (a - pinch.a0);
      pinch.changed = true;
      requestRender();
      return;
    }
    if (!drag) return;
    o = getObj(drag.id);
    if (!o) return;
    if (drag.mode === "move") {
      var dl = cssDeltaToLu(p.x - drag.sx, p.y - drag.sy);
      o.x = drag.ox + dl.x;
      o.y = drag.oy + dl.y;
      if (Math.abs(o.x - L.w / 2) < 3) o.x = L.w / 2;
    } else if (drag.mode === "resize") {
      scaleObj(o, Math.hypot(p.x - drag.cx, p.y - drag.cy) / drag.d0, drag.o0);
    } else if (drag.mode === "rotate") {
      var ang = Math.atan2(p.y - drag.cy, p.x - drag.cx) + Math.PI / 2 - view.rot;
      var q90 = Math.round(ang / (Math.PI / 2)) * (Math.PI / 2);
      if (Math.abs(ang - q90) < 0.07) ang = q90;
      o.rot = ang;
    }
    drag.changed = true;
    requestRender();
  }

  function onPointerUp(e) {
    pointers.delete(e.pointerId);
    if (pinch && pointers.size < 2) {
      if (pinch.changed) commit();
      pinch = null;
    }
    if (drag && pointers.size === 0) {
      if (drag.changed) commit();
      drag = null;
    }
  }

  var nudgeTimer = 0;
  function onKeyDown(e) {
    var mod = e.ctrlKey || e.metaKey, k = e.key;
    if (mod && (k === "z" || k === "Z")) { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
    if (mod && (k === "y" || k === "Y")) { e.preventDefault(); redo(); return; }
    var o = getSel();
    if (!o) return;
    var step = e.shiftKey ? 5 : 1, handled = true;
    if (k === "ArrowLeft") o.x -= step;
    else if (k === "ArrowRight") o.x += step;
    else if (k === "ArrowUp") o.y -= step;
    else if (k === "ArrowDown") o.y += step;
    else if (k === "Delete" || k === "Backspace") { removeObj(o.id); e.preventDefault(); return; }
    else if (k === "Escape") { selectObj(null); return; }
    else if (k === "+" || k === "=") scaleObj(o, 1.06, JSON.parse(JSON.stringify(o)));
    else if (k === "-" || k === "_") scaleObj(o, 0.94, JSON.parse(JSON.stringify(o)));
    else if (k === "[") o.rot = (o.rot || 0) - 0.1;
    else if (k === "]") o.rot = (o.rot || 0) + 0.1;
    else if (mod && (k === "d" || k === "D")) { duplicateObj(o.id); e.preventDefault(); return; }
    else handled = false;
    if (!handled) return;
    e.preventDefault();
    requestRender();
    clearTimeout(nudgeTimer);
    nudgeTimer = setTimeout(commit, 450);
  }

  /* ------------------------------------------------------------------
     UI
  ------------------------------------------------------------------ */
  var tabsMap = {};
  var activeTab = "frame";
  var undoBtn = null, redoBtn = null, selbarEl = null, statusEl = null, cutHintEl = null;
  var filterThumbs = [];
  var presetCanvases = [];
  var draftText = { text: "", font: "script", color: "#ffffff", fx: "shadow", size: 34 };
  var draftSpot = { shape: "circle", filter: "noir", k: 1, ring: true };

  function label(o) { return o.label; }
  function addSync(fn) { syncers.push(fn); fn(); }
  function syncUI() {
    syncers.forEach(function (f) { try { f(); } catch (e) { console.warn("[studio] sync", e); } });
  }
  function apply(fn) { fn(); commit(); requestRender(); }

  function updateHistoryUI() {
    if (undoBtn) undoBtn.disabled = hIdx <= 0;
    if (redoBtn) redoBtn.disabled = hIdx >= hist.length - 1;
  }

  function showTab(id) {
    if (!tabsMap[id]) return;
    activeTab = id;
    Object.keys(tabsMap).forEach(function (k) {
      var on = k === id;
      tabsMap[k].btn.setAttribute("aria-selected", on ? "true" : "false");
      tabsMap[k].btn.tabIndex = on ? 0 : -1;
      tabsMap[k].btn.classList.toggle("on", on);
      tabsMap[k].panel.hidden = !on;
    });
    var b = tabsMap[id].btn;
    if (b && b.scrollIntoView && b.parentNode && b.parentNode.scrollWidth > b.parentNode.clientWidth) {
      var par = b.parentNode;
      par.scrollLeft = b.offsetLeft - (par.clientWidth - b.offsetWidth) / 2;
    }
  }

  /* ---- little control factories ---- */
  function slider(text, o) {
    var input = h("input", { type: "range", min: o.min, max: o.max, step: o.step || 1 });
    var val = h("output", { class: "pbs-val" });
    function paint() {
      var v = o.get();
      input.value = v;
      val.textContent = o.fmt ? o.fmt(v) : v;
    }
    input.addEventListener("input", function () {
      var v = parseFloat(input.value);
      o.set(v);
      val.textContent = o.fmt ? o.fmt(v) : v;
      requestRender();
    });
    input.addEventListener("change", commit);
    if (o.guide) {
      ["pointerdown", "focus"].forEach(function (ev) { input.addEventListener(ev, function () { eyeGuide = true; drawOverlay(); }); });
      ["pointerup", "pointercancel", "blur"].forEach(function (ev) { input.addEventListener(ev, function () { eyeGuide = false; drawOverlay(); }); });
    }
    addSync(paint);
    return h("label", { class: "pbs-slider" + (o.cls ? " " + o.cls : "") }, h("span", { class: "pbs-slabel", text: text }), input, val);
  }

  function chipGroup(items, o) {
    var wrap = h("div", { class: "pbs-chips" + (o.cls ? " " + o.cls : ""), role: "group", "aria-label": o.aria || null });
    var btns = items.map(function (it) {
      var b = h("button", { type: "button", class: "pbs-chip", "aria-pressed": "false", onclick: function () { o.set(it.id); syncUI(); } }, it.label);
      b._id = it.id;
      wrap.appendChild(b);
      return b;
    });
    addSync(function () {
      var cur = o.get();
      btns.forEach(function (b) {
        var on = b._id === cur;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
    return wrap;
  }

  function toggle(text, get, set) {
    var input = h("input", { type: "checkbox" });
    input.addEventListener("change", function () { set(input.checked); });
    addSync(function () { input.checked = !!get(); });
    return h("label", { class: "pb-polaroid-toggle pbs-toggle" }, input, h("span", { class: "pb-switch", "aria-hidden": "true" }), h("span", { text: text }));
  }

  function colorField(text, get, set) {
    var input = h("input", { type: "color" });
    input.addEventListener("input", function () { set(input.value); requestRender(); });
    input.addEventListener("change", commit);
    addSync(function () { input.value = get(); });
    return h("label", { class: "pb-color-label pbs-color" }, h("span", { class: "pb-color-swatch-frame" }, input), h("span", { text: text }));
  }

  function swatchRow(colors, get, set) {
    var wrap = h("div", { class: "pbs-swatches", role: "group" });
    var btns = colors.map(function (c) {
      var b = h("button", { type: "button", class: "pbs-swatch", style: { background: c }, "aria-label": c, onclick: function () { apply(function () { set(c); }); syncUI(); } });
      b._c = c;
      wrap.appendChild(b);
      return b;
    });
    addSync(function () {
      var cur = (get() || "").toLowerCase();
      btns.forEach(function (b) { b.classList.toggle("on", b._c === cur); });
    });
    return wrap;
  }

  function group(title, kids) {
    return h("div", { class: "pbs-group" }, title ? h("p", { class: "pbs-glabel", text: title }) : null, kids);
  }
  function note(text) { return h("p", { class: "pbs-note", text: text }); }

  function pxCanvas(w, hh) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var c = newCanvas(w * dpr, hh * dpr);
    c.style.width = w + "px";
    c.style.height = hh + "px";
    return c;
  }

  /* ---- Frame tab ---- */
  var FRAME_STYLES = [
    { id: "classic", label: "Classic", bg: "#ffffff", ac: "#111111" },
    { id: "dark", label: "Dark", bg: "#1b1b1f", ac: "#f4efe6" },
    { id: "vintage", label: "Vintage", bg: "#efe3cf", ac: "#6b4a2f" },
    { id: "pink", label: "Pink", bg: "#f7d6de", ac: "#d1557a" },
    { id: "mint", label: "Mint", bg: "#d9efe2", ac: "#3f7f5c" },
    { id: "slate", label: "Slate", bg: "#3a4556", ac: "#dfe6ef" },
    { id: "lilac", label: "Lilac", bg: "#e6dcf4", ac: "#7a5bb0" },
    { id: "none", label: "No frame" }
  ];

  function buildFrameTab() {
    var styleBtns = FRAME_STYLES.map(function (fs) {
      var sw = h("span", { class: "pbs-style-sw" });
      if (fs.bg) { sw.style.background = fs.bg; sw.style.borderColor = fs.ac; }
      else sw.classList.add("none");
      var b = h("button", { type: "button", class: "pbs-style", "aria-pressed": "false", onclick: function () {
        apply(function () {
          if (fs.id === "none") st.border = false;
          else { st.bg = fs.bg; st.accent = fs.ac; st.border = true; }
        });
        syncUI();
      } }, sw, h("span", { text: label(fs) }));
      b._fs = fs;
      return b;
    });
    addSync(function () {
      styleBtns.forEach(function (b) {
        var fs = b._fs;
        var on = fs.id === "none" ? !st.border : st.border && st.bg.toLowerCase() === fs.bg && st.accent.toLowerCase() === fs.ac;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });

    var patBtns = PATTERNS.map(function (p) {
      var c = pxCanvas(52, 52);
      var b = h("button", { type: "button", class: "pbs-pattern", title: label(p), "aria-label": label(p), "aria-pressed": "false", onclick: function () { apply(function () { st.pattern = p.id; }); syncUI(); } }, c);
      b._p = p; b._c = c;
      return b;
    });
    addSync(function () {
      patBtns.forEach(function (b) {
        var c = b._c, ctx = c.getContext("2d");
        var k = c.width / 52;
        ctx.setTransform(k, 0, 0, k, 0, 0);
        ctx.fillStyle = st.bg; ctx.fillRect(0, 0, 52, 52);
        paintPattern(ctx, b._p.id, st.accent, 52, 52);
        var on = st.pattern === b._p.id;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });

    var capInput = h("input", { type: "text", class: "pbs-input", maxlength: 40, placeholder: "Us · 2026", "aria-label": "Caption" });
    capInput.addEventListener("input", function () { st.caption = capInput.value; requestRender(); });
    capInput.addEventListener("change", commit);
    addSync(function () { if (document.activeElement !== capInput) capInput.value = st.caption; });

    var fontSel = h("select", { class: "pbs-select", "aria-label": "Caption font" },
      FONTS.map(function (f) { return h("option", { value: f.id, text: label(f) }); }));
    fontSel.addEventListener("change", function () { apply(function () { st.captionFont = fontSel.value; }); });
    addSync(function () { fontSel.value = st.captionFont; });

    return [
      group("Frame style", h("div", { class: "pbs-styles" }, styleBtns)),
      group("Colours", h("div", { class: "pbs-colors" },
        colorField("Background", function () { return st.bg; }, function (v) { st.bg = v; }),
        colorField("Pattern & frame", function () { return st.accent; }, function (v) { st.accent = v; })
      )),
      group("Pattern", h("div", { class: "pbs-patterns" }, patBtns)),
      group("Details", [
        toggle("Frame border", function () { return st.border; }, function (v) { apply(function () { st.border = v; }); }),
        toggle("Polaroid style (no frame border)", function () { return st.polaroid; }, function (v) { apply(function () { st.polaroid = v; }); }),
        toggle("Show names & date when there's no caption", function () { return st.autoCaption; }, function (v) { apply(function () { st.autoCaption = v; }); })
      ]),
      group("Caption", h("div", { class: "pbs-row" }, capInput, fontSel))
    ];
  }

  /* ---- Stickers tab ---- */
  function stickerThumb(def) {
    var box = 60, c = pxCanvas(box, box), ctx = c.getContext("2d");
    var k = c.width / box;
    ctx.scale(k, k);
    ctx.translate(box / 2, box / 2);
    drawSticker(ctx, def, Math.min(box * 0.9, box * 0.86 * def.aspect), def.color, false);
    return c;
  }

  var stickerUI = null; // lets uploaded stickers be added to the open grid

  function buildStickersTab() {
    var cat = "all";
    var grid = h("div", { class: "pbs-sticker-grid" });
    var cells = [];
    var emptyNote = note("Nothing here yet — your stickers appear here once they're added to the site's stickers folder.");
    emptyNote.hidden = true;
    function applyCat() {
      var shown = 0;
      cells.forEach(function (c) {
        c.hidden = !(cat === "all" || c._cat === cat);
        if (!c.hidden) shown++;
      });
      emptyNote.hidden = shown > 0;
    }
    function addCell(def) {
      var btn = h("button", { type: "button", class: "pbs-sticker", "aria-label": "Add sticker" + " " + (def.custom ? "" : def.id), onclick: function () { addSticker_(def.id); } }, stickerThumb(def));
      var cell = h("span", { class: "pbs-sticker-cell" }, btn);
      cell._cat = def.cat;
      cell._id = def.id;
      cells.push(cell);
      grid.appendChild(cell);
      cell.hidden = !(cat === "all" || def.cat === cat);
    }
    STICKERS.forEach(addCell);
    stickerUI = {
      add: function (def) { if (!cells.some(function (c) { return c._id === def.id; })) { addCell(def); applyCat(); } },
      remove: function (id) {
        cells = cells.filter(function (c) { if (c._id === id) { c.remove(); return false; } return true; });
        applyCat();
      }
    };

    var cats = chipGroup(STICKER_CATS.map(function (c) { return { id: c.id, label: label(c) }; }), {
      aria: "Sticker categories",
      get: function () { return cat; },
      set: function (id) { cat = id; applyCat(); grid.scrollTop = 0; }
    });

    function selSticker() { var o = getSel(); return o && o.t === "sticker" ? o : null; }
    function selCustom() { var o = selSticker(); return o && STICKER_INDEX[o.sid] && STICKER_INDEX[o.sid].custom ? o : null; }
    var outlineWrap = h("div", { class: "pbs-group pbs-sel-only" },
      toggle("White cut-out outline", function () { var o = selCustom(); return o ? !!o.outline : false; }, function (v) { apply(function () { var o = selCustom(); if (o) o.outline = v; }); })
    );
    addSync(function () { outlineWrap.hidden = !selCustom(); });
    return [
      note("Tap one to drop it on your photo. Drag to move, pull the corner to resize, nudge with ← ↑ ↓ →, Delete to remove."),
      cats, grid, emptyNote,
      outlineWrap
    ];
  }

  // stickers listed in CONFIG.photoBoothStickers (files in the project's stickers/ folder)
  var customLoaded = false;
  function loadCustomStickers() {
    if (customLoaded) return;
    customLoaded = true;
    var files = typeof bridge().stickerFiles === "function" ? bridge().stickerFiles() || [] : [];
    Promise.all(files.filter(Boolean).map(function (f) {
      return registerCustomSticker({ id: "p:" + f, url: encodeURI(f) });
    })).then(function (defs) {
      defs.filter(Boolean).forEach(function (d) { if (stickerUI) stickerUI.add(d); });
    });
  }

  /* ---- Text tab ---- */
  function presetText(p) { return typeof p.text === "function" ? p.text() : p.text; }
  function drawPresetPreviews() {
    presetCanvases.forEach(function (it) {
      var c = it.c, ctx = c.getContext("2d"), k = c.width / 132;
      ctx.setTransform(k, 0, 0, k, 0, 0);
      var g = ctx.createLinearGradient(0, 0, 132, 52);
      g.addColorStop(0, "#d6c4b3"); g.addColorStop(1, "#a89888");
      ctx.fillStyle = g; ctx.fillRect(0, 0, 132, 52);
      var o = { text: presetText(it.p), font: it.p.font, color: it.p.color, fx: it.p.fx, size: it.p.size, hl: it.p.hl };
      var size = it.p.size, tw;
      do { o.size = size; tw = textWidth(o) + size * 0.6; size -= 2; } while (tw > 122 && size > 10);
      ctx.save(); ctx.translate(66, 26); drawText(ctx, o, k); ctx.restore();
    });
  }

  function buildTextTab() {
    function tgt() { var o = getSel(); return o && o.t === "text" ? o : draftText; }
    var input = h("input", { type: "text", class: "pbs-input", maxlength: 60, placeholder: "Type something sweet…", "aria-label": "Your words" });
    input.addEventListener("input", function () {
      var t = tgt();
      t.text = input.value;
      if (t !== draftText) requestRender();
    });
    input.addEventListener("change", commit);
    var modeNote = note("");
    addSync(function () {
      var o = getSel(), isText = o && o.t === "text";
      if (document.activeElement !== input) input.value = tgt().text;
      modeNote.textContent = isText
        ? "Editing the selected text. Tap empty space to start a new one."
        : "Pick a style to place it. Drag to move, pull the corner to resize, nudge with ← ↑ ↓ →, Delete to remove.";
    });
    function defaultText() { return input.value.trim() || "your words"; }
    var addBtn = h("button", { type: "button", class: "btn pbs-add", onclick: function () {
      var s = tgt();
      addTextObj({ text: defaultText(), font: s.font, color: s.color, fx: s.fx, size: s.size, hl: s.hl });
    } }, "Add text");

    var strip = h("div", { class: "pbs-carousel-track" });
    TEXT_PRESETS.forEach(function (p) {
      var c = pxCanvas(132, 52);
      var b = h("button", { type: "button", class: "pbs-preset", "aria-label": label(p), title: label(p), onclick: function () {
        var typed = !getSel() && draftText.text.trim();
        addTextObj({ text: typed || presetText(p), font: p.font, color: p.color, fx: p.fx, size: p.size, hl: p.hl });
      } }, c);
      strip.appendChild(b);
      presetCanvases.push({ c: c, p: p });
    });
    drawPresetPreviews();
    var carousel = h("div", { class: "pbs-carousel" },
      h("button", { type: "button", class: "pbs-car-btn", "aria-label": "Previous styles", onclick: function () { strip.scrollBy({ left: -200, behavior: "smooth" }); } }, "‹"),
      strip,
      h("button", { type: "button", class: "pbs-car-btn", "aria-label": "Next styles", onclick: function () { strip.scrollBy({ left: 200, behavior: "smooth" }); } }, "›")
    );

    var fontSel = h("select", { class: "pbs-select", "aria-label": "Font style" }, FONTS.map(function (f) { return h("option", { value: f.id, text: label(f) }); }));
    fontSel.addEventListener("change", function () { tgt().font = fontSel.value; requestRender(); commit(); drawPresetPreviews(); });
    addSync(function () { fontSel.value = tgt().font; });

    var fxSel = h("select", { class: "pbs-select", "aria-label": "Colour style" }, FX.map(function (f) { return h("option", { value: f.id, text: label(f) }); }));
    fxSel.addEventListener("change", function () { apply(function () { var t = tgt(); t.fx = fxSel.value; if (fxSel.value !== "highlight") delete t.hl; }); drawPresetPreviews(); });
    addSync(function () { fxSel.value = tgt().fx; });
    var colors = h("div", { class: "pbs-colors" },
      swatchRow(TEXT_COLORS, function () { return tgt().color; }, function (c) { var t = tgt(); t.color = c; if (t.fx === "highlight") delete t.hl; }),
      colorField("Custom colour", function () { return tgt().color; }, function (v) { var t = tgt(); t.color = v; if (t.fx === "highlight") delete t.hl; })
    );
    var size = slider("Size", { min: 12, max: 120, step: 1, get: function () { return Math.round(tgt().size); }, set: function (v) { tgt().size = v; }, fmt: function (v) { return v; } });

    return [
      group("Your words", [h("div", { class: "pbs-row" }, input, addBtn), modeNote]),
      group("Styles", carousel),
      group("Font style", fontSel),
      group("Colour style", fxSel),
      group("Colour", colors),
      size
    ];
  }

  /* ---- Filters (shared grid) ---- */
  function filterGrid(get, set, small) {
    var wrap = h("div", { class: "pbs-filter-grid" + (small ? " small" : ""), role: "group" });
    var sz = small ? 44 : 60;
    var btns = FILTERS.map(function (f) {
      var c = newCanvas(sz * 2, sz * 2);
      c.style.width = sz + "px"; c.style.height = sz + "px";
      var b = h("button", { type: "button", class: "pbs-filter", "aria-pressed": "false", onclick: function () { set(f.id); syncUI(); } }, c, h("span", { text: label(f) }));
      b._id = f.id;
      filterThumbs.push({ canvas: c, filter: f });
      wrap.appendChild(b);
      return b;
    });
    addSync(function () {
      var cur = get();
      btns.forEach(function (b) {
        var on = b._id === cur;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
    return wrap;
  }
  function updateFilterThumbs() {
    if (!shots[0]) return;
    filterThumbs.forEach(function (t) {
      var c = t.canvas, ctx = c.getContext("2d");
      coverDraw(ctx, shots[0], c.width, c.height);
      var id = ctx.getImageData(0, 0, c.width, c.height);
      applyFilterPixels(id.data, t.filter, 1);
      ctx.putImageData(id, 0, 0);
    });
  }
  function pct(v) { return Math.round(v * 100) + "%"; }

  function buildFiltersTab() {
    return [
      note("One look for the whole strip. Use Spot to give part of a photo a different one."),
      filterGrid(function () { return st.filter; }, function (id) { apply(function () { st.filter = id; }); }),
      slider("Intensity", { min: 0, max: 100, get: function () { return Math.round(st.filterK * 100); }, set: function (v) { st.filterK = v / 100; }, fmt: function (v) { return v + "%"; } }),
      slider("Film grain", { min: 0, max: 100, get: function () { return Math.round(st.grain * 100); }, set: function (v) { st.grain = v / 100; }, fmt: function (v) { return v + "%"; } }),
      slider("Vignette", { min: 0, max: 100, get: function () { return Math.round(st.vignette * 100); }, set: function (v) { st.vignette = v / 100; }, fmt: function (v) { return v + "%"; } }),
      toggle("Camera date stamp", function () { return st.stamp; }, function (v) { apply(function () { st.stamp = v; }); })
    ];
  }

  /* ---- Dot art tab ---- */
  function buildDotTab() {
    var inkRow = colorField("Ink colour", function () { return st.dot.ink; }, function (v) { st.dot.ink = v; });
    addSync(function () { inkRow.hidden = st.dot.mode !== "ink"; });
    return [
      note("Turn your photos into halftone dot art. Blend it with the photo or go all in."),
      toggle("Dot art", function () { return st.dot.on; }, function (v) { apply(function () { st.dot.on = v; }); }),
      group("Shape", chipGroup(DOT_SHAPES.map(function (s) { return { id: s.id, label: label(s) }; }), {
        get: function () { return st.dot.shape; }, set: function (id) { apply(function () { st.dot.shape = id; st.dot.on = true; }); }
      })),
      group("Style", chipGroup([
        { id: "colour", label: "Colour glow" }, { id: "ink", label: "Ink on paper" }
      ], { get: function () { return st.dot.mode; }, set: function (id) { apply(function () { st.dot.mode = id; st.dot.on = true; }); } })),
      inkRow,
      slider("Dot size", { min: 3, max: 16, step: 1, get: function () { return st.dot.size; }, set: function (v) { st.dot.size = v; st.dot.on = true; } }),
      slider("Blend with photo", { min: 10, max: 100, get: function () { return Math.round(st.dot.mix * 100); }, set: function (v) { st.dot.mix = v / 100; st.dot.on = true; }, fmt: function (v) { return v + "%"; } })
    ];
  }

  /* ---- Spot tab ---- */
  function buildSpotTab() {
    function tgt() { var o = getSel(); return o && o.t === "spot" ? o : draftSpot; }
    return [
      note("Put a window anywhere on your photo — inside it, a different filter. Drag it to move, pull the corner to resize."),
      group("Shape", chipGroup(SPOT_SHAPES.map(function (s) { return { id: s.id, label: label(s) }; }), {
        get: function () { return tgt().shape; }, set: function (id) { apply(function () { tgt().shape = id; }); }
      })),
      h("button", { type: "button", class: "btn pbs-add", onclick: function () {
        var s = tgt();
        addSpotObj({ shape: s.shape, filter: s.filter, k: s.k, ring: s.ring });
      } }, "+ " + "Add a spot"),
      group("Filter inside", filterGrid(function () { return tgt().filter; }, function (id) { apply(function () { tgt().filter = id; }); }, true)),
      slider("Intensity", { min: 0, max: 100, get: function () { return Math.round(tgt().k * 100); }, set: function (v) { tgt().k = v / 100; }, fmt: function (v) { return v + "%"; } }),
      toggle("White outline", function () { return tgt().ring; }, function (v) { apply(function () { tgt().ring = v; }); })
    ];
  }

  /* ---- Backdrop tab ---- */
  function loadBackdropFile(file) {
    if (!file) return;
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      userBackdropImg = img;
      backdropVer++;
      apply(function () { st.backdrop.mode = "picture"; st.backdrop.pic = "upload"; });
      syncUI();
    };
    img.onerror = function () { setStatus("That file couldn't be opened as a picture."); };
    img.src = url;
  }

  function buildBackdropTab() {
    var bd = function () { return st.backdrop; };
    var solids = h("div", { class: "pbs-solids" });
    var solidBtns = BACKDROP_SOLIDS.map(function (s) {
      var b = h("button", { type: "button", class: "pbs-solid", title: label(s), "aria-label": label(s), style: { background: s.c }, onclick: function () { apply(function () { bd().mode = "solid"; bd().color = s.c; }); syncUI(); } });
      b._c = s.c; solids.appendChild(b); return b;
    });
    addSync(function () { solidBtns.forEach(function (b) { b.classList.toggle("on", bd().mode === "solid" && bd().color.toLowerCase() === b._c); }); });
    var solidWrap = h("div", { class: "pbs-group" }, solids,
      colorField("Custom colour", function () { return bd().color; }, function (v) { bd().mode = "solid"; bd().color = v; }));

    var picGrid = h("div", { class: "pbs-pics" });
    var picBtns = BACKDROP_PICS.map(function (p) {
      var c = newCanvas(108, 192);
      c.style.width = "54px"; c.style.height = "96px";
      p._c = c;
      var b = h("button", { type: "button", class: "pbs-pic", "aria-pressed": "false", onclick: function () { apply(function () { bd().mode = "picture"; bd().pic = p.id; }); syncUI(); } }, c, h("span", { text: label(p) }));
      b._p = p; picGrid.appendChild(b); return b;
    });
    var fileInput = h("input", { type: "file", accept: "image/*", hidden: true });
    fileInput.addEventListener("change", function () { loadBackdropFile(fileInput.files && fileInput.files[0]); fileInput.value = ""; });
    var upBtn = h("button", { type: "button", class: "pb-btn-outline pbs-upload", onclick: function () { fileInput.click(); } }, "Use your own picture");
    addSync(function () {
      picBtns.forEach(function (b) {
        var on = bd().mode === "picture" && bd().pic === b._p.id;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
    var picWrap = h("div", { class: "pbs-group" }, picGrid, upBtn, fileInput);

    function paintPicThumbs() {
      // painted at 270 px wide so patterns keep their proportions, then shrunk
      var big = newCanvas(270, 480), bctx = big.getContext("2d");
      BACKDROP_PICS.forEach(function (p) {
        bctx.clearRect(0, 0, 270, 480);
        paintBackdropPicture(bctx, p.id, 270, 480);
        var ctx = p._c.getContext("2d");
        ctx.clearRect(0, 0, p._c.width, p._c.height);
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(big, 0, 0, p._c.width, p._c.height);
      });
    }
    paintPicThumbs();
    picThumbPainter = paintPicThumbs;

    var extra = h("div", { class: "pbs-group" },
      slider("Strip size", { min: 60, max: 110, get: function () { return Math.round(bd().size * 100); }, set: function (v) { bd().size = v / 100; }, fmt: function (v) { return v + "%"; } }),
      slider("Tilt", { min: -12, max: 12, step: 1, get: function () { return bd().tilt; }, set: function (v) { bd().tilt = v; }, fmt: function (v) { return v + "°"; } }),
      toggle("Drop shadow", function () { return bd().shadow; }, function (v) { apply(function () { bd().shadow = v; }); })
    );
    addSync(function () {
      solidWrap.hidden = bd().mode !== "solid";
      picWrap.hidden = bd().mode !== "picture";
      extra.hidden = bd().mode === "none";
    });

    return [
      note("Lay your strip on a backdrop and the download becomes a ready-to-post 1080×1920 image."),
      chipGroup([
        { id: "none", label: "None" }, { id: "solid", label: "Solid colour" }, { id: "picture", label: "Pictures" }
      ], { aria: "Backdrop type", get: function () { return bd().mode; }, set: function (id) { apply(function () { bd().mode = id; }); } }),
      solidWrap, picWrap, extra
    ];
  }
  var picThumbPainter = null;

  /* ---- toolbar, selection bar, actions ---- */
  function iconBtn(text, aria, fn) {
    return h("button", { type: "button", class: "pbs-ibtn", "aria-label": aria, title: aria, onclick: fn }, text);
  }

  function buildToolbar() {
    undoBtn = iconBtn("↶", "Undo", undo);
    redoBtn = iconBtn("↷", "Redo", redo);
    var gutterBtn = h("button", { type: "button", class: "pbs-tbtn", "aria-pressed": "true", onclick: function () { setGutters(!st.gutters); syncUI(); } }, "Gutters");
    var cutBtn = h("button", { type: "button", class: "pbs-tbtn", "aria-pressed": "false", onclick: function () {
      cutMode = !cutMode;
      if (cutMode) selectObj(null, { keepTab: true });
      syncUI(); requestRender();
    } }, "Cut strip");
    var resetBtn = h("button", { type: "button", class: "pbs-tbtn", onclick: resetLayoutTools }, "Reset");
    addSync(function () {
      gutterBtn.setAttribute("aria-pressed", st.gutters ? "true" : "false");
      gutterBtn.classList.toggle("on", st.gutters);
      cutBtn.setAttribute("aria-pressed", cutMode ? "true" : "false");
      cutBtn.classList.toggle("on", cutMode);
      cutBtn.disabled = shots.length < 2;
      if (cutHintEl) cutHintEl.hidden = !cutMode;
    });
    return h("div", { class: "pbs-toolbar", role: "toolbar", "aria-label": "Strip tools" },
      h("div", { class: "pbs-tool-sliders" },
        slider("Zoom", { cls: "compact", min: 100, max: 200, get: function () { return Math.round(st.zoom * 100); }, set: function (v) { st.zoom = v / 100; }, fmt: function (v) { return v + "%"; } }),
        slider("Eye line", { cls: "compact", min: -100, max: 100, guide: true, get: function () { return Math.round(st.eye * 100); }, set: function (v) { st.eye = v / 100; }, fmt: function (v) { return v > 0 ? "+" + v : v; } })
      ),
      h("div", { class: "pbs-tool-btns" }, undoBtn, redoBtn, gutterBtn, cutBtn, resetBtn)
    );
  }

  function buildSelBar() {
    var defs = [
      { id: "dup", text: "Copy", full: "Duplicate", fn: function (o) { duplicateObj(o.id); } },
      { id: "flip", text: "Flip", full: "Flip", fn: function (o) { apply(function () { o.flip = !o.flip; }); } },
      { id: "straight", text: "Level", full: "Straighten", fn: function (o) { apply(function () { o.rot = 0; }); syncUI(); } },
      { id: "front", text: "Front", full: "Bring forward", fn: function (o) { moveZ(o.id, 1); } },
      { id: "back", text: "Back", full: "Send backward", fn: function (o) { moveZ(o.id, -1); } },
      { id: "del", text: "Delete", full: "Delete", fn: function (o) { removeObj(o.id); }, cls: "danger" }
    ];
    var btns = {};
    var bar = h("div", { class: "pbs-selbar", role: "toolbar", "aria-label": "Selected item" });
    defs.forEach(function (d) {
      var b = h("button", { type: "button", class: "pbs-sbtn" + (d.cls ? " " + d.cls : ""), title: d.full, "aria-label": d.full, onclick: function () { var o = getSel(); if (o) d.fn(o); } }, d.text);
      btns[d.id] = b; bar.appendChild(b);
    });
    addSync(function () {
      var o = getSel();
      bar.classList.toggle("on", !!o);
      if (!o) return;
      btns.flip.hidden = o.t !== "sticker";
      btns.straight.disabled = !o.rot;
    });
    return bar;
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text || "";
  }

  function buildActions() {
    statusEl = h("p", { class: "pbs-status", role: "status", "aria-live": "polite" });
    function busyWrap(btn, fn) {
      btn.addEventListener("click", function () {
        var all = actionsEl.querySelectorAll("button");
        all.forEach(function (b) { b.disabled = true; });
        Promise.resolve().then(fn).catch(function (e) {
          console.warn("[studio] export", e);
          setStatus("Something went wrong while saving. Please try again.");
        }).then(function () { all.forEach(function (b) { b.disabled = false; }); updateHistoryUI(); });
      });
      return btn;
    }
    var dl = busyWrap(h("button", { type: "button", class: "btn pb-download-btn" }, h("span", { class: "pb-btn-icon", "aria-hidden": "true", text: "⬇" }), "Download PNG"), exportPNG);
    var again = h("button", { type: "button", class: "pb-btn-outline pbs-newbooth", onclick: function () {
      var b = bridge();
      if (typeof b.onNewBooth === "function") b.onNewBooth();
    } }, "Start a new booth");
    actionsEl = h("div", { class: "pbs-actions" }, h("div", { class: "pbs-action-row" }, dl), statusEl, again);
    return actionsEl;
  }
  var actionsEl = null;

  var TABS = [
    { id: "frame", icon: "🖼️", label: "Frame", build: buildFrameTab },
    { id: "stickers", icon: "✨", label: "Stickers", build: buildStickersTab },
    { id: "text", icon: "Aa", label: "Text", build: buildTextTab },
    { id: "dots", icon: "◍", label: "Dot art", build: buildDotTab },
    { id: "filters", icon: "🎞️", label: "Filters", build: buildFiltersTab },
    { id: "spot", icon: "🔍", label: "Spot", build: buildSpotTab },
    { id: "backdrop", icon: "🌄", label: "Backdrop", build: buildBackdropTab }
  ];

  function buildUI(root) {
    root.innerHTML = "";
    syncers = [];
    filterThumbs = [];
    presetCanvases = [];
    tabsMap = {};

    var toolbar = buildToolbar();
    canvasEl = h("canvas", { class: "pbs-canvas", "aria-hidden": "true" });
    overlayEl = h("canvas", { class: "pbs-overlay", tabindex: "0", role: "application",
      "aria-label": "Strip editor. Arrow keys move the selected item, plus and minus resize it, Delete removes it." });
    overlayEl.style.touchAction = "pan-y";
    overlayEl.addEventListener("pointerdown", onPointerDown);
    overlayEl.addEventListener("pointermove", onPointerMove);
    overlayEl.addEventListener("pointerup", onPointerUp);
    overlayEl.addEventListener("pointercancel", onPointerUp);
    overlayEl.addEventListener("keydown", onKeyDown);
    canvasWrapEl = h("div", { class: "pbs-canvas-wrap" }, canvasEl, overlayEl);
    stageEl = h("div", { class: "pbs-stage" }, canvasWrapEl);
    selbarEl = buildSelBar();
    cutHintEl = h("p", { class: "pbs-hint pbs-cut-hint", hidden: true, text: "Snip between the frames — the backdrop shows through. Tap a line to cut, tap again to rejoin." });
    var hint = h("p", { class: "pbs-hint", text: "Drag to move · corner to resize · arrow keys to nudge" });
    var stageCol = h("div", { class: "pbs-stagecol" }, toolbar, stageEl, selbarEl, cutHintEl, hint);

    var tablist = h("div", { class: "pbs-tabs", role: "tablist", "aria-label": "Editing tools" });
    var panels = h("div", { class: "pbs-panels" });
    TABS.forEach(function (t) {
      var btn = h("button", { type: "button", role: "tab", class: "pbs-tab", id: "pbsTab-" + t.id, "aria-controls": "pbsPanel-" + t.id, "aria-selected": "false",
        onclick: function () { showTab(t.id); } },
        h("span", { class: "pbs-tab-ic", "aria-hidden": "true", text: t.icon }), h("span", { text: label(t) }));
      btn.addEventListener("keydown", function (e) {
        var i = TABS.indexOf(t), n = null;
        if (e.key === "ArrowRight") n = TABS[(i + 1) % TABS.length];
        else if (e.key === "ArrowLeft") n = TABS[(i + TABS.length - 1) % TABS.length];
        if (n) { e.preventDefault(); showTab(n.id); tabsMap[n.id].btn.focus(); }
      });
      var panel = h("section", { class: "pbs-tabpanel", role: "tabpanel", id: "pbsPanel-" + t.id, "aria-labelledby": "pbsTab-" + t.id, hidden: true }, t.build());
      tabsMap[t.id] = { btn: btn, panel: panel };
      tablist.appendChild(btn);
      panels.appendChild(panel);
    });
    var panelCol = h("div", { class: "pbs-panelcol" }, h("div", { class: "pbs-sheet" }, tablist, panels), buildActions());

    root.appendChild(h("div", { class: "pbs" }, stageCol, panelCol));
    showTab(activeTab);
    updateHistoryUI();
    syncUI();
    ensureFonts();
    customLoaded = false;
    loadCustomStickers();
  }

  /* ---- web fonts for canvas text ---- */
  var fontsAsked = false;
  var FONT_CSS = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@700&family=Lobster&family=Pacifico&family=Permanent+Marker&family=Press+Start+2P&family=Special+Elite&display=swap";
  function ensureFonts() {
    if (fontsAsked || !document.fonts || !document.fonts.load) return;
    fontsAsked = true;
    // these fonts are only needed inside the editor, so they load when it first opens
    if (!document.querySelector('link[data-pbs-fonts]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet"; link.href = FONT_CSS; link.setAttribute("data-pbs-fonts", "");
      document.head.appendChild(link);
    }
    var loads = FONTS.map(function (f) {
      return document.fonts.load((f.style ? f.style + " " : "") + f.w + " 32px " + f.css.split(",")[0]).catch(function () {});
    });
    loads.push(document.fonts.load("400 32px 'Special Elite'").catch(function () {}));
    var ready = new Promise(function (res) {
      var l = document.querySelector('link[data-pbs-fonts]');
      if (!l || l.sheet) { res(); return; }
      l.addEventListener("load", res); l.addEventListener("error", res);
      setTimeout(res, 4000);
    });
    ready.then(function () { return Promise.all(loads); }).then(function () {
      invalidate();
      drawPresetPreviews();
      requestRender();
    });
  }

  /* ------------------------------------------------------------------
     exporting: PNG
  ------------------------------------------------------------------ */
  function tick(ms) { return new Promise(function (r) { setTimeout(r, ms || 30); }); }
  function toBlob(c, type, q) { return new Promise(function (res) { c.toBlob(res, type || "image/png", q); }); }
  function saveBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  function stamp() { return Date.now(); }

  function renderExportCanvas() {
    L = computeLayout();
    var g;
    if (hasBackdrop()) {
      g = geometry(BACKDROP_W);
    } else {
      var S = Math.min(4, 8000 / L.h, Math.sqrt(14e6 / (L.w * L.h)));
      g = geometry(L.w * S);
    }
    var c = newCanvas(g.W, g.H);
    paintStage(c.getContext("2d"), g, { cache: false });
    return c;
  }

  function exportPNG() {
    setStatus("Rendering your strip…");
    return tick().then(function () {
      var c = renderExportCanvas();
      return toBlob(c);
    }).then(function (blob) {
      saveBlob(blob, "photobooth-strip-" + stamp() + ".png");
      setStatus("Saved ♥");
    });
  }

  /* ------------------------------------------------------------------
     public API — called from app.js
  ------------------------------------------------------------------ */
  function enterStudioMode(on) {
    var legacy = document.getElementById("pbLegacyEditor");
    if (legacy) legacy.hidden = !!on;
    var wrap = document.querySelector("#tab-photobooth .pb-wrap");
    var panel = document.getElementById("pbPreviewStage");
    if (wrap) wrap.classList.toggle("pbs-active", !!on);
    if (panel) panel.classList.toggle("pbs-panel", !!on);
    document.body.classList.toggle("pbs-editing", !!on);
  }

  function refresh() {
    var b = bridge();
    if (typeof b.getShots !== "function") return false;
    var arr = (b.getShots() || []).filter(Boolean);
    var root = document.getElementById("pbStudioRoot");
    if (!arr.length || !root) return false;
    solo = !!(typeof b.isSolo === "function" && b.isSolo());
    var same = shots.length === arr.length && arr.every(function (im, i) { return im === shots[i]; });
    if (!same) {
      shots = arr.slice();
      st.cuts = st.cuts.slice(0, Math.max(0, shots.length - 1));
      invalidate();
    }
    var fresh = rootEl !== root || !canvasEl || !root.contains(canvasEl);
    if (fresh) {
      rootEl = root;
      enterStudioMode(true);
      L = computeLayout();
      buildUI(root);
      if (!hist.length) resetHistory();
    }
    if (fresh || !same) {
      updateFilterThumbs();
      if (picThumbPainter) picThumbPainter();
      syncUI();
    }
    L = computeLayout();
    requestRender();
    return true;
  }

  function reset() {
    st = defaultState();
    shots = [];
    selId = null;
    cutMode = false;
    eyeGuide = false;
    hist = []; hIdx = -1;
    userBackdropImg = null;
    backdropVer++;
    dropIdx = 0;
    invalidate();
    layerCache.clear();
    rootEl = null;
    canvasEl = null;
    enterStudioMode(false);
    var root = document.getElementById("pbStudioRoot");
    if (root) root.innerHTML = "";
  }

  window.addEventListener("resize", function () { if (canvasEl) requestRender(); });

  window.PBStudio = {
    refresh: refresh,
    reset: reset,
    // small read-only window for tests / debugging
    _debug: {
      state: function () { return st; },
      layout: function () { return L; },
      view: function () { return view; },
      selGeom: function () { var o = getSel(); return o ? selGeom(o) : null; },
      exportCanvas: renderExportCanvas
    }
  };
})();
