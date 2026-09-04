#!/usr/bin/env python3
"""
Generate the Orbie mark family.

The mark is the robot's face: a rounded lens with two eyes knocked out of it.
Three reasons that beats an orb, a paw or a robot silhouette —

  * it is literally the product, and the one part of it people look at;
  * it is a single path in a single colour, so it survives a favicon, an
    embroidery file, a laser etch and a one-colour print without a variant;
  * it can blink. An identity that can look at you is worth more to a robot
    project than one that cannot.

Knocking the eyes out as negative space (fill-rule evenodd) rather than
painting them means the mark inherits whatever it sits on. No colour is
baked in anywhere.

Outputs:
  mark.svg          square lens, solid eyes — the primary
  mark-matrix.svg   square lens, dot-matrix eyes — large sizes only
  face.svg          wide lens at the true 1.6:1 of the hardware
  favicon.svg       small-size cut: tighter radius, fatter eyes
"""

def rrect(x, y, w, h, r):
    """Rounded-rect subpath, always wound the same way.

    Holes are cut by fill-rule="evenodd", which ignores direction — so every
    subpath uses the same sweep. (Flipping the sweep flag to "reverse" a
    subpath does not reverse winding, it inverts the corners into cusps.)"""
    sweep = 1
    r = min(r, w / 2, h / 2)
    return (
        f"M{x + r:.3f},{y:.3f} H{x + w - r:.3f} A{r:.3f},{r:.3f} 0 0 {sweep} {x + w:.3f},{y + r:.3f} "
        f"V{y + h - r:.3f} A{r:.3f},{r:.3f} 0 0 {sweep} {x + w - r:.3f},{y + h:.3f} "
        f"H{x + r:.3f} A{r:.3f},{r:.3f} 0 0 {sweep} {x:.3f},{y + h - r:.3f} "
        f"V{y + r:.3f} A{r:.3f},{r:.3f} 0 0 {sweep} {x + r:.3f},{y:.3f} Z"
    )


def svg(view_w, view_h, body, label, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {view_w} {view_h}" '
        f'fill="currentColor" role="img" aria-label="{label}">\n'
        f"  <title>{title}</title>\n{body}\n</svg>\n"
    )


def lens_with_eyes(vw, vh, lens_r, eye_w, eye_h, eye_r, gap, eye_dy=0.0):
    """One path: the lens, then two eyes wound as holes."""
    cx, cy = vw / 2, vh / 2
    d = rrect(0, 0, vw, vh, lens_r)
    for sign in (-1, 1):
        ex = cx + sign * (gap / 2 + eye_w / 2) - eye_w / 2
        ey = cy + eye_dy - eye_h / 2
        d += " " + rrect(ex, ey, eye_w, eye_h, eye_r)
    return f'  <path fill-rule="evenodd" d="{d}"/>'


def matrix_eyes(vw, vh, lens_r, cols, rows, dot, gapd, gap, eye_dy=0.0):
    """Eyes rendered as an actual pixel grid — the display is a custom-fabricated
    dot matrix, so at large sizes the mark says so."""
    cx, cy = vw / 2, vh / 2
    eye_w = cols * dot + (cols - 1) * gapd
    eye_h = rows * dot + (rows - 1) * gapd
    d = rrect(0, 0, vw, vh, lens_r)
    for sign in (-1, 1):
        ox = cx + sign * (gap / 2 + eye_w / 2) - eye_w / 2
        oy = cy + eye_dy - eye_h / 2
        for r_i in range(rows):
            for c_i in range(cols):
                px = ox + c_i * (dot + gapd)
                py = oy + r_i * (dot + gapd)
                d += " " + rrect(px, py, dot, dot, dot * 0.28)
    return f'  <path fill-rule="evenodd" d="{d}"/>'


files = {}

# ── Primary: rectangular eyes, kept wide enough and far enough apart that the
#    mark reads as a face rather than a pause button. Tested at 16px and on
#    light; the narrower earlier cut failed both.
EYE_W, EYE_H, EYE_R, GAP = 18, 26, 8, 20

files["mark.svg"] = svg(
    100, 100,
    lens_with_eyes(100, 100, lens_r=29, eye_w=EYE_W, eye_h=EYE_H, eye_r=EYE_R, gap=GAP),
    "Orbie", "Orbie",
)

# ── The same shape at display resolution. 3x4 dots at this pitch measure
#    19.8 x 27, within a unit of the solid cut above — so the two marks are one
#    shape rendered coarse and fine, not two different logos.
files["mark-matrix.svg"] = svg(
    100, 100,
    matrix_eyes(100, 100, lens_r=29, cols=3, rows=4, dot=5.4, gapd=1.8, gap=19),
    "Orbie", "Orbie",
)

# ── The hardware proportion: the lens on the head is about 1.6:1 ────────
files["face.svg"] = svg(
    160, 100,
    lens_with_eyes(160, 100, lens_r=34, eye_w=19, eye_h=28, eye_r=9, gap=30),
    "Orbie", "Orbie",
)

# ── Favicon cut: fatter eyes, tighter radius, so it survives 16px ───────
files["favicon.svg"] = svg(
    100, 100,
    lens_with_eyes(100, 100, lens_r=25, eye_w=19, eye_h=25, eye_r=8.5, gap=21),
    "Orbie", "Orbie",
)

for name, content in files.items():
    with open(name, "w") as fh:
        fh.write(content)
    print(f"{name}  {len(content)} bytes")
