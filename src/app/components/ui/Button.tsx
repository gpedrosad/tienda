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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  ];

  if (variant !== "ghost") {
    classes.push(size === "sm" ? "min-h-11 px-4 text-sm" : "min-h-12 px-6 text-sm md:text-base");
  }

  if (variant === "whatsapp") {
    classes.push(
      "bg-[#25D366] text-ink shadow-md shadow-[#25D366]/30 hover:-translate-y-px hover:bg-[#2fe074] hover:shadow-lg hover:shadow-[#25D366]/40 active:translate-y-0 focus-visible:ring-[#25D366]"
    );
  } else if (variant === "primary") {
    classes.push(
      "bg-wood text-white shadow-md shadow-wood/25 hover:-translate-y-px hover:bg-wood-dark hover:shadow-lg active:translate-y-0 focus-visible:ring-wood"
    );
  } else if (variant === "secondary") {
    classes.push(
      tone === "dark"
        ? "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/5 focus-visible:ring-white"
        : "border border-ink/20 bg-white text-ink hover:border-ink hover:bg-canvas focus-visible:ring-ink"
    );
  } else {
    classes.push(
      "min-h-0 px-0 font-medium underline underline-offset-4 decoration-wood/40 hover:decoration-wood"
    );
  }

  if (tone === "dark") {
    classes.push("focus-visible:ring-offset-ink");
  }

  if (variant !== "ghost" && fullWidthMobile) {
    classes.push("w-full sm:w-auto");
  }

  if (opts?.className) {
    classes.push(opts.className);
  }

  return classes.join(" ");
}
