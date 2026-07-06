/* global Response, URL */
import type { APIRoute } from 'astro';

import { SITE } from '../config';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = (site ?? new URL(SITE.url)).origin;
  const sitemap = new URL(`${base}/sitemap-index.xml`, origin).toString();

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
