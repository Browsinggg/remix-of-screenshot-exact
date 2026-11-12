import { createServerFn } from "@tanstack/react-start";

import {
  accommodationSchema,
  checkSchema,
  memorySchema,
  rsvpSchema,
  totalAttendees,
  type SubmitResult,
} from "./forms";
import { postToAppsScript } from "./sheets.server";

/**
 * Public guest submissions. Each one re-validates on the server, then forwards
 * to Google Sheets via Apps Script. Timestamps are created by Apps Script in
 * Asia/Kolkata — never taken from the guest's phone.
 */

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => rsvpSchema.parse(d))
  .handler(async ({ data }): Promise<SubmitResult> => {
    const attending = data.attending === "yes";
    return postToAppsScript("rsvp", {
      ...data,
      adults: attending ? data.adults : 0,
      children: attending ? data.children : 0,
      total: attending ? totalAttendees(data.adults, data.children) : 0,
      functions: attending ? data.functions : [],
    });
  });

export const submitAccommodation = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => accommodationSchema.parse(d))
  .handler(async ({ data }): Promise<SubmitResult> => postToAppsScript("accommodation", data));

export const submitCheck = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => checkSchema.parse(d))
  .handler(async ({ data }): Promise<SubmitResult> =>
    postToAppsScript("check", { ...data, room: data.room.toUpperCase() }),
  );

export const submitMemory = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => memorySchema.parse(d))
  .handler(async ({ data }): Promise<SubmitResult> => postToAppsScript("memory", data));
