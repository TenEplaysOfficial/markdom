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
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
