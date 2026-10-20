"""Original bouquet art for the couple website template.

Every flower and bow is drawn here from scratch as SVG (shaded petals,
veins, soft shadow) and rendered to a transparent PNG with Chromium.
Optional — the PNGs are already in assets/stickers/. To restyle them:

    pip install playwright && playwright install chromium
    python3 tools/draw-bouquet-art.py assets/stickers

Each entry in ART (bottom of the file) becomes <name>.png. Change colors in
the flower functions, re-run, and refresh the site.
"""
import math, random, sys, os, asyncio

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
S = 600  # canvas size

_gid = [0]
def gid(p="g"):
    _gid[0] += 1
    return f"{p}{_gid[0]}"

def f(n):
    return f"{n:.1f}"

# ------------------------------------------------------------ helpers
def lin(stops, x1=0, y1=1, x2=0, y2=0):
    """vertical (base→tip) gradient in the shape's own box"""
    i = gid("l")
    st = "".join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{a}"/>' for o, c, a in
                 [(s + (1,)) if len(s) == 2 else s for s in stops])
    return i, f'<linearGradient id="{i}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">{st}</linearGradient>'

def rad(stops, cx=.5, cy=.5, r=.5, fx=None, fy=None):
    i = gid("r")
    st = "".join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{a}"/>' for o, c, a in
                 [(s + (1,)) if len(s) == 2 else s for s in stops])
    fxy = f' fx="{fx}" fy="{fy}"' if fx is not None else ""
    return i, f'<radialGradient id="{i}" cx="{cx}" cy="{cy}" r="{r}"{fxy}>{st}</radialGradient>'

def bez(p0, p1, p2, p3, n=14):
    out = []
    for k in range(n):
        t = k / n
        mt = 1 - t
        out.append((mt**3*p0[0] + 3*mt*mt*t*p1[0] + 3*mt*t*t*p2[0] + t**3*p3[0],
                    mt**3*p0[1] + 3*mt*mt*t*p1[1] + 3*mt*t*t*p2[1] + t**3*p3[1]))
    return out

def smooth(pts, closed=True):
    """Catmull-Rom through points → cubic path"""
    n = len(pts)
    d = f"M{f(pts[0][0])},{f(pts[0][1])}"
    rng = range(n) if closed else range(n - 1)
    for i in rng:
        p0 = pts[(i - 1) % n] if closed or i > 0 else pts[i]
        p1 = pts[i]
        p2 = pts[(i + 1) % n]
        p3 = pts[(i + 2) % n] if closed or i + 2 < n else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{f(c1[0])},{f(c1[1])} {f(c2[0])},{f(c2[1])} {f(p2[0])},{f(p2[1])}"
    return d + (" Z" if closed else "")

def petal_pts(L, w, tip="round", wave=0.0, waves=5, rnd=None, base=0.0):
    """outline points of a petal pointing up (-y) from (0,0)"""
    rnd = rnd or random.Random(1)
    if tip == "point":
        right = bez((base, 0), (w*.85, -L*.18), (w*.75, -L*.72), (0, -L))
    elif tip == "notch":
        right = bez((base, 0), (w*.75, -L*.15), (w*1.0, -L*.7), (w*.42, -L*.99)) + [(w*.18, -L*.985), (0, -L*.93)]
    else:  # round
        right = bez((base, 0), (w*.7, -L*.08), (w*1.05, -L*.62), (w*.7, -L*.9)) + \
                bez((w*.7, -L*.9), (w*.5, -L*1.03), (w*.15, -L*1.02), (0, -L*1.0))
    left = [(-x, y) for x, y in reversed(right[1:])]
    pts = right + left[:-1] + ([(-base, 0)] if base else [])
    if wave:
        ph = rnd.uniform(0, 6.28)
        out = []
        for k, (x, y) in enumerate(pts):
            t = -y / L
            if t > .45:
                a = math.atan2(y, x)
                r = math.hypot(x, y)
                amt = wave * L * (t - .45) / .55 * math.sin(k / len(pts) * waves * 6.283 + ph)
                out.append((x + math.cos(a) * amt, y + math.sin(a) * amt))
            else:
                out.append((x, y))
        pts = out
    return pts

def petal(L, w, fill, edge, tip="round", wave=0, waves=5, rnd=None, vein=None, veins=1, base=0.0, sw=1.4):
    d = smooth(petal_pts(L, w, tip, wave, waves, rnd, base))
    s = f'<path d="{d}" fill="url(#{fill})" stroke="{edge}" stroke-opacity=".45" stroke-width="{sw}"/>'
    if vein:
        for v in range(veins):
            off = (v - (veins - 1) / 2) * w * .28
            s += (f'<path d="M0,{-L*.06} Q{f(off*1.2)},{-L*.45} {f(off*1.6)},{-L*.8}" fill="none" '
                  f'stroke="{vein}" stroke-opacity=".28" stroke-width="1.6" stroke-linecap="round"/>')
    return s

def g(content, tx=0, ty=0, rot=0, sc=1):
    return f'<g transform="translate({f(tx)},{f(ty)}) rotate({f(rot)}) scale({sc})">{content}</g>'

SHADOW = ('<filter id="sh" x="-20%" y="-20%" width="140%" height="140%">'
          '<feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#3a2a20" flood-opacity=".22"/></filter>')

def svg(defs, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}">'
            f'<defs>{SHADOW}{"".join(defs)}</defs><g filter="url(#sh)">{body}</g></svg>')

def stem(d, w=10, c1="#4f7a3a", c2="#6f9a4f"):
    i, gr = lin([(0, c1), (1, c2)], 0, 0, 1, 0)
    return gr, f'<path d="{d}" fill="none" stroke="url(#{i})" stroke-width="{w}" stroke-linecap="round"/>'

def leaf(L, w, c_base="#557f3e", c_tip="#7fa85c", vein="#3d5f2c"):
    i, gr = lin([(0, c_base), (1, c_tip)])
    d = smooth(petal_pts(L, w, "point"))
    s = (f'<path d="{d}" fill="url(#{i})" stroke="{vein}" stroke-opacity=".4" stroke-width="1.2"/>'
         f'<path d="M0,-4 Q{w*.12},{-L*.5} 0,{-L*.95}" fill="none" stroke="{vein}" stroke-opacity=".45" stroke-width="1.6"/>')
    return gr, s

# ------------------------------------------------------------ flowers
def rose():
    r = random.Random(3); defs = []; b = ""
    rings = [(235, 175, 5, 0), (205, 150, 5, 36), (170, 125, 5, 12), (135, 100, 4, 50), (100, 80, 4, 5)]
    shades = [("#7e0f1d", "#c8364a", "#e35d6e"), ("#7a0d1b", "#bb2b40", "#d94a5e"),
              ("#6e0a18", "#ad2236", "#c93a4f"), ("#640816", "#9e1b2e", "#ba2f44"), ("#5a0614", "#901627", "#ab263a")]
    for (L, w, n, off), (c0, c1, c2) in zip(rings, shades):
        i, gr = lin([(0, c0), (.55, c1), (1, c2)]); defs.append(gr)
        for k in range(n):
            a = off + k * 360 / n + r.uniform(-6, 6)
            b += g(petal(L * r.uniform(.94, 1.04), w, i, "#4a0510", wave=.02, waves=3, rnd=r), 300, 300, a)
    # cupped centre swirl
    for k, (rr, dx, dy) in enumerate([(70, 6, 4), (54, -5, 2), (40, 4, -3), (27, -2, 3), (15, 1, -1)]):
        i, gr = rad([(0, "#5a0614"), (.75, ["#a51f33", "#9a1a2e", "#8e1528", "#7e1022", "#6a0b1a"][k]), (1, "#c23a4e")], fx=.45, fy=.4)
        defs.append(gr)
        b += f'<circle cx="{300+dx}" cy="{300+dy}" r="{rr}" fill="url(#{i})" stroke="#4a0510" stroke-opacity=".5" stroke-width="1.4"/>'
        b += (f'<path d="M{300+dx-rr*.8},{300+dy+rr*.25} A{rr},{rr*.9} 0 0 0 {300+dx+rr*.75},{300+dy+rr*.35}" '
              f'fill="none" stroke="#e7707f" stroke-opacity=".55" stroke-width="2"/>')
    return svg(defs, b)

def tulip():
    defs = []; b = ""
    gr, s = stem("M300,330 C304,410 292,480 300,575", 13); defs.append(gr); b += s
    gr, lf = leaf(250, 52); defs.append(gr); b += g(lf, 298, 560, -24)
    gr, lf = leaf(190, 40); defs.append(gr); b += g(lf, 302, 565, 30)
    ib, gr = lin([(0, "#b8325a"), (.6, "#e2668a"), (1, "#f39ab3")]); defs.append(gr)
    ifr, gr = lin([(0, "#c43d66"), (.5, "#ef7a9b"), (1, "#fbb9cb")]); defs.append(gr)
    cup = lambda W, H: (f"M{-W},0 C{-W*1.25},{-H*.45} {-W*.8},{-H*.9} 0,{-H} "
                        f"C{W*.8},{-H*.9} {W*1.25},{-H*.45} {W},0 C{W*.6},{H*.22} {-W*.6},{H*.22} {-W},0 Z")
    b += g(f'<path d="{cup(62, 205)}" fill="url(#{ib})" stroke="#8a1f40" stroke-opacity=".45" stroke-width="1.5"/>', 268, 345, -14)
    b += g(f'<path d="{cup(62, 205)}" fill="url(#{ib})" stroke="#8a1f40" stroke-opacity=".45" stroke-width="1.5"/>', 332, 345, 14)
    b += g(f'<path d="{cup(78, 215)}" fill="url(#{ifr})" stroke="#8a1f40" stroke-opacity=".5" stroke-width="1.6"/>'
           f'<path d="M0,10 C-6,-70 -4,-140 0,-200" fill="none" stroke="#a52a52" stroke-opacity=".25" stroke-width="2"/>'
           f'<path d="M-30,-30 C-50,-90 -40,-150 -12,-190" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/>',
           300, 352)
    return svg(defs, b)

def sunflower():
    r = random.Random(5); defs = []; b = ""
    i1, gr = lin([(0, "#c8780c"), (.5, "#f2b51c"), (1, "#ffd451")]); defs.append(gr)
    i2, gr = lin([(0, "#d98a10"), (.5, "#f8c425"), (1, "#ffe07a")]); defs.append(gr)
    for ring, (n, L, w, off, gi) in enumerate([(22, 250, 40, 0, i1), (22, 225, 38, 360/44, i2)]):
        for k in range(n):
            b += g(petal(L * r.uniform(.92, 1.05), w, gi, "#9c5a06", "point", vein="#b86d08", veins=2, rnd=r),
                   300, 300, off + k * 360 / n + r.uniform(-3, 3))
    ic, gr = rad([(0, "#3a2210"), (.7, "#5a3518"), (1, "#7a4a1c")]); defs.append(gr)
    b += f'<circle cx="300" cy="300" r="98" fill="url(#{ic})"/>'
    for k in range(320):
        rr = 5.4 * math.sqrt(k)
        if rr > 92: break
        a = k * 137.508 * math.pi / 180
        col = "#2a170a" if rr < 50 else "#8a5a22"
        b += f'<circle cx="{f(300+rr*math.cos(a))}" cy="{f(300+rr*math.sin(a))}" r="{2.6 if rr<50 else 2.9}" fill="{col}" opacity=".85"/>'
    return svg(defs, b)

def daisy():
    r = random.Random(7); defs = []; b = ""
    i, gr = lin([(0, "#d9d2c4"), (.35, "#ffffff"), (1, "#fbfaf6")]); defs.append(gr)
    for ring, (n, L, off) in enumerate([(30, 230, 0), (30, 205, 6)]):
        for k in range(n):
            b += g(petal(L * r.uniform(.9, 1.06), 24, i, "#a69b88", "round", vein="#bdb3a2", rnd=r),
                   300, 300, off + k * 360 / n + r.uniform(-2.5, 2.5))
    ic, gr = rad([(0, "#ffe46b"), (.6, "#f5c220"), (1, "#d99a0b")], fx=.4, fy=.35); defs.append(gr)
    b += f'<circle cx="300" cy="300" r="62" fill="url(#{ic})" stroke="#b07a08" stroke-opacity=".5"/>'
    for k in range(150):
        rr = 4.8 * math.sqrt(k)
        if rr > 56: break
        a = k * 137.508 * math.pi / 180
        b += f'<circle cx="{f(300+rr*math.cos(a))}" cy="{f(300+rr*math.sin(a))}" r="2.2" fill="#c98b07" opacity=".7"/>'
    return svg(defs, b)

def peony():
    r = random.Random(11); defs = []; b = ""
    rings = [(240, 165, 7), (215, 150, 7), (185, 130, 7), (150, 110, 6), (115, 90, 6), (80, 66, 5), (48, 44, 5)]
    for j, (L, w, n) in enumerate(rings):
        t = j / (len(rings) - 1)
        base = ["#b8436a", "#c24f75", "#cc5c80", "#d66a8c", "#df7a99", "#e88ca8", "#ef9db5"][j]
        tipc = ["#f3b6c8", "#f5bccd", "#f7c3d2", "#f8c9d6", "#facfdb", "#fbd6e1", "#fcdde6"][j]
        i, gr = lin([(0, base), (.55, "#ec98b1"), (1, tipc)]); defs.append(gr)
        off = r.uniform(0, 360)
        for k in range(n):
            b += g(petal(L * r.uniform(.9, 1.05), w * r.uniform(.9, 1.1), i, "#8f3354", "round",
                         wave=.05, waves=7, rnd=r), 300 + r.uniform(-4, 4), 300 + r.uniform(-4, 4),
                   off + k * 360 / n + r.uniform(-8, 8))
    for k in range(18):
        a = r.uniform(0, 6.28); rr = r.uniform(4, 22)
        b += f'<circle cx="{f(300+rr*math.cos(a))}" cy="{f(300+rr*math.sin(a))}" r="3" fill="#f2c94c" opacity=".8"/>'
    return svg(defs, b)

def lavender():
    r = random.Random(13); defs = []; b = ""
    for sx, curve, top in [(285, -30, 40), (318, 28, 70)]:
        gr, s = stem(f"M{sx},585 C{sx+curve*.2},450 {sx+curve},250 {sx+curve*1.2},{top}", 6, "#6b8a58", "#89a874")
        defs.append(gr); b += s
        for k in range(46):
            t = k / 46
            y = top + t * 300
            px = sx + curve * 1.2 * (1 - t) ** 1.1 + curve * .2 * t
            sz = 1 - t * .3
            for side in (-1, 1):
                c = r.choice(["#7b5fb8", "#8c6cc8", "#6c4fa6", "#9a7fd4", "#5d4395"])
                b += (f'<ellipse cx="{f(px+side*r.uniform(5,12)*sz)}" cy="{f(y+r.uniform(-3,3))}" rx="{f(7*sz)}" ry="{f(11*sz)}" '
                      f'fill="{c}" stroke="#3f2a70" stroke-opacity=".35" transform="rotate({f(side*r.uniform(15,40))} {f(px)} {f(y)})"/>')
            if k % 7 == 6: b += ""  # small gaps feel natural
    for rot, L in [(-38, 160), (32, 140)]:
        gr, lf = leaf(L, 16, "#6f8f62", "#9bb68c", "#4f6b44"); defs.append(gr); b += g(lf, 300, 585, rot)
    return svg(defs, b)

def cornflower():
    r = random.Random(17); defs = []; b = ""
    i, gr = lin([(0, "#1f3c8f"), (.5, "#3a63c9"), (1, "#6f95ea")]); defs.append(gr)
    def floret(L, w):
        d = (f"M{-w*.25},0 L{-w*.6},{-L*.7} L{-w},{-L*.86} L{-w*.62},{-L*.92} L{-w*.42},{-L} L{-w*.12},{-L*.9} "
             f"L0,{-L*1.02} L{w*.12},{-L*.9} L{w*.42},{-L} L{w*.62},{-L*.92} L{w},{-L*.86} L{w*.6},{-L*.7} L{w*.25},0 Z")
        return (f'<path d="{d}" fill="url(#{i})" stroke="#132a66" stroke-opacity=".5" stroke-width="1.3" stroke-linejoin="round"/>'
                f'<path d="M0,-8 L0,{-L*.82}" stroke="#16307a" stroke-opacity=".35" stroke-width="1.5"/>')
    for k in range(11):
        b += g(floret(r.uniform(190, 215), 46), 300, 300, k * 360 / 11 + r.uniform(-5, 5))
    for k in range(9):
        b += g(floret(r.uniform(120, 140), 32), 300, 300, 18 + k * 40 + r.uniform(-5, 5))
    ic, gr = rad([(0, "#2a1450"), (1, "#4a2a86")]); defs.append(gr)
    b += f'<circle cx="300" cy="300" r="42" fill="url(#{ic})"/>'
    for k in range(40):
        a = r.uniform(0, 6.28); rr = r.uniform(0, 40)
        b += f'<circle cx="{f(300+rr*math.cos(a))}" cy="{f(300+rr*math.sin(a))}" r="3.2" fill="#7b5cc4" opacity=".85"/>'
    return svg(defs, b)

def gerbera():
    r = random.Random(19); defs = []; b = ""
    i1, gr = lin([(0, "#c8410c"), (.45, "#f26a1b"), (1, "#ff9748")]); defs.append(gr)
    i2, gr = lin([(0, "#d44e10"), (.45, "#f77c2a"), (1, "#ffad66")]); defs.append(gr)
    for n, L, w, off, gi in [(24, 250, 36, 0, i1), (24, 215, 32, 7.5, i2)]:
        for k in range(n):
            b += g(petal(L * r.uniform(.93, 1.04), w, gi, "#8e2c05", "notch", vein="#b8400a", veins=2, rnd=r),
                   300, 300, off + k * 360 / n + r.uniform(-2, 2))
    for k in range(60):
        a = k * 6 * math.pi / 180
        b += (f'<line x1="{f(300+55*math.cos(a))}" y1="{f(300+55*math.sin(a))}" x2="{f(300+74*math.cos(a))}" '
              f'y2="{f(300+74*math.sin(a))}" stroke="#ffcf3a" stroke-width="3" stroke-linecap="round"/>')
    ic, gr = rad([(0, "#9fae3a"), (.45, "#5d6a1c"), (.75, "#3b2a10"), (1, "#2a1a08")]); defs.append(gr)
    b += f'<circle cx="300" cy="300" r="60" fill="url(#{ic})"/>'
    return svg(defs, b)

def cherry_blossom():
    r = random.Random(23); defs = []; b = ""
    br = "M70,560 C170,470 240,430 330,330 C380,275 430,220 520,150"
    b += f'<path d="{br}" fill="none" stroke="#5a3a28" stroke-width="16" stroke-linecap="round"/>'
    b += '<path d="M300,365 C340,380 380,400 430,395" fill="none" stroke="#5a3a28" stroke-width="9" stroke-linecap="round"/>'
    b += f'<path d="{br}" fill="none" stroke="#8a6248" stroke-width="4" stroke-linecap="round" opacity=".5" transform="translate(-3,-4)"/>'
    i, gr = lin([(0, "#e98aa6"), (.4, "#fbcfdc"), (1, "#fff4f7")]); defs.append(gr)
    def blossom(cx, cy, sc, rot):
        s = ""
        for k in range(5):
            s += g(petal(78, 48, i, "#c76b88", "notch", vein="#e48aa6", rnd=r), 0, 0, k * 72 + r.uniform(-4, 4))
        for k in range(16):
            a = k * 22.5 * math.pi / 180 + r.uniform(-.1, .1); L = r.uniform(26, 38)
            s += (f'<line x1="0" y1="0" x2="{f(L*math.cos(a))}" y2="{f(L*math.sin(a))}" stroke="#c2456d" stroke-width="1.6"/>'
                  f'<circle cx="{f(L*math.cos(a))}" cy="{f(L*math.sin(a))}" r="3" fill="#f2c14e"/>')
        s += '<circle r="9" fill="#c94a72"/>'
        return g(s, cx, cy, rot, sc)
    il, gr = lin([(0, "#5f8a3e"), (1, "#9cc06a")]); defs.append(gr)
    for (x, y, rot) in [(385, 262, 40), (220, 452, -120)]:
        b += g(f'<path d="{smooth(petal_pts(70, 26, "point"))}" fill="url(#{il})" stroke="#3d5f2c" stroke-opacity=".4"/>', x, y, rot)
    b += blossom(260, 395, 1.35, 10)
    b += blossom(420, 230, 1.15, 40)
    b += blossom(430, 395, .95, -15)
    for (x, y) in [(505, 150), (150, 495)]:
        b += f'<ellipse cx="{x}" cy="{y}" rx="13" ry="18" fill="#f2a7bd" stroke="#c76b88" stroke-opacity=".5" transform="rotate(35 {x} {y})"/>'
    return svg(defs, b)

def calla():
    defs = []; b = ""
    gr, s = stem("M300,360 C296,430 306,500 300,585", 14, "#4e7b36", "#7aa555"); defs.append(gr); b += s
    i, gr = lin([(0, "#8db35e"), (.25, "#e8efd9"), (.55, "#ffffff"), (1, "#fbfaf4")]); defs.append(gr)
    spathe = ("M300,370 C250,350 205,280 215,200 C222,140 260,85 330,55 C360,42 395,40 420,48 "
              "C392,70 378,110 380,160 C383,240 360,320 300,370 Z")
    b += f'<path d="{spathe}" fill="url(#{i})" stroke="#8c9a78" stroke-opacity=".55" stroke-width="1.6"/>'
    ii, gr = lin([(0, "#cdd7bc"), (1, "#f2f2ea")], 0, 0, 1, 0); defs.append(gr)
    b += f'<path d="M330,55 C360,42 395,40 420,48 C392,70 378,110 380,160 C350,150 330,110 330,55 Z" fill="url(#{ii})" opacity=".9"/>'
    isp, gr = lin([(0, "#e6a51a"), (1, "#ffd84a")]); defs.append(gr)
    b += f'<path d="M304,300 C292,250 300,170 325,125 C338,170 330,250 314,300 Z" fill="url(#{isp})" stroke="#b67b0c" stroke-opacity=".5"/>'
    b += '<path d="M240,170 C238,230 260,300 300,345" fill="none" stroke="#fff" stroke-width="6" stroke-opacity=".6" stroke-linecap="round"/>'
    return svg(defs, b)

def anemone():
    r = random.Random(29); defs = []; b = ""
    i, gr = lin([(0, "#6b3f8f"), (.3, "#c9a6dc"), (.6, "#f4ecf8"), (1, "#ffffff")]); defs.append(gr)
    for ring, (n, L, w, off) in enumerate([(6, 225, 160, 0), (6, 190, 135, 30)]):
        for k in range(n):
            b += g(petal(L * r.uniform(.94, 1.04), w, i, "#7d5a96", "round", wave=.03, waves=4, rnd=r,
                         vein="#9a7ab2", veins=3), 300, 300, off + k * 60 + r.uniform(-5, 5))
    for k in range(70):
        a = r.uniform(0, 6.28); rr = r.uniform(48, 76)
        b += (f'<line x1="{f(300+40*math.cos(a))}" y1="{f(300+40*math.sin(a))}" x2="{f(300+rr*math.cos(a))}" '
              f'y2="{f(300+rr*math.sin(a))}" stroke="#1e1426" stroke-width="1.6"/>'
              f'<circle cx="{f(300+rr*math.cos(a))}" cy="{f(300+rr*math.sin(a))}" r="3.4" fill="#18101f"/>')
    ic, gr = rad([(0, "#3a2e4a"), (.6, "#1a1424"), (1, "#0e0a14")], fx=.4, fy=.35); defs.append(gr)
    b += f'<circle cx="300" cy="300" r="44" fill="url(#{ic})"/>'
    return svg(defs, b)

def hydrangea():
    r = random.Random(31); defs = []; b = ""
    for rot, x in [(-120, 230), (125, 370)]:
        gr, lf = leaf(190, 75); defs.append(gr); b += g(lf, x, 330, rot)
    palette = [("#5b6fc4", "#a9b8f0"), ("#7a6fcf", "#c3b8f2"), ("#6d8fd8", "#b9cdf5"), ("#8f7fd6", "#d2c6f5")]
    grads = []
    for c0, c1 in palette:
        i, gr = rad([(0, "#f5f3ff"), (.25, c1), (1, c0)]); defs.append(gr); grads.append(i)
    pts = []
    for k in range(130):
        rr = 200 * math.sqrt((k + .5) / 130); a = k * 137.508 * math.pi / 180
        pts.append((300 + rr * math.cos(a) + r.uniform(-6, 6), 290 + rr * math.sin(a) * .9 + r.uniform(-6, 6)))
    r.shuffle(pts)
    for x, y in pts:
        gi = r.choice(grads); sz = r.uniform(27, 35); rot = r.uniform(0, 90)
        fl = ""
        for k in range(4):
            fl += g(f'<path d="{smooth(petal_pts(sz, sz*.62, "round"))}" fill="url(#{gi})" stroke="#3d3f8a" stroke-opacity=".35" stroke-width="1.1"/>', 0, 0, k * 90)
        fl += '<circle r="3.5" fill="#f6f0ff" stroke="#6a5fb0" stroke-width="1"/>'
        b += g(fl, x, y, rot)
    return svg(defs, b)

def eucalyptus():
    r = random.Random(37); defs = []; b = ""
    path = [(300 + 40 * math.sin(t * 2.4) - 20 * t, 585 - t * 530) for t in [k / 40 for k in range(41)]]
    b += f'<path d="{smooth(path, False)}" fill="none" stroke="#7b6a5a" stroke-width="5" stroke-linecap="round"/>'
    i, gr = rad([(0, "#c9d8cc"), (.6, "#9db8a6"), (1, "#6f9480")], fx=.4, fy=.35); defs.append(gr)
    for k in range(2, 40, 2):
        x, y = path[k]
        sz = 46 - k * .75
        side = 1 if (k // 2) % 2 else -1
        for side in (side,):
            cx = x + side * sz * .9; cy = y + r.uniform(-4, 4)
            b += (f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(sz*.8)}" ry="{f(sz*.68)}" fill="url(#{i})" '
                  f'stroke="#56715f" stroke-opacity=".45" stroke-width="1.3" transform="rotate({f(side*r.uniform(5,20))} {f(cx)} {f(cy)})"/>'
                  f'<path d="M{f(x)},{f(y)} L{f(cx+side*sz*.5)},{f(cy)}" stroke="#6b8a76" stroke-opacity=".5" stroke-width="1.4"/>')
    return svg(defs, b)

# ------------------------------------------------------------ bows
def bow(dark, mid, light):
    defs = []
    i, gr = lin([(0, dark), (.35, mid), (.55, light), (.75, mid), (1, dark)], 0, 1, 0, 0); defs.append(gr)
    j, gr = lin([(0, dark), (.4, mid), (.6, light), (1, mid)], 0, 0, 1, 0); defs.append(gr)
    k, gr = rad([(0, light), (.7, mid), (1, dark)], fx=.4, fy=.35); defs.append(gr)
    b = ""
    tail_l = "M292,272 C270,330 238,400 205,470 L240,458 L262,492 C284,410 300,340 308,280 Z"
    tail_r = "M306,272 C330,330 364,398 400,462 L366,456 L346,490 C322,410 302,340 294,280 Z"
    b += f'<path d="{tail_l}" fill="url(#{j})" stroke="{dark}" stroke-opacity=".6" stroke-width="1.5"/>'
    b += f'<path d="{tail_r}" fill="url(#{j})" stroke="{dark}" stroke-opacity=".6" stroke-width="1.5"/>'
    loop_l = "M300,255 C240,170 120,140 100,205 C86,262 168,318 300,270 Z"
    loop_r = "M300,255 C360,170 480,140 500,205 C514,262 432,318 300,270 Z"
    b += f'<path d="{loop_l}" fill="url(#{i})" stroke="{dark}" stroke-opacity=".6" stroke-width="1.5"/>'
    b += f'<path d="{loop_r}" fill="url(#{i})" stroke="{dark}" stroke-opacity=".6" stroke-width="1.5"/>'
    b += f'<path d="M300,258 C250,220 170,205 150,232 C180,245 245,255 300,264 Z" fill="{dark}" opacity=".45"/>'
    b += f'<path d="M300,258 C350,220 430,205 450,232 C420,245 355,255 300,264 Z" fill="{dark}" opacity=".45"/>'
    b += f'<path d="M140,190 C175,170 225,180 262,215" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/>'
    b += f'<path d="M460,190 C425,170 375,180 338,215" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/>'
    b += f'<rect x="274" y="234" width="52" height="56" rx="18" fill="url(#{k})" stroke="{dark}" stroke-opacity=".7" stroke-width="1.5"/>'
    return svg(defs, b)

ART = {
    "flower-red-rose": rose,
    "flower-pink-tulip": tulip,
    "flower-sunflower": sunflower,
    "flower-white-daisy": daisy,
    "flower-pink-peony": peony,
    "flower-lavender": lavender,
    "flower-blue-cornflower": cornflower,
    "flower-orange-gerbera": gerbera,
    "flower-cherry-blossom": cherry_blossom,
    "flower-white-calla-lily": calla,
    "flower-purple-anemone": anemone,
    "flower-blue-hydrangea": hydrangea,
    "flower-eucalyptus": eucalyptus,
    "bow-pink-satin": lambda: bow("#a8546d", "#e08ea6", "#fbd3df"),
    "bow-navy-satin": lambda: bow("#14224a", "#2f4682", "#8095cf"),
    "bow-sage-satin": lambda: bow("#4f6b4a", "#86a07c", "#cfdcc6"),
}

async def main():
    from playwright.async_api import async_playwright
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        br = await p.chromium.launch()
        pg = await br.new_page(viewport={"width": S, "height": S}, device_scale_factor=1)
        for name, fn in ART.items():
            _gid[0] = 0
            await pg.set_content(f'<html><body style="margin:0;background:transparent">{fn()}</body></html>')
            await pg.locator("svg").screenshot(path=os.path.join(OUT, name + ".png"), omit_background=True)
            print("ok", name)
        await br.close()

asyncio.run(main())
