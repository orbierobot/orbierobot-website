'use client';

/**
 * The Orbie identity, in code.
 *
 * The mark is the robot's face: a rounded lens with two eyes cut out of it.
 * It is drawn as a mask rather than a single knocked-out path so the eyes can
 * be animated — a robot whose logo can look at you and blink is worth more
 * than one that cannot, and it costs nothing.
 *
 * Everything here is monochrome and inherits `currentColor`. No brand colour is
 * baked into any asset, which is why one file survives a favicon, a light
 * background, an embroidery file and a laser etch without a variant.
 *
 * Static equivalents for anyone outside this codebase live in /public/brand.
 */

import { useId } from 'react';

/* Geometry shared with public/brand/mark.svg. Eyes are deliberately wider and
 * further apart than the hardware's: the literal proportion reads as a pause
 * button at small sizes, which is a hard association to shake. */
const LENS_R = 29;
const EYE = { w: 22, h: 32, r: 10, gap: 22 };

/* The dot-matrix cut: the same eye, drawn at the resolution of the display it
 * is a picture of. 3 x 4 dots at this pitch measure 22.6 x 30.8, within about a
 * unit of the solid eye above — so these are one shape at two resolutions, not
 * two logos. Below about 64px the dots merge; use the solid cut there. */
const DOT = { cols: 3, rows: 4, size: 6.2, gap: 2.0, eyeGap: 22 };

function matrixDots() {
  const ew = DOT.cols * DOT.size + (DOT.cols - 1) * DOT.gap;
  const eh = DOT.rows * DOT.size + (DOT.rows - 1) * DOT.gap;
  const oy = 50 - eh / 2;
  const dots: { x: number; y: number }[] = [];
  for (const sign of [-1, 1]) {
    const ox = 50 + sign * (DOT.eyeGap / 2 + ew / 2) - ew / 2;
    for (let r = 0; r < DOT.rows; r++) {
      for (let c = 0; c < DOT.cols; c++) {
        dots.push({ x: ox + c * (DOT.size + DOT.gap), y: oy + r * (DOT.size + DOT.gap) });
      }
    }
  }
  return dots;
}

export function OrbieMark({
  size = 32,
  blink = false,
  variant = 'solid',
  className,
}: {
  size?: number | string;
  blink?: boolean;
  variant?: 'solid' | 'matrix';
  className?: string;
}) {
  const id = useId();
  const maskId = `orbie-eyes-${id.replace(/:/g, '')}`;
  const left = 50 - EYE.gap / 2 - EYE.w;
  const right = 50 + EYE.gap / 2;
  const top = 50 - EYE.h / 2;

  if (variant === 'matrix') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
        role="img"
        aria-label="Orbie"
      >
        <title>Orbie</title>
        <mask id={maskId}>
          <rect width="100" height="100" rx={LENS_R} fill="#fff" />
          <g className={blink ? 'orbie-blink' : undefined}>
            {matrixDots().map((d) => (
              <rect
                key={`${d.x}-${d.y}`}
                x={d.x}
                y={d.y}
                width={DOT.size}
                height={DOT.size}
                rx={DOT.size * 0.28}
                fill="#000"
              />
            ))}
          </g>
        </mask>
        <rect width="100" height="100" rx={LENS_R} fill="currentColor" mask={`url(#${maskId})`} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Orbie"
    >
      <title>Orbie</title>
      <mask id={maskId}>
        <rect width="100" height="100" rx={LENS_R} fill="#fff" />
        {[left, right].map((x) => (
          <rect
            key={x}
            x={x}
            y={top}
            width={EYE.w}
            height={EYE.h}
            rx={EYE.r}
            fill="#000"
            className={blink ? 'orbie-blink' : undefined}
          />
        ))}
      </mask>
      <rect width="100" height="100" rx={LENS_R} fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}

export function OrbieWordmark({
  height = 24,
  className,
}: {
  height?: number | string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 432.86 100"
      height={height}
      className={className}
      fill="currentColor"
      role="img"
      aria-label="Orbie"
    >
      <title>Orbie</title>
      <g transform="translate(0 100) scale(0.14286)">
      <path d="M338.00 14.00Q206.00 14.00 128.00 -58.50Q50.00 -131.00 50.00 -266.00V-434.00Q50.00 -569.00 128.00 -641.50Q206.00 -714.00 338.00 -714.00Q470.00 -714.00 548.00 -641.50Q626.00 -569.00 626.00 -434.00V-266.00Q626.00 -131.00 548.00 -58.50Q470.00 14.00 338.00 14.00ZM338.00 -104.00Q412.00 -104.00 453.00 -147.00Q494.00 -190.00 494.00 -262.00V-438.00Q494.00 -510.00 453.00 -553.00Q412.00 -596.00 338.00 -596.00Q265.00 -596.00 223.50 -553.00Q182.00 -510.00 182.00 -438.00V-262.00Q182.00 -190.00 223.50 -147.00Q265.00 -104.00 338.00 -104.00Z"/>
      <path d="M802.00 0.00V-700.00H1106.00Q1172.00 -700.00 1221.00 -677.00Q1270.00 -654.00 1297.00 -612.00Q1324.00 -570.00 1324.00 -513.00V-501.00Q1324.00 -438.00 1294.00 -399.00Q1264.00 -360.00 1220.00 -342.00V-324.00Q1260.00 -322.00 1282.00 -296.50Q1304.00 -271.00 1304.00 -229.00V0.00H1172.00V-210.00Q1172.00 -234.00 1159.50 -249.00Q1147.00 -264.00 1118.00 -264.00H934.00V0.00ZM934.00 -384.00H1092.00Q1139.00 -384.00 1165.50 -409.50Q1192.00 -435.00 1192.00 -477.00V-487.00Q1192.00 -529.00 1166.00 -554.50Q1140.00 -580.00 1092.00 -580.00H934.00Z"/>
      <path d="M1474.00 0.00V-116.00H1566.00V-584.00H1474.00V-700.00H1834.00Q1898.00 -700.00 1945.50 -678.50Q1993.00 -657.00 2019.50 -617.50Q2046.00 -578.00 2046.00 -523.00V-513.00Q2046.00 -465.00 2028.00 -434.50Q2010.00 -404.00 1985.50 -387.50Q1961.00 -371.00 1939.00 -364.00V-346.00Q1961.00 -340.00 1987.00 -323.50Q2013.00 -307.00 2031.50 -276.00Q2050.00 -245.00 2050.00 -195.00V-185.00Q2050.00 -127.00 2023.00 -85.50Q1996.00 -44.00 1948.50 -22.00Q1901.00 0.00 1838.00 0.00ZM1698.00 -120.00H1822.00Q1865.00 -120.00 1891.50 -141.00Q1918.00 -162.00 1918.00 -201.00V-211.00Q1918.00 -250.00 1892.00 -271.00Q1866.00 -292.00 1822.00 -292.00H1698.00ZM1698.00 -412.00H1820.00Q1861.00 -412.00 1887.50 -433.00Q1914.00 -454.00 1914.00 -491.00V-501.00Q1914.00 -539.00 1888.00 -559.50Q1862.00 -580.00 1820.00 -580.00H1698.00Z"/>
      <path d="M2218.00 0.00V-700.00H2350.00V0.00Z"/>
      <path d="M2542.00 0.00V-700.00H2992.00V-580.00H2674.00V-413.00H2964.00V-293.00H2674.00V-120.00H2998.00V0.00Z"/>
      </g>
    </svg>
  );
}

/** Mark and wordmark, optically aligned. The wordmark sits at 0.62 of the
 *  mark's height so the cap height matches the eyes rather than the lens. */
export function OrbieLockup({
  size = 36,
  blink = false,
  className,
}: {
  size?: number;
  blink?: boolean;
  className?: string;
}) {
  return (
    <span className={['inline-flex items-center', className].filter(Boolean).join(' ')} style={{ gap: size * 0.34 }}>
      <OrbieMark size={size} blink={blink} />
      <OrbieWordmark height={size * 0.62} />
    </span>
  );
}
