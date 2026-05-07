/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Tokens parametrizables (sobrescritos por cliente.json)
        primary: {
          DEFAULT: "var(--color-primary)",
          50: "var(--color-primary-50)",
          500: "var(--color-primary-500)",
          900: "var(--color-primary-900)",
        },
        accent: "var(--color-accent)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
