import type { Metadata } from 'next';
import Link from 'next/link';
import { StatusBar, SectionLabel } from '@/components/chrome';
import { ENDPOINTS, EXAMPLE } from '@/lib/interface';
import { LINKS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Orbie — the HTTP interface',
  description:
    'Every route the robot answers to. All GETs, no SDK, no account, no cloud in the middle.',
};

/* Reference material, moved here from the front page so the site itself can
 * stay short. Same content, same caveats. */
export default function InterfacePage() {
  return (
    <div id="top">
      <StatusBar />

      <main className="mx-auto max-w-[1400px] px-5">
        <section className="py-16 lg:py-24">
          <p className="text-[11px] tracking-[0.16em] text-alu-3">
            <Link href="/" className="hover:text-ember">ORBIE</Link>
            <span className="px-2 text-line-lit">/</span>
            DOCS
            <span className="px-2 text-line-lit">/</span>
            <span className="text-alu-2">INTERFACE</span>
          </p>
          <SectionLabel n="00">THE INTERFACE</SectionLabel>
          <h1 className="max-w-[26ch] font-display text-4xl font-700 leading-[1.06] text-alu md:text-5xl">
            Anything that can read a JPEG can drive this robot.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-alu-2">
            Every route is a GET. No SDK, no account, no cloud in the middle — the
            robot runs its own web server and answers to a shell, a browser bar, or
            any language that can make an HTTP request. The heavy thinking happens
            wherever you send the frames.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-[14px]">
                <tbody>
                  {ENDPOINTS.map((e) => (
                    <tr key={e.route} className="border-b border-line align-top">
                      <td className="w-[210px] py-4 pr-6">
                        <code className="text-[13px] text-ember">{e.route}</code>
                      </td>
                      <td className="py-4 pr-6">
                        <span className="block text-alu">{e.does}</span>
                        {e.note && (
                          <span className="mt-1.5 block text-[13px] leading-relaxed text-alu-3">
                            {e.note}
                          </span>
                        )}
                        <code className="mt-2 block text-[11px] leading-relaxed break-all text-alu-3">
                          → {e.returns}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <pre className="regmark relative overflow-x-auto border border-line bg-panel/70 p-6 text-[12.5px] leading-relaxed text-alu-2">
                <code>{EXAMPLE}</code>
              </pre>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-alu-2">
                That is the entire integration surface. Point <code className="text-alu-3">/capture</code>{' '}
                at whatever model you like, decide something, and call{' '}
                <code className="text-alu-3">/motor</code>. The robot only has to be
                honest about what it sees and reliable about what it does.
              </p>
              <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed text-alu-3">
                Routes are read from the published firmware, in
                <code className="px-1">Firmware/components/camera/camera_server.c</code>
                — check them there rather than taking this page&rsquo;s word for it. Not
                every route has been verified on hardware yet; the ones we have run are
                distance, the face and the camera. There is no mDNS name on this build,
                so you reach it by IP.
              </p>
              <p className="mt-6 text-[12px] tracking-[0.14em]">
                <a href={LINKS.github} className="text-alu-2 hover:text-ember">SOURCE ON GITHUB →</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
