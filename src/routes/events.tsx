import { createFileRoute } from "@tanstack/react-router";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EventCard } from "@/components/site/EventCard";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { events } from "@/config/wedding";
import { downloadItineraryPdf } from "@/lib/itinerary-pdf";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Wedding Functions & Itinerary · #SaRang" },
      { name: "description", content: "Sagai & Sangeet, Haldi and the Wedding — dates, times (IST) and venues in Roorkee." },
      { property: "og:title", content: "Wedding Functions & Itinerary · #SaRang" },
      { property: "og:description", content: "Sagai & Sangeet on 8 Dec, Haldi and Wedding on 9 Dec 2026 in Roorkee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

const days = [
  { label: "Tuesday · 8 December 2026", ids: ["sagai-sangeet"] },
  { label: "Wednesday · 9 December 2026", ids: ["haldi", "wedding"] },
];

function EventsPage() {
  const [busy, setBusy] = useState(false);
  const onDownload = async () => {
    setBusy(true);
    try {
      await downloadItineraryPdf();
    } catch (err) {
      console.error(err);
      toast.error("Sorry, the itinerary couldn't be downloaded. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Wedding functions"
        title="The Celebrations"
        script="join us for every moment"
        intro="All times are in Indian Standard Time (IST). Tap a card to open the venue in Google Maps or save the function to your calendar."
      />

      <div className="mt-8 text-center">
        <Button variant="gold" size="lg" onClick={onDownload} disabled={busy}>
          {busy ? <Loader2 className="animate-spin" /> : <Download />} Download Itinerary (PDF)
        </Button>
      </div>

      {/* Complete itinerary timeline */}
      <section className="mx-auto mt-16 max-w-3xl" aria-label="Complete itinerary">
        {days.map((day) => (
          <div key={day.label} className="mb-14">
            <h2 className="mb-6 text-center font-display text-2xl text-primary-deep">{day.label}</h2>
            <ol className="relative space-y-8 border-l border-gold/60 pl-6 sm:pl-10">
              {events
                .filter((e) => day.ids.includes(e.id))
                .map((e) => (
                  <li key={e.id} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[31px] top-8 size-3 rotate-45 border border-gold sm:-left-[47px]",
                        e.tone === "rose" && "bg-primary",
                        e.tone === "gold" && "bg-gold",
                        e.tone === "maroon" && "bg-primary-deep",
                      )}
                      aria-hidden="true"
                    />
                    <EventCard event={e} index={events.indexOf(e)} />
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
