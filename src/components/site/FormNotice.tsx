import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function FormNotice({
  tone,
  title,
  children,
  className,
}: {
  tone: "success" | "error" | "pending";
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  const Icon = tone === "success" ? CheckCircle2 : tone === "error" ? AlertCircle : Clock;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm",
        tone === "success" && "border-botanical/40 bg-botanical/10 text-foreground",
        tone === "error" && "border-destructive/40 bg-destructive/5 text-foreground",
        tone === "pending" && "border-gold/60 bg-gold-soft/30 text-foreground",
        className,
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-5 shrink-0",
          tone === "success" && "text-botanical",
          tone === "error" && "text-destructive",
          tone === "pending" && "text-gold-deep",
        )}
        aria-hidden="true"
      />
      <div>
        <p className="font-medium">{title}</p>
        {children && <div className="mt-1 text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}
