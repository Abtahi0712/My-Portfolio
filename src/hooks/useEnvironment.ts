"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Environment probes that decide how expensive the site is allowed to be.
 *
 * These read browser state that React doesn't own, so they use
 * `useSyncExternalStore` rather than `useState` + `useEffect`. That gives a
 * correct server snapshot (no hydration mismatch), no cascading re-render on
 * mount, and automatic tearing-free updates.
 *
 * Every probe reports its *cheapest* value on the server, so the HTML is
 * identical for every visitor and the page only upgrades once it's running.
 */

const neverChanges = () => () => {};

/** False during SSR and the first paint, true once running in the browser. */
function useMounted(): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );
}

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True once we know the device has a real hovering pointer (mouse/trackpad). */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** True while the document is visible; used to park the WebGL render loop. */
export function usePageVisible(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => document.visibilityState === "visible",
    () => true,
  );
}

export type SceneTier = "off" | "lite" | "full";

/**
 * Probed once and cached: creating a throwaway context per render would be
 * wasteful, and the answer cannot change during a page's life.
 */
let webglSupport: boolean | null = null;

function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/**
 * Decides how heavy the hero's WebGL scene may be.
 *
 *  off  — reduced motion, not yet mounted, or no WebGL: never mount the canvas
 *  lite — small / touch / low-core devices: fewer particles, DPR capped at 1.5
 *  full — desktop with a fine pointer: full particle count, DPR capped at 2
 */
export function useSceneTier(): SceneTier {
  const prefersReduced = useReducedMotion();
  const mounted = useMounted();
  const small = useMediaQuery("(max-width: 768px)");
  const coarse = useMediaQuery("(pointer: coarse)");

  // Derived, never stored — so there's no state to get out of sync.
  if (!mounted || prefersReduced || !hasWebGL()) return "off";

  const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
  return small || coarse || weak ? "lite" : "full";
}

/**
 * True while any part of `ref` is on screen.
 *
 * The hero's canvas is only worth rendering while the hero is actually in
 * frame. Without this the particle loop keeps burning GPU and main-thread
 * time for the entire rest of the page, which is most of the scroll.
 */
export function useInViewport(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin = "120px",
): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // setInView only ever fires from the observer callback, never
    // synchronously during the effect.
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
