import { useCallback, useEffect, useState } from "react";

/** A fresh id per form fill — Apps Script ignores a second write with the same id. */
export function useSubmissionId() {
  const [id, setId] = useState("");
  useEffect(() => setId(crypto.randomUUID()), []);
  const renew = useCallback(() => setId(crypto.randomUUID()), []);
  return [id, renew] as const;
}
