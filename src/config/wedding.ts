/**
 * ─────────────────────────────────────────────────────────────
 *  #SaRang — CENTRAL WEDDING CONTENT
 *  Edit this one file to update names, dates, events, hotels,
 *  contacts, links and photo slots across the whole website.
 *
 *  • Text in "[ ... ]" square brackets is a PLACEHOLDER that
 *    still needs real information.
 *  • Leave a link as "" (empty) until the real one is ready —
 *    the website then shows a "coming soon" label instead.
 *  • All times are Indian Standard Time (IST, +05:30).
 * ─────────────────────────────────────────────────────────────
 */

export const wedding = {
  hashtag: "#SaRang",
  projectTitle: "#SaRang – Saniya & Raghav's Wedding",
  bride: "Saniya",
  groom: "Raghav",
  families: "Goel & Gupta Family",
  weddingDateLabel: "9 December 2026",
  city: "Roorkee",

  /** Countdown target — Baraat reception. Change this to move the countdown. */
  countdownTarget: "2026-12-09T19:30:00+05:30",
  countdownLabel: "until the Baraat arrives",

  welcomeShort:
    "With joyous hearts, the Goel and Gupta families welcome you to celebrate the union of Saniya and Raghav.",
  welcomeLong:
    "Two families, one celebration. We would be honoured to have you with us in Roorkee as Saniya and Raghav begin their journey together. This little website holds everything you need — the functions, your stay, and a place to leave your blessings.",

  /** RSVP deadline shown on the RSVP page. */
  rsvpDeadline: "[RSVP deadline to be announced]",

  /** Digital invitation artwork. Paste an image URL here once uploaded. */
  invitationImageUrl: "",
} as const;

/* ───────────────────────── EVENTS ───────────────────────── */

export type WeddingEvent = {
  id: "sagai-sangeet" | "haldi" | "wedding";
  name: string;
  tagline: string;
  dayLabel: string;
  dateLabel: string;
  /** Each line shown under the date, e.g. "Baraat reception — 7:30 PM" */
  timings: { label: string; time: string }[];
  /** Start of the function, in IST. Used for the Google Calendar button. */
  startsAt: string;
  /**
   * Length used ONLY for the calendar entry (no end time has been announced).
   * Adjust freely.
   */
  calendarHours: number;
  venueName: string;
  venueArea: string;
  description: string;
  /** Visual theme for the card */
  tone: "rose" | "gold" | "maroon";
};

export const events: WeddingEvent[] = [
  {
    id: "sagai-sangeet",
    name: "Sagai & Sangeet",
    tagline: "Rings, rhythm & revelry",
    dayLabel: "Tuesday",
    dateLabel: "8 December 2026",
    timings: [
      { label: "Celebrations begin", time: "5:30 PM onwards" },
      { label: "Dinner", time: "To follow" },
    ],
    startsAt: "2026-12-08T17:30:00+05:30",
    calendarHours: 5,
    venueName: "Hotel Sarovar Portico",
    venueArea: "Haridwar Road, Roorkee",
    description:
      "An evening of the ring ceremony followed by music and dance as both families come together. Dinner will follow.",
    tone: "rose",
  },
  {
    id: "haldi",
    name: "Haldi",
    tagline: "A morning dipped in turmeric",
    dayLabel: "Wednesday",
    dateLabel: "9 December 2026",
    timings: [
      { label: "Ceremony begins", time: "10:30 AM onwards" },
      { label: "Lunch", time: "To follow" },
    ],
    startsAt: "2026-12-09T10:30:00+05:30",
    calendarHours: 3,
    venueName: "Hotel Sarovar Portico",
    venueArea: "Haridwar Road, Roorkee",
    description:
      "A joyful, colourful morning of blessings with haldi for the couple. Lunch will follow.",
    tone: "gold",
  },
  {
    id: "wedding",
    name: "Wedding",
    tagline: "Saniya weds Raghav",
    dayLabel: "Wednesday",
    dateLabel: "9 December 2026",
    timings: [
      { label: "Baraat reception", time: "7:30 PM" },
      { label: "Varmala & Dinner", time: "8:00 PM" },
    ],
    startsAt: "2026-12-09T19:30:00+05:30",
    calendarHours: 5,
    venueName: "The Kailasha Resort",
    venueArea: "Haridwar Road, Roorkee",
    description:
      "The Baraat arrives, garlands are exchanged and two families become one. Dinner will be served.",
    tone: "maroon",
  },
];

/* ───────────────────────── HOTELS ─────────────────────────
 * Replace each "[ ... ]" with the real details once confirmed.
 * Leave mapsUrl "" until known — a Maps search on the name is used
 * automatically once the name is filled in.
 */

export type Hotel = {
  id: string;
  /** Short label used in dropdowns until the real name is known */
  label: string;
  name: string;
  address: string;
  mapsUrl: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  transport: string;
  notes: string;
  /** Set to true once real details are filled in */
  confirmed: boolean;
};

export const hotels: Hotel[] = [1, 2, 3].map((n) => ({
  id: `hotel-${n}`,
  label: `Hotel ${n}`,
  name: `Hotel ${n} – Details Coming Soon`,
  address: "[Hotel address to be added]",
  mapsUrl: "",
  contact: "[Contact number to be added]",
  checkIn: "[Check-in time to be added]",
  checkOut: "[Check-out time to be added]",
  transport: "[Transport / pickup details to be added]",
  notes: "[Any additional instructions to be added]",
  confirmed: false,
}));

/* ───────────────────────── CONTACTS ───────────────────────── */

export const contacts = [
  { name: "Poneet Gupta", phone: "9820046549" },
  { name: "Vikas Gupta (Vicky)", phone: "9811407991" },
  { name: "Shourya Goel", phone: "9557310364" },
];

/* ───────────────────────── FAMILY ───────────────────────── */

export const family = {
  compliments: "Goel & Gupta Family",
  grandparents: [
    "Smt. Kaushal Goel (W/o Sh. Ajay Goel)",
    "Smt. Rani Gupta (W/o Late Sh. Satnarayan Gupta)",
  ],
  brideParents: "Smt. Shefali & Sh. Sudhanshu Goel",
  groomParents: "Smt. Mohita & Sh. Pankaj Gupta",
};

/* ───────────────────────── ROLOCAM ─────────────────────────
 * Paste the real RoloCam album link here. The QR code on the
 * "Capture" page is generated automatically from it.
 */

export const rolocam = {
  albumUrl: "",
  adminGalleryUrl: "",
};

/* ───────────────────────── THE COUPLE ─────────────────────────
 * Photo slots: paste an image URL into `src` to replace a placeholder.
 */

export type PhotoSlot = { label: string; src: string; alt: string };

const slots = (label: string, count: number): PhotoSlot[] =>
  Array.from({ length: count }, (_, i) => ({
    label: `${label}${count > 1 ? ` ${i + 1}` : ""}`,
    src: "",
    alt: "",
  }));

export const couple = {
  bride: {
    name: "Saniya",
    title: "The Bride",
    bio: "[A short biography of Saniya — to be written by the family.]",
    funFacts: ["[Fun fact about Saniya]", "[Fun fact about Saniya]", "[Fun fact about Saniya]"],
    photos: slots("Upload Saniya's Childhood Photograph", 3),
  },
  groom: {
    name: "Raghav",
    title: "The Groom",
    bio: "[A short biography of Raghav — to be written by the family.]",
    funFacts: ["[Fun fact about Raghav]", "[Fun fact about Raghav]", "[Fun fact about Raghav]"],
    photos: slots("Upload Raghav's Childhood Photograph", 3),
  },
  story: {
    text: "[Saniya & Raghav's story — how they met, to be added.]",
    preWeddingPhotos: slots("Upload Pre-wedding Photograph", 3),
    couplePhotos: slots("Upload Couple Photograph", 4),
    /** YouTube / Vimeo embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID */
    videoEmbedUrl: "",
  },
};
