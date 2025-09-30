import { defineConfig } from 'astro/config';  
import react from '@astrojs/react';  
import tailwind from '@astrojs/tailwind';  
  
export default defineConfig({  
  integrations: [  
    react(),  
    tailwind()  
  ],  
  output: 'static',  
  site: 'https://jose-portfolio.vercel.app',  
  build: {  
    assets: 'assets'  
  },  
  vite: {  
    optimizeDeps: {  
      exclude: ['sharp']  
    }  
  }  
});