/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Design system colors for football score website
        purple: {
          50: '#F3E8FF',
          100: '#E9D5FF',
          200: '#D6BBFB',
          300: '#C084FC',
          400: '#A855F7',
          500: '#9333EA',
          600: '#7C3AED',
          700: '#6B21A8',
          800: '#581C87',
          900: '#4C1D95'
        },
        cream: {
          light: '#FEFCF0',
          DEFAULT: '#F5F5DC',
          dark: '#F0E68C'
        },
        // Accent colors for highlights and status
        gold: '#FFD700',
        'live-green': '#10B981',
        'error-red': '#EF4444',
        // Original shadcn/ui colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "glow": {
          "0%": {
            boxShadow: "0 0 20px rgba(107, 33, 168, 0.3)"
          },
          "100%": {
            boxShadow: "0 0 30px rgba(107, 33, 168, 0.6)"
          }
        },
        "hover-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(147, 51, 234, 0.3)"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.6), 0 0 30px rgba(147, 51, 234, 0.4)"
          }
        },
        "live-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)"
          }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "confetti-fall": {
          "0%": {
            transform: "translateY(-100vh) rotate(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(100%)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(239, 68, 68, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.6)",
          },
        },
        "shake": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-2px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(2px)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-4px)",
          },
        },
        "skeleton-loading": {
          "0%": {
            backgroundPosition: "-200px 0",
          },
          "100%": {
            backgroundPosition: "calc(200px + 100%) 0",
          },
        },
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite alternate",
        "hover-glow": "hover-glow 2s ease-in-out infinite",
        "live-pulse": "live-pulse 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "confetti-fall": "confetti-fall 3s linear infinite",
        "gradient-x": "gradient-x 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shake": "shake 0.5s ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "skeleton-loading": "skeleton-loading 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};