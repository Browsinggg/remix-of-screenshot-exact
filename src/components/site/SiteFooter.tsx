import { Link } from "@tanstack/react-router";

import goldMandala from "@/assets/gold-mandala.png";
import { family, wedding } from "@/config/wedding";
import { Monogram } from "./Monogram";
import { Ornament } from "./Ornament";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/40 bg-paper">
      <img
        src={goldMandala}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        loading="lazy"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="eyebrow">With best compliments from</p>
        <p className="mt-2 font-display text-2xl text-primary-deep">{family.compliments}</p>
        <Ornament className="my-8" />
        <Monogram size="lg" />
        <p className="mt-4 font-display text-lg italic text-muted-foreground">
          {wedding.bride} &amp; {wedding.groom} · {wedding.weddingDateLabel} · {wedding.city}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/rsvp" className="hover:text-primary">RSVP</Link>
          <Link to="/events" className="hover:text-primary">Events</Link>
          <Link to="/stay" className="hover:text-primary">Your Stay</Link>
          <Link to="/contact" className="hover:text-primary">Need Assistance?</Link>
        </div>
      </div>
    </footer>
  );
}
