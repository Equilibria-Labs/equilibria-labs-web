/** @type {import('tailwindcss').Config} */
import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      fontFamily: {
        title: ['var(--font-fraunces)', 'serif'],
        heading: ['var(--font-fraunces)', 'serif'],
        label: ['var(--font-outfit)', 'sans-serif'],
        small: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
        button: ['var(--font-outfit)', 'sans-serif'],
        input: ['var(--font-outfit)', 'sans-serif'],
      },
      fontWeight: {
        semibold: '600',
        bold: '600',
      },
      fontSize: {
        title: '40px',
        'heading-lg': '32px',
        heading: '24px',
        'body-lg': '18px',
        'body-md': '14px',
      },
      lineHeight: {
        title: '50px',
        'heading-lg': '40px',
        heading: '32px',
        'body-lg': '24px',
        'body-md': '18px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
        '56': '224px',
        '64': '256px',
        headerHeightMobile: '56px',
        headerHeightDesktop: '72px',
        sunGraphicDiameterMobile: '80px',
        sunGraphicDiameterDesktop: '100px',
        maxWidth: '600px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    justifyItems: true, // Enable justify-items utilities
  },
};

export default config;
