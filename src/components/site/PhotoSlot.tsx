import { ImagePlus } from "lucide-react";

import type { PhotoSlot as Slot } from "@/config/wedding";
import { cn } from "@/lib/utils";

/** Shows the photo once a URL is added in the config; until then a clearly labelled placeholder. */
export function PhotoSlot({ slot, className, tilt }: { slot: Slot; className?: string; tilt?: number | undefined }) {
  return (
    <figure
      className={cn("polaroid", className)}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {slot.src ? (
        <img src={slot.src} alt={slot.alt || slot.label} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      ) : (
        <div className="placeholder-surface flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 p-4 text-center">
          <ImagePlus className="size-6 text-gold-deep" aria-hidden="true" />
          <span className="text-xs leading-snug tracking-wide text-muted-foreground">{slot.label}</span>
        </div>
      )}
    </figure>
  );
}
