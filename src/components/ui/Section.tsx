"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { revealVariants, staggerVariants, staticVariants } from "@/lib/motion";

/**
 * Reveal-on-enter wrapper. Under `prefers-reduced-motion` the element still
 * transitions from hidden to shown, but only in opacity — nothing translates.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={prefersReduced ? staticVariants : revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -8% 0px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}

/** Parent that reveals its children one after another. */
export function RevealGroup({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={prefersReduced ? staticVariants : staggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
    >
      {children}
    </Component>
  );
}

/** A single child of a RevealGroup. */
export function RevealItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={prefersReduced ? staticVariants : revealVariants}
    >
      {children}
    </Component>
  );
}

/**
 * Standard section shell: landmark, anchor target, consistent rhythm, and the
 * eyebrow + heading pairing used across the page.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = "",
  headingClassName = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative scroll-mt-24 py-20 md:py-24 lg:py-28 ${className}`}
    >
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-magenta" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className={`mt-5 text-[clamp(1.85rem,5.2vw,3.15rem)] font-semibold leading-[1.06] tracking-[-0.028em] text-paper ${headingClassName}`}
          >
            {title}
          </h2>
          {lede ? (
            <p className="mt-5 max-w-2xl text-[1.0125rem] leading-relaxed text-lavender-dim">
              {lede}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
