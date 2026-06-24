import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 config.
 *
 * In v4 the design tokens (colors, fonts, etc.) live in `src/app/globals.css`
 * inside the `@theme` block, which is the single Tailwind-facing source of truth.
 * Those tokens are mirrored in TypeScript at `src/lib/theme.ts` for use in JS
 * (motion animations, inline styles, canvas, etc.).
 *
 * This file only declares where Tailwind should look for class names.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
};

export default config;
