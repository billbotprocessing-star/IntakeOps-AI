// POST /api/leads — post-call data from n8n: store the lead, create the CRM
// contact + deal, and text the caller (or page on-call for emergencies).
import type { Config } from "@netlify/functions";
import { attempt, checkApiKey, json, parseBody } from "../lib/http";
import { LeadCreate, toIso } from "../lib/models";
import { check, db } from "../lib/db";
import { createDeal, upsertContact } from "../lib/hubspot";
import { sendConfirmation, sendEmergencyAlert } from "../lib/twilio";

export default async (req: Request) => {
  const denied = checkApiKey(req);
  if (denied) return denied;
  const parsed = await parseBody(req, LeadCreate);
  if ("error" in parsed) return parsed.error;
  const lead = parsed.data;

  const contactId = await attempt("hubspot contact", () =>
    upsertContact(lead.caller_phone, lead.caller_name, lead.industry),
  );
  const dealId = await attempt("hubspot deal", () => createDeal(contactId, lead));

  const stored = await attempt("store lead", () => storeLead(lead, contactId, dealId));

  const smsSent =
    lead.urgency_level === "emergency"
      ? await attempt("sms emergency", () => sendEmergencyAlert(lead))
      : await attempt("sms confirmation", () => sendConfirmation(lead.caller_phone, lead.caller_name));

  return json({
    status: "created",
    contact_id: contactId,
    deal_id: dealId,
    urgency: lead.urgency_level,
    stored: stored ?? false,
    sms_sent: smsSent ?? false,
  });
};

async function storeLead(lead: LeadCreate, contactId: string | null, dealId: string | null) {
  const supabase = db();
  if (!supabase) return false;

  const row = {
    call_id: lead.call_id,
    caller_phone: lead.caller_phone,
    caller_name: lead.caller_name,
    issue_description: lead.issue_description,
    urgency_level: lead.urgency_level,
    service_address: lead.service_address,
    industry: lead.industry,
    call_duration_seconds: lead.call_duration_seconds,
    transcript: lead.transcript,
    recording_url: lead.recording_url,
    ended_reason: lead.ended_reason,
    hubspot_contact_id: contactId,
    hubspot_deal_id: dealId,
    occurred_at: toIso(lead.timestamp),
  };
  const unqualified = lead.urgency_level === "unqualified" || lead.status === "unqualified";

  const inserted = await supabase.from("leads").insert({ ...row, status: unqualified ? "unqualified" : "new" });
  if (inserted.error?.code === "23505") {
    // Same call sent again (n8n retry or a second workflow): refresh the call
    // details but keep whatever status the team has set in the dashboard.
    check(await supabase.from("leads").update(row).eq("call_id", lead.call_id));
    return true;
  }
  check(inserted);
  return true;
}

export const config: Config = { path: "/api/leads", method: "POST" };
