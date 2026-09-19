import type { Transition, Variants } from "framer-motion";

/**
 * Motion language: slow, deliberate, cinematic. Never bouncy, never springy
 * enough to overshoot visibly. These curves mirror the --ease-* CSS tokens in
 * globals.css so JS-driven and CSS-driven motion feel like one system.
 */
export const EASE = {
  cinematic: [0.16, 1, 0.3, 1],
  drift: [0.33, 0, 0.2, 1],
  glow: [0.4, 0, 0.2, 1],
} as const;

export const transitions = {
  reveal: { duration: 0.95, ease: EASE.cinematic } satisfies Transition,
  slow: { duration: 1.4, ease: EASE.drift } satisfies Transition,
  parallax: {
    type: "spring",
    stiffness: 42,
    damping: 22,
    mass: 1.1,
  } satisfies Transition,
};

/** Standard section reveal: lift and fade, no scale, no bounce. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: transitions.reveal },
};

/** Parent that walks its children in with a slow, even cadence. */
export const staggerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

/** Reduced-motion equivalents: state still changes, nothing moves. */
export const staticVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: EASE.glow } },
};
