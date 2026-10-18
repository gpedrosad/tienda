"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ChipBase = {
  active?: boolean;
  children: ReactNode;
  className?: string;
};

type ChipProps = ChipBase &
  (
    | { href: string; onClick?: never }
    | { href?: never; onClick: () => void }
  );

export const chipRowClassName = "flex max-w-full flex-nowrap gap-2 overflow-x-auto px-0.5 py-1";

export function chipClassName(active = false, className?: string) {
  return [
    "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
    active
      ? "bg-neutral-900 text-white"
      : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:text-neutral-900",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Chip(props: ChipProps) {
  const { active = false, children, className } = props;
  const classes = chipClassName(active, className);

  if (props.href) {
    return (
      <Link href={props.href} className={classes} aria-current={active ? "page" : undefined}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} aria-pressed={active} className={classes}>
      {children}
    </button>
  );
}
