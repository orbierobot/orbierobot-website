/**
 * The persistent HUD: top status bar and the scrolling ticker beneath it.
 *
 * The ticker deliberately carries HARDWARE facts rather than market ones.
 * The original design scrolled price, market cap and bonding-curve progress,
 * which meant a visitor read a chart before they read what the machine is —
 * and none of those numbers exist yet. These do, they are checkable, and
 * they grow as the project does.
 */

import { OrbieMark } from '@/components/logo';

const TICKER = [
  'GENERATIONS 3',
  'V1 JUL 2025',
  'V2 NOV 2025',
  'V3 2026',
  'UNITS BUILT 10',
  'BUILD LOG 1,299 ENTRIES',
  'CONTRIBUTORS 6',
  'MCU XIAO ESP32-S3',
  'SUBSCRIPTION NONE',
  'CLOSED CLOUD NONE',
];

export function StatusBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5 text-volt">
          <OrbieMark size={20} blink />
          <span className="font-display text-sm font-700 tracking-[0.22em] text-alu">
            ORBIE.SYS
          </span>
        </a>
        <div className="hidden items-center gap-6 text-[11px] tracking-[0.14em] text-alu-3 md:flex">
          <span>STATUS <span className="text-volt">BUILDING</span></span>
          <span>PHASE <span className="text-alu-2">OPEN SOURCE</span></span>
          <span>GEN <span className="text-alu-2">V3</span></span>
        </div>
        <nav className="flex items-center gap-4 text-[11px] tracking-[0.14em]">
          <a href="#body" className="hidden text-alu-2 hover:text-volt sm:inline">BODY</a>
          <a href="#build" className="hidden text-alu-2 hover:text-volt sm:inline">BUILD</a>
          <a href="#log" className="text-alu-2 hover:text-volt">LOG</a>
          <a href="https://github.com/orbierobot" className="text-alu-2 hover:text-volt">
            REPO
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-b border-line bg-panel/60 py-2">
      <div className="ticker-track flex w-max gap-0 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="px-6 text-[11px] tracking-[0.16em] text-alu-3"
          >
            {t}
            <span className="pl-6 text-line-lit">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-volt">
      // {n} — {children}
    </p>
  );
}
