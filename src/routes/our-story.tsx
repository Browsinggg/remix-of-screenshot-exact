import { createFileRoute } from "@tanstack/react-router";
import { Film } from "lucide-react";

import { Ornament } from "@/components/site/Ornament";
import { PageShell } from "@/components/site/PageShell";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { SectionHeading } from "@/components/site/SectionHeading";
import { couple } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story · Saniya & Raghav · #SaRang" },
      { name: "description", content: "Childhood photographs, fun facts and pre-wedding moments of Saniya and Raghav." },
      { property: "og:title", content: "Our Story · Saniya & Raghav · #SaRang" },
      { property: "og:description", content: "Meet the bride and groom — from childhood memories to pre-wedding moments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurStoryPage,
});

type Person = (typeof couple)["bride"] | (typeof couple)["groom"];

/** Editorial spans for the pre-wedding gallery — one hero frame, a tall frame, and wide closers. */
const preWeddingSpans = [
  "col-span-2 row-span-2",
  "row-span-2",
  "",
  "",
  "col-span-2",
  "col-span-2",
];

function PersonSection({ person, reverse }: { person: Person; reverse?: boolean }) {
  const id = `${person.name.toLowerCase()}-h`;
  return (
    <section className="reveal mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14" aria-labelledby={id}>
      <div className={cn(reverse && "md:order-2")}>
        <div className="grid auto-rows-[8.5rem] grid-cols-3 gap-3 sm:auto-rows-[11rem]">
          {person.photos.map((p, i) => (
            <PhotoSlot key={i} slot={p} fill variant="frame" className={i === 0 ? "col-span-2 row-span-2" : ""} />
          ))}
        </div>
        <p className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground md:text-left">
          {person.name} · childhood
        </p>
      </div>

      <div className={cn("text-center md:text-left", reverse && "md:order-1")}>
        <p className="eyebrow">{person.title}</p>
        <h2 id={id} className="mt-1 font-script text-6xl leading-tight text-primary sm:text-7xl">{person.name}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{person.bio}</p>

        <h3 className="mt-8 text-2xl text-foreground">Fun facts about {person.name}</h3>
        <ol className="mt-4 space-y-3 text-left">
          {person.funFacts.map((f, i) => (
            <li key={i} className="flex items-baseline gap-4 border-b border-border/70 pb-3">
              <span className="font-display text-2xl italic leading-none text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function OurStoryPage() {
  const { story } = couple;
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="About the couple"
        title="Our Story"
        script="two stories, one journey"
        intro={story.text}
      />

      <div className="mt-20 space-y-24">
        <PersonSection person={couple.bride} />
        <Ornament label="#SaRang" />
        <PersonSection person={couple.groom} reverse />
      </div>

      <section className="reveal mt-28" aria-labelledby="prewed-h">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Saniya & Raghav, together</p>
          <h2 id="prewed-h" className="mt-2 text-4xl text-primary-deep sm:text-5xl">Pre-wedding moments</h2>
          <Ornament className="mt-5" />
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-4">
          {story.preWeddingPhotos.map((p, i) => (
            <PhotoSlot key={i} slot={p} fill variant="frame" className={preWeddingSpans[i % preWeddingSpans.length]} />
          ))}
        </div>
      </section>

      <section className="reveal mt-24" aria-labelledby="film-h">
        <h2 id="film-h" className="text-center text-3xl text-primary-deep">Pre-wedding film</h2>
        <div className="frame mx-auto mt-6 max-w-3xl">
          {story.videoEmbedUrl ? (
            <iframe
              src={story.videoEmbedUrl}
              title="Saniya & Raghav pre-wedding film"
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="placeholder-surface flex aspect-video flex-col items-center justify-center gap-3 text-center">
              <Film className="size-7 text-gold-deep" aria-hidden="true" />
              <p className="font-display text-xl">Pre-wedding Video Coming Soon</p>
              <p className="text-xs text-muted-foreground">The video will be added here later.</p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
