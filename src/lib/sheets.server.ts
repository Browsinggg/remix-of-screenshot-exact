import type { SubmitResult } from "./forms";

/**
 * Sends one submission to the Google Apps Script web app that writes to the
 * "#SaRang – Wedding Guest Management" spreadsheet.
 *
 * Needs two secrets (set in Lovable → Secrets, never in code):
 *   APPS_SCRIPT_URL     – the deployed web-app URL ending in /exec
 *   APPS_SCRIPT_SECRET  – the same shared secret saved in the Apps Script
 */
export async function postToAppsScript(
  action: "rsvp" | "memory",
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  const url = process.env["APPS_SCRIPT_URL"];
  const secret = process.env["APPS_SCRIPT_SECRET"];
  if (!url || !secret) {
    return {
      ok: false,
      code: "not_configured",
      message:
        "Submissions are not connected yet — the family is still setting this up. Please try again later, or reach the family via the Need Assistance page.",
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, action, payload }),
      redirect: "follow",
    });
    const text = await res.text();
    let body: { ok?: boolean; code?: string; message?: string } = {};
    try {
      body = JSON.parse(text);
    } catch {
      console.error("Apps Script returned non-JSON", res.status, text.slice(0, 300));
      return { ok: false, code: "failed", message: "We couldn't save this right now. Please try again." };
    }
    if (body.ok) return { ok: true, message: body.message };
    const code = body.code === "duplicate" || body.code === "invalid" ? body.code : "failed";
    if (code === "failed") console.error("Apps Script error", body);
    return {
      ok: false,
      code,
      message: body.message || "We couldn't save this right now. Please try again.",
    };
  } catch (err) {
    console.error("Apps Script request failed", err);
    return { ok: false, code: "failed", message: "We couldn't reach the server. Please try again." };
  }
}
