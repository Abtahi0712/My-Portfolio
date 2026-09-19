# Abtahi Bin Jahangir Chowdhury — Portfolio

A personal portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS,
Framer Motion and React Three Fiber. Single dark theme — "Neon Noir Violet" — with a
layered pseudo-3D hero and continuous scroll-linked background motion.

**Live content source:** every word on the site comes from [`src/content/site.ts`](src/content/site.ts),
transcribed from the CV and each project's README. Edit that one file to change any copy.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build locally
npm run lint         # eslint
```

Requires **Node 20.9+** (Node 22 LTS recommended). No environment variables are needed
to run, build, or deploy this site.

---

## Deploying to Vercel

Next.js needs no `vercel.json` — Vercel detects the framework and configures everything.
There is no such file in this repo, by design.

**1. Push to GitHub**

```bash
git remote add origin https://github.com/Abtahi0712/<your-repo-name>.git
git branch -M main
git push -u origin main
```

(The repo is already initialised with a first commit.)

**2. Import on Vercel**

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Pick the repository you just pushed, then **Import**.
3. Leave every setting at its default — Framework Preset resolves to **Next.js**,
   Build Command `next build`, Output Directory `.next`, Install Command `npm install`.
4. Click **Deploy**.

**3. After the first deploy (recommended)**

Set one environment variable so Open Graph/Twitter preview images resolve to absolute
URLs when someone shares the link:

- **Settings → Environment Variables**
- `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app` (or your custom domain)
- Redeploy.

Without it the site works fine; the social preview image just falls back to a default
URL that may not match your deployment.

Every push to `main` redeploys automatically.

---

## Project structure

```
src/
├── app/
│   ├── fonts/            self-hosted .woff2 + next/font config
│   ├── globals.css       ALL design tokens, primitives, reduced-motion rules
│   ├── layout.tsx        metadata, Open Graph, JSON-LD, fonts, skip link
│   └── page.tsx          section composition
├── components/
│   ├── Backdrop.tsx      page-wide scroll-linked glow field
│   ├── Nav.tsx           sticky glass nav + mobile drawer
│   ├── hero/
│   │   ├── Hero.tsx          layered hero, parallax, scroll transforms
│   │   ├── HeroScene.tsx     lazy + idle-deferred canvas mount
│   │   └── ParticleField.tsx R3F particle & volumetric fog shaders
│   ├── sections/         About, Projects, ProjectCard, Research, Skills, Path, Contact
│   └── ui/               Button, Icons, Section/Reveal primitives
├── content/site.ts       ← single source of truth for every piece of copy
├── hooks/                environment probes, pointer parallax
└── lib/motion.ts         easing curves and shared variants
```

---

## Design system

All tokens live in the `@theme` block at the top of `src/app/globals.css` and are
consumed as Tailwind utilities (`bg-void`, `text-paper`, `border-line`, …). No component
hardcodes a colour.

| Token | Value | Role |
|---|---|---|
| `--color-void` | `#06030B` | page background |
| `--color-surface` | `#120A1E` | card / panel background |
| `--color-surface-2` | `#1C1030` | elevated panel, hover surface |
| `--color-line` | `#2E1D46` | borders, dividers |
| `--color-violet` | `#9B30FF` | primary accent — glow, gradients, CTAs |
| `--color-violet-text` | `#B160FE` | *derived*, see note below |
| `--color-magenta` | `#E34FFF` | secondary accent, highlights |
| `--color-lavender-dim` | `#9385A8` | muted / secondary text |
| `--color-paper` | `#F3EEF9` | primary text |
| `--color-skin-amber` | `#E8B98A` | rare warm accent, hover details |

> **Why `--color-violet-text` exists.** `#9B30FF` scores 3.65–4.15:1 against the three
> dark surfaces, below the 4.5:1 WCAG AA floor for body-size text, so small violet
> labels were failing contrast. `--color-violet-text` is the same hue lifted 25% toward
> `--paper` (5.1–5.8:1 everywhere) and is used **only for small text**. `--color-violet`
> is untouched and still drives every glow, border, gradient and filled button.

### Typography

The spec calls for **Clash Display** + **Satoshi** from [Fontshare](https://www.fontshare.com).
Those families can't be redistributed via npm and Fontshare was unreachable from the
build environment, so the site ships the spec's sanctioned fallback — **Sora** (display)
+ **Inter** (body), with **JetBrains Mono** throughout — self-hosted as `.woff2` so the
build needs no network access at all.

**To swap in the real Fontshare families:** download them, drop the `.woff2` files into
`src/app/fonts/`, and uncomment the prepared `src` arrays in
[`src/app/fonts/fonts.ts`](src/app/fonts/fonts.ts). Nothing else changes — every
component uses the `font-display` / `font-body` / `font-mono` tokens, never a font name.

---

## Motion & performance

The hero is a five-layer composite: a CSS glow field, the WebGL particle/fog canvas, the
cut-out character with a violet rim light, a scrim, and a grain + vignette pass. Scroll
drives all of them at different rates so the background lags the content.

Guards that keep it cheap:

- The canvas is **lazily imported** (`ssr: false`) and its mount is further **deferred to
  `requestIdleCallback`**, so three.js never lands inside the page's interactive window.
- The render loop is **parked entirely** (`frameloop="never"`) when the tab is hidden or
  once the hero scrolls out of view.
- Low-power / touch / small-viewport devices get a **`lite` tier**: 420 particles instead
  of 1400, one fog cloud instead of three, single-octave noise, `devicePixelRatio`
  capped at 1.5 instead of 2, and a demand-driven 30fps loop.
- WebGL support is **probed**, not assumed — a failed context falls back to the CSS field.
- `prefers-reduced-motion` **never mounts the canvas at all** and disables every
  parallax and scroll-driven transform; sections still fade in, nothing translates.

### Verified

- Production build clean, fully static prerender, no TypeScript errors.
- No horizontal scroll and no console errors at **375 / 768 / 1024 / 1440**.
- Lighthouse **Accessibility 100**, Best Practices 100, SEO 100.
- Lighthouse Performance **99** with the canvas disabled (FCP 0.2s, LCP 0.8s, TBT 0ms,
  CLS 0). With the animated canvas running it measures ~64 in a **software-rendered,
  GPU-less container**, where every WebGL pixel is rasterized on the CPU. On real
  hardware that work belongs to the GPU — run `npx lighthouse <url> --view` on your own
  machine for a representative number.
- Keyboard: skip link, logical focus order, an instant visible ring on every control,
  and a mobile drawer that traps focus, locks scroll, and closes on `Escape`.

---

## Accessibility notes

- Semantic landmarks (`nav`, `main`, `section`, `footer`), one `h1`, no skipped levels.
- Every section is labelled; every image has alt text; every link and button has an
  accessible name that contains its visible text (WCAG 2.5.3).
- Focus rings are excluded from CSS transitions, so they appear the instant focus lands
  rather than fading in.
