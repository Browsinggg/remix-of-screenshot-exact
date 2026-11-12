import type { ReactNode } from "react";

import floralCorner from "@/assets/floral-corner.png";
import { cn } from "@/lib/utils";

/** Page wrapper with delicate floral corners — keeps every page feeling like an invitation card. */
export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={floralCorner}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -left-10 -top-6 w-40 opacity-80 sm:w-56 md:w-64"
      />
      <img
        src={floralCorner}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-10 -top-6 w-40 -scale-x-100 opacity-80 sm:w-56 md:w-64"
      />
      <div className="relative px-5 pb-20 pt-28 sm:px-8 sm:pt-32">{children}</div>
    </div>
  );
}
