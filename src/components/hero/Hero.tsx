"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import HeroScene from "./HeroScene";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { useInViewport } from "@/hooks/useEnvironment";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/ui/Icons";
import { contact, person } from "@/content/site";
import { EASE } from "@/lib/motion";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDknBGCucdQMU1wA5ApfOYBMHlfakZSDxyDyDVjGGp4Cdh570UU4bjjuf/Z";

const socials = [
  { href: `mailto:${contact.email}`, label: "Email Abtahi", Icon: MailIcon, external: false },
  { href: contact.linkedin, label: "LinkedIn profile", Icon: LinkedInIcon, external: true },
  { href: contact.github, label: "GitHub profile", Icon: GitHubIcon, external: true },
  { href: contact.leetcode, label: "LeetCode profile", Icon: LeetCodeIcon, external: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { x: pointerX, y: pointerY } = usePointerParallax();
  const heroInView = useInViewport(ref);

  // 0 at the top of the hero → 1 once the hero has fully scrolled away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Scroll-linked depth: content leaves faster than the character, which
     leaves faster than the particle field behind it. */
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const characterY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const characterScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const characterOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  /* Pointer parallax: the character reacts subtly, the glow field more. */
  const charX = useTransform(pointerX, [-1, 1], [16, -16]);
  const charY = useTransform(pointerY, [-1, 1], [10, -10]);
  const charRotate = useTransform(pointerX, [-1, 1], [1.1, -1.1]);
  const glowX = useTransform(pointerX, [-1, 1], [-46, 46]);
  const glowY = useTransform(pointerY, [-1, 1], [-30, 30]);

  const still = Boolean(prefersReduced);

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Introduction"
      /* Below md the portrait takes the top third and the copy sits beneath it;
         from md up they share the row side by side. */
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden pb-16 pt-[33svh] sm:pt-[31svh] md:items-center md:pb-28 md:pt-[calc(var(--nav-h)+2rem)]"
    >
      {/* ── Layer 0 · CSS glow field ────────────────────────────────────────
          Paints instantly and is the complete fallback when WebGL is off. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={still ? undefined : { x: glowX, y: glowY }}
      >
        <div className="absolute left-[-18%] top-[-14%] h-[62vmax] w-[62vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-violet)_30%,transparent),transparent_66%)] blur-[36px]" />
        <div className="absolute right-[-22%] top-[6%] h-[58vmax] w-[58vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-magenta)_22%,transparent),transparent_64%)] blur-[44px]" />
        <div className="absolute bottom-[-26%] left-[22%] h-[46vmax] w-[46vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-violet)_16%,transparent),transparent_68%)] blur-[52px]" />
      </motion.div>

      {/* ── Layer 1 · WebGL particle + fog field ────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <HeroScene
          scroll={scrollYProgress}
          pointerX={pointerX}
          pointerY={pointerY}
          inView={heroInView}
        />
      </div>

      {/* ── Layer 2 · Character midground ───────────────────────────────── */}
      <motion.div
        aria-hidden={false}
        className="pointer-events-none absolute right-0 top-[var(--nav-h)] z-0 flex h-[36svh] w-full justify-end md:inset-y-0 md:top-0 md:h-auto md:w-[58%] lg:w-[54%]"
        style={
          still
            ? undefined
            : { y: characterY, scale: characterScale, opacity: characterOpacity }
        }
      >
        <motion.div
          className="relative h-full w-[86%] max-w-none translate-x-[6%] sm:w-[62%] sm:translate-x-[4%] md:w-full md:translate-x-[4%] lg:translate-x-0"
          style={
            still ? undefined : { x: charX, y: charY, rotate: charRotate }
          }
        >
          <Image
            src="/character.webp"
            alt={`Stylised 3D portrait of ${person.name} in violet rim light`}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 767px) 86vw, (max-width: 1023px) 58vw, 54vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="character-glow character-fade select-none object-contain object-top opacity-90 md:object-bottom md:opacity-100"
          />
        </motion.div>
      </motion.div>

      {/* ── Layer 3 · Scrim ─────────────────────────────────────────────────
          Guarantees text contrast over the portrait at every width. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_0%,transparent_22%,color-mix(in_oklab,var(--color-void)_72%,transparent)_38%,var(--color-void)_50%)] md:bg-[linear-gradient(100deg,var(--color-void)_4%,color-mix(in_oklab,var(--color-void)_82%,transparent)_38%,transparent_72%)]"
      />

      {/* ── Layer 4 · Grain + vignette foreground ───────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] vignette" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] grain opacity-[0.16]"
      />

      {/* ── Layer 5 · Content ───────────────────────────────────────────── */}
      <motion.div
        className="shell relative z-10"
        style={still ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[40rem]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE.cinematic }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-magenta" />
            Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.18, ease: EASE.cinematic }}
            className="mt-5 text-[clamp(2.45rem,8.4vw,5.15rem)] font-bold leading-[0.98] tracking-[-0.03em]"
          >
            <span className="block text-paper">Abtahi Bin</span>
            <span className="block text-paper">Jahangir</span>
            <span className="block w-fit text-glow-gradient">Chowdhury</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE.cinematic }}
            className="mt-6 font-mono text-[0.78rem] font-medium uppercase tracking-[0.3em] text-violet-text sm:text-sm"
          >
            {person.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE.cinematic }}
            className="mt-6 max-w-[34rem] text-base leading-relaxed text-lavender-dim sm:text-[1.0625rem]"
          >
            {person.positioning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE.cinematic }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects" variant="primary">
              View Projects
              <ArrowRightIcon
                width={15}
                height={15}
                className="transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:translate-x-1"
              />
            </ButtonLink>

            <nav aria-label="Social profiles" className="flex items-center gap-2">
              {socials.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : undefined)}
                  className="flex size-11 items-center justify-center rounded-full border border-line bg-[color-mix(in_oklab,var(--color-surface)_60%,transparent)] text-lavender-dim backdrop-blur-md transition-surface duration-500 ease-[var(--ease-cinematic)] hover:-translate-y-0.5 hover:border-violet hover:text-skin-amber hover:shadow-[0_0_30px_-8px_color-mix(in_oklab,var(--color-violet)_85%,transparent)]"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll hint ─────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.1 }}
        style={still ? undefined : { opacity: contentOpacity }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-lavender-dim">
          Scroll
        </span>
        <span className="relative h-11 w-px overflow-hidden bg-line">
          <span className="animate-scroll-hint absolute inset-x-0 top-0 h-4 bg-[linear-gradient(to_bottom,transparent,var(--color-magenta))]" />
        </span>
      </motion.div>
    </section>
  );
}
