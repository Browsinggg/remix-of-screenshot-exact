import { useServerFn } from "@tanstack/react-start";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hotels } from "@/config/wedding";
import { checkSchema, type CheckInput, type SubmitResult } from "@/lib/forms";
import { submitCheck } from "@/lib/sheets.functions";
import { Field, issuesToErrors, selectClass, type FieldErrors } from "./Field";
import { FormNotice } from "./FormNotice";

type Action = "check-in" | "check-out";

export function CheckInOut() {
  const send = useServerFn(submitCheck);
  const [hotelId, setHotelId] = useState("");
  const [room, setRoom] = useState("");
  const [errors, setErrors] = useState<FieldErrors<CheckInput>>({});
  const [pending, setPending] = useState<Action | null>(null);
  const [result, setResult] = useState<(SubmitResult & { action: Action }) | null>(null);
  const inFlight = useRef(false);

  const submit = async (action: Action) => {
    if (inFlight.current) return;
    const hotel = hotels.find((h) => h.id === hotelId);
    const values = { hotelId, hotelName: hotel ? (hotel.confirmed ? hotel.name : hotel.label) : "", room, action };
    const parsed = checkSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(issuesToErrors<CheckInput>(parsed.error.issues));
      setResult(null);
      return;
    }
    setErrors({});
    inFlight.current = true;
    setPending(action);
    setResult(null);
    try {
      const res = await send({ data: values });
      setResult({ ...res, action });
    } catch (err) {
      console.error(err);
      setResult({ ok: false, code: "failed", message: "Something went wrong. Please try again.", action });
    } finally {
      inFlight.current = false;
      setPending(null);
    }
  };

  return (
    <div className="invite-card rounded-2xl p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="chk-hotel" label="Your hotel" error={errors.hotelId || errors.hotelName}>
          <select id="chk-hotel" className={selectClass} value={hotelId} onChange={(e) => setHotelId(e.target.value)} aria-invalid={!!errors.hotelId}>
            <option value="">Select hotel…</option>
            {hotels.map((h) => (
              <option key={h.id} value={h.id}>{h.confirmed ? h.name : h.label}</option>
            ))}
          </select>
        </Field>
        <Field id="chk-room" label="Room number" error={errors.room}>
          <Input id="chk-room" inputMode="text" autoCapitalize="characters" placeholder="e.g. 204" value={room} onChange={(e) => setRoom(e.target.value)} aria-invalid={!!errors.room} />
        </Field>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Button variant="botanical" size="xl" className="h-16 w-full text-sm" disabled={!!pending} onClick={() => submit("check-in")}>
          {pending === "check-in" ? <Loader2 className="animate-spin" /> : <LogIn />} I've Checked In
        </Button>
        <Button variant="rose" size="xl" className="h-16 w-full text-sm" disabled={!!pending} onClick={() => submit("check-out")}>
          {pending === "check-out" ? <Loader2 className="animate-spin" /> : <LogOut />} I've Checked Out
        </Button>
      </div>

      <div className="mt-6" aria-live="polite">
        {result?.ok && (
          <FormNotice tone="success" title={result.action === "check-in" ? "Welcome! Your check-in is recorded." : "Safe travels! Your check-out is recorded."}>
            {result.message}
          </FormNotice>
        )}
        {result && !result.ok && (
          <FormNotice
            tone={result.code === "not_configured" ? "pending" : "error"}
            title={result.code === "not_configured" ? "Check-in recording opens soon" : result.code === "duplicate" ? "Already recorded" : "Couldn't record this"}
          >
            {result.message}
          </FormNotice>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        The official time is recorded by our server in IST — not from your phone.
      </p>
    </div>
  );
}
