// POST /api/tickets — prioritized ticket from the triage-routing workflow.
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

  const contactId = await attempt("hubspot contact", () =>
    upsertContact(ticket.caller_phone, ticket.caller_name, ticket.industry),
  );
  const dealId = await attempt("hubspot deal", () => createDeal(contactId, ticket));

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

export const config: Config = { path: "/api/tickets", method: "POST" };
