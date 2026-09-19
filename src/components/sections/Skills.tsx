import { RevealGroup, RevealItem, Section } from "@/components/ui/Section";
import { skillGroups, softSkillGroups } from "@/content/site";

type Group = { label: string; items: readonly string[] };

function Rows({ groups }: { groups: readonly Group[] }) {
  return (
    <>
      {groups.map((group) => (
        <RevealItem
          as="li"
          key={group.label}
          className="group grid gap-3 border-b border-line py-5 transition-colors duration-500 ease-[var(--ease-glow)] hover:bg-[color-mix(in_oklab,var(--color-surface)_55%,transparent)] md:grid-cols-[15rem_1fr] md:items-baseline md:gap-8 md:px-3"
        >
          <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-violet-text transition-colors duration-500 group-hover:text-magenta">
            {group.label}
          </h3>

          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-md border border-line bg-[color-mix(in_oklab,var(--color-surface-2)_58%,transparent)] px-2.5 py-1 text-[0.84rem] text-paper/85 transition-colors duration-400 ease-[var(--ease-glow)] hover:border-[color-mix(in_oklab,var(--color-violet)_60%,var(--color-line))] hover:text-paper"
              >
                {item}
              </li>
            ))}
          </ul>
        </RevealItem>
      ))}
    </>
  );
}

/**
 * One continuous table rather than two side-by-side columns: the categories
 * read as a single ordered system, and there's no ragged column of dead space
 * where a short group runs out before a long one.
 */
export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title={
        <>
          The <span className="text-glow-gradient">stack</span> behind the work.
        </>
      }
      lede="Grouped the way they're actually used — the database and BI layer most of the analytics work runs through, the Python and ML side, and the habits that hold a solo project together."
    >
      <div className="max-w-5xl">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-lavender-dim">
          Technical
        </p>
        <RevealGroup as="ul" className="mt-5 border-t border-line">
          <Rows groups={skillGroups} />
        </RevealGroup>

        <p className="mt-12 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-lavender-dim">
          Soft skills
        </p>
        <RevealGroup as="ul" className="mt-5 border-t border-line">
          <Rows groups={softSkillGroups} />
        </RevealGroup>
      </div>
    </Section>
  );
}
