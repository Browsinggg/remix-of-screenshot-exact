import { cn } from "@/lib/utils";

/** Fine gold divider with a central lotus-diamond; optional hashtag in the centre. */
export function Ornament({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold", className)} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="fill-gold">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" />
      </svg>
      {label ? (
        <span className="font-script text-2xl leading-none text-primary">{label}</span>
      ) : (
        <svg width="36" height="18" viewBox="0 0 36 18" fill="none" className="stroke-gold">
          <path d="M18 2 C 14 8, 14 12, 18 16 C 22 12, 22 8, 18 2 Z" strokeWidth="1" />
          <path d="M18 16 C 12 15, 8 11, 6 6 C 11 7, 15 10, 18 16 Z" strokeWidth="1" />
          <path d="M18 16 C 24 15, 28 11, 30 6 C 25 7, 21 10, 18 16 Z" strokeWidth="1" />
          <circle cx="2" cy="12" r="1" className="fill-gold" />
          <circle cx="34" cy="12" r="1" className="fill-gold" />
        </svg>
      )}
      <svg width="10" height="10" viewBox="0 0 10 10" className="fill-gold">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
    </div>
  );
}
