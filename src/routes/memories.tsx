import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Feather, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Field, issuesToErrors, type FieldErrors } from "@/components/site/Field";
import { FormNotice } from "@/components/site/FormNotice";
import { Monogram } from "@/components/site/Monogram";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmissionId } from "@/hooks/use-submission-id";
import { memorySchema, type MemoryInput, type SubmitResult } from "@/lib/forms";
import { submitMemory } from "@/lib/sheets.functions";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Leave a Memory for Saniya & Raghav · #SaRang" },
      { name: "description", content: "Share your favourite memory or blessing with Saniya & Raghav." },
      { property: "og:title", content: "Leave a Memory for Saniya & Raghav" },
      { property: "og:description", content: "A digital guestbook for your favourite memories and blessings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MemoriesPage,
});

function MemoriesPage() {
  const send = useServerFn(submitMemory);
  const [submissionId, renewId] = useSubmissionId();
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors<MemoryInput>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pending) return;
    const values = { submissionId, guestName, message };
    const parsed = memorySchema.safeParse(values);
    if (!parsed.success) {
      setErrors(issuesToErrors<MemoryInput>(parsed.error.issues));
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

  const sent = result?.ok || (result && !result.ok && result.code === "duplicate");

  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Digital guestbook"
        title="Leave a Memory for Saniya & Raghav"
        intro="A favourite moment, a funny story, or simply your blessings — the couple will treasure every word."
      />
      <div className="mx-auto mt-12 max-w-xl">
        {sent ? (
          <div className="invite-card rounded-2xl px-6 py-12 text-center">
            <Feather className="mx-auto size-8 text-gold-deep" aria-hidden="true" />
            <h2 className="mt-4 text-3xl text-primary-deep">Thank you, {guestName}</h2>
            <p className="mt-3 text-muted-foreground">Your memory has been tucked away safely for Saniya & Raghav.</p>
            <Monogram size="md" className="mt-6 block" />
            <Button variant="link" className="mt-4" onClick={() => { setResult(null); setMessage(""); renewId(); }}>
              Share another memory
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="invite-card space-y-5 rounded-2xl p-6 sm:p-10">
            <Field id="mem-name" label="Your name" error={errors.guestName}>
              <Input id="mem-name" autoComplete="name" value={guestName} onChange={(e) => setGuestName(e.target.value)} aria-invalid={!!errors.guestName} />
            </Field>
            <Field id="mem-msg" label="Your favourite memory or message" error={errors.message}>
              <Textarea id="mem-msg" rows={7} value={message} onChange={(e) => setMessage(e.target.value)}
                className="font-display text-lg leading-relaxed" placeholder="Dear Saniya & Raghav…" aria-invalid={!!errors.message} />
            </Field>
            {result && !result.ok && (
              <FormNotice tone={result.code === "not_configured" ? "pending" : "error"} title={result.code === "not_configured" ? "The guestbook opens soon" : "We couldn't save your memory"}>
                {result.message}
              </FormNotice>
            )}
            <Button type="submit" variant="rose" size="xl" className="w-full" disabled={pending || !submissionId}>
              {pending ? (<><Loader2 className="animate-spin" /> Sending…</>) : "Share my memory"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">Messages are private and shared only with the couple.</p>
          </form>
        )}
      </div>
    </PageShell>
  );
}
