// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://markdom.vercel.app',
  integrations: [
    starlight({
      title: 'Markdom',
      editLink: {
        baseUrl: 'https://github.com/teneplaysofficial/markdom/edit/main/docs/',
      },
      social: [
        {
          icon: 'npm',
          label: 'NPM',
          href: 'https://www.npmjs.com/package/@tenedev/markdom',
        },
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/teneplaysofficial/markdom',
        },
        {
          icon: 'twitter',
          label: 'Twitter',
          href: 'https://x.com/teneplays',
        },
      ],
      sidebar: [
        {
          label: 'Overview',
          autogenerate: { directory: 'overview' },
        },
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Usage',
          autogenerate: { directory: 'usage' },
        },
        {
          label: 'Features',
          autogenerate: { directory: 'features' },
        },
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
