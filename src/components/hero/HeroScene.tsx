"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";
import {
  useSceneTier,
  usePageVisible,
  type SceneTier,
} from "@/hooks/useEnvironment";

/**
 * Lazily mounts the WebGL field so three.js never blocks first paint — the
 * hero's CSS glow renders immediately and the canvas fades in on top of it
 * once the browser is otherwise idle.
 */
const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
  loading: () => null,
});

/**
 * Waits until the browser has finished the work that matters before letting
 * the scene mount. Without this, parsing three.js and compiling shaders lands
 * inside the page's interactive window and shows up directly as Total
 * Blocking Time — a cost paid by exactly the low-power devices least able to
 * afford it. The hero is fully composed before this resolves; the canvas is
 * pure enhancement layered on afterwards.
 */
function useIdleReady(enabled: boolean): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || ready) return;

    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const go = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(go, { timeout: 2500 });
    } else {
      // Safari has no requestIdleCallback; a short timeout is close enough.
      timer = setTimeout(go, 900);
    }

    return () => {
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timer) clearTimeout(timer);
    };
  }, [enabled, ready]);

  return ready;
}

export default function HeroScene({
  scroll,
  pointerX,
  pointerY,
  inView,
}: {
  scroll: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  /** False once the hero has scrolled off screen. */
  inView: boolean;
}) {
  const tier: SceneTier = useSceneTier();
  const pageVisible = usePageVisible();
  const ready = useIdleReady(tier !== "off");

  // Render only when there is something to see: the tab is foregrounded AND
  // the hero is still in frame.
  const visible = pageVisible && inView;

  // "off" = prefers-reduced-motion or no WebGL. The CSS gradient field below
  // the canvas is the complete, intentional fallback — nothing else changes.
  if (tier === "off" || !ready) return null;

  return (
    <div className="absolute inset-0 motion-safe:animate-[fade-in_1.6s_var(--ease-drift)_both]">
      <ParticleField
        tier={tier}
        visible={visible}
        scroll={scroll}
        pointerX={pointerX}
        pointerY={pointerY}
      />
    </div>
  );
}
