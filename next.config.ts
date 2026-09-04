import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Static export.
   *
   * The whole site prerenders — there is no server-side code, no API route and
   * no ISR — so it ships as plain files. That keeps hosting free and, more to
   * the point, keeps it owned by the project rather than by its sponsor:
   * Orbie's own GitHub organisation can serve this from Pages without an
   * account belonging to Ayva Labs sitting in the middle of it.
   *
   * When the launch phase needs server-side anything (a form, an allowlist, an
   * API), drop this line and move to a Vercel Pro team owned by the Orbie org.
   * Vercel's Hobby tier is non-commercial only and this project sells robots.
   */
  output: 'export',

  /* Pages serves /brand as /brand.html unless directories are used. */
  trailingSlash: true,
};

export default nextConfig;
