import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/proyectos' }),
  schema: z.object({
    project: z.enum(['burgo', 'sobre', 'reportaya', 'moviesapp', 'el-zuliano', 'tienda-burgos']),
    title: z.string(),
    kind: z.string(),
    status: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).min(1),
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
    /** Trabajo de la universidad: muestra la insignia «Proyecto universitario». */
    academic: z.boolean().default(false),
    /** Aclaración sobre cómo corre la versión en vivo (p. ej. demo sin backend). */
    liveNote: z.string().optional(),
  }),
});

export const collections = { proyectos };
