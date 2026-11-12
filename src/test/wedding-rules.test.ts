import { describe, expect, it } from "vitest";

import { contacts, events, wedding } from "@/config/wedding";
import { checkSchema, rsvpSchema, totalAttendees } from "@/lib/forms";
import { googleCalendarUrl, telLink, whatsappLink } from "@/lib/wedding-utils";

const baseRsvp = {
  submissionId: "3b241101-e2bb-4255-8caf-4136c566a962",
  guestName: "Test Guest",
  familyName: "Test Family",
  contact: "9820046549",
  adults: 2,
  children: 1,
  attending: "yes" as const,
  functions: ["wedding"],
  diet: "Jain" as const,
  dietNotes: "",
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
    expect(telLink(contacts[0]!.phone)).toBe("tel:+919820046549");
    expect(whatsappLink("9811407991")).toBe("https://wa.me/919811407991");
  });

  it("RSVP requires the confirmation tick", () => {
    expect(rsvpSchema.safeParse({ ...baseRsvp, confirm: false }).success).toBe(false);
    expect(rsvpSchema.safeParse(baseRsvp).success).toBe(true);
  });

  it("check-in requires a hotel as well as a room number", () => {
    expect(checkSchema.safeParse({ hotelId: "", hotelName: "", room: "204", action: "check-in" }).success).toBe(false);
  });
});
