import { Film, Play } from "lucide-react";
import { useRef, useState } from "react";

import { invitation, wedding } from "@/config/wedding";
import { parseVideoUrl } from "@/lib/wedding-utils";
import { Monogram } from "./Monogram";

/**
 * Click-to-play video invitation. Uploaded video files keep their own original
 * shape; YouTube / Vimeo links and the "coming soon" frame use `invitation.aspectRatio`.
 */
export function InvitationVideo() {
  const source = parseVideoUrl(invitation.videoUrl);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const title = `${wedding.bride} & ${wedding.groom}'s video invitation`;
  const [w = 16, h = 9] = invitation.aspectRatio.split("/").map((n) => Number(n.trim()) || 0);
  const portrait = w > 0 && h > 0 && w / h < 1;

  const PlayBadge = (
    <span className="flex flex-col items-center gap-3">
      <span className="animate-soft-glow flex size-20 items-center justify-center rounded-full border border-gold bg-paper/90 text-primary shadow-[var(--shadow-rose)] transition-transform group-hover:scale-105 sm:size-24">
        <Play className="ml-1 size-8 fill-current sm:size-9" aria-hidden="true" />
      </span>
      <span className="rounded-full bg-paper/90 px-4 py-1 text-xs uppercase tracking-[0.25em] text-foreground">Tap to play</span>
    </span>
  );

  if (source.kind === "none") {
    return (
      <div className={portrait ? "mx-auto max-w-sm" : "mx-auto max-w-3xl"}>
        <div className="invite-card rounded-2xl p-3">
          <div
            className="placeholder-surface relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-8 text-center"
            style={{ aspectRatio: invitation.aspectRatio }}
          >
            {invitation.posterUrl && (
              <img src={invitation.posterUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            )}
            <div className="relative flex flex-col items-center">
              <Monogram size="lg" />
              <span className="mt-8 flex size-16 items-center justify-center rounded-full border border-gold/70 text-gold-deep">
                <Film className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-2xl text-foreground">Video Invitation Coming Soon</p>
              <p className="mt-2 max-w-[24ch] text-sm text-muted-foreground">Our invitation video will be shared here shortly.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (source.kind === "file") {
    return (
      <div className="mx-auto w-fit max-w-full">
        <div className="invite-card rounded-2xl p-3">
          <div className="relative overflow-hidden rounded-xl bg-foreground/5">
            <video
              ref={videoRef}
              src={`${source.src}${invitation.posterUrl ? "" : "#t=0.1"}`}
              poster={invitation.posterUrl || undefined}
              preload="metadata"
              playsInline
              controls={playing}
              aria-label={title}
              onPlay={() => setPlaying(true)}
              className="mx-auto block h-auto max-h-[80svh] w-auto max-w-full"
            />
            {!playing && (
              <button
                type="button"
                className="group absolute inset-0 flex items-center justify-center bg-foreground/10"
                onClick={() => {
                  setPlaying(true);
                  void videoRef.current?.play();
                }}
                aria-label={`Play ${title}`}
              >
                {PlayBadge}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // YouTube / Vimeo
  const thumb = invitation.posterUrl || (source.kind === "youtube" ? source.thumbUrl : "");
  return (
    <div className={portrait ? "mx-auto max-w-sm" : "mx-auto max-w-3xl"}>
      <div className="invite-card rounded-2xl p-3">
        <div className="relative overflow-hidden rounded-xl bg-foreground/5" style={{ aspectRatio: invitation.aspectRatio }}>
          {playing ? (
            <iframe
              src={source.embedUrl}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="group absolute inset-0 flex items-center justify-center"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${title}`}
            >
              {thumb && <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover" />}
              <span className="relative">{PlayBadge}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
