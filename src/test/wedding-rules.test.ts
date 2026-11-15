import { describe, expect, it } from "vitest";

import { contacts, events, wedding } from "@/config/wedding";
import { rsvpSchema, totalAttendees } from "@/lib/forms";
import { googleCalendarUrl, parseVideoUrl, telLink, whatsappLink } from "@/lib/wedding-utils";

const baseRsvp = {
  submissionId: "3b241101-e2bb-4255-8caf-4136c566a962",
  guestName: "Test Guest",
  familyName: "Test Family",
  contact: "9820046549",
  adults: 2,
  children: 1,
  attending: "yes" as const,
  functions: ["wedding"],
  confirm: true as const,
};

describe("wedding rules", () => {
  it("total attendees is adults plus children", () => {
    expect(totalAttendees(2, 3)).toBe(5);
  });

  it("countdown targets 9 Dec 2026, 7:30 PM IST", () => {
    expect(new Date(wedding.countdownTarget).toISOString()).toBe("2026-12-09T14:00:00.000Z");
  });

  it("wedding calendar link starts at 7:30 PM IST (14:00 UTC)", () => {
    const w = events.find((e) => e.id === "wedding")!;
    expect(googleCalendarUrl(w)).toContain("dates=20261209T140000Z");
  });

  it("phone and WhatsApp links use +91", () => {
    expect(telLink("9820046549")).toBe("tel:+919820046549");
    expect(whatsappLink("9811407991")).toBe("https://wa.me/919811407991");
  });

  it("RSVP requires the confirmation tick", () => {
    expect(rsvpSchema.safeParse({ ...baseRsvp, confirm: false }).success).toBe(false);
    expect(rsvpSchema.safeParse(baseRsvp).success).toBe(true);
  });

  it("contacts appear in the order Shourya, Vikas, Poneet with unchanged numbers", () => {
    expect(contacts).toEqual([
      { name: "Shourya Goel", phone: "9557310364" },
      { name: "Vikas Gupta (Vicky)", phone: "9811407991" },
      { name: "Poneet Gupta", phone: "9820046549" },
    ]);
  });

  it("RSVP no longer collects dietary preferences", () => {
    const parsed = rsvpSchema.parse({ ...baseRsvp, diet: "Jain", dietNotes: "no onion" });
    expect(parsed).not.toHaveProperty("diet");
    expect(parsed).not.toHaveProperty("dietNotes");
  });

  it("invitation video links: YouTube becomes an embed, files play directly, empty shows placeholder", () => {
    expect(parseVideoUrl("https://youtu.be/abcDEF12345")).toMatchObject({ kind: "youtube", id: "abcDEF12345" });
    expect(parseVideoUrl("https://example.com/invite.mp4")).toEqual({ kind: "file", src: "https://example.com/invite.mp4" });
    expect(parseVideoUrl("")).toEqual({ kind: "none" });
  });
});
