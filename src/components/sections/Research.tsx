import { Tag } from "@/components/ui/Button";
import { SparkIcon } from "@/components/ui/Icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Section";
import { research } from "@/content/site";

/**
 * The thesis gets an elevated treatment rather than a card in the grid: a
 * gradient-edged panel, its own internal rhythm, and numbered findings.
 */
export default function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative scroll-mt-24 py-16 md:py-20 lg:py-24"
    >
      <div className="shell">
        <Reveal>
          {/* Gradient hairline border: 1px padding on a gradient parent. */}
          <div className="rounded-[1.75rem] bg-[linear-gradient(140deg,color-mix(in_oklab,var(--color-violet)_75%,transparent),var(--color-line)_38%,var(--color-line)_62%,color-mix(in_oklab,var(--color-magenta)_60%,transparent))] p-px shadow-[0_40px_120px_-50px_color-mix(in_oklab,var(--color-violet)_90%,transparent)]">
            <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-[color-mix(in_oklab,var(--color-surface)_88%,transparent)] px-6 py-10 backdrop-blur-xl sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              {/* Interior glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-violet)_26%,transparent),transparent_66%)] blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-magenta)_16%,transparent),transparent_68%)] blur-2xl"
              />

              <div className="relative">
                <p className="eyebrow flex items-center gap-3">
                  <SparkIcon width={14} height={14} className="text-magenta" />
                  Research Spotlight
                </p>

                <h2
                  id="research-heading"
                  className="mt-6 max-w-4xl text-[clamp(1.6rem,4.4vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.028em] text-paper"
                >
                  {research.title}
                </h2>

                <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-violet-text">
                  {research.context}
                </p>

                <p className="mt-7 max-w-3xl border-l-2 border-magenta/60 pl-5 text-[1.05rem] leading-[1.7] text-paper/90 sm:text-[1.12rem]">
                  {research.lead}
                </p>

                <RevealGroup
                  as="ol"
                  className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3"
                >
                  {research.points.map((point, i) => (
                    <RevealItem
                      as="li"
                      key={point.heading}
                      className="bg-[color-mix(in_oklab,var(--color-void)_62%,transparent)] px-6 py-7 transition-colors duration-500 ease-[var(--ease-glow)] hover:bg-[color-mix(in_oklab,var(--color-surface-2)_72%,transparent)]"
                    >
                      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-magenta">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-[1.05rem] font-semibold tracking-tight text-paper">
                        {point.heading}
                      </h3>
                      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-lavender-dim">
                        {point.text}
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>

                <ul className="mt-8 flex flex-wrap gap-1.5">
                  {research.tags.map((tag) => (
                    <li key={tag} className="group">
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
