import { Reveal, Section } from "@/components/ui/Section";
import { aboutMarks, contact, person } from "@/content/site";

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Analysis that ends in a{" "}
          <span className="text-glow-gradient">decision</span>, not a chart.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <Reveal>
          {person.about.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 24)}
              className={
                i === 0
                  ? "text-[1.05rem] leading-[1.75] text-paper/90 sm:text-[1.12rem]"
                  : "mt-5 text-[1.0125rem] leading-[1.75] text-lavender-dim"
              }
            >
              {paragraph}
            </p>
          ))}

          <p className="mt-6 border-l-2 border-line pl-5 text-[1.0125rem] leading-[1.75] text-lavender-dim">
            {person.throughLine}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.75rem] text-lavender-dim">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 animate-pulse-glow rounded-full bg-magenta" />
              Open to Data Analyst &amp; ML Engineer roles
            </span>
            <span>{person.location}</span>
            <a
              href={`mailto:${contact.email}`}
              className="rounded text-paper underline decoration-line underline-offset-4 transition-colors duration-400 hover:text-skin-amber hover:decoration-skin-amber"
            >
              {contact.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          {/* The figures column was previously unlabelled, which left it
              reading as an anonymous stack of numbers. */}
          <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-lavender-dim">
            By the numbers
          </h3>

          <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {aboutMarks.map((mark) => (
              <li
                key={mark.value}
                className="bg-[color-mix(in_oklab,var(--color-surface)_82%,transparent)] px-6 py-5 backdrop-blur-md transition-colors duration-500 ease-[var(--ease-glow)] hover:bg-surface-2"
              >
                <p className="text-glow-gradient font-display text-[clamp(1.5rem,4.2vw,1.95rem)] font-semibold leading-none tracking-tight">
                  {mark.value}
                </p>
                <p className="mt-2.5 text-[0.86rem] leading-snug text-lavender-dim">
                  {mark.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
