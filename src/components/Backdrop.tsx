"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * One continuous glow environment for the whole page.
 *
 * This is a single fixed layer behind every section rather than a background
 * per section, so the light field flows uninterrupted from the hero to the
 * footer — no abrupt edges where one section's background stops and the next
 * begins. Scroll drives the blobs at three different speeds, all slower than
 * the page itself, which is what produces the sense of depth.
 */
export default function Backdrop() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  /* Each blob sweeps the full height of the viewport across the page's scroll,
     entering from below and exiting above, so light is always passing through
     frame rather than sitting off-screen. Offsetting their phases means one is
     arriving as another leaves — a continuous environment, never a dark gap. */
  const nearY = useTransform(scrollYProgress, [0, 1], ["58vh", "-128vh"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["112vh", "-86vh"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["176vh", "-40vh"]);

  // Violet at the top of the page drifting toward magenta at the bottom.
  // Derived before any early return — hooks must run in the same order on
  // every render.
  const hueFilter = useTransform(
    scrollYProgress,
    (v) => `hue-rotate(${v * 44}deg)`,
  );
  const nearX = useTransform(scrollYProgress, [0, 0.5, 1], ["0vw", "10vw", "-6vw"]);
  const midX = useTransform(scrollYProgress, [0, 0.5, 1], ["0vw", "-9vw", "7vw"]);

  if (prefersReduced) {
    // Static equivalent — same palette, no scroll coupling.
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-void"
      >
        <div className="absolute left-[-10%] top-[10%] h-[54vmax] w-[54vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-violet)_13%,transparent),transparent_66%)] blur-[60px]" />
        <div className="absolute right-[-14%] top-[45%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-magenta)_10%,transparent),transparent_66%)] blur-[70px]" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-void"
      style={{ filter: hueFilter }}
    >
      {/* Near — travels most, reads closest to the viewer */}
      <motion.div
        style={{ y: nearY, x: nearX }}
        className="absolute left-[-20%] top-0 h-[64vmax] w-[64vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-violet)_34%,transparent),transparent_65%)] blur-[46px]"
      />
      {/* Mid */}
      <motion.div
        style={{ y: midY, x: midX }}
        className="absolute right-[-22%] top-0 h-[58vmax] w-[58vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-magenta)_26%,transparent),transparent_64%)] blur-[54px]"
      />
      {/* Far — largest and softest, anchors the composition */}
      <motion.div
        style={{ y: farY }}
        className="absolute left-[16%] top-0 h-[72vmax] w-[72vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-violet)_22%,transparent),transparent_68%)] blur-[64px]"
      />

      {/* Faint vertical seam of light running the whole page height */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-line)_70%,transparent)_18%,color-mix(in_oklab,var(--color-line)_70%,transparent)_82%,transparent)] opacity-40" />
    </motion.div>
  );
}
