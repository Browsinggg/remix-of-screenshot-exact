import { Link } from "@tanstack/react-router";

import goldMandala from "@/assets/gold-mandala.png";
import { family, wedding } from "@/config/wedding";
import { Monogram } from "./Monogram";
import { navItems } from "./nav";
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
      <div className="relative mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="eyebrow">A note from the couple</p>
        <blockquote className="mt-4">
          <p className="font-display text-2xl italic leading-relaxed text-foreground sm:text-3xl">“{wedding.closingMessage}”</p>
          <footer className="mt-4 font-script text-4xl text-primary">
            {wedding.bride} <span className="font-display text-2xl italic text-gold-deep">&amp;</span> {wedding.groom}
          </footer>
        </blockquote>
        <Ornament className="my-10" />
        <Monogram size="lg" />
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">With love · {family.compliments}</p>
        <p className="mt-1 font-display text-base italic text-muted-foreground">
          {wedding.weddingDateLabel} · {wedding.city}
        </p>
        <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-primary">{item.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
