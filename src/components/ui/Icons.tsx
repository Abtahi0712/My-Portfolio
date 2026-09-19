import type { SVGProps } from "react";

/**
 * Inline icons — no icon library dependency, nothing to tree-shake, and every
 * glyph inherits `currentColor` so the theme tokens drive them.
 * All are decorative; the accessible name lives on the wrapping link/button.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.13 5.42a1.6 1.6 0 0 0 1.74 0L21 7" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <path d="M12 1.7a10.3 10.3 0 0 0-3.26 20.07c.52.1.71-.22.71-.5v-1.9c-2.61.53-3.28-.63-3.5-1.21-.12-.3-.62-1.22-1.06-1.47-.36-.2-.88-.67-.01-.68.82-.01 1.4.75 1.59 1.06.93 1.57 2.42 1.13 3.02.85.09-.67.36-1.13.66-1.39-2.31-.26-4.73-1.16-4.73-5.13 0-1.13.4-2.07 1.06-2.8-.1-.26-.46-1.32.1-2.75 0 0 .87-.28 2.85 1.07a9.6 9.6 0 0 1 5.18 0c1.98-1.35 2.85-1.07 2.85-1.07.57 1.43.21 2.49.1 2.75.67.73 1.06 1.66 1.06 2.8 0 3.98-2.42 4.87-4.73 5.13.38.32.7.94.7 1.9v2.82c0 .28.2.6.71.5A10.3 10.3 0 0 0 12 1.7Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.25h4v11.25H3V9.25Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12v5.65h-4v-5.01c0-1.19-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.64v5.1h-4V9.25Z" />
    </svg>
  );
}

/**
 * Generic code-brackets glyph standing in for the LeetCode link — a neutral
 * mark rather than an imitation of their logo. The accessible name on the
 * wrapping link says where it goes.
 */
export function LeetCodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={1.7}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.6 6.4-3.2 11.2" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="m13 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={1.8}>
      <path d="M3.5 7h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 17h17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={1.8}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <path d="M12 2.2c.28 3.5 1.5 5.9 3.4 7.2 1.2.85 2.8 1.4 4.6 1.6v2c-1.8.2-3.4.75-4.6 1.6-1.9 1.3-3.12 3.7-3.4 7.2-.28-3.5-1.5-5.9-3.4-7.2-1.2-.85-2.8-1.4-4.6-1.6v-2c1.8-.2 3.4-.75 4.6-1.6 1.9-1.3 3.12-3.7 3.4-7.2Z" />
    </svg>
  );
}
