import { createFileRoute } from "@tanstack/react-router";
import { Film, Sparkles } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Ornament } from "@/components/site/Ornament";
import { couple } from "@/config/wedding";

export const Route = createFileRoute("/couple")({
  head: () => ({
    meta: [
      { title: "The Couple · Saniya & Raghav · #SaRang" },
      { name: "description", content: "Meet the bride Saniya and the groom Raghav, and see their story together." },
      { property: "og:title", content: "Meet Saniya & Raghav · #SaRang" },
      { property: "og:description", content: "The bride, the groom and their story together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CouplePage,
});

type Person = (typeof couple)["bride"] | (typeof couple)["groom"];

function PersonSection({ person, reverse }: { person: Person; reverse?: boolean }) {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2" aria-labelledby={`${person.name}-h`}>
      <div className={reverse ? "md:order-2" : ""}>
        <div className="grid grid-cols-3 gap-3">
          {person.photos.map((p, i) => (
            <PhotoSlot key={i} slot={p} tilt={[-3, 2, -1][i % 3]} />
          ))}
        </div>
      </div>
      <div className="text-center md:text-left">
        <p className="eyebrow">{person.title}</p>
        <h2 id={`${person.name}-h`} className="mt-2 font-script text-6xl text-primary">{person.name}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{person.bio}</p>
        <h3 className="mt-8 flex items-center justify-center gap-2 text-2xl text-foreground md:justify-start">
          <Sparkles className="size-4 text-gold-deep" aria-hidden="true" /> Fun facts
        </h3>
        <ul className="mt-3 space-y-2 text-muted-foreground">
          {person.funFacts.map((f, i) => (
            <li key={i} className="border-b border-border/60 pb-2">{f}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CouplePage() {
  const { story } = couple;
  return (
    <PageShell>
      <SectionHeading as="h1" eyebrow="Meet the couple" title="Saniya & Raghav" script="two stories, one journey" />

      <div className="mt-16 space-y-20">
        <PersonSection person={couple.bride} />
        <Ornament label="#SaRang" />
        <PersonSection person={couple.groom} reverse />
      </div>

      <section className="mt-24" aria-labelledby="story-h">
        <SectionHeading eyebrow="Their story" title="Saniya & Raghav, Together" intro={story.text} />

        <h3 className="mt-14 text-center text-2xl">Pre-wedding moments</h3>
        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
          {story.preWeddingPhotos.map((p, i) => (
            <PhotoSlot key={i} slot={p} tilt={[-2, 1.5, -1][i % 3]} />
          ))}
        </div>

        <h3 className="mt-14 text-center text-2xl">The couple</h3>
        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {story.couplePhotos.map((p, i) => (
            <PhotoSlot key={i} slot={p} tilt={[1.5, -2, 2, -1][i % 4]} />
          ))}
        </div>

        <h3 className="mt-14 text-center text-2xl">Pre-wedding film</h3>
        <div className="invite-card mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl p-3">
          {story.videoEmbedUrl ? (
            <iframe
              src={story.videoEmbedUrl}
              title="Saniya & Raghav pre-wedding film"
              className="aspect-video w-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="placeholder-surface flex aspect-video flex-col items-center justify-center gap-3 rounded-lg text-center">
              <Film className="size-8 text-gold-deep" aria-hidden="true" />
              <p className="font-display text-xl">Pre-wedding Video Coming Soon</p>
              <p className="text-xs text-muted-foreground">The video will be added here later.</p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
