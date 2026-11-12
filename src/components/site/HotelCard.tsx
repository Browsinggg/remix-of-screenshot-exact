import { Bus, Clock, Info, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Hotel } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { hotelMapsUrl, isPlaceholder } from "@/lib/wedding-utils";

function Row({ Icon, label, value }: { Icon: typeof Clock; label: string; value: string }) {
  const ph = isPlaceholder(value);
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
      <div>
        <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
        <dd className={cn("text-sm", ph && "italic text-muted-foreground")}>{value}</dd>
      </div>
    </div>
  );
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const maps = hotelMapsUrl(hotel);
  return (
    <article className="invite-card flex flex-col rounded-xl p-6">
      <p className="eyebrow">{hotel.label}</p>
      <h3 className="mt-2 text-2xl text-primary-deep">{hotel.name}</h3>
      {!hotel.confirmed && (
        <span className="mt-2 w-fit rounded-full border border-gold/60 px-3 py-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-gold-deep">
          Details coming soon
        </span>
      )}
      <dl className="mt-5 flex-1 space-y-4">
        <Row Icon={MapPin} label="Address" value={hotel.address} />
        <Row Icon={Phone} label="Contact" value={hotel.contact} />
        <Row Icon={Clock} label="Check-in / Check-out" value={hotel.confirmed ? `${hotel.checkIn} / ${hotel.checkOut}` : "[Timings to be added]"} />
        <Row Icon={Bus} label="Transport & pickup" value={hotel.transport} />
        <Row Icon={Info} label="Instructions" value={hotel.notes} />
      </dl>
      {maps ? (
        <Button asChild variant="gold" className="mt-6">
          <a href={maps} target="_blank" rel="noreferrer"><MapPin /> Open in Maps</a>
        </Button>
      ) : (
        <Button variant="gold" className="mt-6" disabled>Map link coming soon</Button>
      )}
    </article>
  );
}
