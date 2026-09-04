'use client';

/**
 * The body map — a labelled drawing of V3 with every subsystem as a hotspot.
 *
 * This is the section the whole page is arranged around. A bill of materials
 * tells a reader what is inside; almost nobody reads one. The same eleven parts
 * become interesting the moment each one answers "and what could I do with
 * that?", which is why every entry carries an `opens` line alongside its `what`.
 *
 * The hotspots are HTML buttons positioned over the SVG rather than SVG shapes,
 * so they get real focus rings, real hit targets and keyboard behaviour for free.
 */

import { useState } from 'react';
import { SUBSYSTEMS } from '@/lib/content';

export function BodyMap() {
  const [activeId, setActiveId] = useState('camera');
  const active = SUBSYSTEMS.find((s) => s.id === activeId) ?? SUBSYSTEMS[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      {/* ── The drawing ─────────────────────────────────────────── */}
      <div>
        <div className="regmark relative border border-line bg-panel/70 p-4">
          <div className="relative mx-auto aspect-[100/112] w-full max-w-[430px]">
            <RobotOutline />

            {SUBSYSTEMS.map((s) => {
              const on = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  onMouseEnter={() => setActiveId(s.id)}
                  aria-label={`${s.name} — ${s.part}`}
                  aria-pressed={on}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2.5 transition"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <span
                    className={[
                      'block h-2.5 w-2.5 rounded-full border transition',
                      on
                        ? 'scale-125 border-ember bg-ember shadow-[0_0_0_5px_rgba(204,255,0,0.16)]'
                        : 'border-line-lit bg-ground hover:border-ember',
                    ].join(' ')}
                  />
                </button>
              );
            })}
          </div>

          <p className="px-1 pt-2 text-[10px] tracking-[0.16em] text-alu-3">
            V3 — ELEVEN SUBSYSTEMS · TAP A POINT
          </p>
        </div>

        {/* Chips, so everything is reachable without hunting the drawing. */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {SUBSYSTEMS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={[
                'border px-2.5 py-1.5 text-[11px] tracking-[0.1em] transition',
                s.id === activeId
                  ? 'border-ember bg-ember/10 text-ember'
                  : 'border-line text-alu-3 hover:border-line-lit hover:text-alu-2',
              ].join(' ')}
            >
              {s.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── The read-out ────────────────────────────────────────── */}
      <div className="lg:pt-2">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-display text-3xl font-700 text-alu md:text-4xl">{active.name}</h3>
          <span className="text-[13px] text-ember">{active.part}</span>
        </div>

        {active.bus && (
          <p className="mt-2 text-[11px] tracking-[0.14em] text-alu-3">{active.bus}</p>
        )}

        <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-alu-2">{active.what}</p>

        <div className="mt-7 border-l-2 border-ember/40 pl-5">
          <p className="text-[11px] tracking-[0.18em] text-ember">WHAT IT OPENS UP</p>
          <p className="mt-2.5 max-w-[54ch] text-[15px] leading-relaxed text-alu">{active.opens}</p>
        </div>

        {active.photo && (
          <figure className="mt-8 border border-line bg-panel/60 p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.photo}
              alt={`${active.name} — ${active.part}`}
              className="w-full object-cover"
              loading="lazy"
            />
            <figcaption className="px-1 pt-2 text-[10px] tracking-[0.14em] text-alu-3">
              FROM THE BUILD ARCHIVE
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

/**
 * V3 in outline: head, neck, body, two wheels. Drawn rather than photographed
 * so the hotspots sit on stable coordinates and the whole thing stays legible
 * at any width.
 */
function RobotOutline() {
  return (
    <svg
      viewBox="0 0 100 112"
      className="absolute inset-0 h-full w-full"
      aria-hidden
      fill="none"
    >
      {/* wheels, behind the body */}
      {[18, 82].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={82} rx="10" ry="21" fill="#131A22" stroke="#2C3946" />
          <ellipse cx={cx} cy={82} rx="4.5" ry="9.5" fill="#0E1319" stroke="#1E2831" />
        </g>
      ))}

      {/* body */}
      <rect x="24" y="46" width="52" height="52" rx="19" fill="#0E1319" stroke="#2C3946" />
      {/* speaker slot */}
      <rect x="37" y="66" width="26" height="6" rx="3" fill="#060A0E" stroke="#1E2831" />

      {/* neck */}
      <rect x="44" y="38" width="12" height="11" rx="3" fill="#131A22" stroke="#2C3946" />

      {/* head */}
      <rect x="28" y="8" width="44" height="33" rx="12" fill="#0E1319" stroke="#2C3946" />
      {/* lens */}
      <rect x="32.5" y="14" width="35" height="21" rx="8" fill="#060A0E" stroke="#1E2831" />
      {/* the eyes themselves, the one lit thing on the drawing */}
      <rect x="40" y="20" width="6.5" height="9" rx="2" fill="#FF6B2C" opacity="0.85" />
      <rect x="53.5" y="20" width="6.5" height="9" rx="2" fill="#FF6B2C" opacity="0.85" />

      {/* centre line + measure ticks, the drafting register */}
      <line x1="50" y1="3" x2="50" y2="109" stroke="#1E2831" strokeDasharray="2 4" />
      <line x1="2" y1="82" x2="98" y2="82" stroke="#1E2831" strokeDasharray="2 4" />
    </svg>
  );
}
