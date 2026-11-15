import { ImagePlus } from "lucide-react";

import type { PhotoSlot as Slot } from "@/config/wedding";
import { cn } from "@/lib/utils";

/**
 * Shows the photo once a URL is added in the config; until then a clearly labelled placeholder.
 * `fill` makes the frame stretch to its grid cell (used by the editorial galleries).
 */
export function PhotoSlot({
  slot,
  className,
  tilt,
  fill = false,
  variant = "polaroid",
}: {
  slot: Slot;
  className?: string | undefined;
  tilt?: number | undefined;
  fill?: boolean;
  variant?: "polaroid" | "frame";
}) {
  const inner = fill ? "h-full min-h-0 w-full" : "aspect-[4/5] w-full";
  return (
    <figure
      className={cn(variant === "frame" ? "frame" : "polaroid", fill && "flex h-full flex-col", className)}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {slot.src ? (
        <img src={slot.src} alt={slot.alt || slot.label} loading="lazy" className={cn(inner, "flex-1 object-cover")} />
      ) : (
        <div className={cn(inner, "placeholder-surface flex flex-1 flex-col items-center justify-center gap-2 p-3 text-center")}>
          <ImagePlus className="size-5 text-gold-deep" aria-hidden="true" />
          <span className="max-w-[16ch] text-[0.7rem] leading-snug tracking-wide text-muted-foreground">{slot.label}</span>
        </div>
      )}
    </figure>
  );
}
