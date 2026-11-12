import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { contacts } from "@/config/wedding";
import { formatIndianPhone, telLink, whatsappLink } from "@/lib/wedding-utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Need Assistance? · #SaRang" },
      { name: "description", content: "Call or WhatsApp the family for RSVP help and assistance during the wedding." },
      { property: "og:title", content: "Need Assistance? · #SaRang" },
      { property: "og:description", content: "RSVP and wedding assistance contacts for Saniya & Raghav's wedding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="RSVP & assistance"
        title="Need Assistance?"
        script="we're just a call away"
        intro="For RSVPs, travel or anything at all, please reach out to any of us."
      />
      <ul className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
        {contacts.map((c) => (
          <li key={c.phone} className="invite-card rounded-xl p-6 text-center">
            <p className="font-display text-2xl text-primary-deep">{c.name}</p>
            <p className="mt-1 text-sm tabular-nums text-muted-foreground">{formatIndianPhone(c.phone)}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button asChild variant="gold">
                <a href={telLink(c.phone)} aria-label={`Call ${c.name}`}><Phone /> Call</a>
              </Button>
              <Button asChild variant="botanical">
                <a href={whatsappLink(c.phone, "Hi! I have a question about Saniya & Raghav's wedding #SaRang")} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${c.name}`}>
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
