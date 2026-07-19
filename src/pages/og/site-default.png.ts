/**
 * Static default OG image endpoint.
 *
 * Generates the site-wide fallback `og:image` (used by the homepage,
 * listing pages and static pages via `SITE.defaultOgImage`) as a
 * 1200×630 PNG with the same Satori + Resvg pipeline used for posts.
 *
 * Why a PNG: social crawlers (Facebook, X, LinkedIn, WhatsApp, Slack,
 * Discord) do not render SVG OG images, so the old `og-default.svg`
 * produced empty link previews for every non-post page.
 *
 * Route: /og/site-default.png — a static route, so it always wins over
 * the dynamic `/og/[...slug].png` endpoint for this exact path.
 */
/* global Response */
import { generateOgImage } from '../../utils/og-image';
import { SITE } from '../../config';

export async function GET() {
  const png = await generateOgImage({
    title: SITE.title,
    description: SITE.description,
    tags: ['AI systems', 'engineering', 'Linux'],
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
