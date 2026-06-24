/**
 * Design tokens — FONTE ÚNICA DE VERDADE para cores, gradientes e tipografia.
 *
 * Nenhum componente deve hardcodar cores. Use estes tokens (ou as utilities
 * Tailwind equivalentes definidas no `@theme` de `globals.css`, que espelham
 * exatamente estes valores).
 *
 * Marca João Paulo: navy + prata, fundo dark tech, acento ciano elétrico.
 */

export const theme = {
  colors: {
    // ── Marca ──────────────────────────────────────────────
    navy: "#1B2852",
    navyLight: "#2A3A6B",
    silver: "#9BA3B5",

    // ── Fundos (dark tech) ─────────────────────────────────
    bg: "#080D18",
    bg2: "#0D1424",
    card: "#111A2E",
    cardHover: "#16213A",

    // ── Acento (conversão) ─────────────────────────────────
    accent: "#00D4FF",
    accent2: "#4A9EFF",

    // ── Texto ──────────────────────────────────────────────
    white: "#FFFFFF",
    muted: "#94A3B8",

    // ── Bordas ─────────────────────────────────────────────
    border: "rgba(0,212,255,0.15)",
    borderF: "rgba(255,255,255,0.06)",
    borderNavy: "rgba(155,163,181,0.12)",
  },

  gradients: {
    accentGradient: "linear-gradient(135deg, #00D4FF, #4A9EFF)",
    navyGradient: "linear-gradient(135deg, #1B2852, #2A3A6B)",
    cardGradient: "linear-gradient(180deg, #111A2E, #0D1424)",
  },

  fonts: {
    display: "'Bebas Neue', Impact, sans-serif",
    body: "'DM Sans', system-ui, sans-serif",
  },
} as const;

/** Textura de ruído (grain) em SVG, usada como overlay sutil de fundo. */
export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.05'/%3E%3C/svg%3E\")";

export type Theme = typeof theme;
export type ColorToken = keyof typeof theme.colors;
export type GradientToken = keyof typeof theme.gradients;
export type FontToken = keyof typeof theme.fonts;

export default theme;
