# orbierobot-website

The launch site for **Orbie** — an open-source home robot. Live at
[www.orbierobot.com](https://www.orbierobot.com).

Next.js 16 (App Router) + Tailwind v4, pnpm. The whole site prerenders; there
is no server-side code.

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # static export into ./out
```

## Phase constraint — read before adding copy

Orbie is in the **tease** phase. Nothing on this site may mention a token, a
ticker, a chain, or a launch venue. That is not caution for its own sake: the
build-in-public audience is being earned first, and a launch that leaks early
loses the only advantage this project has — a year of hardware work that
visibly predates any token.

This is enforced in code, not by memory. `lib/phase.ts` mirrors Phoenix's phase
machine and gates every token-adjacent block on the page. Move phases with
`NEXT_PUBLIC_LAUNCH_PHASE`; the default is `tease`. Price predictions, return
promises, buy advice and unconfirmed listings are never rendered in any phase
and are not configurable.

Reasoning lives in `phoenix/docs/ORBIE_LAUNCH.md` and `ORBIE_PLAN.md`.

## Every claim has a source

`lib/content.ts` holds all of it — the spec, the eleven subsystems, the build
log quotes, the licences, the gaps. One file to check a fact against. Quotes
are verbatim from the build chat with the dates as sent, and the failures are
in there on purpose: a build log with no bad days is a brochure.

Two numbers that circulate in our own materials are deliberately **absent**
because nobody has sourced them: the 847 reservations, and the app installs.
Do not add them back without provenance.

## Brand

`/brand` documents the mark, the palette, the type and the rules.
`public/brand/` holds the files; everything is `currentColor` so one file works
on any background. Regenerate rather than redraw:

```bash
# needs Pillow + fontTools — the pawme-reels venv has both
~/baabu/pawme-reels/.venv/bin/python scripts/generate-marks.py
~/baabu/pawme-reels/.venv/bin/python scripts/generate-wordmark.py
~/baabu/pawme-reels/.venv/bin/python scripts/export-brand-png.py
```

## Deployment

GitHub Pages, via `.github/workflows/deploy.yml`, on push to `main`. The domain
already resolves here — apex A records to GitHub, `www` CNAME to
`orbierobot.github.io`, nameservers at Squarespace — so the registrar does not
need touching.

Pages must be set to **Source: GitHub Actions** (Settings → Pages). While it is
on "Deploy from a branch" the workflow's deploy step cannot publish.

`public/.nojekyll` matters: without it Jekyll silently discards `_next/` and
the site loads unstyled. `public/CNAME` keeps the custom domain attached.

Hosting is a governance question here, not only a cost one. Ayva Labs sponsors
Orbie and does not own or direct it, so the site is served from the project's
own organisation rather than a sponsor account — the same reason the code
repositories are moving to this org.

## History

This repository holds two merged histories: the static page that served
www.orbierobot.com from 4 September 2026, and this Next.js site. Nothing was
force-pushed away. The previous site's assets are still here under `images/`
and `composer-imgs/`; they are not published, because only `out/` is deployed.
