import { RevealGroup, RevealItem, Section } from "@/components/ui/Section";
import { education, experience } from "@/content/site";

export default function Path() {
  return (
    <Section
      id="path"
      eyebrow="Experience & Education"
      title={
        <>
          Where the <span className="text-glow-gradient">practice</span> comes
          from.
        </>
      }
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ── Experience ─────────────────────────────────────────────────── */}
        <div>
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-violet-text">
            {experience.label}
          </h3>

          {/* Timeline: a single hairline with a node per item. */}
          <RevealGroup as="ul" className="relative mt-7 pl-7">
            <span
              aria-hidden
              className="absolute left-[3px] top-2 bottom-2 w-px bg-[linear-gradient(to_bottom,var(--color-violet),var(--color-line)_45%,transparent)]"
            />
            {experience.items.map((item) => (
              <RevealItem as="li" key={item} className="group relative pb-7 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-7 top-[0.6rem] size-[7px] rounded-full border border-violet bg-void transition-surface duration-500 ease-[var(--ease-cinematic)] group-hover:bg-magenta group-hover:shadow-[0_0_14px_2px_color-mix(in_oklab,var(--color-magenta)_70%,transparent)]"
                />
                <p className="text-[0.97rem] leading-relaxed text-lavender-dim transition-colors duration-500 group-hover:text-paper/90">
                  {item}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ── Education ──────────────────────────────────────────────────── */}
        <div>
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-violet-text">
            Education
          </h3>

          <RevealGroup as="ul" className="mt-7 border-t border-line">
            {education.map((entry) => (
              <RevealItem
                as="li"
                key={entry.institution}
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 border-b border-line py-5 transition-colors duration-500 ease-[var(--ease-glow)] hover:bg-[color-mix(in_oklab,var(--color-surface)_55%,transparent)] md:px-3"
              >
                <div className="min-w-0">
                  <p className="font-display text-[1.08rem] font-medium tracking-tight text-paper">
                    {entry.institution}
                  </p>
                  <p className="mt-1 text-[0.88rem] text-lavender-dim">
                    {entry.credential}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[0.78rem] text-skin-amber">
                  {entry.result}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
