import { CalendarPlus, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { WeddingEvent } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { googleCalendarUrl, mapsSearchUrl } from "@/lib/wedding-utils";

const toneStyles: Record<WeddingEvent["tone"], { dot: string; text: string }> = {
  rose: { dot: "bg-primary", text: "text-primary" },
  gold: { dot: "bg-gold", text: "text-gold-deep" },
  maroon: { dot: "bg-primary-deep", text: "text-primary-deep" },
};

/** One function on the vertical Celebrations timeline: date medallion on the rail, details beside it. */
export function EventTimelineItem({ event, index, last }: { event: WeddingEvent; index: number; last?: boolean }) {
  const tone = toneStyles[event.tone];
  const [dayNum, month] = event.dateLabel.split(" ");
  return (
    <li className={cn("reveal relative grid grid-cols-[3.75rem_minmax(0,1fr)] gap-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8", !last && "pb-14")}>
      {/* rail */}
      {!last && <span className="absolute bottom-0 left-[1.875rem] top-20 w-px bg-gradient-to-b from-gold to-gold/20 sm:left-14" aria-hidden="true" />}
      <div className="flex flex-col items-center text-center">
        <div className="flex size-[3.75rem] flex-col items-center justify-center rounded-full border border-gold bg-paper shadow-[var(--shadow-card)] sm:size-24">
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">{event.dayLabel.slice(0, 3)}</span>
          <span className="font-display text-2xl leading-none text-primary-deep sm:text-4xl">{dayNum}</span>
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">{month?.slice(0, 3)}</span>
        </div>
        <span className={cn("mt-3 size-2 rotate-45", tone.dot)} aria-hidden="true" />
      </div>

      <article className="invite-card min-w-0 rounded-xl p-5 sm:p-8" aria-labelledby={`${event.id}-title`}>
        <p className={cn("eyebrow", tone.text)}>Function {String(index + 1).padStart(2, "0")} · {event.dayLabel}, {event.dateLabel}</p>
        <h2 id={`${event.id}-title`} className="mt-2 text-3xl text-foreground sm:text-4xl">{event.name}</h2>
        <p className="font-script text-2xl text-gold-deep">{event.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{event.description}</p>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
            <div>
              <dt className="sr-only">Time</dt>
              <dd>
                <ul className="space-y-0.5">
                  {event.timings.map((t) => (
                    <li key={t.label}>
                      <span className="text-muted-foreground">{t.label} — </span>
                      <span className="font-medium">{t.time}</span>
                    </li>
                  ))}
                </ul>
                <span className="text-xs text-muted-foreground">All times in IST</span>
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
            <div>
              <dt className="sr-only">Venue</dt>
              <dd>
                <span className="font-medium">{event.venueName}</span>
                <span className="block text-muted-foreground">{event.venueArea}</span>
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Button asChild variant="gold" size="lg">
            <a href={mapsSearchUrl(`${event.venueName}, ${event.venueArea}`)} target="_blank" rel="noopener noreferrer">
              <MapPin /> Open in Google Maps
            </a>
          </Button>
          <Button asChild variant="rose" size="lg">
            <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
              <CalendarPlus /> Add to Google Calendar
            </a>
          </Button>
        </div>
      </article>
    </li>
  );
}
