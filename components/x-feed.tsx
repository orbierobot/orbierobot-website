'use client';

/**
 * X presence.
 *
 * The follow card is server-rendered and always there; the timeline widget is
 * an enhancement that loads after. X's embed script fails often enough — ad
 * blockers, tracking protection, the script simply being slow — that the
 * section has to read as complete without it, rather than leaving a hole where
 * a feed should be.
 */

import { useEffect, useRef, useState } from 'react';
import { LINKS } from '@/lib/content';

export function XFeed() {
  const slot = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'blocked'>('loading');

  useEffect(() => {
    let cancelled = false;

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onerror = () => !cancelled && setState('blocked');
    document.body.appendChild(script);

    /* If the widget has not painted anything in five seconds, treat it as
     * blocked and keep the fallback. */
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      const painted = slot.current?.querySelector('iframe');
      setState(painted ? 'ready' : 'blocked');
    }, 5000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="grid gap-px bg-line lg:grid-cols-2">
      {/* Follow card — never depends on the embed. */}
      <div className="flex flex-col justify-between gap-8 bg-ground p-8">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-ember">THE BUILD IS POSTED AS IT HAPPENS</p>
          <p className="mt-5 font-display text-3xl font-700 leading-tight text-alu">@orbie_robot</p>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-alu-2">
            Firmware that did not compile, parts that arrived wrong, the display
            the day it finally lit. If you would rather watch than read, this is
            where it goes first.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={LINKS.x}
            target="_blank"
            rel="noreferrer"
            className="border border-ember bg-ember px-6 py-3.5 text-[12px] font-600 tracking-[0.14em] text-ground transition hover:bg-transparent hover:text-ember"
          >
            FOLLOW @ORBIE_ROBOT
          </a>
          <a
            href={LINKS.xFounder}
            target="_blank"
            rel="noreferrer"
            className="border border-line-lit px-6 py-3.5 text-[12px] font-600 tracking-[0.14em] text-alu-2 transition hover:border-ember hover:text-ember"
          >
            @JAISWALASHOK
          </a>
        </div>
      </div>

      {/* Timeline — enhancement only. */}
      <div className="min-h-[320px] bg-ground p-2">
        <div ref={slot} className={state === 'blocked' ? 'hidden' : 'block'}>
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-height="460"
            data-chrome="noheader nofooter transparent"
            href={LINKS.x}
          >
            Posts by @orbie_robot
          </a>
        </div>

        {state === 'blocked' && (
          <div className="flex h-full min-h-[300px] flex-col items-start justify-center gap-3 p-6">
            <p className="text-[11px] tracking-[0.16em] text-alu-3">TIMELINE UNAVAILABLE</p>
            <p className="max-w-[38ch] text-[14px] leading-relaxed text-alu-2">
              X&rsquo;s embed did not load — usually tracking protection or an ad
              blocker. The posts are all still there.
            </p>
            <a href={LINKS.x} target="_blank" rel="noreferrer" className="text-[13px] text-ember hover:underline">
              Open the timeline on x.com →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
