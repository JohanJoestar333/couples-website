"""Original demo photos for the couple website template.

Soft illustrated scenes (with a little film grain) used as placeholder
photos on the demo: the hero, the closing photo and a few album pictures.
Replace them with your own photos in assets/photos/ — see js/data/config.js.

Optional — the JPEGs are already in assets/photos/demo/. To redraw them:

    pip install playwright pillow && playwright install chromium
    python3 tools/draw-demo-photos.py assets/photos/demo
"""
import math, random, sys, os, asyncio

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
W, H = 900, 1200
_n = [0]


def uid(p):
    _n[0] += 1
    return f"{p}{_n[0]}"


def f(n):
    return f"{n:.1f}"


def lg(stops, x1=0, y1=0, x2=0, y2=1):
    i = uid("l")
    st = "".join(f'<stop offset="{o}" stop-color="{c}"{"" if len(s) < 3 else f" stop-opacity={chr(34)}{s[2]}{chr(34)}"}/>'
                 for s in stops for o, c in [s[:2]])
    return i, f'<linearGradient id="{i}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">{st}</linearGradient>'


def rg(stops, cx=.5, cy=.5, r=.5):
    i = uid("r")
    st = "".join(f'<stop offset="{o}" stop-color="{c}"{"" if len(s) < 3 else f" stop-opacity={chr(34)}{s[2]}{chr(34)}"}/>'
                 for s in stops for o, c in [s[:2]])
    return i, f'<radialGradient id="{i}" cx="{cx}" cy="{cy}" r="{r}">{st}</radialGradient>'


def ridge(y0, amp, seed, step=30, rough=.5, top=None):
    """closed path of a hill/mountain ridge from left to right, filled down to the bottom"""
    r = random.Random(seed)
    pts = []
    x = -20
    ph = r.uniform(0, 6)
    while x <= W + 40:
        y = y0 + math.sin(x / 260 + ph) * amp + math.sin(x / 97 + ph * 2) * amp * .35 + r.uniform(-1, 1) * amp * rough * .3
        pts.append((x, y))
        x += step
    d = f"M{-20},{H+20} " + " ".join(f"L{f(x)},{f(y)}" for x, y in pts) + f" L{W+40},{H+20} Z"
    return d


def peaks(base, heights, seed):
    r = random.Random(seed)
    d = f"M-20,{H+20} L-20,{base}"
    x = -20
    for h in heights:
        w = r.uniform(170, 260)
        d += f" L{f(x + w*.5)},{f(base - h)} L{f(x + w)},{f(base - r.uniform(0, 40))}"
        x += w
    d += f" L{W+20},{base} L{W+20},{H+20} Z"
    return d


FINISH = '''
<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>
  <feComponentTransfer><feFuncA type="table" tableValues="0 0.10"/></feComponentTransfer>
</filter>
<radialGradient id="vig" cx=".5" cy=".48" r=".75">
  <stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/>
</radialGradient>
<filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="blur20"><feGaussianBlur stdDeviation="20"/></filter>
'''


def svg(defs, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
            f'<defs>{FINISH}{"".join(defs)}</defs>{body}'
            f'<rect width="{W}" height="{H}" fill="url(#vig)"/>'
            f'<rect width="{W}" height="{H}" filter="url(#grain)"/></svg>')


def stars(n, ymax, seed, op=.9):
    r = random.Random(seed)
    s = ""
    for _ in range(n):
        x, y = r.uniform(0, W), r.uniform(0, ymax) ** 1.0
        rr = r.choice([.8, 1, 1.2, 1.6, 2.2])
        s += f'<circle cx="{f(x)}" cy="{f(y)}" r="{rr}" fill="#fff" opacity="{f(r.uniform(.3, op))}"/>'
    return s


# ---------------------------------------------------------------- people
def sitting_pair(cx, cy, col, rim):
    """two people sitting side by side, seen from behind, heads leaning in"""
    a = (f'<g transform="translate({cx-62},{cy})">'
         f'<path d="M-62,10 C-66,-60 -50,-120 0,-128 C50,-120 66,-60 62,10 Z" fill="{col}"/>'      # back
         f'<path d="M-30,-118 C-20,-140 20,-140 30,-118 Z" fill="{col}"/>'                         # neck
         f'<g transform="rotate(10 0 -170)"><circle cx="0" cy="-172" r="40" fill="{col}"/>'
         f'<path d="M-40,-178 C-42,-220 40,-224 42,-180 C30,-200 -20,-204 -40,-178 Z" fill="{col}"/></g>'  # short hair
         f'<path d="M-58,-40 C-62,-90 -40,-122 0,-128" fill="none" stroke="{rim}" stroke-width="3" opacity=".55"/>'
         f'</g>')
    b = (f'<g transform="translate({cx+58},{cy+4})">'
         f'<path d="M-54,6 C-58,-56 -44,-108 0,-114 C44,-108 58,-56 54,6 Z" fill="{col}"/>'
         f'<g transform="rotate(-12 0 -156)"><circle cx="0" cy="-158" r="36" fill="{col}"/>'
         f'<path d="M-38,-160 C-44,-205 44,-205 38,-160 C46,-120 40,-80 28,-60 C10,-70 -10,-70 -28,-60 C-40,-80 -46,-120 -38,-160 Z" fill="{col}"/></g>'  # long hair
         f'<path d="M54,-30 C58,-80 42,-108 0,-114" fill="none" stroke="{rim}" stroke-width="3" opacity=".55"/>'
         f'</g>')
    arm = f'<path d="M{cx-20},{cy-70} C{cx},{cy-60} {cx+10},{cy-62} {cx+24},{cy-72}" stroke="{col}" stroke-width="22" stroke-linecap="round" fill="none"/>'
    return a + b + arm


def standing_pair(cx, cy, col):
    """two people standing, from behind, holding hands"""
    def person(x, y, h, long_hair):
        hair = (f'<path d="M{x-30},{y-h+40} C{x-36},{y-h-6} {x+36},{y-h-6} {x+30},{y-h+40} C{x+34},{y-h+80} {x+26},{y-h+110} {x+18},{y-h+120} '
                f'L{x-18},{y-h+120} C{x-26},{y-h+110} {x-34},{y-h+80} {x-30},{y-h+40} Z" fill="{col}"/>') if long_hair else ""
        return (f'<circle cx="{x}" cy="{y-h+40}" r="30" fill="{col}"/>{hair}'
                f'<path d="M{x-48},{y-h+88} C{x-50},{y-h+150} {x-44},{y-h*.45} {x-36},{y-h*.42} L{x+36},{y-h*.42} '
                f'C{x+44},{y-h*.45} {x+50},{y-h+150} {x+48},{y-h+88} C{x+30},{y-h+72} {x-30},{y-h+72} {x-48},{y-h+88} Z" fill="{col}"/>'
                f'<rect x="{x-32}" y="{y-h*.44}" width="27" height="{h*.44}" rx="12" fill="{col}"/>'
                f'<rect x="{x+5}" y="{y-h*.44}" width="27" height="{h*.44}" rx="12" fill="{col}"/>')
    return (person(cx - 55, cy, 330, False) + person(cx + 52, cy + 6, 305, True) +
            f'<path d="M{cx-10},{cy-170} C{cx},{cy-150} {cx+5},{cy-150} {cx+12},{cy-168}" stroke="{col}" stroke-width="18" stroke-linecap="round" fill="none"/>')


# ---------------------------------------------------------------- scenes
def hero_hilltop():
    d = []; b = ""
    i, gr = lg([(0, "#1d2350"), (.35, "#5a4a8a"), (.6, "#e38c8a"), (.78, "#f7c07a"), (1, "#ffe2a6")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    b += stars(70, 330, 1, .8)
    i, gr = rg([(0, "#fff6d8"), (.25, "#ffd98a", .9), (1, "#ffb36b", 0)]); d.append(gr)
    b += f'<circle cx="610" cy="760" r="300" fill="url(#{i})"/><circle cx="610" cy="760" r="64" fill="#fff3cf"/>'
    for k, (y0, amp, c) in enumerate([(760, 26, "#b5779a"), (810, 30, "#8d5f8e"), (860, 34, "#5e4a78")]):
        b += f'<path d="{ridge(y0, amp, 10+k)}" fill="{c}" opacity=".95"/>'
    b += f'<path d="M-20,{H+20} L-20,960 C200,900 380,860 470,858 C600,860 760,920 940,990 L940,{H+20} Z" fill="#2a2440"/>'
    b += f'<path d="M260,895 C360,866 420,858 470,858 C560,860 650,885 720,912" fill="none" stroke="#f7b77a" stroke-width="3" opacity=".6"/>'
    r = random.Random(3)
    for _ in range(120):
        x = r.uniform(0, W); y = r.uniform(940, H)
        b += f'<path d="M{f(x)},{f(y)} q{f(r.uniform(-4,4))},-{f(r.uniform(10,26))} {f(r.uniform(-6,6))},-{f(r.uniform(18,34))}" stroke="#3c3358" stroke-width="2" fill="none"/>'
    for _ in range(26):
        x = r.uniform(30, W - 30); y = r.uniform(990, H - 30)
        c = r.choice(["#f7a6b8", "#ffd27a", "#c8b6f2", "#fff"])
        b += f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r.uniform(3,6))}" fill="{c}" opacity=".85"/>'
    b += sitting_pair(470, 872, "#1c1830", "#ffbf80")
    for bx, by in [(200, 420), (240, 400), (275, 430)]:
        b += f'<path d="M{bx-12},{by} q12,-9 12,0 q0,-9 12,0" stroke="#3a2d55" stroke-width="2.4" fill="none"/>'
    return svg(d, b)


def final_umbrella():
    d = []; b = ""
    i, gr = lg([(0, "#0e1530"), (.6, "#24305a"), (1, "#3b3f6b")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    r = random.Random(5)
    x = -20
    while x < W:
        bw = r.uniform(90, 170); bh = r.uniform(380, 700)
        col = r.choice(["#161d3a", "#1b2344", "#20294d"])
        b += f'<rect x="{f(x)}" y="{f(820-bh)}" width="{f(bw)}" height="{f(bh)}" fill="{col}"/>'
        for wy in range(int(820 - bh + 30), 800, 38):
            for wx in range(int(x + 14), int(x + bw - 20), 30):
                if r.random() < .45:
                    b += f'<rect x="{wx}" y="{wy}" width="16" height="22" fill="{r.choice(["#ffd88a","#ffc46b","#ffe7b0"])}" opacity="{f(r.uniform(.5,.95))}"/>'
        x += bw + r.uniform(0, 12)
    i, gr = lg([(0, "#2b2d4a"), (1, "#0f1226")]); d.append(gr)
    b += f'<rect y="820" width="{W}" height="{H-820}" fill="url(#{i})"/>'
    for lx in (120, 780):
        b += f'<rect x="{lx-4}" y="560" width="8" height="270" fill="#0b0e1c"/><circle cx="{lx}" cy="560" r="16" fill="#ffe6a8"/>'
        b += f'<circle cx="{lx}" cy="560" r="110" fill="#ffd27a" opacity=".22" filter="url(#blur20)"/>'
        b += f'<rect x="{lx-14}" y="840" width="28" height="300" fill="#ffd27a" opacity=".18" filter="url(#blur8)"/>'
    for _ in range(60):
        xx = r.uniform(0, W)
        b += f'<rect x="{f(xx)}" y="{f(r.uniform(840,1150))}" width="{f(r.uniform(4,10))}" height="{f(r.uniform(30,120))}" fill="{r.choice(["#ffd88a","#ff9db0","#9ec4ff"])}" opacity=".12" filter="url(#blur3)"/>'
    b += standing_pair(450, 1080, "#0a0c18")
    b += ('<path d="M290,720 C300,610 600,610 610,720 C590,700 565,700 545,722 C525,700 495,700 475,722 '
          'C455,700 425,700 405,722 C385,700 355,700 335,722 C320,702 300,702 290,720 Z" fill="#e2566e"/>'
          '<path d="M450,640 C452,620 448,612 450,606" stroke="#0a0c18" stroke-width="5" fill="none"/>'
          '<path d="M450,640 L450,860" stroke="#0a0c18" stroke-width="5"/>'
          '<path d="M300,700 C340,650 400,632 450,630" stroke="#ff8fa0" stroke-width="4" fill="none" opacity=".7"/>')
    for _ in range(260):
        xx, yy = r.uniform(-40, W), r.uniform(-20, H)
        b += f'<line x1="{f(xx)}" y1="{f(yy)}" x2="{f(xx-8)}" y2="{f(yy+30)}" stroke="#cfe0ff" stroke-width="1.4" opacity="{f(r.uniform(.15,.4))}"/>'
    return svg(d, b)


def beach_sunset():
    d = []; b = ""
    i, gr = lg([(0, "#ff9a8b"), (.4, "#ffb88a"), (.62, "#ffd59e"), (.64, "#5b8fb9"), (.85, "#3f6f99"), (1, "#355f86")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    b += '<circle cx="450" cy="768" r="95" fill="#fff0c4"/><rect y="768" width="900" height="120" fill="#5b8fb9"/>'
    b += '<circle cx="450" cy="768" r="260" fill="#ffd27a" opacity=".35" filter="url(#blur20)"/>'
    r = random.Random(8)
    for k in range(22):
        y = 776 + k * 9; w = 190 - k * 7 + r.uniform(-20, 20)
        b += f'<rect x="{f(450-w/2)}" y="{y}" width="{f(w)}" height="3" rx="1.5" fill="#ffe4a8" opacity="{f(.85-k*.03)}"/>'
    for k in range(5):
        y = 870 + k * 26
        b += f'<path d="{"M-20,"+str(y)+" "+" ".join(f"q30,{-8 if j%2 else 8} 60,0" for j in range(17))}" stroke="#a8cbe6" stroke-width="2" fill="none" opacity=".45"/>'
    i, gr = lg([(0, "#f4d6a8"), (1, "#e2b47c")]); d.append(gr)
    b += f'<path d="M-20,{H+20} L-20,1000 C200,965 500,975 940,1010 L940,{H+20} Z" fill="url(#{i})"/>'
    b += '<path d="M-20,1000 C200,965 500,975 940,1010" stroke="#fff" stroke-width="6" fill="none" opacity=".6"/>'
    for k in range(9):
        x = 520 + k * 28; y = 1170 - k * 22
        b += f'<ellipse cx="{x + (10 if k%2 else -10)}" cy="{y}" rx="7" ry="12" fill="#c9965e" opacity=".55"/>'
    # palm
    b += '<path d="M150,1080 C170,900 200,760 260,640" stroke="#3a2a2c" stroke-width="22" fill="none" stroke-linecap="round"/>'
    for a in (-160, -120, -70, -20, 20, 60):
        b += f'<path d="M260,640 q{f(110*math.cos(math.radians(a)))},{f(110*math.sin(math.radians(a))-30)} {f(200*math.cos(math.radians(a)))},{f(200*math.sin(math.radians(a))+40)} q-{f(60*math.cos(math.radians(a)))},-30 -{f(200*math.cos(math.radians(a)))},-{f(200*math.sin(math.radians(a))+40)} Z" fill="#33262b"/>'
    # two beach chairs
    for x in (560, 690):
        b += (f'<path d="M{x},1060 L{x+80},1060 L{x+40},960 L{x-10},960 Z" fill="{["#e86f6f","#4fa3a5"][x>600]}"/>'
              f'<path d="M{x-10},960 L{x+20},1090 M{x+40},960 L{x+90},1090 M{x},1060 L{x-14},1090" stroke="#6a4a3a" stroke-width="5"/>')
    for bx, by in [(640, 420), (680, 400)]:
        b += f'<path d="M{bx-12},{by} q12,-9 12,0 q0,-9 12,0" stroke="#7a4a5a" stroke-width="2.4" fill="none"/>'
    return svg(d, b)


def cafe_table():
    d = []; b = ""
    i, gr = lg([(0, "#9b6a45"), (1, "#7a4f33")], 0, 0, 1, 0); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    r = random.Random(11)
    for k in range(6):
        b += f'<rect x="{k*150}" y="0" width="2" height="{H}" fill="#5a3824" opacity=".6"/>'
        for _ in range(14):
            x = k * 150 + r.uniform(10, 140)
            b += f'<path d="M{f(x)},0 C{f(x+r.uniform(-14,14))},400 {f(x+r.uniform(-14,14))},800 {f(x)},{H}" stroke="#6a432b" stroke-width="{f(r.uniform(1,2.4))}" fill="none" opacity=".35"/>'
    i, gr = rg([(0, "#fff"), (.82, "#f2ede6"), (1, "#d6cfc4")]); d.append(gr)
    ic, gr = rg([(0, "#c88a52"), (.75, "#8a5530"), (1, "#5e3720")]); d.append(gr)
    def cup(cx, cy, rot):
        s = f'<g transform="translate({cx},{cy}) rotate({rot})">'
        s += '<ellipse cx="10" cy="14" rx="170" ry="170" fill="#000" opacity=".18" filter="url(#blur8)"/>'
        s += f'<circle r="165" fill="url(#{i})"/><circle r="150" fill="none" stroke="#e5ddd2" stroke-width="2"/>'
        s += f'<path d="M108,-20 C170,-40 175,40 108,20" stroke="#f4efe8" stroke-width="22" fill="none"/>'
        s += f'<circle r="110" fill="#fbf8f3"/><circle r="94" fill="url(#{ic})"/>'
        s += ('<path d="M0,42 C-40,10 -46,-30 -22,-40 C-8,-46 0,-34 0,-24 C0,-34 8,-46 22,-40 C46,-30 40,10 0,42 Z" fill="#f6e6cf" opacity=".95"/>'
              '<path d="M0,30 C-24,8 -28,-20 -14,-28 M0,30 C24,8 28,-20 14,-28" stroke="#c88a52" stroke-width="2" fill="none" opacity=".6"/>')
        s += '<path d="M-200,120 L-120,150" stroke="#c9c2b6" stroke-width="10" stroke-linecap="round"/>'
        return s + "</g>"
    b += cup(290, 380, -10) + cup(600, 760, 20)
    # croissant
    ib, gr = lg([(0, "#f4c27a"), (.6, "#d88d3e"), (1, "#a8601f")]); d.append(gr)
    b += '<g transform="translate(250,900) rotate(-20)"><ellipse cx="0" cy="10" rx="150" ry="70" fill="#000" opacity=".2" filter="url(#blur8)"/>'
    for k, (x, rx, ry) in enumerate([(-110, 40, 28), (-60, 52, 46), (0, 62, 60), (60, 52, 46), (110, 40, 28)]):
        b += f'<ellipse cx="{x}" cy="{abs(x)*.25}" rx="{rx}" ry="{ry}" fill="url(#{ib})" stroke="#9a5a22" stroke-width="2"/>'
    b += '</g>'
    b += '<g transform="translate(700,250) rotate(12)"><rect x="-60" y="-80" width="120" height="160" rx="6" fill="#f7f3ea"/><path d="M-40,-50 h80 M-40,-25 h80 M-40,0 h60 M-40,25 h70" stroke="#b9ad98" stroke-width="5"/><path d="M10,50 C-10,30 -16,15 -4,10 C2,8 8,14 10,18 C12,14 18,8 24,10 C36,15 30,30 10,50Z" fill="#e2566e"/></g>'
    for x, y in [(520, 1040), (560, 1070)]:
        b += f'<rect x="{x}" y="{y}" width="34" height="34" rx="6" fill="#fffdf8" stroke="#e2dccf" transform="rotate(14 {x} {y})"/>'
    return svg(d, b)


def city_night():
    d = []; b = ""
    i, gr = lg([(0, "#0b0f2e"), (.5, "#2c2a6b"), (.72, "#7a4c8f"), (.74, "#14183a"), (1, "#0c1030")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    b += stars(120, 520, 2)
    b += '<circle cx="680" cy="230" r="150" fill="#fff4d6" opacity=".18" filter="url(#blur20)"/><circle cx="680" cy="230" r="62" fill="#fff6e0"/><circle cx="700" cy="215" r="58" fill="#2c2a6b" opacity=".0"/>'
    r = random.Random(13)
    for layer, (base, col, wl) in enumerate([(880, "#262457", .25), (880, "#17173e", .6)]):
        x = -10
        while x < W:
            bw = r.uniform(50, 110); bh = r.uniform(140, 420) * (1 + layer * .1)
            b += f'<rect x="{f(x)}" y="{f(base-bh)}" width="{f(bw)}" height="{f(bh)}" fill="{col}"/>'
            if r.random() < .25:
                b += f'<rect x="{f(x+bw/2-2)}" y="{f(base-bh-50)}" width="4" height="50" fill="{col}"/><circle cx="{f(x+bw/2)}" cy="{f(base-bh-52)}" r="4" fill="#ff6b7a"/>'
            for wy in range(int(base - bh + 16), base - 10, 22):
                for wx in range(int(x + 8), int(x + bw - 10), 16):
                    if r.random() < wl * .55:
                        b += f'<rect x="{wx}" y="{wy}" width="8" height="11" fill="{r.choice(["#ffd88a","#ffe7b0","#a8d2ff"])}" opacity="{f(r.uniform(.55,1))}"/>'
            x += bw + r.uniform(-6, 6)
    # bridge
    b += '<path d="M-20,900 C200,780 700,780 920,900" stroke="#ffb86b" stroke-width="5" fill="none" opacity=".9"/>'
    for k in range(18):
        x = 20 + k * 50
        yb = 900 - 120 * math.sin(math.pi * (x + 20) / 940)
        b += f'<line x1="{x}" y1="{f(yb)}" x2="{x}" y2="905" stroke="#ffb86b" stroke-width="1.6" opacity=".7"/><circle cx="{x}" cy="{f(yb)}" r="3.4" fill="#fff0c8"/>'
    b += '<rect y="900" width="900" height="14" fill="#0a0c22"/>'
    for _ in range(140):
        x = r.uniform(0, W); y = r.uniform(925, H)
        b += f'<rect x="{f(x)}" y="{f(y)}" width="{f(r.uniform(10,40))}" height="2" fill="{r.choice(["#ffd88a","#ffb86b","#a8d2ff","#fff4d6"])}" opacity="{f(r.uniform(.15,.55))}"/>'
    return svg(d, b)


def picnic():
    d = []; b = ""
    i, gr = lg([(0, "#8fc9ef"), (.55, "#d5ecf7"), (.56, "#9ccc7c"), (1, "#5f9e4f")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    r = random.Random(17)
    for cx, cy, s in [(180, 160, 1), (640, 250, .8), (420, 110, .6)]:
        for k in range(6):
            b += f'<circle cx="{f(cx+(k-2.5)*40*s)}" cy="{f(cy+r.uniform(-14,10)*s)}" r="{f(r.uniform(40,60)*s)}" fill="#fff" opacity=".92"/>'
    b += f'<path d="{ridge(640, 20, 4)}" fill="#7fb866"/>'
    # tree
    b += '<path d="M720,700 C730,600 715,520 735,430" stroke="#6b4a33" stroke-width="34" fill="none"/>'
    for _ in range(26):
        x = 735 + r.uniform(-160, 160); y = 400 + r.uniform(-130, 110)
        b += f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r.uniform(55,85))}" fill="{r.choice(["#4f8a3e","#5e9b48","#6aa853","#447a36"])}"/>'
    b += '<ellipse cx="720" cy="705" rx="220" ry="34" fill="#3f6f34" opacity=".35"/>'
    # blanket in perspective with checks
    q = [(130, 880), (790, 840), (880, 1130), (40, 1180)]
    def lerp(a, c, t): return (a[0] + (c[0] - a[0]) * t, a[1] + (c[1] - a[1]) * t)
    b += f'<path d="M{q[0][0]},{q[0][1]} L{q[1][0]},{q[1][1]} L{q[2][0]},{q[2][1]} L{q[3][0]},{q[3][1]} Z" fill="#fff6f0"/>'
    n = 8
    for a in range(n):
        for c in range(n):
            if (a + c) % 2: continue
            p = [lerp(lerp(q[0], q[3], c / n), lerp(q[1], q[2], c / n), a / n),
                 lerp(lerp(q[0], q[3], c / n), lerp(q[1], q[2], c / n), (a + 1) / n),
                 lerp(lerp(q[0], q[3], (c + 1) / n), lerp(q[1], q[2], (c + 1) / n), (a + 1) / n),
                 lerp(lerp(q[0], q[3], (c + 1) / n), lerp(q[1], q[2], (c + 1) / n), a / n)]
            b += f'<path d="M{" L".join(f"{f(x)},{f(y)}" for x,y in p)} Z" fill="#d9475b" opacity=".85"/>'
    # basket
    b += ('<g transform="translate(330,930)"><ellipse cx="0" cy="70" rx="130" ry="22" fill="#000" opacity=".2"/>'
          '<path d="M-110,0 L110,0 L90,80 L-90,80 Z" fill="#c48a4a"/>'
          + "".join(f'<path d="M{-110+k*22},0 L{-90+k*18},80" stroke="#9a6430" stroke-width="3"/>' for k in range(11))
          + "".join(f'<path d="M-105,{y} L105,{y}" stroke="#9a6430" stroke-width="3"/>' for y in (20, 40, 60))
          + '<path d="M-90,0 C-90,-90 90,-90 90,0" stroke="#9a6430" stroke-width="12" fill="none"/>'
          '<path d="M-110,-6 L110,-6 L100,8 L-100,8 Z" fill="#d9475b"/></g>')
    # bowl of strawberries + glasses
    b += '<ellipse cx="590" cy="1000" rx="90" ry="32" fill="#f2f2f2"/><ellipse cx="590" cy="992" rx="80" ry="22" fill="#e8e8e8"/>'
    for _ in range(12):
        x = 590 + r.uniform(-60, 60); y = 985 + r.uniform(-14, 6)
        b += f'<path d="M{f(x-11)},{f(y-6)} C{f(x-12)},{f(y+10)} {f(x)},{f(y+16)} {f(x)},{f(y+16)} C{f(x)},{f(y+16)} {f(x+12)},{f(y+10)} {f(x+11)},{f(y-6)} Z" fill="#e0344a"/><path d="M{f(x-8)},{f(y-7)} l8,-5 l8,5" stroke="#3f8a2e" stroke-width="3" fill="none"/>'
    for x in (470, 520):
        b += f'<path d="M{x-16},1060 L{x+16},1060 L{x+10},1110 L{x-10},1110 Z" fill="#f5b041" opacity=".85"/><rect x="{x-1.5}" y="1110" width="3" height="26" fill="#ddd"/><ellipse cx="{x}" cy="1138" rx="14" ry="4" fill="#ddd"/>'
    for _ in range(40):
        x = r.uniform(0, W); y = r.uniform(700, H)
        b += f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r.uniform(2,4))}" fill="{r.choice(["#fff","#ffe27a","#f7a6b8"])}" opacity=".8"/>'
    return svg(d, b)


def ramen():
    d = []; b = ""
    i, gr = lg([(0, "#2e2a2a"), (1, "#1c1919")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    r = random.Random(19)
    for k in range(10):
        b += f'<rect x="0" y="{k*120}" width="{W}" height="2" fill="#000" opacity=".4"/>'
    ib, gr = rg([(0, "#f2c58a"), (.7, "#d9a25c"), (1, "#a8712f")]); d.append(gr)
    def bowl(cx, cy, sc):
        s = f'<g transform="translate({cx},{cy}) scale({sc})">'
        s += '<circle r="235" fill="#000" opacity=".35" filter="url(#blur8)" transform="translate(10,14)"/>'
        s += '<circle r="230" fill="#1f3a5f"/><circle r="228" fill="none" stroke="#e8e1d2" stroke-width="10" stroke-dasharray="20 16" opacity=".5"/>'
        s += f'<circle r="195" fill="url(#{ib})"/>'
        for _ in range(26):
            y = r.uniform(-120, 160); x0 = -math.sqrt(max(0, 190 ** 2 - y ** 2)) * .8
            s += f'<path d="M{f(x0)},{f(y)} ' + " ".join(f"q14,{-10 if j%2 else 10} 28,0" for j in range(int(-x0 * 2 / 28))) + '" stroke="#f7e3a8" stroke-width="7" fill="none" opacity=".9"/>'
        s += '<rect x="-170" y="-170" width="90" height="120" rx="6" fill="#18301f" transform="rotate(-15)"/>'
        for ex, ey in [(70, -80), (120, -10)]:
            s += f'<ellipse cx="{ex}" cy="{ey}" rx="52" ry="40" fill="#fffaf0"/><circle cx="{ex}" cy="{ey}" r="24" fill="#f5a623"/>'
        for k in range(4):
            s += f'<circle cx="{-30+k*44}" cy="110" r="34" fill="#e8b6a3" stroke="#c97f68" stroke-width="5"/><circle cx="{-30+k*44}" cy="110" r="14" fill="none" stroke="#c97f68" stroke-width="3"/>'
        for _ in range(40):
            a = r.uniform(0, 6.28); rr = r.uniform(0, 150)
            s += f'<circle cx="{f(rr*math.cos(a))}" cy="{f(rr*math.sin(a))}" r="7" fill="#5aa43c" stroke="#3d7a28" stroke-width="2"/><circle cx="{f(rr*math.cos(a))}" cy="{f(rr*math.sin(a))}" r="3" fill="#a8d88a"/>'
        return s + "</g>"
    b += bowl(330, 360, 1.0) + bowl(580, 860, .95)
    b += '<path d="M600,140 L860,520" stroke="#c49a6c" stroke-width="16" stroke-linecap="round"/><path d="M640,120 L880,500" stroke="#b08558" stroke-width="16" stroke-linecap="round"/>'
    b += '<path d="M60,800 L300,1120" stroke="#c49a6c" stroke-width="16" stroke-linecap="round"/><path d="M95,780 L330,1100" stroke="#b08558" stroke-width="16" stroke-linecap="round"/>'
    for cx in (330, 580):
        for k in range(3):
            b += f'<path d="M{cx-40+k*40},{230 if cx==330 else 730} c-20,-40 20,-60 0,-100" stroke="#fff" stroke-width="10" fill="none" opacity=".12" filter="url(#blur3)"/>'
    return svg(d, b)


def mountain_lake():
    d = []; b = ""
    i, gr = lg([(0, "#a9c9ea"), (.45, "#f6d9d0"), (.5, "#fbe8d6")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    def mtn(base, heights, seed, col, snow):
        dd = peaks(base, heights, seed)
        s = f'<path d="{dd}" fill="{col}"/>'
        return s
    b += mtn(640, [300, 380, 260, 420, 320], 3, "#8a9cc2", True)
    b += '<path d="M180,350 L230,420 L200,415 L170,440 L150,410 Z" fill="#fff" opacity=".0"/>'
    b += mtn(660, [180, 250, 160, 230, 200, 150], 5, "#6b7fa8", False)
    r = random.Random(21)
    # snow caps: draw simple lighter triangles near tops of back range
    rr = random.Random(3); x = -20
    for h in [300, 380, 260, 420, 320]:
        w = rr.uniform(170, 260); px, py = x + w * .5, 640 - h
        b += f'<path d="M{f(px)},{f(py)} L{f(px+w*.13)},{f(py+h*.22)} L{f(px+w*.04)},{f(py+h*.18)} L{f(px-w*.05)},{f(py+h*.24)} L{f(px-w*.13)},{f(py+h*.2)} Z" fill="#f7f9ff"/>'
        x += w; rr.uniform(0, 40)
    # pines
    def pine(x, y, h, col):
        return f'<path d="M{x},{y-h} L{x+h*.22},{y-h*.55} L{x+h*.12},{y-h*.55} L{x+h*.3},{y-h*.15} L{x+h*.18},{y-h*.15} L{x+h*.36},{y} L{x-h*.36},{y} L{x-h*.18},{y-h*.15} L{x-h*.3},{y-h*.15} L{x-h*.12},{y-h*.55} L{x-h*.22},{y-h*.55} Z" fill="{col}"/>'
    pines = ""
    for k in range(30):
        x = k * 32 + r.uniform(-8, 8); h = r.uniform(90, 160)
        pines += pine(x, 700, h, r.choice(["#2f4a3e", "#36564a", "#2a4036"]))
    b += pines + '<rect y="690" width="900" height="12" fill="#2a4036"/>'
    i, gr = lg([(0, "#9fb6d8"), (.5, "#7f9cc6"), (1, "#5d7fae")]); d.append(gr)
    b += f'<rect y="700" width="{W}" height="{H-700}" fill="url(#{i})"/>'
    d.append('<clipPath id="lake"><rect y="702" width="900" height="500"/></clipPath>')
    b += f'<g clip-path="url(#lake)"><g transform="translate(0,1400) scale(1,-1)" opacity=".35">{mtn(700, [180, 250, 160, 230, 200, 150], 5, "#6b7fa8", False)}{pines}</g></g>'
    for k in range(30):
        y = r.uniform(720, 1180); x = r.uniform(0, W)
        b += f'<rect x="{f(x)}" y="{f(y)}" width="{f(r.uniform(40,140))}" height="2" fill="#fff" opacity=".35"/>'
    # little dock
    b += '<path d="M300,1200 L420,980 L480,980 L460,1200 Z" fill="#7a5a44"/>' + "".join(
        f'<path d="M{300+k*0},{1200-k*24} L{460},{1200-k*24}" stroke="#5a3e2c" stroke-width="2"/>' for k in range(0))
    for k in range(9):
        y = 990 + k * 24; t = (y - 980) / 220
        b += f'<line x1="{f(420-120*t)}" y1="{y}" x2="{f(480-20*t)}" y2="{y}" stroke="#5a3e2c" stroke-width="2.5"/>'
    return svg(d, b)


def birthday_cake():
    d = []; b = ""
    i, gr = rg([(0, "#ffe9d6"), (1, "#f4b6b0")], .5, .45, .8); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    r = random.Random(23)
    for _ in range(90):
        x, y = r.uniform(0, W), r.uniform(0, H)
        c = r.choice(["#f2c14e", "#7ec8e3", "#e2566e", "#9b7fd4", "#7fd17f"])
        b += f'<rect x="{f(x)}" y="{f(y)}" width="10" height="5" rx="2" fill="{c}" transform="rotate({f(r.uniform(0,180))} {f(x)} {f(y)})" opacity=".8"/>'
    for bx, by, c in [(150, 300, "#e2566e"), (240, 220, "#7ec8e3"), (720, 260, "#f2c14e"), (800, 350, "#9b7fd4")]:
        b += f'<path d="M{bx},{by+90} C{bx-6},{by+170} {bx+30},{by+230} {bx+10},{by+330}" stroke="#a88" stroke-width="2" fill="none"/>'
        b += f'<ellipse cx="{bx}" cy="{by}" rx="62" ry="76" fill="{c}"/><ellipse cx="{bx-22}" cy="{by-26}" rx="14" ry="22" fill="#fff" opacity=".45"/><path d="M{bx-8},{by+76} L{bx+8},{by+76} L{bx},{by+88} Z" fill="{c}"/>'
    # table
    b += '<rect y="1000" width="900" height="200" fill="#c99a7a"/><rect y="1000" width="900" height="8" fill="#b7856a"/>'
    # cake stand
    b += '<ellipse cx="450" cy="990" rx="270" ry="34" fill="#f7f3ee"/><rect x="420" y="990" width="60" height="70" fill="#ece6de"/><ellipse cx="450" cy="1060" rx="110" ry="18" fill="#ece6de"/>'
    il, gr = lg([(0, "#fff3f6"), (1, "#f6c3cf")]); d.append(gr)
    b += f'<rect x="250" y="760" width="400" height="220" rx="20" fill="url(#{il})"/>'
    b += f'<rect x="300" y="590" width="300" height="180" rx="18" fill="url(#{il})"/>'
    for y0, x0, w in [(760, 250, 400), (590, 300, 300)]:
        dd = f"M{x0},{y0+20} " + "".join(f"q{w/16},{50 if k%2 else 22} {w/8},0 " for k in range(8)) + f"L{x0+w},{y0} L{x0},{y0} Z"
        b += f'<path d="{dd}" fill="#e2566e"/>'
    for k in range(9):
        b += f'<circle cx="{280+k*43}" cy="900" r="9" fill="#fff"/>'
    for k in range(5):
        x = 345 + k * 52
        b += f'<rect x="{x-7}" y="510" width="14" height="82" rx="4" fill="{["#7ec8e3","#f2c14e","#9b7fd4","#7fd17f","#7ec8e3"][k]}"/>'
        b += f'<circle cx="{x}" cy="490" r="34" fill="#ffd27a" opacity=".45" filter="url(#blur8)"/>'
        b += f'<path d="M{x},466 C{x+12},486 {x+10},504 {x},508 C{x-10},504 {x-12},486 {x},466 Z" fill="#ffb238"/><path d="M{x},480 C{x+5},492 {x+4},502 {x},504 C{x-4},502 {x-5},492 {x},480 Z" fill="#fff3c4"/>'
    for x, y in [(130, 1080), (760, 1090)]:
        b += f'<path d="M{x-40},{y} l60,-30 l20,40 Z" fill="#7ec8e3"/><path d="M{x-40},{y} l60,-30" stroke="#fff" stroke-width="3"/>'
    return svg(d, b)


def ferris_wheel():
    d = []; b = ""
    i, gr = lg([(0, "#2b2d6e"), (.45, "#8a5aa8"), (.75, "#f08c8c"), (1, "#ffc98a")]); d.append(gr)
    b += f'<rect width="{W}" height="{H}" fill="url(#{i})"/>'
    b += stars(50, 300, 9, .7)
    cx, cy, R = 450, 560, 330
    b += f'<circle cx="{cx}" cy="{cy}" r="{R+40}" fill="#ffd8a8" opacity=".12" filter="url(#blur20)"/>'
    b += f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="#1f1c3e" stroke-width="10"/><circle cx="{cx}" cy="{cy}" r="{R-24}" fill="none" stroke="#1f1c3e" stroke-width="4"/>'
    r = random.Random(29)
    n = 16
    for k in range(n):
        a = 2 * math.pi * k / n
        x, y = cx + R * math.cos(a), cy + R * math.sin(a)
        b += f'<line x1="{cx}" y1="{cy}" x2="{f(x)}" y2="{f(y)}" stroke="#1f1c3e" stroke-width="3"/>'
    for k in range(64):
        a = 2 * math.pi * k / 64
        x, y = cx + (R - 12) * math.cos(a), cy + (R - 12) * math.sin(a)
        c = ["#ffe08a", "#ff9db0", "#9ee0ff"][k % 3]
        b += f'<circle cx="{f(x)}" cy="{f(y)}" r="4.5" fill="{c}"/><circle cx="{f(x)}" cy="{f(y)}" r="10" fill="{c}" opacity=".25"/>'
    for k in range(n):
        a = 2 * math.pi * k / n + .1
        x, y = cx + R * math.cos(a), cy + R * math.sin(a)
        col = ["#e2566e", "#f2c14e", "#7ec8e3", "#9b7fd4"][k % 4]
        b += f'<line x1="{f(x)}" y1="{f(y)}" x2="{f(x)}" y2="{f(y+18)}" stroke="#1f1c3e" stroke-width="3"/>'
        b += f'<path d="M{f(x-22)},{f(y+18)} L{f(x+22)},{f(y+18)} L{f(x+18)},{f(y+56)} L{f(x-18)},{f(y+56)} Z" fill="{col}"/><rect x="{f(x-14)}" y="{f(y+26)}" width="28" height="14" rx="3" fill="#fff3cf" opacity=".8"/>'
    b += f'<circle cx="{cx}" cy="{cy}" r="22" fill="#1f1c3e"/>'
    b += f'<path d="M{cx},{cy} L{cx-170},1000 M{cx},{cy} L{cx+170},1000" stroke="#1f1c3e" stroke-width="14"/>'
    b += f'<path d="M-20,{H+20} L-20,990 C300,960 600,965 940,995 L940,{H+20} Z" fill="#1a1836"/>'
    for _ in range(18):
        x = r.uniform(0, W); h = r.uniform(30, 90)
        b += f'<rect x="{f(x)}" y="{f(990-h)}" width="{f(r.uniform(40,90))}" height="{f(h+20)}" fill="#1a1836"/>'
    for k in range(30):
        x = k * 31
        b += f'<path d="M{x},1040 q15,12 31,0" stroke="#444" stroke-width="1" fill="none"/><circle cx="{x+15}" cy="1046" r="4" fill="{["#ffe08a","#ff9db0","#9ee0ff"][k%3]}"/>'
    b += sitting_pair(450, 1150, "#0f0e22", "#ffb3a0")
    return svg(d, b)


PHOTOS = {
    "hero": hero_hilltop,
    "final": final_umbrella,
    "beach-sunset": beach_sunset,
    "cafe-date": cafe_table,
    "city-night": city_night,
    "picnic": picnic,
    "ramen-night": ramen,
    "mountain-lake": mountain_lake,
    "birthday-cake": birthday_cake,
    "ferris-wheel": ferris_wheel,
}


async def main():
    from playwright.async_api import async_playwright
    from PIL import Image
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[2:]
    async with async_playwright() as p:
        br = await p.chromium.launch()
        pg = await br.new_page(viewport={"width": W, "height": H})
        for name, fn in PHOTOS.items():
            if only and name not in only:
                continue
            _n[0] = 0
            await pg.set_content(f'<html><body style="margin:0">{fn()}</body></html>')
            tmp = os.path.join(OUT, name + ".png")
            await pg.locator("svg").screenshot(path=tmp)
            Image.open(tmp).convert("RGB").save(os.path.join(OUT, name + ".jpg"), quality=84, optimize=True, progressive=True)
            os.remove(tmp)
            print("ok", name)
        await br.close()

asyncio.run(main())
