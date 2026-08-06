import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: '#E8F5E9',
            100: '#C8E6C9',
            200: '#A5D6A7',
            400: '#66BB6A',
            600: '#2E7D32',
            700: '#1B5E20',
            800: '#145218',
            900: '#0D3B10',
          },
          orange: {
            50: '#FFF3E0',
            100: '#FFE0B2',
            200: '#FFCC80',
            400: '#FFA726',
            500: '#FF6F00',
            600: '#E65100',
          },
          blue: {
            50: '#E3F2FD',
            100: '#BBDEFB',
            400: '#42A5F5',
            600: '#1E88E5',
            700: '#0D47A1',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
