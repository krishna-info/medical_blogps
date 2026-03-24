import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        medical: {
          blue: '#1B4F8C',
          teal: '#0E7C7B',
          light: '#D6E4F7',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;
