/** @type {import('tailwindcss').Config} */  
export default {  
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],  
  theme: {  
    extend: {  
      colors: {  
         background: '#101010',  
        sec: '#ff8c42',              
        white: '#dfdfdf',  
        'white-icon': '#f3f3f398',  
        'white-icon-tr': '#f3f3f310',    
      },  
      fontFamily: {  
        sans: ['Montserrat', 'system-ui', 'sans-serif'],  
      },  
      animation: {  
        'scroll': 'scroll 60s linear infinite',  
        'scale': 'scale 0.3s ease-in-out',  
        'paused': 'paused',  
      },  
      keyframes: {  
        scroll: {  
          '0%': { transform: 'translateX(0)' },  
          '100%': { transform: 'translateX(-50%)' }  
        },  
        scale: {  
          '0%': { transform: 'scale(1)' },  
          '50%': { transform: 'scale(1.1)' },  
          '100%': { transform: 'scale(1)' }  
        }  
      }  
    },  
  },  
  plugins: [],  
}