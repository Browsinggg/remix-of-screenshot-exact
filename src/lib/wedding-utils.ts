import type { WeddingEvent } from "@/config/wedding";

/** Google Maps search link from a venue name + area (no invented coordinates). */
export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** "2026-12-09T19:30:00+05:30" → "20261209T140000Z" (UTC, as Google Calendar expects) */
export function toCalendarStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(event: WeddingEvent, hashtag = "#SaRang"): string {
  const start = new Date(event.startsAt);
  const end = new Date(start.getTime() + event.calendarHours * 60 * 60 * 1000);
  const details = [
    event.description,
    "",
    ...event.timings.map((t) => `${t.label}: ${t.time} (IST)`),
    "",
    hashtag,
  ].join("\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.name} · Saniya & Raghav ${hashtag}`,
    dates: `${toCalendarStamp(start)}/${toCalendarStamp(end)}`,
    ctz: "Asia/Kolkata",
    details,
    location: `${event.venueName}, ${event.venueArea}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Indian 10-digit mobile → +91 E.164 digits (no plus) */
export function indianE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return `91${local}`;
}

export function telLink(phone: string): string {
  return `tel:+${indianE164(phone)}`;
}

export function whatsappLink(phone: string, text?: string): string {
  const base = `https://wa.me/${indianE164(phone)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** "9820046549" → "+91 98200 46549" */
export function formatIndianPhone(phone: string): string {
  const d = indianE164(phone).slice(2);
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function countdownParts(target: Date, now: Date): CountdownParts {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: diff === 0,
  };
}

/** True when a config value is still a "[ ... ]" placeholder */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[") || value.trim() === "";
}

export type VideoSource =
  | { kind: "none" }
  | { kind: "youtube"; id: string; embedUrl: string; thumbUrl: string }
  | { kind: "vimeo"; id: string; embedUrl: string }
  | { kind: "file"; src: string };

/** Works out how to play the invitation video from whatever link was pasted. */
export function parseVideoUrl(url: string): VideoSource {
  const u = url.trim();
  if (!u) return { kind: "none" };
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt?.[1]) {
    const id = yt[1];
    return {
      kind: "youtube",
      id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`,
      thumbUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm?.[1]) {
    return { kind: "vimeo", id: vm[1], embedUrl: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };
  }
  return { kind: "file", src: u };
}
