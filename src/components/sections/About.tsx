import { Reveal, Section } from "@/components/ui/Section";
import { contact, person } from "@/content/site";

/** Small, factual counters — every figure is taken from the CV or a README. */
const marks = [
  { value: "98,666", label: "orders modelled end-to-end in the Olist pipeline" },
  { value: "9", label: "LLMs benchmarked in the Bangla summarization thesis" },
  { value: "55+", label: "problems solved on LeetCode" },
];

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
          <p className="text-[1.05rem] leading-[1.75] text-paper/90 sm:text-[1.12rem]">
            {person.summary}
          </p>

          <p className="mt-6 text-[1.0125rem] leading-[1.75] text-lavender-dim">
            The through-line across the work below is the same one every time:
            start from the business question, get the data honest before
            trusting it, and stop only once the numbers say something a person
            can act on. That&apos;s as true of a nine-page Power BI model as it
            is of a multi-task U-Net.
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
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {marks.map((mark) => (
              <li
                key={mark.value}
                className="bg-[color-mix(in_oklab,var(--color-surface)_82%,transparent)] px-6 py-6 backdrop-blur-md transition-colors duration-500 ease-[var(--ease-glow)] hover:bg-surface-2"
              >
                <p className="font-display text-[2.1rem] font-semibold leading-none tracking-tight text-glow-gradient">
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
