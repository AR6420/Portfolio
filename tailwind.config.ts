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
        base: {
          black: '#000000',
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
        },
        prism: {
          cyan: '#00f0ff',
          blue: '#4060ff',
          violet: '#8040ff',
          magenta: '#c020e0',
          rose: '#ff2080',
        },
        primary: '#ffffff',
        secondary: '#999999',
        tertiary: '#666666',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'prism-rotate': 'prism-rotate 4s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'prism-rotate': {
          '0%': { '--prism-angle': '0deg' },
          '100%': { '--prism-angle': '360deg' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'prism-gradient': 'linear-gradient(135deg, #00f0ff, #4060ff, #8040ff, #c020e0, #ff2080)',
        'prism-gradient-horizontal': 'linear-gradient(90deg, #00f0ff, #4060ff, #8040ff, #c020e0, #ff2080)',
      },
    },
  },
  plugins: [],
};
export default config;
