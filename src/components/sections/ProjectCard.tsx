"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Tag } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { RevealItem } from "@/components/ui/Section";
import type { Project } from "@/content/site";
import { useHasFinePointer } from "@/hooks/useEnvironment";

const MAX_TILT = 6; // degrees — deliberate and subtle, never novelty

export default function ProjectCard({ project }: { project: Project }) {
  const faceRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const finePointer = useHasFinePointer();
  const prefersReduced = useReducedMotion();
  const tiltEnabled = finePointer && !prefersReduced;

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!tiltEnabled || frame.current) return;
      const { clientX, clientY } = event;

      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const el = faceRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const px = (clientX - rect.left) / rect.width; // 0 → 1
        const py = (clientY - rect.top) / rect.height;

        el.style.transform = `rotateY(${(px - 0.5) * 2 * MAX_TILT}deg) rotateX(${
          (0.5 - py) * 2 * MAX_TILT
        }deg) translateZ(0)`;
        // Drives the cursor-following sheen (see .tilt-sheen in globals.css).
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
      });
    },
    [tiltEnabled],
  );

  const reset = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    const el = faceRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "0%");
  }, []);

  return (
    <RevealItem as="li" className="tilt-root list-none">
      <div
        ref={faceRef}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className="tilt-face group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[color-mix(in_oklab,var(--color-surface)_78%,transparent)] p-6 backdrop-blur-md hover:border-[color-mix(in_oklab,var(--color-violet)_60%,var(--color-line))] hover:bg-[color-mix(in_oklab,var(--color-surface-2)_80%,transparent)] hover:shadow-[0_26px_70px_-34px_color-mix(in_oklab,var(--color-violet)_95%,transparent)] sm:p-7"
      >
        {/* Cursor-following sheen */}
        <div
          aria-hidden
          className="tilt-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-glow)] group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-4">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-violet-text">
            {project.kind}
          </span>
          <ArrowUpRightIcon
            width={17}
            height={17}
            className="shrink-0 text-lavender-dim transition-surface duration-500 ease-[var(--ease-cinematic)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-skin-amber"
          />
        </div>

        <h3 className="relative mt-4 text-[1.3rem] font-semibold leading-[1.18] tracking-[-0.02em] text-paper sm:text-[1.4rem]">
          {/* The whole card is the link target; the anchor's ::after covers it. */}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
            <span className="sr-only"> — open the repository on GitHub</span>
          </a>
        </h3>

        <p className="relative mt-3.5 flex-1 text-[0.935rem] leading-relaxed text-lavender-dim">
          {project.blurb}
        </p>

        {project.stat ? (
          <div className="relative mt-6 rounded-xl border border-line bg-[color-mix(in_oklab,var(--color-void)_55%,transparent)] px-4 py-3.5">
            <p className="font-mono text-[1.12rem] font-medium leading-none text-skin-amber">
              {project.stat.value}
            </p>
            <p className="mt-2 text-[0.8rem] leading-snug text-lavender-dim">
              {project.stat.label}
            </p>
          </div>
        ) : null}

        <ul className="relative mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </RevealItem>
  );
}
