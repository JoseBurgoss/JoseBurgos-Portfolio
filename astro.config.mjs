// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeMovements from './src/lib/rehype-movements.mjs';

export default defineConfig({
  site: 'https://jose.burgo.dev',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  markdown: { processor: unified({ rehypePlugins: [rehypeMovements] }) },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-VE' } },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: true },
  },
});
