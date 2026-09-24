// Twilio SMS, ported from backend/sms.py. Uses the REST API directly so the
// functions don't pull in the Twilio SDK. Each sender returns true only when
// a message was actually accepted by Twilio.
import { env } from "./http";

async function send(to: string, body: string): Promise<boolean> {
  const sid = env("TWILIO_ACCOUNT_SID");
  const token = env("TWILIO_AUTH_TOKEN");
  const from = env("TWILIO_FROM_NUMBER");
  if (!sid || !token || !from || !to) return false;

  const resp = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: to, From: from, Body: body }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!resp.ok) throw new Error(`Twilio responded ${resp.status}: ${await resp.text()}`);
  return true;
}

export function sendConfirmation(to: string, callerName: string) {
  return send(
    to,
    `Hi ${callerName}, your intake has been received. ` +
      "Our team will follow up within 1 business hour. Reply STOP to opt out.",
  );
}

type AlertInput = {
  caller_name?: string;
  caller_phone?: string;
  service_address?: string;
  issue_description?: string;
};

export function sendEmergencyAlert(lead: AlertInput) {
  return send(
    env("ON_CALL_PHONE"),
    `🚨 EMERGENCY — ${lead.caller_name ?? "Unknown"} ` +
      `(${lead.caller_phone ?? ""}) at ${lead.service_address || "N/A"}. ` +
      `Issue: ${lead.issue_description ?? ""}. Call back immediately.`,
  );
}
