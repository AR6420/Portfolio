import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        substrate: '#0C0A10',
        surface: '#141119',
        raised: '#1B1723',
        line: '#282230',
        copper: {
          DEFAULT: '#E08D57',
          bright: '#F4A96C',
          deep: '#9C4F26',
        },
        oxide: {
          teal: '#7FE3D4',
          violet: '#A995FF',
        },
        defect: '#E4614F',
        ink: '#EFEAF3',
        muted: '#9B92A9',
        faint: '#5F5870',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        wider2: '0.2em',
        wider3: '0.3em',
      },
      maxWidth: {
        wafer: '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
