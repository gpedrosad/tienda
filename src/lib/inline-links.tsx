import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;

function isInternalPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/** Texto visible sin sintaxis markdown, para JSON-LD y otros textos planos. */
export function plainTextFromInlineLinks(text: string) {
  return text.replace(LINK_PATTERN, "$1");
}

export function InlineLinkedText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = new RegExp(LINK_PATTERN.source, "g");
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`t-${key}`}>{text.slice(lastIndex, match.index)}</Fragment>);
      key += 1;
    }

    const label = match[1];
    const href = match[2];

    if (isInternalPath(href)) {
      nodes.push(
        <Link
          key={key}
          href={href}
          className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-900"
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(label);
    }

    key += 1;
    lastIndex = match.index + match[0].length;
  }

    if (lastIndex < text.length) {
      nodes.push(<Fragment key={`t-${key}`}>{text.slice(lastIndex)}</Fragment>);
    }

  return <>{nodes}</>;
}
