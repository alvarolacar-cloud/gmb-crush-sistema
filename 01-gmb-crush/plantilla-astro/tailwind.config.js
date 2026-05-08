/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Tokens parametrizables — valores vienen de outputs.json 16.1 vía BaseLayout.astro
        primary: {
          DEFAULT: "var(--color-primary)",
          50: "var(--color-primary-50)",
          500: "var(--color-primary-500)",
          900: "var(--color-primary-900)",
        },
        accent: "var(--color-accent)",
        "bg-dark": "var(--color-bg-dark)",
        "bg-light": "var(--color-bg-light)",
        "text-main": "var(--color-text-main)",
        "text-heading": "var(--color-text-heading)",
      },
      fontFamily: {
        // La fuente real viene de --font-family (inyectada en <html> por BaseLayout)
        sans: ["var(--font-family)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
