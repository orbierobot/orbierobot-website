#!/usr/bin/env python3
"""
Raster exports of the Orbie mark, with real transparency.

macOS's qlmanage will rasterise an SVG but flattens it onto opaque white, which
silently fills the eyes and the corners — the knockout is the whole design, so
that output is useless. This draws the geometry directly instead, 4x
supersampled and downscaled, which also gives cleaner edges than a Quick Look
thumbnail.

Geometry is kept in step with components/logo.tsx and public/brand/*.svg by
hand; there are five numbers and they are all in GEOM below.

    ~/baabu/pawme-reels/.venv/bin/python scripts/export-brand-png.py

Needs Pillow. The pawme-reels venv has it; system python does not.
"""

import pathlib

from PIL import Image, ImageDraw

OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "brand" / "png"
SS = 4  # supersample factor

VOLT = (204, 255, 0, 255)
GROUND = (10, 13, 18, 255)
ALU = (242, 243, 242, 255)
CLEAR = (0, 0, 0, 0)

# Matches LENS_R / EYE in components/logo.tsx.
GEOM = dict(lens_r=29, eye_w=18, eye_h=26, eye_r=8, gap=20)
FAVICON = dict(lens_r=25, eye_w=19, eye_h=25, eye_r=8.5, gap=21)
DOT = dict(cols=3, rows=4, size=5.4, gap=1.8, eye_gap=19, lens_r=29)


def draw_mark(size, fg, bg=CLEAR, geom=GEOM, matrix=False):
    """Render at SS x and downscale, so the curves are antialiased."""
    n = size * SS
    k = n / 100.0  # user units → pixels
    img = Image.new("RGBA", (n, n), bg)
    d = ImageDraw.Draw(img)

    d.rounded_rectangle([0, 0, n - 1, n - 1], radius=geom["lens_r"] * k, fill=fg)

    if matrix:
        ew = DOT["cols"] * DOT["size"] + (DOT["cols"] - 1) * DOT["gap"]
        eh = DOT["rows"] * DOT["size"] + (DOT["rows"] - 1) * DOT["gap"]
        oy = 50 - eh / 2
        for sign in (-1, 1):
            ox = 50 + sign * (DOT["eye_gap"] / 2 + ew / 2) - ew / 2
            for r in range(DOT["rows"]):
                for c in range(DOT["cols"]):
                    x = (ox + c * (DOT["size"] + DOT["gap"])) * k
                    y = (oy + r * (DOT["size"] + DOT["gap"])) * k
                    s = DOT["size"] * k
                    d.rounded_rectangle(
                        [x, y, x + s, y + s], radius=DOT["size"] * 0.28 * k, fill=bg
                    )
    else:
        for sign in (-1, 1):
            ex = 50 + sign * (geom["gap"] / 2 + geom["eye_w"] / 2) - geom["eye_w"] / 2
            ey = 50 - geom["eye_h"] / 2
            d.rounded_rectangle(
                [ex * k, ey * k, (ex + geom["eye_w"]) * k, (ey + geom["eye_h"]) * k],
                radius=geom["eye_r"] * k,
                fill=bg,
            )

    return img.resize((size, size), Image.LANCZOS)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    jobs = [
        # Transparent cut-outs — the mark alone, for placing on anything.
        ("mark-volt-1024.png", draw_mark(1024, VOLT)),
        ("mark-dark-1024.png", draw_mark(1024, GROUND)),
        ("mark-light-1024.png", draw_mark(1024, ALU)),
        ("mark-matrix-volt-1024.png", draw_mark(1024, VOLT, matrix=True)),
        # Avatar tiles — square, opaque, which is what X and Discord want.
        ("avatar-volt-on-dark-1024.png", draw_mark(1024, VOLT, bg=GROUND)),
        ("avatar-dark-on-volt-1024.png", draw_mark(1024, GROUND, bg=VOLT)),
        # Small sizes use the favicon cut.
        ("apple-touch-icon-180.png", draw_mark(180, VOLT, bg=GROUND, geom=FAVICON)),
        ("favicon-32.png", draw_mark(32, VOLT, geom=FAVICON)),
        ("favicon-16.png", draw_mark(16, VOLT, geom=FAVICON)),
    ]
    for name, img in jobs:
        img.save(OUT / name)
        print(f"  {name:34} {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
