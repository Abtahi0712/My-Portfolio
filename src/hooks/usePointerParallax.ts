"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { transitions } from "@/lib/motion";
import { useHasFinePointer } from "./useEnvironment";

/**
 * Normalised pointer position across the viewport, as two spring-smoothed
 * motion values in the range −1 … 1 (0,0 = dead centre).
 *
 * Returns a frozen 0,0 on touch devices and under `prefers-reduced-motion`,
 * so callers can multiply by any depth factor without branching. The listener
 * is only attached when it will actually be used.
 */
export function usePointerParallax() {
  const prefersReduced = useReducedMotion();
  const finePointer = useHasFinePointer();
  const active = finePointer && !prefersReduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, transitions.parallax);
  const y = useSpring(rawY, transitions.parallax);

  useEffect(() => {
    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return; // coalesce to one update per animation frame
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set((event.clientX / window.innerWidth) * 2 - 1);
        rawY.set((event.clientY / window.innerHeight) * 2 - 1);
      });
    };

    // Ease back to centre when the cursor leaves the window entirely.
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, rawX, rawY]);

  return { x, y, active };
}
