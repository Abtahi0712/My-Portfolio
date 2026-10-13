import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Section";
import { contact, person } from "@/content/site";

const links = [
  { href: contact.linkedin, label: "LinkedIn", handle: contact.linkedinLabel, Icon: LinkedInIcon },
  { href: contact.github, label: "GitHub", handle: contact.githubLabel, Icon: GitHubIcon },
  { href: contact.leetcode, label: "LeetCode", handle: contact.leetcodeLabel, Icon: LeetCodeIcon },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[calc(100lvh-var(--nav-h)+3.5rem)] -scroll-mt-20 flex-col overflow-hidden pt-20 md:min-h-[calc(100lvh-var(--nav-h)+4.5rem)] md:-scroll-mt-24 md:pt-24 lg:min-h-[calc(100lvh-var(--nav-h)+5.5rem)] lg:-scroll-mt-28 lg:pt-28"
    >
      {/* Last section: the page ends here, so without a minimum height a nav
          click can't scroll it up under the bar like the others. The min-height
          is one viewport, minus the nav + 1.5rem anchor offset, plus the top
          padding the negative scroll-margin cancels. */}
      {/* Footer glow — the page's light field resolving into one last bloom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[42vmax] w-[82vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-violet)_22%,transparent),transparent_66%)] blur-[60px]"
      />

      <div className="shell relative flex w-full flex-1 flex-col">
        <Reveal className="mx-auto mb-20 max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-magenta" />
            Contact
            <span className="inline-block h-px w-8 bg-magenta" />
          </p>

          <h2
            id="contact-heading"
            className="mt-6 text-[clamp(2rem,6.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper"
          >
            Let&apos;s turn your data into{" "}
            <span className="text-glow-gradient">something decisive</span>.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[1.0125rem] leading-relaxed text-lavender-dim">
            Open to Data Analyst and ML Engineer roles, and happy to talk
            through a dataset you&apos;re stuck on. The fastest way to reach me
            is email.
          </p>

          <div className="mt-10 flex justify-center">
            <ButtonLink
              href={`mailto:${contact.email}`}
              variant="primary"
              className="!px-8 !py-4 !text-[0.78rem]"
            >
              {contact.email}
              <ArrowRightIcon
                width={15}
                height={15}
                className="transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:translate-x-1"
              />
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {links.map(({ href, label, handle, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-[color-mix(in_oklab,var(--color-surface)_60%,transparent)] px-4 py-2.5 backdrop-blur-md transition-surface duration-500 ease-[var(--ease-cinematic)] hover:-translate-y-0.5 hover:border-violet hover:shadow-[0_0_30px_-10px_color-mix(in_oklab,var(--color-violet)_90%,transparent)]"
                >
                  <Icon
                    width={16}
                    height={16}
                    className="text-lavender-dim transition-colors duration-500 group-hover:text-skin-amber"
                  />
                  <span className="font-mono text-[0.72rem] text-paper">
                    {label}
                  </span>
                  <span className="hidden font-mono text-[0.7rem] text-lavender-dim sm:inline">
                    {handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="rule-fade mt-auto" />

        <div className="flex flex-col items-center justify-between gap-3 py-8 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-[0.7rem] text-lavender-dim">
            © {new Date().getFullYear()} {person.name}
          </p>
          <p className="font-mono text-[0.7rem] text-lavender-dim">
            Built with Next.js, Tailwind &amp; three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
