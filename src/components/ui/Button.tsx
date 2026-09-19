import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const shared =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-mono text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-surface duration-500 ease-[var(--ease-cinematic)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta";

const variants: Record<Variant, string> = {
  /* Violet→magenta fill. The rare amber accent appears only on hover. */
  primary: [
    "relative overflow-hidden px-7 py-3.5 text-void",
    "bg-[linear-gradient(100deg,var(--color-violet),var(--color-magenta))]",
    "shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-magenta)_60%,transparent),0_10px_44px_-12px_color-mix(in_oklab,var(--color-violet)_85%,transparent)]",
    "hover:text-void hover:shadow-[0_0_0_1px_var(--color-skin-amber),0_14px_56px_-10px_color-mix(in_oklab,var(--color-magenta)_85%,transparent)]",
    "hover:brightness-110",
  ].join(" "),

  secondary: [
    "px-6 py-3.5 text-paper",
    "border border-line bg-[color-mix(in_oklab,var(--color-surface)_65%,transparent)] backdrop-blur-md",
    "hover:border-violet hover:bg-surface-2 hover:text-skin-amber",
    "hover:shadow-[0_0_34px_-10px_color-mix(in_oklab,var(--color-violet)_80%,transparent)]",
  ].join(" "),

  ghost: [
    "px-3 py-2 text-lavender-dim",
    "hover:text-paper",
  ].join(" "),
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
  /** Adds target/rel for off-site destinations. */
  external?: boolean;
};

export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a
      href={href}
      className={`${shared} ${variants[variant]} ${className}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Small mono chip used for tech tags. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-[color-mix(in_oklab,var(--color-surface-2)_70%,transparent)] px-2.5 py-1 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-lavender-dim transition-colors duration-400 ease-[var(--ease-glow)] group-hover:border-[color-mix(in_oklab,var(--color-violet)_55%,var(--color-line))] group-hover:text-paper">
      {children}
    </span>
  );
}
