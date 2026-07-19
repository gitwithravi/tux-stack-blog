// @ts-check
/* global URL */
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import process from 'node:process';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { remarkAsHtml } from './src/plugins/remark-ashtml.ts';
import { remarkAlert } from './src/plugins/remark-alert.ts';
import { unified } from '@astrojs/markdown-remark';

import { SITE } from './src/config';
import { slugify } from './src/utils/slugify.ts';

const rawBase = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');
const BASE = rawBase.startsWith('/') ? rawBase : `/${rawBase}`;
const SITEMAP_XSL_HREF = BASE === '/' ? '/sitemap/styles.xsl' : `${BASE}/sitemap/styles.xsl`;
const SKIP_RSS_SITEMAP = process.env.CI_SKIP_RSS_SITEMAP === 'true';

/**
 * Set of URL path segments that belong to unlisted posts/pages.
 * Consumed by the sitemap `filter` to exclude them.
 *
 * We use path segments (e.g. "posts/my-slug") rather than full URLs so
 * the check works regardless of `SITE_URL` or `BASE_PATH` values.
 */
const unlistedPathSegments = new Set();

/**
 * Map of URL path segment (e.g. "posts/my-slug") → ISO 8601 date for
 * every post, sourced from `updatedDate ?? pubDate`. Consumed by the
 * sitemap `serialize()` hook to emit `<lastmod>` entries.
 */
const lastmodByPathSegment = new Map();

/**
 * Set of URL path segments (e.g. "/tags/agile/") for tag pages with too
 * few posts to be worth indexing — thin content. Consumed by the
 * sitemap `filter`; the pages themselves carry `noindex`.
 */
const thinTagPathSegments = new Set();

/** Minimum number of posts for a tag page to be indexable. */
const MIN_POSTS_PER_INDEXABLE_TAG = 3;

/**
 * Recursively list every .md/.mdx file under `dir`.
 * @param {string} dir
 * @returns {string[]}
 */
function listPostFiles(dir) {
  /** @type {string[]} */
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...listPostFiles(path));
    else if (/\.(md|mdx)$/i.test(name)) out.push(path);
  }
  return out;
}

/**
 * Read a scalar frontmatter value (e.g. `pubDate: 2026-07-01`).
 * @param {string} frontmatter
 * @param {string} key
 * @returns {string | undefined}
 */
function frontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\s*(.+?)\s*$`, 'm'));
  return match ? match[1].replace(/^['"]|['"]$/g, '') : undefined;
}

/**
 * Read a frontmatter string array — supports the single-line inline
 * form (`tags: ['a', 'b']`), the multi-line inline form
 * (`tags:\n  [\n    'a',\n  ]`), and the block-list form
 * (`tags:\n  - a\n  - b`).
 * @param {string} frontmatter
 * @param {string} key
 * @returns {string[]}
 */
function frontmatterArray(frontmatter, key) {
  const stripQuotes = (/** @type {string} */ s) => s.trim().replace(/^['"]|['"]$/g, '');
  // [\s\S] (not `.`) so multi-line inline arrays are matched too.
  const inline = frontmatter.match(new RegExp(`^${key}:\s*\[([\s\S]*?)\]`, 'm'));
  if (inline) return inline[1].split(',').map(stripQuotes).filter(Boolean);
  const block = frontmatter.match(new RegExp(`^${key}:\s*\n((?:[ \t]+-\s+.*(?:\n|$))+)`, 'm'));
  if (block) {
    return block[1]
      .split('\n')
      .map((line) => stripQuotes(line.replace(/^[ \t]+-\s+/, '')))
      .filter(Boolean);
  }
  return [];
}

/**
 * Populate `unlistedPathSegments`, `lastmodByPathSegment` and
 * `thinTagPathSegments` by scanning `src/content/posts/` directly from
 * the filesystem.
 *
 * Why not `getCollection()` in an `astro:build:start` hook? Importing
 * `astro:content` from the config fails in some runtimes ("Vite module
 * runner has been closed"), which silently disabled the unlisted-post
 * sitemap exclusion. Reading frontmatter at config-evaluation time is
 * runtime-independent and works in dev, build, and CI alike.
 */
function collectPostMetadata() {
  /** @type {Map<string, number>} tag counts per locale ("{locale}::{tag}") */
  const tagCounts = new Map();
  const postsDir = fileURLToPath(new URL('./src/content/posts', import.meta.url));
  /** @type {string[]} */
  let files;
  try {
    files = listPostFiles(postsDir);
  } catch {
    return; // No content directory — nothing to collect.
  }
  for (const file of files) {
    const relative = file.slice(postsDir.length + 1);
    const segs = relative.split(/[\\/]/);
    const locale =
      segs[0] && /** @type {readonly string[]} */ (SITE.locales).includes(segs[0])
        ? segs[0]
        : SITE.defaultLocale;
    const slug = segs
      .slice(locale === segs[0] ? 1 : 0)
      .join('/')
      .replace(/\.(md|mdx)$/i, '');
    const segment = locale === SITE.defaultLocale ? `posts/${slug}` : `${locale}/posts/${slug}`;

    const text = readFileSync(file, 'utf8');
    const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;
    const frontmatter = fmMatch[1];

    const lastmodRaw =
      frontmatterValue(frontmatter, 'updatedDate') ?? frontmatterValue(frontmatter, 'pubDate');
    if (lastmodRaw) {
      const lastmod = new Date(lastmodRaw);
      if (!Number.isNaN(lastmod.valueOf()))
        lastmodByPathSegment.set(segment, lastmod.toISOString());
    }
    const unlisted = /^unlisted:\s*true\s*$/m.test(frontmatter);
    const draft = /^draft:\s*true\s*$/m.test(frontmatter);
    if (unlisted) unlistedPathSegments.add(segment);
    // Tag counts drive the thin-tag sitemap exclusion. Mirror
    // `getTagsWithCount()`, which only counts listed, non-draft posts.
    if (!unlisted && !draft) {
      for (const tag of frontmatterArray(frontmatter, 'tags')) {
        const key = `${locale}::${tag}`;
        tagCounts.set(key, (tagCounts.get(key) ?? 0) + 1);
      }
    }
  }

  // Tag pages below the indexability threshold are thin content —
  // exclude them from the sitemap (they also carry `noindex`).
  for (const [key, count] of tagCounts) {
    if (count >= MIN_POSTS_PER_INDEXABLE_TAG) continue;
    const [locale, tag] = key.split('::');
    thinTagPathSegments.add(
      locale === SITE.defaultLocale ? `/tags/${slugify(tag)}/` : `/${locale}/tags/${slugify(tag)}/`,
    );
  }
}
collectPostMetadata();

/**
 * Tiny inline integration: after `@astrojs/sitemap` runs, rewrite the
 * absolute XSL `href` it emits (always prefixed with `site`, e.g.
 * `https://aneejian.com/sitemap/styles.xsl`) to a root-relative path.
 *
 * Why: a root-relative href works in BOTH environments
 *   - production: same origin as the sitemap, browsers apply the XSL
 *   - `bun serve` / preview: same origin (localhost), no cross-origin
 *     XSLT block (which renders as a blank page in browsers).
 *
 * Crawlers ignore `<?xml-stylesheet ?>` entirely, so SEO is unaffected.
 */
function rewriteSitemapXslToRelative() {
  return {
    name: 'chirpy:rewrite-sitemap-xsl',
    hooks: {
      'astro:build:done': (/** @type {{ dir: URL }} */ { dir }) => {
        const distDir = fileURLToPath(dir);
        const files = readdirSync(distDir).filter(
          (f) => f.startsWith('sitemap') && f.endsWith('.xml'),
        );
        for (const file of files) {
          const path = join(distDir, file);
          const xml = readFileSync(path, 'utf8');
          const fixed = xml.replace(
            /<\?xml-stylesheet\b[^?]*\?>/,
            `<?xml-stylesheet type="text/xsl" href="${SITEMAP_XSL_HREF}"?>`,
          );
          if (fixed !== xml) writeFileSync(path, fixed);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  // GitHub Pages serves the project at https://<user>.github.io/<repo>/,
  // so production builds need `base` to match that subpath — every
  // generated asset URL (CSS, JS, images, favicons) is prefixed with it.
  //
  // In `bun run dev`, however, we want the site to open at plain
  // `http://localhost:4321/` for a friction-free local experience. The
  // `BASE_PATH` env var (read from `.env`) lets each environment opt in:
  //   - `.env` (committed empty / unset)         → dev runs at `/`
  //   - CI / Pages workflow sets BASE_PATH=/chirping-astro for the build
  //
  // In source code, always build absolute paths through `withBase()` /
  // `localizedPath()` in `src/i18n/utils.ts` so they pick up this value
  // automatically (via `import.meta.env.BASE_URL`).
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },

  // Image optimization (https://docs.astro.build/en/guides/images/).
  //
  // - Local images imported from `src/` (or `src/assets/`) are optimized
  //   automatically by `astro:assets`.
  // - Images in `public/` are copied as-is and CANNOT be transformed.
  // - Remote URLs must match a `remotePatterns` entry below before they
  //   can be passed to `<Image>` / `<Picture>` for optimization.
  //
  // The default Sharp service generates modern formats (WebP/AVIF) and
  // responsive `srcset`s. With `responsiveStyles: true` and a default
  // `layout`, every `<Image layout="...">` automatically gets the right
  // `width`/`height`/`object-fit` styles applied.
  image: {
    layout: 'constrained',
    responsiveStyles: true,
    remotePatterns: [
      // Unsplash (used by demo posts).
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Common CDNs many users plug in. Extend or trim as needed.
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'imagedelivery.net' },
    ],
  },

  // i18n config: EN is default and serves at root (no prefix), FR served at /fr.
  // We rely on filesystem routing (src/pages and src/pages/[...locale]) for the actual
  // routes, but still expose locales here so integrations like sitemap can
  // generate hreflang alternates correctly.
  i18n: {
    locales: [...SITE.locales],
    defaultLocale: SITE.defaultLocale,
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  markdown: {
    // `remark-math` parses `$inline$` and `$$display$$` blocks into MDAST
    // math nodes; `rehype-katex` converts them to pre-rendered HTML at
    // build time so no JavaScript is shipped to the client.
    //
    // The accompanying KaTeX stylesheet (`katex/dist/katex.min.css`) is
    // loaded ONLY on pages that opt in via `math: true` in frontmatter,
    // through `<MathStyles />` in the post / page layouts. This keeps the
    // CSS (~25kB gzipped) off pages that don't need it.
    processor: unified({
      remarkPlugins: [remarkAlert, remarkAsHtml, remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['heading-anchor'],
              ariaHidden: 'true',
              tabIndex: -1,
            },
          },
        ],
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['nofollow', 'noopener', 'noreferrer'],
          },
        ],
      ],
      gfm: true,
    }),
  },

  integrations: [
    icon({
      // Astro-Icon will tree-shake from @iconify-json/lucide so only the
      // icons actually referenced make it into the build.
      iconDir: 'src/icons',
    }),
    // Expressive Code provides syntax highlighting (Shiki under the hood)
    // plus extra features: code-block frames + titles, copy button, line
    // markers, diffs, word wrap, collapsible sections.
    // https://expressive-code.com/
    expressiveCode({
      themes: ['github-light', 'github-dark-dimmed'],
      // Bind the active theme to our `<html data-theme>` attribute instead
      // of the default `prefers-color-scheme` media query so the theme
      // toggle in the sidebar takes effect immediately.
      themeCssSelector: (theme) =>
        `[data-theme='${theme.type === 'dark' ? 'chirpy-dark' : 'chirpy-light'}']`,
      useDarkModeMediaQuery: false,
      shiki: {
        langAlias: {
          env: 'dotenv',
        },
      },
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontFamily:
          "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        codeFontSize: '0.875rem',
        frames: {
          shadowColor: 'transparent',
        },
      },
    }),
    // MDX must come after Expressive Code so EC can transform fenced
    // code blocks inside .mdx files too.
    mdx(),
    ...(SKIP_RSS_SITEMAP
      ? []
      : [
          sitemap({
            i18n: {
              defaultLocale: SITE.defaultLocale,
              locales: Object.fromEntries(SITE.locales.map((l) => [l, l])),
            },
            // Browsers (and only browsers) apply this XSL to render a
            // human-readable view of `sitemap-index.xml` and `sitemap-0.xml`.
            // Search-engine crawlers ignore the processing instruction.
            // Note: `@astrojs/sitemap` rewrites this into an ABSOLUTE URL using
            // `site`. The `rewriteSitemapXslToRelative()` integration below
            // turns it back into a root-relative path so local preview works.
            xslURL: SITEMAP_XSL_HREF,
            filter: (page) => {
              if (page.includes('/draft/') || page.endsWith('/404/')) return false;
              // Internal search + form thank-you pages are noindexed —
              // keep them out of the sitemap too.
              if (page.endsWith('/search/') || page.endsWith('/contact/success/')) return false;
              // Exclude unlisted posts from the sitemap.
              for (const seg of unlistedPathSegments) {
                if (page.includes(String(seg))) return false;
              }
              // Exclude thin tag pages (noindexed — keep signals aligned).
              for (const seg of thinTagPathSegments) {
                if (page.endsWith(String(seg))) return false;
              }
              return true;
            },
            // Attach <lastmod> (from updatedDate ?? pubDate) to post URLs so
            // crawlers get a real content-freshness signal.
            serialize: (item) => {
              try {
                const { pathname } = new URL(item.url);
                const withoutBase =
                  BASE !== '/' && pathname.startsWith(BASE)
                    ? pathname.slice(BASE.length)
                    : pathname;
                const rel = withoutBase.replace(/^\/+|\/+$/g, '');
                const lastmod = lastmodByPathSegment.get(rel);
                if (lastmod) item.lastmod = lastmod;
              } catch {
                // Ignore malformed URLs — leave the entry untouched.
              }
              return item;
            },
          }),
          rewriteSitemapXslToRelative(),
        ]),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    contentIntellisense: true,
    // Astro 6.2.x still exposes SVG optimization as an experimental flag.
    // The 6.2 change renamed the old `experimental.svgo` flag to the new
    // `experimental.svgOptimizer` API; it is not a stable top-level config yet.
    svgOptimizer: svgoOptimizer({
      multipass: true,
    }),
  },

  fonts: [
    // Source Sans 3 — main UI font from @fontsource/source-sans-3 npm package
    {
      name: 'Source Sans 3',
      cssVariable: '--font-source-sans-3',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2',
            ],
          },
          {
            weight: '600',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff2',
            ],
          },
          {
            weight: '700',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff2',
            ],
          },
          {
            weight: '900',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-900-normal.woff2',
            ],
          },
        ],
      },
    },
    // Lato — secondary font from @fontsource/lato npm package
    {
      name: 'Lato',
      cssVariable: '--font-lato',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '300',
            style: 'normal',
            src: ['./node_modules/@fontsource/lato/files/lato-latin-300-normal.woff2'],
          },
          {
            weight: '400',
            style: 'normal',
            src: ['./node_modules/@fontsource/lato/files/lato-latin-400-normal.woff2'],
          },
        ],
      },
    },
    // JetBrains Mono — monospace font from @fontsource/jetbrains-mono npm package
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: [
              './node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
            ],
          },
          {
            weight: '600',
            style: 'normal',
            src: [
              './node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2',
            ],
          },
        ],
      },
    },
  ],
});
