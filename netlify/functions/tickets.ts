// POST /api/tickets — prioritized ticket from the post-call-intake or
// triage-routing workflow.
import type { Config } from "@netlify/functions";
import { attempt, checkApiKey, json, parseBody } from "../lib/http";
import { TicketCreate, toIso } from "../lib/models";
import { check, db } from "../lib/db";
import { createDeal, upsertContact } from "../lib/hubspot";

export default async (req: Request) => {
  const denied = checkApiKey(req);
  if (denied) return denied;
  const parsed = await parseBody(req, TicketCreate);
  if ("error" in parsed) return parsed.error;
  const ticket = parsed.data;

  // When the call was already saved as a lead, reuse its HubSpot contact and
  // deal instead of creating a duplicate deal for the same call.
  const lead = await attempt("find lead", () => findLeadCrmIds(ticket.call_id));
  const contactId =
    lead?.hubspot_contact_id ??
    (await attempt("hubspot contact", () =>
      upsertContact(ticket.caller_phone, ticket.caller_name, ticket.industry),
    ));
  const dealId = lead?.hubspot_deal_id ?? (await attempt("hubspot deal", () => createDeal(contactId, ticket)));

  const stored = await attempt("store ticket", async () => {
    const supabase = db();
    if (!supabase) return false;
    check(
      await supabase.from("tickets").insert({
        call_id: ticket.call_id,
        caller_phone: ticket.caller_phone,
        caller_name: ticket.caller_name,
        issue_description: ticket.issue_description,
        urgency_level: ticket.urgency_level,
        service_address: ticket.service_address,
        industry: ticket.industry,
        priority: ticket.priority,
        status: ticket.status,
        hubspot_contact_id: contactId,
        hubspot_deal_id: dealId,
        occurred_at: toIso(ticket.timestamp),
      }),
    );
    return true;
  });

  return json({
    status: "created",
    contact_id: contactId,
    deal_id: dealId,
    priority: ticket.priority,
    stored: stored ?? false,
  });
};

async function findLeadCrmIds(callId: string) {
  const supabase = db();
  if (!supabase) return null;
  const { data } = check(
    await supabase.from("leads").select("hubspot_contact_id, hubspot_deal_id").eq("call_id", callId).maybeSingle(),
  );
  return data as { hubspot_contact_id: string | null; hubspot_deal_id: string | null } | null;
}

export const config: Config = { path: "/api/tickets", method: "POST" };
