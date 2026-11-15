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
      { title: "Important Contacts · #SaRang" },
      { name: "description", content: "Call or WhatsApp the family for RSVP help and assistance during the wedding." },
      { property: "og:title", content: "Important Contacts · #SaRang" },
      { property: "og:description", content: "RSVP and wedding assistance contacts for Saniya & Raghav's wedding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const WHATSAPP_HELLO = "Hi! I have a question about Saniya & Raghav's wedding #SaRang";

function ContactPage() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="RSVP & assistance"
        title="Important Contacts"
        script="we're just a call away"
        intro="For RSVPs, travel or anything at all, please reach out to any of us."
      />
      <ul className="invite-card mx-auto mt-12 max-w-xl divide-y divide-border/70 rounded-2xl px-5 py-2 sm:px-8">
        {contacts.map((c) => (
          <li key={c.phone} className="flex items-center gap-4 py-5">
            <div className="min-w-0 flex-1">
              <p className="font-display text-2xl leading-tight text-primary-deep">{c.name}</p>
              <p className="mt-0.5 text-sm tabular-nums text-muted-foreground">{formatIndianPhone(c.phone)}</p>
            </div>
            <Button asChild variant="gold" size="icon" className="size-11 rounded-full">
              <a href={telLink(c.phone)} aria-label={`Call ${c.name}`} title={`Call ${c.name}`}>
                <Phone />
              </a>
            </Button>
            <Button asChild variant="botanical" size="icon" className="size-11 rounded-full">
              <a href={whatsappLink(c.phone, WHATSAPP_HELLO)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${c.name}`} title={`WhatsApp ${c.name}`}>
                <MessageCircle />
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
