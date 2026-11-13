import { z } from "zod";

/** Shared, browser-safe form rules — the server re-checks with the same schemas. */

const name = z.string().trim().min(2, "Please enter a name").max(80);
const indianMobile = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(\+?91)?[6-9]\d{9}$/.test(v), "Please enter a valid 10-digit mobile number");

export const FUNCTION_IDS = ["sagai-sangeet", "haldi", "wedding"] as const;

export const rsvpSchema = z
  .object({
    submissionId: z.string().uuid(),
    guestName: name,
    familyName: name,
    contact: indianMobile,
    adults: z.coerce.number().int().min(0).max(30),
    children: z.coerce.number().int().min(0).max(30),
    attending: z.enum(["yes", "no"]),
    functions: z.array(z.enum(FUNCTION_IDS)),
    confirm: z.literal(true, { errorMap: () => ({ message: "Please confirm your RSVP" }) }),
  })
  .superRefine((v, ctx) => {
    if (v.attending === "yes" && v.adults + v.children < 1) {
      ctx.addIssue({ code: "custom", path: ["adults"], message: "At least one person must attend" });
    }
    if (v.attending === "yes" && v.functions.length === 0) {
      ctx.addIssue({ code: "custom", path: ["functions"], message: "Choose at least one function" });
    }
  });
export type RsvpInput = z.input<typeof rsvpSchema>;

export function totalAttendees(adults: number, children: number): number {
  const a = Number.isFinite(adults) ? Math.max(0, Math.floor(adults)) : 0;
  const c = Number.isFinite(children) ? Math.max(0, Math.floor(children)) : 0;
  return a + c;
}

export const memorySchema = z.object({
  submissionId: z.string().uuid(),
  guestName: name,
  message: z.string().trim().min(5, "Please write a few words").max(2000),
});
export type MemoryInput = z.input<typeof memorySchema>;

/** Result shape every submission returns to the browser. */
export type SubmitResult =
  | { ok: true; message?: string | undefined }
  | { ok: false; code: "not_configured" | "duplicate" | "invalid" | "failed"; message: string };
