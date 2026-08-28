/**
 * Orbie landing page.
 *
 * Written for the TEASE phase: no token, no ticker, no chain, no launch
 * venue. Everything here is a claim the record supports — three hardware
 * generations, a public repo, an ESP32-S3 doing perception and voice. When
 * the launch phase advances, this page gains a section; it should not need
 * rewriting, because nothing on it will have turned out to be untrue.
 */

const GENERATIONS = [
  {
    tag: 'V1',
    when: 'Jul – Sep 2025',
    title: 'A forked ball',
    body:
      'Started from an open-source ESP32 camera ball. No arms, no face, barely any balance. ' +
      'It rolled, it streamed, and it fell over without being able to get back up.',
  },
  {
    tag: 'V2',
    when: 'Sep 2025 – Feb 2026',
    title: 'Our own board',
    body:
      'Stopped bolting onto a dev kit. Custom PCB, custom firmware, mechanical design, ' +
      'and a small manufacturing run that taught us what tooling actually costs.',
  },
  {
    tag: 'V3',
    when: 'Mar 2026 –',
    title: 'The companion',
    body:
      'The current form factor. Perception and voice running on an ESP32-S3 — a brain that ' +
      'costs a few dollars, which is the whole point.',
  },
];

const OPEN = [
  { k: 'The files', v: 'Mechanical design and enclosures.' },
  { k: 'The firmware', v: 'What actually runs on the board.' },
  { k: 'The failures', v: 'The generation we threw away, and why.' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── hero ───────────────────────────────────────────────────────── */}
      <section className="glow relative flex min-h-[88vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-[clamp(3.5rem,14vw,10rem)] font-black leading-none tracking-tight">
          ORBIE
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold tracking-wide text-signal sm:text-xl">
          An open-source home robot.
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute sm:text-base">
          Three hardware generations, built in public. Every other home robot arrives sealed,
          finished exactly the way a factory decided. This one you open.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://x.com/jaiswalashok"
            className="rounded-full bg-bone px-6 py-3 text-sm font-bold text-ink transition hover:opacity-85"
          >
            Follow the build
          </a>
          <a
            href="https://github.com/openpawrobotai"
            className="rounded-full border border-mute/30 px-6 py-3 text-sm font-bold text-bone transition hover:border-signal/60"
          >
            Read the code
          </a>
        </div>
      </section>

      {/* ── what open actually means ───────────────────────────────────── */}
      <section className="border-t rule px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Open means all of it.
          </h2>
          <p className="mt-4 max-w-2xl text-mute">
            Open hardware usually means a photo of a PCB and a licence file. Here it means you can
            build the thing, change the thing, and see where it went wrong.
          </p>
          <dl className="mt-12 grid gap-8 sm:grid-cols-3">
            {OPEN.map((o) => (
              <div key={o.k} className="border-t rule pt-5">
                <dt className="text-sm font-black uppercase tracking-widest text-signal">
                  {o.k}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-mute">{o.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── the three generations ──────────────────────────────────────── */}
      <section className="border-t rule bg-ink-2 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Three generations.</h2>
          <p className="mt-4 max-w-2xl text-mute">
            Not a concept. A year of building, with two versions behind this one.
          </p>
          <ol className="mt-12 space-y-10">
            {GENERATIONS.map((g) => (
              <li key={g.tag} className="grid gap-4 border-t rule pt-6 sm:grid-cols-[7rem_1fr]">
                <div>
                  <div className="text-2xl font-black text-signal">{g.tag}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-mute">
                    {g.when}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{g.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">
                    {g.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── the honest bit ─────────────────────────────────────────────── */}
      <section className="border-t rule px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            It is not finished.
          </h2>
          <p className="mt-4 text-mute">
            The hard part of a home robot was never the AI. It is that a real house has
            thresholds, cables, pets, and someone who moves the charging dock. That work is
            happening in public, week by week.
          </p>
          <a
            href="https://x.com/jaiswalashok"
            className="mt-8 inline-block rounded-full bg-signal px-7 py-3 text-sm font-black text-ink transition hover:opacity-85"
          >
            Follow along
          </a>
        </div>
      </section>

      <footer className="border-t rule px-6 py-10 text-center text-xs text-mute">
        Orbie — an open-source home robot. Built in public.
      </footer>
    </main>
  );
}
