import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Reveal, RevealGroup, Section } from "@/components/ui/Section";
import { contact, projects } from "@/content/site";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title={
        <>
          Six projects, each built{" "}
          <span className="text-glow-gradient">end to end</span>.
        </>
      }
      lede="From raw CSV to a dashboard a stakeholder can act on, from an EHR export reconciled against a billing database, and from an ultrasound dataset to a model that segments and classifies in a single pass. Every card links to its repository."
    >
      <RevealGroup
        as="ul"
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </RevealGroup>

      <Reveal className="mt-10 flex justify-center">
        <ButtonLink href={contact.github} variant="secondary" external>
          All repositories
          <ArrowUpRightIcon
            width={15}
            height={15}
            className="transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
