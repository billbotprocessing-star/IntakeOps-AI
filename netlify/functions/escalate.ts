// POST /api/escalate — Vapi's escalateToOnCall tool (via n8n) pages on-call.
import type { Config } from "@netlify/functions";
import { attempt, checkApiKey, json, parseBody } from "../lib/http";
import { EscalationRequest } from "../lib/models";
import { check, db } from "../lib/db";
import { sendEmergencyAlert } from "../lib/twilio";

export default async (req: Request) => {
  const denied = checkApiKey(req);
  if (denied) return denied;
  const parsed = await parseBody(req, EscalationRequest);
  if ("error" in parsed) return parsed.error;
  const escalation = parsed.data;

  const smsSent = (await attempt("sms emergency", () => sendEmergencyAlert(escalation))) ?? false;
  await attempt("store escalation", async () => {
    const supabase = db();
    if (supabase) check(await supabase.from("escalations").insert({ ...escalation, sms_sent: smsSent }));
  });

  if (!smsSent) {
    return json({ status: "failed", message: "On-call SMS could not be sent — check Twilio settings" }, 502);
  }
  return json({ status: "escalated", message: "On-call team notified via SMS" });
};

export const config: Config = { path: "/api/escalate", method: "POST" };
