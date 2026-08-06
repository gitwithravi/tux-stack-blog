import type { ImageMetadata } from 'astro';
import type { Locale } from '../config';

import part1Image from '../assets/images/posts/ai-native-software-engineering.png';
import part2Image from '../assets/images/posts/ai-native-software-engineering-2.png';
import part3Image from '../assets/images/posts/ai-native-software-engineering-3.png';
import part4Image from '../assets/images/posts/ai-native-software-engineering-4.png';
import part5Image from '../assets/images/posts/ai-native-software-engineering-5.png';

export interface SeriesPart {
  order: number;
  stage: string;
  slug: string;
  title: string;
  summary: string;
  audience: string;
  heroImage: ImageMetadata;
  heroImageAlt: string;
}

export interface SeriesEntryPoint {
  title: string;
  description: string;
  part: number;
  icon: string;
}

export interface SeriesDefinition {
  id: string;
  locale: Locale;
  path: string;
  title: string;
  pageTitle: string;
  eyebrow: string;
  description: string;
  heroImage: ImageMetadata;
  heroImageAlt: string;
  thesis: readonly string[];
  parts: readonly SeriesPart[];
  entryPoints: readonly SeriesEntryPoint[];
}

export interface SeriesMembership {
  series: SeriesDefinition;
  part: SeriesPart;
  previous?: SeriesPart;
  next?: SeriesPart;
}

const PART_1_ALT =
  'An engineer orchestrating AI agents that construct software, illustrating the inversion of the default relationship between human and machine.';

export const AI_NATIVE_SOFTWARE_ENGINEERING_SERIES: SeriesDefinition = {
  id: 'ai-native-software-engineering',
  locale: 'en',
  path: '/ai-native-software-engineering/',
  title: 'AI-Native Software Engineering',
  pageTitle: 'AI-Native Software Engineering: A Five-Part Field Guide',
  eyebrow: 'A five-part field guide',
  description:
    'A practical guide to the shift from AI-assisted coding to an engineering operating model built around clear intent, reliable execution, verification, governance, and accountability.',
  heroImage: part1Image,
  heroImageAlt: PART_1_ALT,
  thesis: [
    'AI-native engineering is an operating model, not a measure of how many AI tools a company buys.',
    'As implementation becomes cheaper, ambiguity, context, review, and validation become the real constraints.',
    'Reliable adoption requires specifications, scoped context, an execution harness, and evidence—not better prompting alone.',
    'Parallel agents multiply coordination, security, and governance demands before they multiply useful output.',
    'The durable advantage comes from the organization around the model: its roles, platform, economics, metrics, and accountability.',
  ],
  parts: [
    {
      order: 1,
      stage: 'Meaning',
      slug: 'ai-native-software-engineering-isnt-about-ai',
      title: 'AI-Native Software Engineering Isn’t About AI',
      summary:
        'Establish the mental model: AI becomes a primary participant in construction while engineers move toward intent, architecture, judgment, and verification.',
      audience: 'The essential foundation for every reader.',
      heroImage: part1Image,
      heroImageAlt: PART_1_ALT,
    },
    {
      order: 2,
      stage: 'Evidence',
      slug: 'ai-feels-faster-data-is-less-certain',
      title: 'AI Feels Faster. The Data Is Less Certain.',
      summary:
        'Separate the feeling of faster coding from system-level productivity, then identify review burden, durability, and delivery outcomes as the measurements that matter.',
      audience: 'For teams evaluating productivity, investment, or adoption.',
      heroImage: part2Image,
      heroImageAlt:
        'A speedometer showing perceived velocity while the underlying data points in a different direction, illustrating the gap between felt productivity and measured delivery.',
    },
    {
      order: 3,
      stage: 'Method',
      slug: 'model-is-only-one-part-of-system',
      title: 'The Model Is Only One Part of the System',
      summary:
        'Turn the idea into a working method through specifications, context engineering, agent execution loops, permissions, stopping conditions, and verification.',
      audience: 'The practical starting point for project, product, and delivery managers.',
      heroImage: part3Image,
      heroImageAlt:
        'A layered system showing specification, context, agent loop and harness surrounding a model, illustrating how reliability comes from structure rather than the model alone.',
    },
    {
      order: 4,
      stage: 'Scale',
      slug: 'when-agents-scale-coordination-becomes-product',
      title: 'When Agents Scale, Coordination Becomes the Product',
      summary:
        'Understand why parallel agents require deliberate orchestration, layered verification, least-privilege access, quality gates, and governance.',
      audience: 'For platform, security, architecture, and AI-enablement teams.',
      heroImage: part4Image,
      heroImageAlt:
        'A fleet of agents producing parallel changes that must be reconciled by a central coordination layer, illustrating how scale turns delegation into orchestration.',
    },
    {
      order: 5,
      stage: 'Operating model',
      slug: 'future-of-software-engineering-is-operating-model',
      title: 'The Future of Software Engineering Is an Operating Model',
      summary:
        'Bring the system into the organization: changing roles, smaller teams, platform ownership, scorecards, model economics, and human accountability.',
      audience: 'For CTOs, engineering leaders, and transformation owners.',
      heroImage: part5Image,
      heroImageAlt:
        'An organisational operating model surrounding a model, with roles, platform, governance and metrics arranged around intent, illustrating how the durable advantage lies in the system around the model.',
    },
  ],
  entryPoints: [
    {
      title: 'New to AI-native engineering',
      description: 'Build the shared mental model before choosing tools or changing process.',
      part: 1,
      icon: 'lucide:compass',
    },
    {
      title: 'Evaluating productivity or adoption',
      description:
        'Start with the evidence, measurement traps, and the emerging review bottleneck.',
      part: 2,
      icon: 'lucide:chart-no-axes-combined',
    },
    {
      title: 'Managing projects, products, or delivery',
      description:
        'Begin with the practical workflow for specifications, context, execution, and acceptance.',
      part: 3,
      icon: 'lucide:list-checks',
    },
    {
      title: 'Building the platform or guardrails',
      description:
        'Start where orchestration, verification, permissions, and governance become essential.',
      part: 4,
      icon: 'lucide:network',
    },
    {
      title: 'Leading the engineering organization',
      description: 'Begin with roles, team design, economics, scorecards, and accountability.',
      part: 5,
      icon: 'lucide:building-2',
    },
  ],
};

export const SERIES: readonly SeriesDefinition[] = [AI_NATIVE_SOFTWARE_ENGINEERING_SERIES];

export function seriesPostPath(part: SeriesPart): string {
  return `/posts/${part.slug}/`;
}

export function findSeriesMembership(locale: Locale, slug: string): SeriesMembership | undefined {
  const series = SERIES.find(
    (candidate) =>
      candidate.locale === locale && candidate.parts.some((part) => part.slug === slug),
  );
  if (!series) return undefined;

  const index = series.parts.findIndex((part) => part.slug === slug);
  const part = series.parts[index];
  if (!part) return undefined;

  return {
    series,
    part,
    previous: series.parts[index - 1],
    next: series.parts[index + 1],
  };
}
