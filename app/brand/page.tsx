import type { Metadata } from 'next';
import { StatusBar, SectionLabel } from '@/components/chrome';
import { OrbieMark, OrbieWordmark, OrbieLockup } from '@/components/logo';
import { LINKS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Orbie — brand',
  description: 'The Orbie mark, wordmark, colour and type, with the files and the rules.',
};

/* The palette. Kept short on purpose — a robotics project with six contributors
 * and outside collaborators needs a palette people can hold in their head, not
 * a system with eleven greys nobody can tell apart. */
const COLOURS = [
  { name: 'Ground', hex: '#0A0D12', use: 'The background, nearly everywhere.', on: 'light' },
  { name: 'Panel', hex: '#0E1319', use: 'Raised surfaces, cards, the ticker.', on: 'light' },
  { name: 'Line', hex: '#1E2831', use: 'Hairlines and grid rules.', on: 'light' },
  { name: 'Volt', hex: '#CCFF00', use: 'The accent. The mark, live values, one action per screen.', on: 'dark' },
  { name: 'Alu', hex: '#F2F3F2', use: 'Primary text.', on: 'dark' },
  { name: 'Alu 2', hex: '#98A3AC', use: 'Body copy.', on: 'dark' },
  { name: 'Alu 3', hex: '#5D6870', use: 'Labels, captions, anything secondary.', on: 'dark' },
];

const DOWNLOADS = [
  { file: 'mark.svg', what: 'Primary mark. Use this one unless you have a reason not to.' },
  { file: 'mark-matrix.svg', what: 'Dot-matrix cut. Above 64px only — the pixels fill in below that.' },
  { file: 'face.svg', what: 'Wide lens at the hardware’s own 1.6:1. For product contexts.' },
  { file: 'favicon.svg', what: 'Small-size cut: tighter radius, fatter eyes. 16–32px.' },
  { file: 'wordmark.svg', what: 'ORBIE outlined from Space Grotesk 700. No font needed.' },
];

const DONT = [
  'Do not add a second colour to the mark. It is one shape in one colour, and that is the whole point.',
  'Do not put the mark on a busy photograph without a solid holding shape behind it.',
  'Do not stretch the wordmark, re-space it, or set it in a different face. It is outlined so nobody has to.',
  'Do not use the dot-matrix cut below 64px. The pixels merge and it turns to mud.',
  'Do not rotate or tilt the mark. It is a face — a tilted face reads as a mistake.',
  'Do not use the old gradient "OrbieRobot" wordmark, the terracotta paw, or anything carrying PawMe or OpenPaw.',
];

export default function BrandPage() {
  return (
    <div id="top">
      <StatusBar />

      <main className="mx-auto max-w-[1400px] px-5">
        <section className="py-16 lg:py-24">
          <SectionLabel n="00">BRAND</SectionLabel>
          <h1 className="max-w-[20ch] font-display text-5xl font-700 leading-[1.02] text-alu md:text-6xl">
            The mark is the robot&rsquo;s face.
          </h1>
          <p className="mt-7 max-w-[62ch] text-[15px] leading-relaxed text-alu-2">
            A rounded lens with two eyes cut out of it. Not an orb, not a paw, not a
            silhouette of a robot — the one part of the machine people actually look at.
            It is a single shape in a single colour, so the same file works as a favicon,
            a laser etch, an embroidery file and a sticker without a variant. And it can
            blink, which is worth more to a robot project than it sounds.
          </p>

          <div className="mt-14 flex flex-wrap items-end gap-x-16 gap-y-10 text-volt">
            <figure>
              <OrbieMark size={132} blink />
              <figcaption className="mt-4 text-[10px] tracking-[0.14em] text-alu-3">MARK</figcaption>
            </figure>
            <figure>
              <OrbieMark size={132} variant="matrix" />
              <figcaption className="mt-4 text-[10px] tracking-[0.14em] text-alu-3">DOT-MATRIX CUT</figcaption>
            </figure>
            <figure>
              <OrbieWordmark height={54} />
              <figcaption className="mt-4 text-[10px] tracking-[0.14em] text-alu-3">WORDMARK</figcaption>
            </figure>
          </div>
        </section>

        {/* ── Lockup ─────────────────────────────────────────────── */}
        <section className="border-t border-line py-16">
          <SectionLabel n="01">LOCKUP</SectionLabel>
          <p className="mb-10 max-w-[58ch] text-[15px] leading-relaxed text-alu-2">
            Mark left, wordmark right. The wordmark&rsquo;s cap height is set against the
            eyes rather than the lens, which is why it looks small next to the mark and
            correct next to the eyes. Clear space on all sides is the width of one eye.
          </p>
          <div className="flex flex-wrap items-center gap-x-16 gap-y-10">
            <div className="text-volt"><OrbieLockup size={52} blink /></div>
            <div className="text-alu"><OrbieLockup size={36} /></div>
            <div className="bg-alu px-7 py-5 text-ground"><OrbieLockup size={36} /></div>
          </div>
        </section>

        {/* ── Colour ─────────────────────────────────────────────── */}
        <section className="border-t border-line py-16">
          <SectionLabel n="02">COLOUR</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="max-w-[18ch] font-display text-3xl font-700 leading-[1.08] text-alu md:text-4xl">
                One accent, and it is not a gradient.
              </h2>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-alu-2">
                Volt does the work of an indicator lamp: it marks the thing that is live,
                the thing that is measured, and the one action worth taking. If more than
                a few percent of a screen is volt, it has stopped meaning anything.
              </p>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-alu-2">
                It is also deliberately not the green every robotics and crypto project
                reaches for. Nothing else in the category looks like this.
              </p>
              <p className="mt-6 max-w-[52ch] border-l-2 border-line-lit pl-5 text-[14px] leading-relaxed text-alu-3">
                One inconsistency worth knowing about: the launch film ends on a teal
                glow, and the eyes in it are cyan. That predates this palette. Either the
                film gets re-graded to volt when it is next cut, or cyan gets defined as
                the robot&rsquo;s own light and volt stays the interface colour — but
                right now two accents are in circulation and only one is written down.
              </p>
            </div>

            <ul className="grid gap-px self-start bg-line">
              {COLOURS.map((c) => (
                <li key={c.name} className="flex items-center gap-5 bg-ground p-4">
                  <span
                    className="h-12 w-12 shrink-0 border border-line-lit"
                    style={{ background: c.hex }}
                    aria-hidden
                  />
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-[14px] text-alu">{c.name}</span>
                      <code className="text-[12px] text-alu-3">{c.hex}</code>
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-alu-3">{c.use}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Type ───────────────────────────────────────────────── */}
        <section className="border-t border-line py-16">
          <SectionLabel n="03">TYPE</SectionLabel>
          <div className="grid gap-px bg-line md:grid-cols-2">
            <div className="bg-ground p-8">
              <p className="text-[11px] tracking-[0.16em] text-volt">SPACE GROTESK</p>
              <p className="mt-5 font-display text-5xl font-700 leading-none text-alu">Aa</p>
              <p className="mt-6 font-display text-2xl font-600 text-alu">
                Headlines and the wordmark
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-alu-2">
                Weights 500, 600 and 700 only. Headlines set tight — leading around 1.05
                — and never in all caps above a few words.
              </p>
            </div>
            <div className="bg-ground p-8">
              <p className="text-[11px] tracking-[0.16em] text-volt">JETBRAINS MONO</p>
              <p className="mt-5 text-5xl font-500 leading-none text-alu">Aa</p>
              <p className="mt-6 font-display text-2xl font-600 text-alu">
                Body, labels, everything else
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-alu-2">
                Monospace for body copy is unusual and it is doing a job: this is an
                engineering project, and the type should say so before the words do.
                Labels are uppercase at 10–11px with 0.14–0.2em tracking.
              </p>
            </div>
          </div>
        </section>

        {/* ── Files ──────────────────────────────────────────────── */}
        <section className="border-t border-line py-16">
          <SectionLabel n="04">FILES</SectionLabel>
          <p className="mb-10 max-w-[60ch] text-[15px] leading-relaxed text-alu-2">
            Every file is monochrome and inherits its colour from whatever it sits in
            (<code className="text-alu-3">currentColor</code>). There is no dark variant
            and no light variant, because there does not need to be.
          </p>
          <ul className="grid gap-px bg-line sm:grid-cols-2">
            {DOWNLOADS.map((d) => (
              <li key={d.file} className="flex items-start gap-5 bg-ground p-5">
                <span className="mt-0.5 shrink-0 text-volt">
                  <OrbieMark size={34} variant={d.file.includes('matrix') ? 'matrix' : 'solid'} />
                </span>
                <span>
                  <a
                    href={`/brand/${d.file}`}
                    download
                    className="text-[14px] text-alu underline decoration-line-lit underline-offset-4 hover:decoration-volt"
                  >
                    {d.file}
                  </a>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-alu-3">{d.what}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Rules ──────────────────────────────────────────────── */}
        <section className="border-t border-line py-16">
          <SectionLabel n="05">PLEASE DO NOT</SectionLabel>
          <ul className="grid max-w-[80ch] gap-px bg-line">
            {DONT.map((d) => (
              <li key={d} className="flex gap-4 bg-ground p-5">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-alu-3" />
                <span className="text-[14px] leading-relaxed text-alu-2">{d}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-line bg-panel/50">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <div className="text-alu-2">
            <OrbieLockup size={30} />
          </div>
          <nav className="flex flex-wrap gap-6 text-[12px] tracking-[0.14em]">
            <a href="/" className="text-alu-2 hover:text-volt">HOME</a>
            <a href={LINKS.x} className="text-alu-2 hover:text-volt">@ORBIE_ROBOT</a>
            <a href={LINKS.github} className="text-alu-2 hover:text-volt">GITHUB</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
