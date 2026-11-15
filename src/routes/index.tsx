import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, CalendarHeart, Feather, MailOpen } from "lucide-react";

import floralCorner from "@/assets/floral-corner.png";
import goldMandala from "@/assets/gold-mandala.png";
import { Countdown } from "@/components/site/Countdown";
import { EntranceOverlay } from "@/components/site/EntranceOverlay";
import { FamilyBlessings } from "@/components/site/FamilyBlessings";
import { InvitationVideo } from "@/components/site/InvitationVideo";
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
        content: "You're invited to celebrate Saniya & Raghav in Roorkee. Celebrations, RSVP, our story and more.",
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
  { to: "/celebrations", label: "Celebrations", hint: "Sagai, Haldi & Wedding", Icon: CalendarHeart },
  { to: "/capture", label: "Capture the Moments", hint: "Share your candid shots", Icon: Camera },
  { to: "/memories", label: "Memories", hint: "Leave your blessings", Icon: Feather },
] as const;

function Home() {
  return (
    <>
      <EntranceOverlay />

      {/* Hero — #SaRang and the couple's names are the centrepiece */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-16 pt-28">
        <img src={goldMandala} alt="" aria-hidden="true" width={1024} height={1024}
          className="animate-slow-spin pointer-events-none absolute w-[42rem] max-w-none opacity-[0.09] sm:w-[60rem]" />
        <img src={floralCorner} alt="" aria-hidden="true" width={1024} height={1024}
          className="pointer-events-none absolute -left-10 top-14 w-32 sm:w-56 md:w-64" />
        <img src={floralCorner} alt="" aria-hidden="true" width={1024} height={1024}
          className="pointer-events-none absolute -right-10 top-14 w-32 -scale-x-100 sm:w-56 md:w-64" />

        <div className="relative mx-auto w-full min-w-0 max-w-3xl text-center">
          <p className="eyebrow animate-rise">Together with the {wedding.families}</p>

          <p
            className="animate-rise mt-6 font-script text-[5.5rem] leading-[0.9] text-primary [animation-delay:120ms] sm:text-[8.5rem] md:text-[10rem]"
            aria-label={wedding.hashtag}
          >
            <span className="text-gold-deep">#</span>SaRang
          </p>

          <h1 className="animate-rise mt-4 font-display text-5xl font-normal uppercase leading-tight tracking-[0.12em] text-foreground [animation-delay:240ms] sm:text-6xl md:text-7xl">
            <span className="block sm:inline">{wedding.bride}</span>
            <span className="block font-display text-[0.6em] normal-case italic leading-none tracking-normal text-gold-deep sm:mx-5 sm:inline sm:align-middle sm:text-[0.7em]">&amp;</span>
            <span className="block sm:inline">{wedding.groom}</span>
          </h1>

          <Ornament className="animate-rise mt-8 [animation-delay:360ms]" />

          <p className="animate-rise mt-7 font-display text-3xl text-primary-deep [animation-delay:460ms] sm:text-4xl">
            {wedding.weddingDateLabel}
          </p>
          <p className="animate-rise mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground [animation-delay:520ms] sm:text-sm">
            The Kailasha Resort · Haridwar Road · {wedding.city}
          </p>
          <div className="animate-rise mt-10 [animation-delay:620ms]">
            <Countdown target={wedding.countdownTarget} label={wedding.countdownLabel} />
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="reveal px-5 py-16" aria-labelledby="welcome-title">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">A warm welcome</p>
          <h2 id="welcome-title" className="mt-3 text-4xl text-primary-deep sm:text-5xl">
            Welcome to our celebration
          </h2>
          <Ornament className="mt-5" />
          <p className="mt-6 font-display text-xl leading-relaxed text-foreground/85 sm:text-2xl">{wedding.welcomeLong}</p>
        </div>
        <nav aria-label="Quick links" className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
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
        </nav>
      </section>

      {/* Video invitation */}
      <section className="reveal px-5 py-16" aria-labelledby="invite-title">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Our invitation</p>
          <h2 id="invite-title" className="text-4xl text-primary-deep sm:text-5xl">A Video Invitation</h2>
          <p className="mt-1 font-script text-3xl text-gold-deep">press play, with love</p>
          <Ornament className="mt-5" />
        </header>
        <div className="mt-10">
          <InvitationVideo />
        </div>
      </section>

      {/* Celebrations at a glance */}
      <section className="reveal px-5 py-16" aria-label="The celebrations at a glance">
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
            <Link to="/celebrations">View full itinerary</Link>
          </Button>
        </div>
      </section>

      <FamilyBlessings />
    </>
  );
}
