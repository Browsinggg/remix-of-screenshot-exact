import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  optional?: boolean | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/** Native select styled to match inputs — easiest to use on phones. */
export const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-paper px-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";

/** Errors keyed by form field name. */
export type FieldErrors<T> = Partial<Record<keyof T | "form", string>>;

/** Turns zod issues into { fieldName: firstMessage } */
export function issuesToErrors<T>(issues: { path: (string | number)[]; message: string }[]): FieldErrors<T> {
  const out: Record<string, string> = {};
  for (const i of issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out as FieldErrors<T>;
}
