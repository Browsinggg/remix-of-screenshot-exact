import { createFileRoute } from "@tanstack/react-router";
import { Camera, ExternalLink, QrCode, Upload } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Monogram } from "@/components/site/Monogram";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { rolocam } from "@/config/wedding";

export const Route = createFileRoute("/capture")({
  head: () => ({
    meta: [
      { title: "Capture the Moments · RoloCam · #SaRang" },
      { name: "description", content: "Share your candid photos and videos from Saniya & Raghav's wedding on our RoloCam album." },
      { property: "og:title", content: "Capture the Moments · #SaRang" },
      { property: "og:description", content: "Scan, snap and share your candid moments with the couple." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CapturePage,
});

const steps = [
  { Icon: QrCode, title: "Scan or tap", text: "Scan the QR code with your phone camera, or tap the button below." },
  { Icon: Camera, title: "Snap away", text: "RoloCam opens in your browser — capture candid photos and short videos." },
  { Icon: Upload, title: "It's shared", text: "Your shots go straight to the couple's album, like a disposable camera." },
];

function CapturePage() {
  const ready = Boolean(rolocam.albumUrl);
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Disposable camera"
        title="Capture the Moments"
        script="every candid moment counts"
        intro="Be our wedding photographer! Capture the laughter, the dancing and the little moments the cameras might miss."
      />

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 md:grid-cols-2">
        {/* Camera-print card */}
        <div className="mx-auto w-full max-w-xs">
          <div className="polaroid rotate-[-2deg]">
            <div className="flex aspect-square items-center justify-center bg-paper p-6">
              {ready ? (
                <QRCodeSVG value={rolocam.albumUrl} size={220} level="M" bgColor="transparent" fgColor="currentColor" className="h-full w-full text-foreground" title="RoloCam album QR code" />
              ) : (
                <div className="placeholder-surface flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                  <QrCode className="size-10 text-gold-deep" aria-hidden="true" />
                  <p className="font-display text-lg leading-tight">QR code coming soon</p>
                  <p className="text-xs text-muted-foreground">It will appear once the RoloCam album is set up.</p>
                </div>
              )}
            </div>
            <div className="pt-3 text-center">
              <Monogram size="sm" />
            </div>
          </div>
        </div>

        <div>
          <ol className="space-y-6">
            {steps.map(({ Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-xl">{i + 1}. {title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 space-y-3">
            {ready ? (
              <Button asChild variant="rose" size="xl" className="w-full">
                <a href={rolocam.albumUrl} target="_blank" rel="noopener noreferrer"><Camera /> Open RoloCam <ExternalLink /></a>
              </Button>
            ) : (
              <Button variant="rose" size="xl" className="w-full" disabled>
                <Camera /> RoloCam album coming soon
              </Button>
            )}
            <p className="text-center text-xs text-muted-foreground">
              On your phone? Just tap the button to open the album. The same QR code will also be displayed at all the wedding venues.
            </p>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">For Saniya & Raghav</p>
            {rolocam.adminGalleryUrl ? (
              <Button asChild variant="link"><a href={rolocam.adminGalleryUrl} target="_blank" rel="noopener noreferrer">Open RoloCam admin gallery</a></Button>
            ) : (
              <p className="mt-1 text-sm italic text-muted-foreground">Admin gallery link to be added</p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
