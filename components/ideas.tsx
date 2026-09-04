'use client';

/**
 * "What you could build" — filterable by the part it leans on.
 *
 * The filter is the argument. Clicking a sensor and watching four unrelated
 * projects appear under it makes the combinatorial point far faster than a
 * paragraph claiming the platform is versatile: eleven parts, and the
 * interesting things all live in the combinations.
 */

import { useState } from 'react';
import { IDEAS, SUBSYSTEMS } from '@/lib/content';

const NAME = new Map(SUBSYSTEMS.map((s) => [s.id, s.name]));

export function Ideas() {
  const [filter, setFilter] = useState<string | null>(null);

  const shown = filter ? IDEAS.filter((i) => (i.uses as readonly string[]).includes(filter)) : IDEAS;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-2 text-[11px] tracking-[0.16em] text-alu-3">FILTER BY PART</span>
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={[
            'border px-2.5 py-1.5 text-[11px] tracking-[0.1em] transition',
            filter === null
              ? 'border-volt bg-volt/10 text-volt'
              : 'border-line text-alu-3 hover:border-line-lit hover:text-alu-2',
          ].join(' ')}
        >
          ALL
        </button>
        {SUBSYSTEMS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setFilter(filter === s.id ? null : s.id)}
            className={[
              'border px-2.5 py-1.5 text-[11px] tracking-[0.1em] transition',
              filter === s.id
                ? 'border-volt bg-volt/10 text-volt'
                : 'border-line text-alu-3 hover:border-line-lit hover:text-alu-2',
            ].join(' ')}
          >
            {s.name.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((idea) => (
          <article key={idea.title} className="flex flex-col bg-ground p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-600 leading-snug text-alu">{idea.title}</h3>
              <span className="shrink-0 pt-1 text-[10px] tracking-[0.12em] text-alu-3">
                {idea.effort.toUpperCase()}
              </span>
            </div>
            <p className="mt-3 flex-1 text-[14px] leading-relaxed text-alu-2">{idea.body}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {idea.uses.map((u) => (
                <span
                  key={u}
                  className="border border-line-lit px-2 py-1 text-[10px] tracking-[0.1em] text-alu-3"
                >
                  {(NAME.get(u) ?? u).toUpperCase()}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-alu-2">
        None of these are on a roadmap and none of them are promised. They are the
        obvious things eleven parts and a published wiring diagram make possible —
        written down so it is clear how low the floor is. The unobvious ones are the
        reason to open the hardware at all.
      </p>
    </div>
  );
}
