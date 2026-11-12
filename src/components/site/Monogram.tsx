import { cn } from "@/lib/utils";
import { wedding } from "@/config/wedding";

/** The #SaRang monogram — used in nav, hero, dividers and footer. */
export function Monogram({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl md:text-7xl",
    xl: "text-7xl md:text-8xl",
  } as const;
  return (
    <span
      className={cn("font-script leading-none text-primary", sizes[size], className)}
      aria-label={wedding.hashtag}
    >
      <span className="text-gold-deep">#</span>SaRang
    </span>
  );
}
