import { cn } from "@/lib/utils";
import { Ornament } from "./Ornament";

export function SectionHeading({
  eyebrow,
  title,
  script,
  intro,
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <As className="text-4xl text-primary-deep sm:text-5xl">{title}</As>
      {script && <p className="mt-1 font-script text-3xl text-gold-deep">{script}</p>}
      <Ornament className="mt-5" />
      {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </header>
  );
}
