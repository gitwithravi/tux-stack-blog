/* global URL */
import { SITE, type Locale } from '../config';
import { alternates, htmlLang, localizedPath, withBase } from '../i18n/utils';

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  /** Intrinsic OG image size — emitted as og:image:width/height. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  /** Emitted as og:image:alt + twitter:image:alt. */
  ogImageAlt?: string;
  ogLocale: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  locale: Locale;
  hreflangs: ReturnType<typeof alternates>;
  jsonLd: JsonLdValue;
  /**
   * When `true`, the SEO component emits
   * `<meta name="robots" content="noindex, nofollow">`.
   * Set automatically for unlisted posts/pages when
   * `unlistedHideFromSeo` is `true` (the default).
   */
  noindex?: boolean;
}

interface BuildSeoArgs {
  title?: string;
  /** When `true`, `title` is used verbatim (no `" — ${SITE.title}"` suffix). */
  absoluteTitle?: boolean;
  description?: string;
  pathWithoutLocale: string;
  fullPath: string;
  locale: Locale;
  ogImage?: string;
  /** Intrinsic OG image size — emitted as og:image:width/height. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  /** Emitted as og:image:alt + twitter:image:alt. */
  ogImageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
  canonicalURL?: string;
  crumbs?: Array<{ label: string; href?: string }>;
  /**
   * Restrict hreflang alternates to a subset of locales. Used on post
   * pages where a translation may be missing.
   */
  availableLocales?: readonly Locale[];
  /** Emit `<meta name="robots" content="noindex, nofollow">`. */
  noindex?: boolean;
}

function absoluteUrl(pathOrUrl: string): string {
  return new URL(withBase(pathOrUrl), SITE.url).toString();
}

function personId(): string {
  return `${SITE.url.replace(/\/$/, '')}/#person`;
}

function websiteId(): string {
  return `${SITE.url.replace(/\/$/, '')}/#website`;
}

function imageSrc(
  image: typeof SITE.author.avatar | typeof SITE.defaultOgImage,
): string | undefined {
  if (!image) return undefined;
  return typeof image === 'string' ? image : image.src;
}

function buildBreadcrumbs(
  crumbs: Array<{ label: string; href?: string }> | undefined,
  locale: Locale,
  canonical: string,
): JsonLdValue | undefined {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: SITE.title,
      item: absoluteUrl(localizedPath('/', locale)),
    },
    ...(crumbs ?? []).map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: crumb.label,
      item: crumb.href ? absoluteUrl(crumb.href) : canonical,
    })),
  ];

  if (items.length <= 1) return undefined;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items,
  };
}

function buildJsonLd(args: BuildSeoArgs, meta: Omit<SeoMeta, 'jsonLd'>): JsonLdValue {
  const language = htmlLang(args.locale);
  const breadcrumb = buildBreadcrumbs(args.crumbs, args.locale, meta.canonical);
  const authorAvatar = imageSrc(SITE.author.avatar);
  const graph: JsonLdValue[] = [
    {
      '@type': 'Person',
      '@id': personId(),
      name: SITE.author.name,
      ...(SITE.author.url ? { url: SITE.author.url } : {}),
      ...(authorAvatar ? { image: absoluteUrl(authorAvatar) } : {}),
      description: SITE.author.bio,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId(),
      url: absoluteUrl(localizedPath('/', SITE.defaultLocale)),
      name: SITE.title,
      description: SITE.description,
      inLanguage: language,
      publisher: { '@id': personId() },
      potentialAction: {
        '@type': 'SearchAction',
        target: absoluteUrl(localizedPath('/search/?q={search_term_string}', args.locale)),
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  if (breadcrumb) graph.push(breadcrumb);

  graph.push(
    meta.type === 'article'
      ? {
          '@type': 'BlogPosting',
          '@id': `${meta.canonical}#article`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': meta.canonical },
          headline: args.title ?? SITE.title,
          description: meta.description,
          image: [meta.ogImage],
          datePublished: meta.publishedTime ?? undefined,
          dateModified: meta.modifiedTime ?? meta.publishedTime ?? undefined,
          author: { '@id': personId() },
          publisher: { '@id': personId() },
          inLanguage: language,
          keywords: meta.tags?.join(', '),
          ...(breadcrumb ? { breadcrumb: { '@id': `${meta.canonical}#breadcrumb` } } : {}),
        }
      : {
          '@type': 'WebPage',
          '@id': meta.canonical,
          url: meta.canonical,
          name: meta.title,
          description: meta.description,
          isPartOf: { '@id': websiteId() },
          inLanguage: language,
          about: { '@id': personId() },
          ...(breadcrumb ? { breadcrumb: { '@id': `${meta.canonical}#breadcrumb` } } : {}),
        },
  );

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** Build the SEO data block consumed by `<SEO />`. */
export function buildSeo(args: BuildSeoArgs): SeoMeta {
  const title = args.absoluteTitle
    ? (args.title ?? SITE.title)
    : args.title && args.title !== SITE.title
      ? `${args.title} — ${SITE.title}`
      : SITE.title;
  const canonical = args.canonicalURL ?? absoluteUrl(args.fullPath);
  // Generated OG images (site default + per-post fallbacks) are always
  // 1200×630 PNGs; the SVG fallback has no fixed intrinsic size.
  const usingDefaultOg = !args.ogImage && SITE.defaultOgImage.endsWith('.png');
  const meta: Omit<SeoMeta, 'jsonLd'> = {
    title,
    description: args.description ?? SITE.description,
    canonical,
    ogImage: absoluteUrl(args.ogImage ?? SITE.defaultOgImage),
    ogImageWidth: args.ogImageWidth ?? (usingDefaultOg ? 1200 : undefined),
    ogImageHeight: args.ogImageHeight ?? (usingDefaultOg ? 630 : undefined),
    ogImageAlt: args.ogImageAlt ?? args.title ?? SITE.title,
    ogLocale: htmlLang(args.locale).replace('-', '_'),
    type: args.type ?? 'website',
    publishedTime: args.publishedTime?.toISOString(),
    modifiedTime: args.modifiedTime?.toISOString(),
    tags: args.tags,
    locale: args.locale,
    hreflangs: alternates(args.pathWithoutLocale, args.availableLocales),
    noindex: args.noindex,
  };

  return {
    ...meta,
    jsonLd: buildJsonLd(args, meta),
  };
}
