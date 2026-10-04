// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jose-burgos-portfolio.vercel.app',
  trailingSlash: 'always',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
      i18n: { defaultLocale: 'es', locales: { es: 'es-VE', en: 'en-US' } },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
