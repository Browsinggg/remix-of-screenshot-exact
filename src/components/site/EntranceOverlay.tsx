import { useEffect, useState } from "react";

import floralCorner from "@/assets/floral-corner.png";
import goldMandala from "@/assets/gold-mandala.png";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";
import { Monogram } from "./Monogram";
import { Ornament } from "./Ornament";

const KEY = "sarang-entered";

/** Opening invitation screen. Shown once per visit; the home page sits ready beneath it. */
export function EntranceOverlay() {
  const [state, setState] = useState<"show" | "leaving" | "gone">("show");

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) setState("gone");
  }, []);

  useEffect(() => {
    document.body.style.overflow = state === "show" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  if (state === "gone") return null;

  const enter = () => {
    sessionStorage.setItem(KEY, "1");
    setState("leaving");
    window.scrollTo({ top: 0 });
    window.setTimeout(() => setState("gone"), 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background px-6 ${
        state === "leaving" ? "animate-curtain-up" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to #SaRang"
    >
      <img src={goldMandala} alt="" aria-hidden="true" width={1024} height={1024}
        className="animate-slow-spin pointer-events-none absolute w-[42rem] max-w-none opacity-[0.12] sm:w-[52rem]" />
      <img src={floralCorner} alt="" aria-hidden="true" width={1024} height={1024}
        className="pointer-events-none absolute -left-8 -top-8 w-48 sm:w-72" />
      <img src={floralCorner} alt="" aria-hidden="true" width={1024} height={1024}
        className="pointer-events-none absolute -bottom-8 -right-8 w-48 rotate-180 sm:w-72" />

      <div className="relative max-w-md text-center">
        <p className="eyebrow animate-rise">The {wedding.families} invite you</p>
        <div className="animate-rise mt-6 [animation-delay:150ms]">
          <Monogram size="xl" />
        </div>
        <h1 className="animate-rise mt-6 text-4xl text-foreground [animation-delay:300ms] sm:text-5xl">
          {wedding.bride} <span className="font-display italic text-gold-deep">&amp;</span> {wedding.groom}
        </h1>
        <Ornament className="animate-rise mt-6 [animation-delay:400ms]" />
        <p className="animate-rise mt-6 leading-relaxed text-muted-foreground [animation-delay:500ms]">
          {wedding.welcomeShort}
        </p>
        <div className="animate-rise mt-10 [animation-delay:700ms]">
          <Button variant="rose" size="xl" className="animate-soft-glow" onClick={enter} autoFocus>
            Enter the Celebration
          </Button>
        </div>
        <p className="animate-rise mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground [animation-delay:800ms]">
          {wedding.weddingDateLabel} · {wedding.city}
        </p>
      </div>
    </div>
  );
}
