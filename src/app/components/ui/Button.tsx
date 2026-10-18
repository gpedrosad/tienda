export type ButtonVariant = "whatsapp" | "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

export function buttonClasses(opts?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: "light" | "dark";
  fullWidthMobile?: boolean;
  className?: string;
}): string {
  const variant = opts?.variant ?? "primary";
  const size = opts?.size ?? "md";
  const tone = opts?.tone ?? "light";
  const fullWidthMobile = opts?.fullWidthMobile ?? true;
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  ];

  if (variant !== "ghost") {
    classes.push(size === "sm" ? "min-h-11 px-4 text-sm" : "min-h-12 px-6 text-sm md:text-base");
  }

  if (variant === "whatsapp") {
    classes.push("bg-[#25D366] text-neutral-950 hover:bg-[#1ebe57] focus-visible:ring-[#25D366]");
  } else if (variant === "primary") {
    classes.push("bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-900");
  } else if (variant === "secondary") {
    classes.push(
      tone === "dark"
        ? "border border-white/30 bg-transparent text-white hover:border-white focus-visible:ring-white"
        : "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 focus-visible:ring-neutral-900"
    );
  } else {
    classes.push(
      "min-h-0 px-0 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900"
    );
  }

  if (tone === "dark") {
    classes.push("focus-visible:ring-offset-neutral-900");
  }

  if (variant !== "ghost" && fullWidthMobile) {
    classes.push("w-full sm:w-auto");
  }

  if (opts?.className) {
    classes.push(opts.className);
  }

  return classes.join(" ");
}
