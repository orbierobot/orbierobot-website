/**
 * Launch phase gate.
 *
 * Phoenix already models the launch as an ordered phase machine and refuses to
 * publish copy that breaks a gate. The website is the largest single piece of
 * copy the project has, so it obeys the same machine rather than relying on
 * whoever edits it next to remember the rules.
 *
 * Set NEXT_PUBLIC_LAUNCH_PHASE to move between phases. Default is `tease`,
 * because that is where the project actually is: the gate that opens `genesis`
 * is audience, not readiness, and shipping a site that mentions a ticker before
 * anyone knows what the robot is defeats the point of building the audience.
 *
 * What each phase may say:
 *
 *   tease      Build logs, demos, the robotics and openness arguments.
 *              Zero token vocabulary. ← we are here
 *   build      The community-ownership reasoning. Still no ticker, chain or date.
 *   genesis    Ticker, chain, date, mechanics. Still NO contract address — it does
 *              not exist yet, and any address circulating before launch belongs
 *              to someone else.
 *   launch     Mint address, how to buy.
 *   postlaunch Holder milestones, governance, roadmap delivery.
 *
 * Blocked in every phase, permanently, and not configurable here: price
 * predictions, return promises, directive buy advice, unconfirmed exchange
 * listings. Those are not disclosure gates — they are things we do not say.
 */

export type Phase = 'tease' | 'build' | 'genesis' | 'launch' | 'postlaunch';

const ORDER: Phase[] = ['tease', 'build', 'genesis', 'launch', 'postlaunch'];

function readPhase(): Phase {
  const raw = process.env.NEXT_PUBLIC_LAUNCH_PHASE;
  return (ORDER as string[]).includes(raw ?? '') ? (raw as Phase) : 'tease';
}

export const PHASE: Phase = readPhase();

/** True once the project has reached `p` or later. */
export function atLeast(p: Phase): boolean {
  return ORDER.indexOf(PHASE) >= ORDER.indexOf(p);
}

/** May the page reason out loud about collective ownership and funding? */
export const canDiscussFunding = atLeast('build');

/** May the page name a ticker, a chain or a date? */
export const canNameToken = atLeast('genesis');

/** May the page publish a contract address and buying instructions? */
export const canPublishAddress = atLeast('launch');
