/**
 * UI dictionaries.
 * Add new locales by adding a key to `messages` and to `SITE.locales` in
 * src/config.ts. All keys must exist for every locale (TypeScript enforces it).
 */

import type { Locale } from '../config';

export const messages = {
  en: {
    'site.skipToContent': 'Skip to content',
    'nav.home': 'Home',
    'nav.posts': 'Posts',
    'nav.tags': 'Tags',
    'nav.categories': 'Categories',
    'nav.archives': 'Archives',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.search': 'Search',
    'nav.toggleMenu': 'Toggle menu',

    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    'lang.switcher': 'Language',
    'lang.en': 'English',

    'post.publishedOn': 'Published on',
    'post.updatedOn': 'Updated on',
    'post.readingTime': 'min read',
    'post.toc': 'Table of contents',
    'post.tags': 'Tags',
    'post.categories': 'Categories',
    'post.previous': 'Previous',
    'post.next': 'Next',
    'post.comments': 'Comments',
    'post.commentsDisabled': 'Comments are disabled for this post.',
    'post.commentsSetupTitle': 'Comments need configuration',
    'post.commentsSetupBody':
      'Giscus is enabled but not yet configured. Add the repository details below to start collecting comments.',
    'post.commentsSetupStep1':
      'Visit `giscus.app` and select your public GitHub repository (Discussions must be enabled).',
    'post.commentsSetupStep2':
      'Copy the generated `data-repo-id`, `data-category` and `data-category-id` values.',
    'post.commentsSetupStep3':
      'Set the `PUBLIC_GISCUS_ENABLED`, `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY` and `PUBLIC_GISCUS_CATEGORY_ID` env vars in your `.env` file.',
    'post.commentsSetupStep4':
      'Rebuild the site — this notice will be replaced by the live comments thread.',
    'post.commentsSetupDocs': 'Open giscus.app',
    'post.share': 'Share',
    'post.copyLink': 'Copy link',
    'post.copied': 'Copied!',
    'post.author': 'Author',

    'list.allPosts': 'All posts',
    'list.empty': 'No posts found.',
    'list.tagPosts': 'Posts tagged',
    'list.categoryPosts': 'Posts in',
    'list.totalPosts': 'posts',
    'list.totalPostsOne': 'post',

    'pagination.previous': 'Previous page',
    'pagination.next': 'Next page',
    'pagination.page': 'Page',
    'pagination.of': 'of',

    'archives.title': 'Archives',
    'archives.empty': 'No posts yet.',

    'tags.title': 'Tags',
    'tags.empty': 'No tags yet.',

    'categories.title': 'Categories',
    'categories.empty': 'No categories yet.',

    'search.title': 'Search',
    'search.placeholder': 'Search the site',
    'search.openLabel': 'Open search',
    'search.closeLabel': 'Close search',
    'search.empty': 'No results.',
    'search.loading': 'Loading search…',
    'search.typeToStart': 'Type to search…',
    'search.hintShortcut': 'Press / anywhere to open search',
    'search.searching': 'Searching…',
    'search.noResultsFor': 'No results for',
    'search.resultsCount': 'results',
    'search.resultsCountOne': 'result',
    'search.hintNavigate': 'to navigate',
    'search.hintSelect': 'to open',
    'search.clearLabel': 'Clear',

    'code.copy': 'Copy',
    'code.copied': 'Copied',

    '404.title': 'Page not found',
    '404.description': 'The page you are looking for has flown away.',
    '404.cta': 'Back to home',

    'contact.title': 'Contact',
    'contact.description':
      'Send a general note or request consulting help for your business or project.',
    'contact.intro':
      'Use this form for general messages, collaboration ideas, or consulting requests around infrastructure, developer tooling, automation, Linux systems, and technical writing.',
    'contact.requestType': 'Request type',
    'contact.generalRequest': 'General contact',
    'contact.generalRequestHint': 'Questions, feedback, collaboration, or anything else.',
    'contact.consultingRequest': 'Consulting request',
    'contact.consultingRequestHint':
      'Business or project help with architecture, automation, operations, or delivery.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.organization': 'Business or project',
    'contact.organizationHint': 'Company, team, product, or project name',
    'contact.projectStage': 'Project stage',
    'contact.projectStagePlaceholder': 'Select a stage',
    'contact.projectStageIdea': 'Idea / planning',
    'contact.projectStageActive': 'Active build',
    'contact.projectStageProduction': 'Production system',
    'contact.projectStageRescue': 'Debugging / rescue',
    'contact.budget': 'Budget range',
    'contact.budgetPlaceholder': 'Select a range',
    'contact.budgetUnsure': 'Not sure yet',
    'contact.budgetSmall': 'Under $1,000',
    'contact.budgetMedium': '$1,000 - $5,000',
    'contact.budgetLarge': '$5,000+',
    'contact.timeline': 'Timeline',
    'contact.timelinePlaceholder': 'When do you need help?',
    'contact.timelineFlexible': 'Flexible',
    'contact.timelineSoon': 'This month',
    'contact.timelineUrgent': 'Urgent',
    'contact.message': 'Message',
    'contact.messageHint':
      'For consulting, include the problem, current setup, constraints, and what a good outcome looks like.',
    'contact.submit': 'Send message',
    'contact.successTitle': 'Message sent',
    'contact.successDescription': 'Thanks for reaching out. I will reply when I can.',
    'contact.successCta': 'Back to home',

    'footer.poweredBy': 'Powered by',
    'footer.theme': 'Theme',
    'footer.privacy': 'Privacy Policy',
    'footer.copyright': 'All rights reserved.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof messages)['en'];
