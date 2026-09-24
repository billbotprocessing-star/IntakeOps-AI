// POST /api/missed-calls — log a missed call. The recovery SMS itself is sent
// by the n8n lead-recovery workflow.
import type { Config } from "@netlify/functions";
import { attempt, checkApiKey, json, parseBody } from "../lib/http";
import { MissedCall, toIso } from "../lib/models";
import { check, db } from "../lib/db";
import { logMissedCall } from "../lib/hubspot";

export default async (req: Request) => {
  const denied = checkApiKey(req);
  if (denied) return denied;
  const parsed = await parseBody(req, MissedCall);
  if ("error" in parsed) return parsed.error;
  const missed = parsed.data;

  await attempt("hubspot note", () => logMissedCall(missed.missed_at, missed.call_id));
  const stored = await attempt("store missed call", async () => {
    const supabase = db();
    if (!supabase) return false;
    check(
      await supabase.from("missed_calls").upsert(
        {
          call_id: missed.call_id,
          caller_phone: missed.caller_phone,
          missed_at: toIso(missed.missed_at),
          recovery_sms_sent: missed.recovery_sms_sent,
        },
        { onConflict: "call_id" },
      ),
    );
    return true;
  });

  return json({ status: "logged", stored: stored ?? false });
};

export const config: Config = { path: "/api/missed-calls", method: "POST" };
