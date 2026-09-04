#!/usr/bin/env python3
"""
Outline ORBIE from Space Grotesk into real SVG paths.

A logo cannot depend on a webfont being present, so the wordmark ships as
outlines. Space Grotesk is the face already used across the site and it is the
closest match to the lettering on the film's end card.

Emits paths normalised so the cap-height sits on a 0..100 box, which makes the
lockup arithmetic trivial later.
"""

import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

SRC = "SpaceGrotesk.ttf"
WEIGHT = 700
TEXT = "ORBIE"
TRACKING = 0.06  # em — the end card is generously tracked; this matches it


def main() -> None:
    font = TTFont(SRC)
    font = instancer.instantiateVariableFont(font, {"wght": WEIGHT}, inplace=False)

    upem = font["head"].unitsPerEm
    cap = font["OS/2"].sCapHeight
    glyphset = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]

    # Lay the string out on a baseline, accumulating advances + tracking.
    pen_paths = []
    x = 0.0
    track = TRACKING * upem
    for ch in TEXT:
        name = cmap[ord(ch)]
        spen = SVGPathPen(glyphset, ntos=lambda v: f"{v:.2f}")
        # Flip Y (font space is y-up, SVG is y-down) and shift to the pen position.
        tpen = TransformPen(spen, Transform(1, 0, 0, -1, x, 0))
        glyphset[name].draw(tpen)
        d = spen.getCommands()
        if d:
            pen_paths.append(d)
        x += hmtx[name][0] + track
    total_w = x - track  # no trailing track

    # Normalise: cap height → 100 units, baseline at y=100.
    scale = 100.0 / cap
    w = total_w * scale

    body = "\n".join(f'    <path d="{d}"/>' for d in pen_paths)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} 100" fill="currentColor" role="img" aria-label="Orbie">
  <title>Orbie</title>
  <g transform="translate(0 100) scale({scale:.5f})">
{body}
  </g>
</svg>
"""
    with open("orbie-wordmark.svg", "w") as fh:
        fh.write(svg)

    print(f"upem={upem} cap={cap} advance={total_w:.0f} → viewBox 0 0 {w:.2f} 100")
    print(f"aspect = {w/100:.3f} : 1")


if __name__ == "__main__":
    sys.exit(main())
