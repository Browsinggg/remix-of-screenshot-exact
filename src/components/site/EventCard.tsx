import { CalendarPlus, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { WeddingEvent } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { googleCalendarUrl, mapsSearchUrl } from "@/lib/wedding-utils";

const toneStyles: Record<WeddingEvent["tone"], { band: string; chip: string }> = {
  rose: { band: "bg-primary", chip: "text-primary" },
  gold: { band: "bg-gold", chip: "text-gold-deep" },
  maroon: { band: "bg-primary-deep", chip: "text-primary-deep" },
};

export function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const tone = toneStyles[event.tone];
  return (
    <article className="invite-card overflow-hidden rounded-xl" aria-labelledby={`${event.id}-title`}>
      <div className={cn("h-1.5 w-full", tone.band)} aria-hidden="true" />
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={cn("eyebrow", tone.chip)}>Function {String(index + 1).padStart(2, "0")}</p>
            <h3 id={`${event.id}-title`} className="mt-2 text-3xl text-foreground sm:text-4xl">
              {event.name}
            </h3>
            <p className="font-script text-2xl text-gold-deep">{event.tagline}</p>
          </div>
          <div className="shrink-0 rounded-md border border-gold/60 px-3 py-2 text-center">
            <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
              {event.dayLabel.slice(0, 3)}
            </span>
            <span className="block font-display text-3xl leading-none text-primary-deep">
              {event.dateLabel.split(" ")[0]}
            </span>
            <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">Dec</span>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-muted-foreground">{event.description}</p>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
            <div>
              <dt className="sr-only">Time</dt>
              <dd>
                <span className="font-medium">{event.dayLabel}, {event.dateLabel}</span>
                <ul className="mt-1 space-y-0.5 text-muted-foreground">
                  {event.timings.map((t) => (
                    <li key={t.label}>
                      {t.label} — <span className="text-foreground">{t.time}</span>
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
            <a href={mapsSearchUrl(`${event.venueName}, ${event.venueArea}`)} target="_blank" rel="noreferrer">
              <MapPin /> Open in Maps
            </a>
          </Button>
          <Button asChild variant="rose" size="lg">
            <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
              <CalendarPlus /> Add to Calendar
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
