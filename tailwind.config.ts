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
        paper: '#FAF9F6',
        ink: '#141414',
        muted: '#6E6A63',
        hairline: '#E5E1D8',
        wash: '#F0EDFC',
        volt: {
          DEFAULT: '#6C4CF4',
          deep: '#4F33C4',
        },
        signal: '#0BA678',
        alarm: '#E0442E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
