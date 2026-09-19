"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CloseIcon, MenuIcon, SparkIcon } from "@/components/ui/Icons";
import { contact, navLinks, person } from "@/content/site";
import { EASE } from "@/lib/motion";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  /* Solidify the bar once the hero starts leaving. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the section currently occupying the upper half of the viewport. */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /* Drawer: lock scroll, close on Escape, and keep focus inside. */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the drawer so keyboard users land where they expect.
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const duration = prefersReduced ? 0 : 0.5;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-surface duration-700 ease-[var(--ease-cinematic)] ${
          scrolled
            ? "border-b border-line bg-[color-mix(in_oklab,color-mix(in_oklab,var(--color-void)_88%,var(--color-violet))_95%,transparent)] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_40px_-22px_color-mix(in_oklab,var(--color-violet)_90%,transparent)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[var(--nav-h)] items-center justify-between gap-4"
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5 rounded-md font-display text-[0.95rem] font-semibold tracking-tight text-paper"
          >
            <SparkIcon
              width={17}
              height={17}
              className="text-magenta transition-surface duration-700 ease-[var(--ease-cinematic)] group-hover:rotate-90 group-hover:text-skin-amber"
            />
            <span>Abtahi</span>
            <span className="font-mono text-[0.72rem] font-normal text-lavender-dim">
              .dev
            </span>
            {/* The accessible name must *contain* the visible text (WCAG 2.5.3),
                so this extends it rather than replacing it with an aria-label. */}
            <span className="sr-only">— {person.name}, back to top</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-md px-3.5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-400 ease-[var(--ease-glow)] ${
                      isActive
                        ? "text-paper"
                        : "text-lavender-dim hover:text-paper"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-[linear-gradient(90deg,var(--color-violet),var(--color-magenta))] transition-transform duration-500 ease-[var(--ease-cinematic)] ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={`mailto:${contact.email}`}
            className="hidden rounded-full border border-line bg-[color-mix(in_oklab,var(--color-surface)_60%,transparent)] px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper transition-surface duration-500 ease-[var(--ease-cinematic)] hover:border-violet hover:text-skin-amber hover:shadow-[0_0_28px_-8px_color-mix(in_oklab,var(--color-violet)_85%,transparent)] md:inline-block"
          >
            Get in touch
          </a>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center rounded-lg border border-line bg-[color-mix(in_oklab,var(--color-surface)_60%,transparent)] text-paper backdrop-blur-md transition-colors duration-400 hover:border-violet hover:text-magenta md:hidden"
          >
            {open ? <CloseIcon width={19} height={19} /> : <MenuIcon width={19} height={19} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          >
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default bg-[color-mix(in_oklab,var(--color-void)_82%,transparent)] backdrop-blur-md"
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration, ease: EASE.cinematic }}
              className="absolute inset-x-gutter top-[calc(var(--nav-h)+0.5rem)] overflow-hidden rounded-2xl border border-line bg-[color-mix(in_oklab,var(--color-surface)_92%,transparent)] p-2 shadow-[0_28px_80px_-28px_color-mix(in_oklab,var(--color-violet)_75%,transparent)] backdrop-blur-2xl"
            >
              <ul>
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-medium text-paper transition-colors duration-300 hover:bg-surface-2 hover:text-magenta"
                    >
                      {link.label}
                      <span className="font-mono text-[0.68rem] text-lavender-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="rule-fade mx-4 my-2" />
              <a
                href={`mailto:${contact.email}`}
                onClick={close}
                className="m-2 flex items-center justify-center rounded-xl bg-[linear-gradient(100deg,var(--color-violet),var(--color-magenta))] px-4 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-void"
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
