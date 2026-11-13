import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Minus, Plus } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { Field, issuesToErrors, type FieldErrors } from "@/components/site/Field";
import { FormNotice } from "@/components/site/FormNotice";
import { Monogram } from "@/components/site/Monogram";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { events, wedding } from "@/config/wedding";
import { useSubmissionId } from "@/hooks/use-submission-id";
import { rsvpSchema, totalAttendees, type RsvpInput, type SubmitResult } from "@/lib/forms";
import { submitRsvp } from "@/lib/sheets.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rsvp")({
  head: () => ({
    meta: [
      { title: "RSVP · Saniya & Raghav · #SaRang" },
      { name: "description", content: "Let the Goel & Gupta families know if you'll join the celebrations." },
      { property: "og:title", content: "RSVP · #SaRang" },
      { property: "og:description", content: "Kindly let us know which functions you'll attend." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RsvpPage,
});

const DONE_KEY = "sarang-rsvp-done";
type FunctionId = (typeof events)[number]["id"];

function Counter({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="space-y-2">
      <span id={`${id}-label`} className="text-sm font-medium">{label}</span>
      <div className="flex h-11 items-center justify-between rounded-md border border-input bg-paper px-1" role="group" aria-labelledby={`${id}-label`}>
        <Button type="button" variant="quiet" size="icon" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => onChange(Math.max(0, value - 1))}>
          <Minus />
        </Button>
        <span className="font-display text-2xl tabular-nums" aria-live="polite">{value}</span>
        <Button type="button" variant="quiet" size="icon" aria-label={`More ${label.toLowerCase()}`} onClick={() => onChange(Math.min(30, value + 1))}>
          <Plus />
        </Button>
      </div>
    </div>
  );
}

function RsvpPage() {
  const send = useServerFn(submitRsvp);
  const [submissionId, renewId] = useSubmissionId();
  const [guestName, setGuestName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [contact, setContact] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [functions, setFunctions] = useState<FunctionId[]>(events.map((e) => e.id));
  const [confirm, setConfirm] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<RsvpInput>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [doneName, setDoneName] = useState<string | null>(null);

  useEffect(() => {
    setDoneName(localStorage.getItem(DONE_KEY));
  }, []);

  const total = totalAttendees(adults, children);

  const toggleFn = (id: FunctionId, on: boolean) =>
    setFunctions((prev) => (on ? [...new Set([...prev, id])] : prev.filter((f) => f !== id)));

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (pending) return;
    const values = { submissionId, guestName, familyName, contact, adults, children, attending, functions, confirm };
    const parsed = rsvpSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(issuesToErrors<RsvpInput>(parsed.error.issues));
      setResult(null);
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setErrors({});
    setPending(true);
    setResult(null);
    try {
      const res = await send({ data: values });
      setResult(res);
      if (res.ok || res.code === "duplicate") {
        localStorage.setItem(DONE_KEY, guestName);
        setDoneName(guestName);
      }
    } catch (err) {
      console.error(err);
      setResult({ ok: false, code: "failed", message: "Something went wrong. Please check your details and try again." });
    } finally {
      setPending(false);
    }
  };

  const startAnother = () => {
    localStorage.removeItem(DONE_KEY);
    setDoneName(null);
    setResult(null);
    setGuestName("");
    setFamilyName("");
    setContact("");
    setConfirm(false);
    renewId();
  };

  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Répondez s'il vous plaît"
        title="RSVP"
        script="we'd love to have you"
        intro="One response per family is perfect. It only takes a minute."
      />
      <p className="mx-auto mt-6 w-fit rounded-full border border-gold/60 bg-paper px-5 py-2 text-center text-sm">
        Kindly respond by <span className="font-medium text-primary-deep">{wedding.rsvpDeadline}</span>
      </p>

      <div className="mx-auto mt-10 max-w-xl">
        {doneName ? (
          <div className="invite-card rounded-2xl px-6 py-12 text-center">
            <Monogram size="lg" />
            <h2 className="mt-6 text-3xl text-primary-deep">Thank you, {doneName}!</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Your RSVP has been received with love. We can't wait to celebrate with you.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Button asChild variant="rose" size="lg"><Link to="/memories">Leave a memory for the couple</Link></Button>
              <Button variant="link" onClick={startAnother}>Submit a response for another family</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="invite-card space-y-6 rounded-2xl p-6 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="guestName" label="Your name" error={errors.guestName}>
                <Input id="guestName" autoComplete="name" value={guestName} onChange={(e) => setGuestName(e.target.value)} aria-invalid={!!errors.guestName} />
              </Field>
              <Field id="familyName" label="Family name" error={errors.familyName} hint="e.g. Sharma Family">
                <Input id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} aria-invalid={!!errors.familyName} />
              </Field>
            </div>
            <Field id="contact" label="Mobile number" error={errors.contact} hint="10-digit Indian mobile number">
              <Input id="contact" type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" value={contact} onChange={(e) => setContact(e.target.value)} aria-invalid={!!errors.contact} />
            </Field>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Will you be joining us?</legend>
              <div className="grid grid-cols-2 gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAttending(v)}
                    aria-pressed={attending === v}
                    className={cn(
                      "rounded-md border px-3 py-3 font-display text-lg transition-colors",
                      attending === v ? "border-primary bg-primary text-primary-foreground" : "border-input bg-paper hover:border-primary",
                    )}
                  >
                    {v === "yes" ? "Joyfully accept" : "Regretfully decline"}
                  </button>
                ))}
              </div>
            </fieldset>

            {attending === "yes" && (
              <>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <Counter id="adults" label="Adults" value={adults} onChange={setAdults} />
                    <Counter id="children" label="Children" value={children} onChange={setChildren} />
                  </div>
                  {errors.adults && <p className="mt-2 text-xs text-destructive">{errors.adults}</p>}
                  <p className="mt-3 rounded-md bg-secondary px-4 py-2 text-center text-sm">
                    Total attending: <span className="font-display text-xl text-primary-deep">{total}</span>
                  </p>
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium">Which functions will you attend?</legend>
                  {events.map((e) => (
                    <label key={e.id} htmlFor={`fn-${e.id}`} className="flex cursor-pointer items-center gap-3 rounded-md border border-input bg-paper px-4 py-3">
                      <Checkbox id={`fn-${e.id}`} checked={functions.includes(e.id)} onCheckedChange={(c) => toggleFn(e.id, c === true)} className="size-5" />
                      <span className="flex-1">
                        <span className="block font-display text-lg leading-tight">{e.name}</span>
                        <span className="text-xs text-muted-foreground">{e.dayLabel}, {e.dateLabel} · {e.timings[0]?.time}</span>
                      </span>
                    </label>
                  ))}
                  {errors.functions && <p className="text-xs text-destructive">{errors.functions}</p>}
                </fieldset>
              </>
            )}

            <label htmlFor="confirm" className="flex cursor-pointer items-start gap-3">
              <Checkbox id="confirm" checked={confirm} onCheckedChange={(c) => setConfirm(c === true)} className="mt-0.5 size-5" aria-invalid={!!errors.confirm} />
              <span className="text-sm leading-relaxed">I confirm these details are correct for my family.</span>
            </label>
            {errors.confirm && <p className="-mt-4 text-xs text-destructive">{errors.confirm}</p>}

            {result && !result.ok && (
              <FormNotice tone={result.code === "not_configured" ? "pending" : "error"} title={result.code === "not_configured" ? "RSVP collection opens soon" : "We couldn't send your RSVP"}>
                {result.message}
              </FormNotice>
            )}

            <Button type="submit" variant="rose" size="xl" className="w-full" disabled={pending || !submissionId}>
              {pending ? (<><Loader2 className="animate-spin" /> Sending…</>) : "Send RSVP"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">Your details are shared only with the families and never shown publicly.</p>
          </form>
        )}
      </div>
    </PageShell>
  );
}
