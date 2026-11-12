import { createFileRoute } from "@tanstack/react-router";

import { AccommodationForm } from "@/components/site/AccommodationForm";
import { CheckInOut } from "@/components/site/CheckInOut";
import { HotelCard } from "@/components/site/HotelCard";
import { Ornament } from "@/components/site/Ornament";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { hotels } from "@/config/wedding";

export const Route = createFileRoute("/stay")({
  head: () => ({
    meta: [
      { title: "Your Stay & Hospitality · #SaRang" },
      { name: "description", content: "Hotel information, stay requests and hotel check-in / check-out for wedding guests." },
      { property: "og:title", content: "Your Stay & Hospitality · #SaRang" },
      { property: "og:description", content: "Everything about your stay in Roorkee for Saniya & Raghav's wedding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StayPage,
});

function StayPage() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Travel & accommodation"
        title="Your Stay & Hospitality"
        script="you are our honoured guests"
        intro="Guests will be hosted across a few hotels in Roorkee. Final hotel details will be shared here soon."
      />

      <section className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3" aria-label="Hotels">
        {hotels.map((h) => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </section>

      <Ornament label="#SaRang" className="my-20" />

      <section className="mx-auto max-w-2xl" aria-labelledby="acc-h">
        <div className="mb-8 text-center">
          <p className="eyebrow">Planning your trip</p>
          <h2 id="acc-h" className="mt-2 text-4xl text-primary-deep">Accommodation Details</h2>
          <p className="mt-3 text-muted-foreground">Tell us when you're arriving and leaving so we can arrange your room.</p>
        </div>
        <AccommodationForm />
      </section>

      <Ornament className="my-20" />

      <section className="mx-auto max-w-2xl" aria-labelledby="chk-h">
        <div className="mb-8 text-center">
          <p className="eyebrow">At the hotel</p>
          <h2 id="chk-h" className="mt-2 text-4xl text-primary-deep">Hotel Check-in / Check-out</h2>
          <p className="mt-3 text-muted-foreground">Arrived or leaving? Choose your hotel, enter your room number and tap a button.</p>
        </div>
        <CheckInOut />
      </section>
    </PageShell>
  );
}
