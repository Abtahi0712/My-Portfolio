import localFont from "next/font/local";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TYPOGRAPHY
 * ─────────────────────────────────────────────────────────────────────────────
 *  The design spec calls for Clash Display (display) + Satoshi (body) from
 *  Fontshare. Those two families are not redistributable via npm and must be
 *  downloaded from https://www.fontshare.com by hand, so this build ships the
 *  spec's sanctioned fallback — Sora (display) + Inter (body) — fully
 *  self-hosted as .woff2 so the build needs no network access at all.
 *
 *  ── TO SWAP IN THE REAL FONTSHARE FAMILIES ──────────────────────────────────
 *  1. Download "Clash Display" and "Satoshi" from fontshare.com (free license).
 *  2. Drop these .woff2 files into this folder (src/app/fonts/):
 *       ClashDisplay-Medium.woff2   ClashDisplay-Semibold.woff2
 *       ClashDisplay-Bold.woff2     Satoshi-Regular.woff2
 *       Satoshi-Medium.woff2        Satoshi-Bold.woff2
 *  3. Replace the `src` arrays in `display` and `body` below with the commented
 *     blocks beneath each one. Nothing else in the codebase changes — every
 *     component reads `font-display` / `font-body` / `font-mono` Tailwind
 *     tokens, never a font name.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Display / headings — cinematic, geometric. */
export const display = localFont({
  src: [
    { path: "./sora-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./sora-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./sora-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  // Fontshare swap-in:
  // src: [
  //   { path: "./ClashDisplay-Medium.woff2",   weight: "500", style: "normal" },
  //   { path: "./ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
  //   { path: "./ClashDisplay-Bold.woff2",     weight: "700", style: "normal" },
  // ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Sora", "Segoe UI", "system-ui", "sans-serif"],
  preload: true,
});

/** Body copy — clean, highly readable at small sizes. */
export const body = localFont({
  src: [
    { path: "./inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./inter-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  // Fontshare swap-in:
  // src: [
  //   { path: "./Satoshi-Regular.woff2", weight: "400", style: "normal" },
  //   { path: "./Satoshi-Medium.woff2",  weight: "500", style: "normal" },
  //   { path: "./Satoshi-Bold.woff2",    weight: "700", style: "normal" },
  // ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
  preload: true,
});

/** Labels, nav, tags, stats — kept as JetBrains Mono in every scenario. */
export const mono = localFont({
  src: [
    {
      path: "./jetbrains-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./jetbrains-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
  preload: true,
});
