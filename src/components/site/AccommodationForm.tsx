import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { hotels } from "@/config/wedding";
import { useSubmissionId } from "@/hooks/use-submission-id";
import { accommodationSchema, type AccommodationInput, type SubmitResult } from "@/lib/forms";
import { submitAccommodation } from "@/lib/sheets.functions";
import { Field, issuesToErrors, selectClass, type FieldErrors } from "./Field";
import { FormNotice } from "./FormNotice";

const NOT_SURE = "Not sure yet / to be allocated";

export function AccommodationForm() {
  const send = useServerFn(submitAccommodation);
  const [submissionId, renewId] = useSubmissionId();
  const [v, setV] = useState({ guestName: "", familyName: "", people: 2, hotel: NOT_SURE, arrival: "", departure: "", notes: "" });
  const [errors, setErrors] = useState<FieldErrors<AccommodationInput>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((p) => ({ ...p, [k]: val }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pending) return;
    const values = { ...v, submissionId };
    const parsed = accommodationSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(issuesToErrors<AccommodationInput>(parsed.error.issues));
      return;
    }
    setErrors({});
    setPending(true);
    setResult(null);
    try {
      setResult(await send({ data: values }));
    } catch (err) {
      console.error(err);
      setResult({ ok: false, code: "failed", message: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  };

  if (result?.ok || (result && !result.ok && result.code === "duplicate")) {
    return (
      <div className="invite-card rounded-2xl p-8 text-center">
        <h3 className="text-3xl text-primary-deep">Thank you, {v.guestName}!</h3>
        <p className="mt-3 text-muted-foreground">We've noted your stay details and will be in touch with your hotel information.</p>
        <Button variant="link" className="mt-4" onClick={() => { setResult(null); renewId(); setV((p) => ({ ...p, guestName: "", familyName: "", notes: "" })); }}>
          Submit for another family
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="invite-card space-y-5 rounded-2xl p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="acc-name" label="Your name" error={errors.guestName}>
          <Input id="acc-name" autoComplete="name" value={v.guestName} onChange={(e) => set("guestName", e.target.value)} aria-invalid={!!errors.guestName} />
        </Field>
        <Field id="acc-family" label="Family name" error={errors.familyName}>
          <Input id="acc-family" value={v.familyName} onChange={(e) => set("familyName", e.target.value)} aria-invalid={!!errors.familyName} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="acc-people" label="People needing a room" error={errors.people}>
          <Input id="acc-people" type="number" inputMode="numeric" min={1} max={30} value={v.people} onChange={(e) => set("people", Number(e.target.value))} aria-invalid={!!errors.people} />
        </Field>
        <Field id="acc-hotel" label="Hotel (if allocated)" error={errors.hotel}>
          <select id="acc-hotel" className={selectClass} value={v.hotel} onChange={(e) => set("hotel", e.target.value)}>
            <option>{NOT_SURE}</option>
            {hotels.map((h) => (
              <option key={h.id} value={h.confirmed ? h.name : h.label}>{h.confirmed ? h.name : h.label}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="acc-arrival" label="Planned arrival" error={errors.arrival} hint="Date & time (IST)">
          <Input id="acc-arrival" type="datetime-local" min="2026-12-01T00:00" max="2026-12-15T23:59" value={v.arrival} onChange={(e) => set("arrival", e.target.value)} aria-invalid={!!errors.arrival} />
        </Field>
        <Field id="acc-departure" label="Planned departure" error={errors.departure} hint="Date & time (IST)">
          <Input id="acc-departure" type="datetime-local" min="2026-12-01T00:00" max="2026-12-20T23:59" value={v.departure} onChange={(e) => set("departure", e.target.value)} aria-invalid={!!errors.departure} />
        </Field>
      </div>
      <Field id="acc-notes" label="Additional requirements" optional>
        <Textarea id="acc-notes" rows={3} value={v.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Ground-floor room, extra bed, airport/station pickup…" />
      </Field>
      {result && !result.ok && (
        <FormNotice tone={result.code === "not_configured" ? "pending" : "error"} title={result.code === "not_configured" ? "Stay requests open soon" : "We couldn't send your details"}>
          {result.message}
        </FormNotice>
      )}
      <Button type="submit" variant="rose" size="xl" className="w-full" disabled={pending || !submissionId}>
        {pending ? (<><Loader2 className="animate-spin" /> Sending…</>) : "Send stay details"}
      </Button>
    </form>
  );
}
