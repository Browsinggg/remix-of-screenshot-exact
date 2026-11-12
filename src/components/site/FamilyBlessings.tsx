import { family } from "@/config/wedding";
import { Ornament } from "./Ornament";

export function FamilyBlessings() {
  return (
    <section className="px-5 py-20" aria-labelledby="family-title">
      <div className="invite-card mx-auto max-w-2xl rounded-2xl px-6 py-12 text-center sm:px-12">
        <p className="eyebrow">With best compliments from</p>
        <h2 id="family-title" className="mt-3 text-4xl text-primary-deep sm:text-5xl">
          {family.compliments}
        </h2>
        <Ornament className="my-8" />
        <p className="eyebrow">Grandparent Hosts</p>
        <ul className="mt-3 space-y-1 font-display text-xl">
          {family.grandparents.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <Ornament className="my-8" />
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Bride's Parents</p>
            <p className="mt-3 font-display text-xl">{family.brideParents}</p>
          </div>
          <div>
            <p className="eyebrow">Groom's Parents</p>
            <p className="mt-3 font-display text-xl">{family.groomParents}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
