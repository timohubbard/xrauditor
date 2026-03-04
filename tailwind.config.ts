import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0D2B5E",
          teal: "#076977",
          amber: "#7A4100",
          green: "#1A5C36",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
