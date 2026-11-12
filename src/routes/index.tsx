import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, CalendarHeart, Feather, MailOpen } from "lucide-react";

import floralCorner from "@/assets/floral-corner.png";
import goldMandala from "@/assets/gold-mandala.png";
import { Countdown } from "@/components/site/Countdown";
import { EntranceOverlay } from "@/components/site/EntranceOverlay";
import { FamilyBlessings } from "@/components/site/FamilyBlessings";
import { Monogram } from "@/components/site/Monogram";
import { Ornament } from "@/components/site/Ornament";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { events, wedding } from "@/config/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "#SaRang – Saniya & Raghav's Wedding · 9 December 2026" },
      {
        name: "description",
        content: "You're invited to celebrate Saniya & Raghav in Roorkee. Events, RSVP, stay details and more.",
      },
      { property: "og:title", content: "#SaRang – Saniya & Raghav's Wedding" },
      {
        property: "og:description",
        content: "You're invited to celebrate Saniya & Raghav in Roorkee on 8–9 December 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const quickLinks = [
  { to: "/rsvp", label: "RSVP", hint: "Let us know you're coming", Icon: MailOpen },
  { to: "/events", label: "Events", hint: "Sagai, Haldi & Wedding", Icon: CalendarHeart },
  { to: "/stay", label: "Stay Information", hint: "Hotels & check-in", Icon: BedDouble },
  { to: "/memories", label: "Memories with the Couple", hint: "Leave your blessings", Icon: Feather },
] as const;

function Home() {
  return (
    <>
      <EntranceOverlay />

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-16 pt-28">
        <img src={goldMandala} alt="" aria-hidden="true" width={1024} height={1024}
          className="animate-slow-spin pointer-events-none absolute w-[40rem] max-w-none opacity-[0.1] sm:w-[56rem]" />
        <img src={floralCorner} alt="" aria-hidden="true" width={1024} height={1024}
          className="pointer-events-none absolute -left-10 -top-4 w-44 sm:w-72 md:w-80" />
        <img src={floralCorner} alt="" aria-hidden="true" width={1024} height={1024}
          className="pointer-events-none absolute -right-10 -top-4 w-44 -scale-x-100 sm:w-72 md:w-80" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="eyebrow animate-rise">Together with the {wedding.families}</p>
          <div className="animate-rise mt-6 [animation-delay:100ms]">
            <Monogram size="xl" />
          </div>
          <h1 className="animate-rise mt-6 text-5xl text-foreground [animation-delay:200ms] sm:text-7xl">
            {wedding.bride}
            <span className="mx-3 font-script text-5xl text-gold-deep sm:text-6xl">&amp;</span>
            {wedding.groom}
          </h1>
          <p className="animate-rise mt-4 font-display text-xl italic text-muted-foreground [animation-delay:300ms] sm:text-2xl">
            request the pleasure of your company
          </p>
          <Ornament className="animate-rise mt-8 [animation-delay:400ms]" />
          <p className="animate-rise mt-8 font-display text-3xl text-primary-deep [animation-delay:500ms] sm:text-4xl">
            {wedding.weddingDateLabel}
          </p>
          <p className="animate-rise mt-1 text-sm uppercase tracking-[0.3em] text-muted-foreground [animation-delay:550ms]">
            The Kailasha Resort · Haridwar Road · {wedding.city}
          </p>
          <div className="animate-rise mt-10 [animation-delay:650ms]">
            <Countdown target={wedding.countdownTarget} label={wedding.countdownLabel} />
          </div>
        </div>
      </section>

      {/* Welcome + quick links */}
      <section className="px-5 py-16" aria-labelledby="welcome-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">A warm welcome</p>
          <h2 id="welcome-title" className="mt-3 text-4xl text-primary-deep sm:text-5xl">
            Welcome to our celebration
          </h2>
          <Ornament className="mt-5" />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{wedding.welcomeLong}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {quickLinks.map(({ to, label, hint, Icon }) => (
            <Link
              key={to}
              to={to}
              className="invite-card group flex flex-col items-center rounded-xl px-3 py-6 text-center transition-transform hover:-translate-y-1"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-gold/70 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-4 font-display text-xl leading-tight text-foreground">{label}</span>
              <span className="mt-1 text-xs text-muted-foreground">{hint}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Celebrations at a glance */}
      <section className="px-5 py-16" aria-labelledby="glance-title">
        <SectionHeading eyebrow="8 & 9 December 2026" title="The Celebrations" script="at a glance" />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {events.map((e) => (
            <li key={e.id} className="invite-card rounded-xl p-6 text-center">
              <p className="eyebrow">{e.dayLabel} · {e.dateLabel}</p>
              <h3 className="mt-3 text-3xl text-primary-deep">{e.name}</h3>
              <p className="mt-2 text-sm text-foreground">{e.timings[0]?.time}</p>
              <p className="mt-3 text-sm text-muted-foreground">{e.venueName}<br />{e.venueArea}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Button asChild variant="gold" size="lg">
            <Link to="/events">View full itinerary</Link>
          </Button>
        </div>
      </section>

      {/* Digital invitation */}
      <section className="px-5 py-16" aria-labelledby="invite-title">
        <SectionHeading eyebrow="Our invitation" title="Digital Invitation" />
        <div className="mx-auto mt-10 max-w-md">
          {wedding.invitationImageUrl ? (
            <img src={wedding.invitationImageUrl} alt="Saniya & Raghav's wedding invitation"
              loading="lazy" className="invite-card w-full rounded-xl" />
          ) : (
            <div className="invite-card rounded-xl p-3">
              <div className="placeholder-surface flex aspect-[3/4] flex-col items-center justify-center rounded-lg p-8 text-center">
                <Monogram size="lg" />
                <Ornament className="my-6" />
                <p className="font-display text-2xl text-foreground">Digital Invitation Coming Soon</p>
                <p className="mt-2 text-sm text-muted-foreground">The invitation artwork will be shared here shortly.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <FamilyBlessings />
    </>
  );
}
