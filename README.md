# orbie_landing_site

Launch site for **Orbie** — an open-source home robot.

## Phase constraint — read before adding copy

Orbie is in the **tease** phase. Nothing on this site may mention a token, a
ticker, a chain, or a launch venue. That is not caution for its own sake: the
build-in-public audience is being earned first, and a launch that leaks early
loses the only advantage this project has — a year of hardware work that
visibly predates any token.

The phase machine and the rules that enforce it live in the Phoenix repo
(`lib/brand/phases.ts`, `lib/brand/guardrails.ts`), and the reasoning is in
`phoenix/docs/ORBIE_LAUNCH.md`.

Everything currently on the page is a claim the record supports: three
hardware generations, a public repo, perception and voice on an ESP32-S3.
When the phase advances this site should gain a section, not need a rewrite.

## Content to adapt

The predecessor site is at
`~/Development/openpawrobot/openpawrobot_website` — copy is being moved
across and rewritten for Orbie over time. Note it was written under the old
name and, in places, for a pre-order/deposit flow that no longer applies.

## Running

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
```

Registered in `~/baabu/.claude/launch.json` as `orbie-site` on port 9024.

## Notes

- Tailwind 4. Colours are declared in `@theme` in `app/globals.css`, which
  generates real utilities (`bg-bone`, `text-signal`). Do **not** write
  `bg-[--color-bone]` — that is arbitrary-value syntax, it needs `var()`, and
  without it the class silently does nothing.
- Palette is taken from the film's end card so the site and video read as one
  thing.
