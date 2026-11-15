import { createFileRoute } from "@tanstack/react-router";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EventTimelineItem } from "@/components/site/EventTimelineItem";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { events } from "@/config/wedding";
import { downloadItineraryPdf } from "@/lib/itinerary-pdf";

export const Route = createFileRoute("/celebrations")({
  head: () => ({
    meta: [
      { title: "The Celebrations · Wedding Itinerary · #SaRang" },
      { name: "description", content: "Sagai & Sangeet, Haldi and the Wedding — dates, times (IST) and venues in Roorkee." },
      { property: "og:title", content: "The Celebrations · #SaRang" },
      { property: "og:description", content: "Sagai & Sangeet on 8 Dec, Haldi and Wedding on 9 Dec 2026 in Roorkee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

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
        intro="Three functions across two days in Roorkee. All times are in Indian Standard Time (IST)."
      />

      <div className="mt-8 text-center">
        <Button variant="gold" size="lg" onClick={onDownload} disabled={busy}>
          {busy ? <Loader2 className="animate-spin" /> : <Download />} Download Itinerary (PDF)
        </Button>
      </div>

      {/* Vertical timeline of every function */}
      <ol className="mx-auto mt-16 max-w-3xl" aria-label="Wedding itinerary">
        {events.map((e, i) => (
          <EventTimelineItem key={e.id} event={e} index={i} last={i === events.length - 1} />
        ))}
      </ol>
    </PageShell>
  );
}
