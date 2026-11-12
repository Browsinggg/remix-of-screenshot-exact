import { useEffect, useState } from "react";

import { countdownParts, type CountdownParts } from "@/lib/wedding-utils";

export function Countdown({ target, label }: { target: string; label: string }) {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const t = new Date(target);
    const tick = () => setParts(countdownParts(t, new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells: [string, number | undefined][] = [
    ["Days", parts?.days],
    ["Hours", parts?.hours],
    ["Minutes", parts?.minutes],
    ["Seconds", parts?.seconds],
  ];

  if (parts?.done) {
    return <p className="font-script text-4xl text-primary">The celebration has begun!</p>;
  }

  return (
    <div className="text-center">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-4" role="timer" aria-live="off">
        {cells.map(([unit, value]) => (
          <div key={unit} className="invite-card rounded-md px-1 py-4 sm:py-5">
            <span className="block font-display text-3xl tabular-nums text-primary-deep sm:text-5xl">
              {value === undefined ? "–" : String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground sm:text-[0.65rem]">
              {unit}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 font-display text-lg italic text-muted-foreground">{label}</p>
    </div>
  );
}
