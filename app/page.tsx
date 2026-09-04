import { StatusBar, Ticker, SectionLabel } from '@/components/chrome';
import { BodyMap } from '@/components/body-map';
import { Ideas } from '@/components/ideas';
import { XFeed } from '@/components/x-feed';
import {
  GAPS,
  GENERATIONS,
  LICENCES,
  LINKS,
  LOG,
  NUMBERS,
  SUBSYSTEMS,
  TEAM,
  USE_CASES,
} from '@/lib/content';
import { canDiscussFunding, canNameToken } from '@/lib/phase';

const PART_NAME = new Map(SUBSYSTEMS.map((s) => [s.id, s.name]));

export default function Page() {
  return (
    <div id="top">
      <StatusBar />
      <Ticker />

      <main className="mx-auto max-w-[1400px] px-5">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="grid gap-12 py-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:py-24">
          <div>
            <span className="inline-block border border-line-lit px-3 py-1.5 text-[11px] tracking-[0.18em] text-volt">
              ● OPEN SOURCE · BUILT IN PUBLIC
            </span>
            <h1 className="mt-7 font-display text-6xl leading-[0.92] font-700 tracking-tight text-alu md:text-7xl">
              ORBIE
            </h1>
            <p className="mt-5 max-w-[24ch] font-display text-4xl leading-[1.05] font-600 text-volt md:text-5xl">
              A home robot that outlives us.
            </p>
            <p className="mt-7 max-w-[52ch] text-[15px] leading-relaxed text-alu-2">
              Jibo. Vector. Astro. None of them failed because the hardware was
              bad — they failed because the company did, and each was built so
              that when the servers went off, the robot on the shelf became an
              ornament.
            </p>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-alu-2">
              Orbie is built so that cannot happen. The CAD, the firmware and the
              failures are public. Three hardware generations, ten units built by
              hand, and a build log with the bad days still in it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#body"
                className="border border-volt bg-volt px-6 py-3.5 text-[12px] font-600 tracking-[0.14em] text-ground transition hover:bg-transparent hover:text-volt"
              >
                SEE WHAT IS INSIDE
              </a>
              <a
                href="#log"
                className="border border-line-lit px-6 py-3.5 text-[12px] font-600 tracking-[0.14em] text-alu-2 transition hover:border-volt hover:text-volt"
              >
                READ THE BUILD LOG
              </a>
            </div>
          </div>

          <figure id="film" className="regmark relative border border-line bg-panel p-2">
            <video
              className="w-full"
              controls
              preload="metadata"
              poster="/media/orbie-poster.jpg"
              playsInline
            >
              <source src="/media/orbie-film.mp4" type="video/mp4" />
              Your browser cannot play this video.
            </video>
            <figcaption className="flex items-center justify-between px-2 pt-3 pb-1 text-[10px] tracking-[0.16em] text-alu-3">
              <span>ORBIE — INTRODUCTION</span>
              <span>00:43</span>
            </figcaption>
          </figure>
        </section>

        {/* ── Numbers ──────────────────────────────────────────── */}
        <section className="grid gap-px border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {NUMBERS.map((x) => (
            <div key={x.label} className="bg-ground px-5 py-7">
              <p className="font-display text-3xl font-700 text-volt">{x.n}</p>
              <p className="mt-1.5 text-[12px] leading-snug text-alu-3">{x.label}</p>
            </div>
          ))}
        </section>

        {/* ── What it is for ───────────────────────────────────── */}
        <section id="uses" className="py-20">
          <SectionLabel n="01">WHAT IT IS FOR</SectionLabel>
          <h2 className="max-w-[22ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
            It goes to the room. That is the whole idea.
          </h2>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-alu-2">
            A camera bolted to a wall waits for something to walk past it. A robot
            that can cross a room can go and look — and once it is there, it can
            also play, speak, and take a temperature.
          </p>

          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u) => (
              <article key={u.title} className="flex flex-col bg-ground p-7">
                <h3 className="font-display text-xl font-600 leading-snug text-alu">{u.title}</h3>
                <p className="mt-3.5 flex-1 text-[14px] leading-relaxed text-alu-2">{u.body}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {u.uses.map((id) => (
                    <span
                      key={id}
                      className="border border-line-lit px-2 py-1 text-[10px] tracking-[0.1em] text-alu-3"
                    >
                      {(PART_NAME.get(id) ?? id).toUpperCase()}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── The body ─────────────────────────────────────────── */}
        <section id="body" className="border-t border-line py-20">
          <SectionLabel n="02">THE BODY</SectionLabel>
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-[24ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
              Eleven parts. Every one of them documented.
            </h2>
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-alu-2">
              A spec sheet tells you what is inside. This one also tells you what
              each part lets you do — because that is the number that matters
              when the wiring diagram is public.
            </p>
          </div>
          <BodyMap />
        </section>

        {/* ── What you could build ─────────────────────────────── */}
        <section id="build" className="border-t border-line py-20">
          <SectionLabel n="03">WHAT YOU COULD BUILD</SectionLabel>
          <h2 className="max-w-[26ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
            A camera, a laser, a thermometer and wheels, with nothing locked.
          </h2>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-alu-2">
            Most &ldquo;open&rdquo; robots open the software and keep the machine
            shut. Publish the CAD and the PCB alongside the firmware and the
            project stops being a product with a plugin system — you can change
            the body, not just the behaviour.
          </p>
          <div className="mt-12">
            <Ideas />
          </div>
        </section>

        {/* ── Generations ──────────────────────────────────────── */}
        <section id="generations" className="border-t border-line py-20">
          <SectionLabel n="04">THREE GENERATIONS</SectionLabel>
          <h2 className="max-w-[22ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
            Built three times, in the open, since July 2025.
          </h2>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-3">
            {GENERATIONS.map((g) => (
              <article key={g.tag} className="bg-ground">
                <figure className="border-b border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.photo}
                    alt={g.caption}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="px-6 pt-3 text-[10px] tracking-[0.12em] text-alu-3">
                    {g.caption.toUpperCase()}
                  </figcaption>
                </figure>
                <div className="p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl font-700 text-volt">{g.tag}</span>
                    <span className="text-[11px] tracking-[0.14em] text-alu-3">{g.when}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-600 text-alu">{g.name}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-alu-2">{g.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Build log ────────────────────────────────────────── */}
        <section id="log" className="border-t border-line py-20">
          <SectionLabel n="05">THE RECEIPTS</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-[26ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
              Including every day it did not work.
            </h2>
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-alu-2">
              1,299 messages between 21 July 2025 and 29 March 2026, with 355
              photographs, 27 videos, six CAD assemblies and three PCB layouts
              attached. Never fewer than a hundred messages in a month. Quoted
              verbatim, dates as sent.
            </p>
          </div>

          <ol className="mt-12 border-t border-line">
            {LOG.map((e, i) => (
              <li
                key={`${e.when}-${i}`}
                className="grid gap-2 border-b border-line py-5 md:grid-cols-[130px_120px_1fr] md:gap-8"
              >
                <span className="text-[11px] tracking-[0.14em] text-volt">{e.when}</span>
                <span className="text-[11px] tracking-[0.1em] text-alu-3">{e.who}</span>
                <span className="flex items-start gap-3 text-[15px] leading-relaxed text-alu-2">
                  <span
                    aria-hidden
                    className={[
                      'mt-2 h-1.5 w-1.5 shrink-0 rounded-full',
                      e.kind === 'snag' ? 'bg-alu-3' : e.kind === 'win' ? 'bg-volt' : 'bg-line-lit',
                    ].join(' ')}
                  />
                  <span>&ldquo;{e.line}&rdquo;</span>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-alu-2">
            Nine months in, someone in the group wrote:{' '}
            <span className="text-alu">
              &ldquo;We have to show how hard we have been working on this project, save each
              prototype to show how many iterations we had to do to get it done.&rdquo;
            </span>{' '}
            This section is that, kept.
          </p>
        </section>

        {/* ── Open, and what that costs us to say honestly ─────── */}
        <section id="open" className="border-t border-line py-20">
          <SectionLabel n="06">WHAT OPEN MEANS HERE</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <h2 className="max-w-[22ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
                Public on GitHub is not the same as open source.
              </h2>
              <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-alu-2">
                Without a licence file, default copyright applies and nobody may
                legally use, modify or redistribute anything. Every one of these
                repositories sat in exactly that state until 5 September 2026,
                while the README claimed otherwise. The licences below are now
                committed, and you can check them rather than take our word.
              </p>
              <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-alu-2">
                Reciprocity on the hardware is the part that matters. Under a
                permissive licence a larger manufacturer could take the CAD, close
                it, and ship it while contributing nothing back — using the only
                advantage this project has against it.
              </p>

              <div className="mt-10 border border-line-lit bg-panel/60 p-6">
                <p className="text-[11px] tracking-[0.18em] text-volt">CREDIT WHERE IT IS OWED</p>
                <p className="mt-3.5 max-w-[52ch] text-[14px] leading-relaxed text-alu-2">
                  V1 is a replication of{' '}
                  <a href={LINKS.espRoll} target="_blank" rel="noreferrer" className="text-alu underline decoration-line-lit underline-offset-4 hover:decoration-volt">
                    ESP-ROLL
                  </a>{' '}
                  by{' '}
                  <a href={LINKS.maxImagination} target="_blank" rel="noreferrer" className="text-alu underline decoration-line-lit underline-offset-4 hover:decoration-volt">
                    Max Imagination
                  </a>
                  , published under CC BY-NC-SA, which also credits{' '}
                  <a href={LINKS.s60sc} target="_blank" rel="noreferrer" className="text-alu underline decoration-line-lit underline-offset-4 hover:decoration-volt">
                    s60sc
                  </a>{' '}
                  for the ESP32-CAM firmware. That project is the reason this one
                  started. It is quarantined as reference-only until a lawyer has
                  read the relationship properly.
                </p>
              </div>
            </div>

            <div>
              <ul className="grid gap-px bg-line">
                {LICENCES.map((l) => (
                  <li key={l.what} className="bg-ground p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[13px] text-alu">{l.what}</span>
                      <span className="text-[12px] font-600 tracking-[0.08em] text-volt">
                        {l.licence}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-alu-3">{l.why}</p>
                    <p className="mt-2.5 text-[10px] tracking-[0.14em] text-alu-3">
                      {l.status === 'quarantined' ? '◇ QUARANTINED — REFERENCE ONLY' : '◆ IN THE REPOSITORY'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── The gaps ─────────────────────────────────────────── */}
        <section id="gaps" className="border-t border-line py-20">
          <SectionLabel n="07">WHAT IS NOT TRUE YET</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="max-w-[20ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
                The list we would rather you heard from us.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-alu-2">
                Every one of these is findable by anyone who looks. Found and
                explained reads as an ordinary state of affairs; found and
                unmentioned reads as concealment. We would rather write it down.
              </p>
            </div>
            <ul className="space-y-px bg-line">
              {GAPS.map((g) => (
                <li key={g} className="flex gap-4 bg-ground p-5">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-alu-3" />
                  <span className="text-[14px] leading-relaxed text-alu-2">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Who is behind it ─────────────────────────────────── */}
        <section id="who" className="border-t border-line py-20">
          <SectionLabel n="08">WHO IS BEHIND IT</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <h2 className="max-w-[22ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
                Ayva Labs sponsors Orbie. It does not own it.
              </h2>
              <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-alu-2">
                Sponsorship means Ayva funds development and staff time, and
                manufactures and sells assembled units. That arrangement paid for
                three hardware generations, and it is worth saying plainly rather
                than obscuring.
              </p>
              <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-alu-2">
                Making that real rather than asserted takes three things. The
                repositories live under the project&rsquo;s own account, not an Ayva
                one — done. Governance sets out what Ayva does not get: no casting
                vote on technical decisions, no ability to close the design, no
                gatekeeping on forks — done. Copyright sits with Ayva by default,
                because Ayva paid for the work, and moving it to contributors is a
                legal step nobody has taken yet — not done, and the licence
                notices say so.
              </p>

              {canDiscussFunding && (
                <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-alu-2">
                  If the machine belongs to the people who own it, funding its
                  development collectively is a reasonable thing to do. If the
                  machine belongs to a company, that is a claim on the company —
                  a different and much worse idea. The open licences are what
                  make the first version possible.
                </p>
              )}

              {canNameToken ? (
                <p className="mt-8 max-w-[54ch] border-l-2 border-solana/50 pl-5 text-[15px] leading-relaxed text-alu-2">
                  Launch mechanics are published in full before anything goes
                  live. No contract address exists until launch — any address
                  circulating before then belongs to someone else.
                </p>
              ) : (
                <p className="mt-8 max-w-[54ch] border-l-2 border-line-lit pl-5 text-[14px] leading-relaxed text-alu-3">
                  There is nothing to buy on this site, and nothing to sign up
                  for. When there is something to say about how continued
                  development gets funded, it will be said here in full and in
                  advance — not on a countdown.
                </p>
              )}
            </div>

            <div className="self-start border border-line bg-panel/60 p-7">
              <p className="text-[11px] tracking-[0.18em] text-volt">THE SIX PEOPLE WHO BUILT IT</p>
              <ul className="mt-5 grid gap-2.5">
                {TEAM.map((t) => (
                  <li key={t} className="border-b border-line pb-2.5 text-[15px] text-alu">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-relaxed text-alu-3">
                Every photograph, quotation and part number on this page came out
                of their group chat and their CAD files.
              </p>
            </div>
          </div>
        </section>

        {/* ── Follow ───────────────────────────────────────────── */}
        <section id="follow" className="border-t border-line py-20">
          <SectionLabel n="09">FOLLOW THE BUILD</SectionLabel>
          <h2 className="mb-12 max-w-[24ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
            The next generation gets built in public too.
          </h2>
          <XFeed />
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-line bg-panel/50">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-700 tracking-[0.14em] text-alu">ORBIE</p>
            <p className="mt-2 max-w-[48ch] text-[13px] leading-relaxed text-alu-2">
              An open-source home robot. Sponsored by Ayva Labs, which funds the
              work and sells assembled units, and does not own or direct the
              project.
            </p>
            <p className="mt-3 text-[12px] text-alu-3">
              Formerly built as PawMe, and as OpenPaw. Same robot, same people, same commit history.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 text-[12px] tracking-[0.14em]">
            <a href={LINKS.x} className="text-alu-2 hover:text-volt">@ORBIE_ROBOT</a>
            <a href={LINKS.github} className="text-alu-2 hover:text-volt">GITHUB</a>
            <a href="#log" className="text-alu-2 hover:text-volt">BUILD LOG</a>
            <a href="#gaps" className="text-alu-2 hover:text-volt">WHAT IS NOT TRUE YET</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
