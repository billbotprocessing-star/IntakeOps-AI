// HubSpot CRM calls, ported from backend/crm.py. Every function is a no-op
// returning null when HUBSPOT_API_KEY is not set.
import { env } from "./http";

const HUBSPOT_BASE = "https://api.hubapi.com";

function headers() {
  return {
    Authorization: `Bearer ${env("HUBSPOT_API_KEY")}`,
    "Content-Type": "application/json",
  };
}

function post(path: string, body: unknown) {
  return fetch(`${HUBSPOT_BASE}${path}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
}

/** Create or update a HubSpot contact. Returns the contact ID. */
export async function upsertContact(phone: string, name: string, industry: string): Promise<string | null> {
  if (!env("HUBSPOT_API_KEY")) return null;

  const [first, ...rest] = name.trim().split(" ");
  const resp = await post("/crm/v3/objects/contacts", {
    properties: {
      phone,
      firstname: first,
      lastname: rest.join(" "),
      hs_lead_status: "NEW",
      industry,
    },
  });
  if (resp.status === 200 || resp.status === 201) return (await resp.json()).id ?? null;

  // 409 = already exists; fetch by phone
  if (resp.status === 409) {
    const search = await post("/crm/v3/objects/contacts/search", {
      filterGroups: [{ filters: [{ propertyName: "phone", operator: "EQ", value: phone }] }],
    });
    const results = (await search.json()).results ?? [];
    if (results.length) return results[0].id;
  }
  return null;
}

type DealInput = {
  caller_name?: string;
  urgency_level?: string;
  issue_description?: string;
};

/** Create a HubSpot deal linked to the contact. Returns the deal ID. */
export async function createDeal(contactId: string | null, lead: DealInput): Promise<string | null> {
  if (!env("HUBSPOT_API_KEY")) return null;

  const urgency = lead.urgency_level ?? "standard";
  const priorityMap: Record<string, string> = {
    emergency: "HIGH",
    high: "HIGH",
    standard: "MEDIUM",
    unqualified: "LOW",
  };

  const resp = await post("/crm/v3/objects/deals", {
    properties: {
      dealname: `Intake – ${lead.caller_name ?? "Unknown"} [${urgency.toUpperCase()}]`,
      pipeline: "default",
      dealstage: urgency === "emergency" ? "appointmentscheduled" : "qualifiedtobuy",
      description: lead.issue_description ?? "",
      hs_priority: priorityMap[urgency] ?? "MEDIUM",
    },
    associations: contactId
      ? [{ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }] }]
      : [],
  });
  if (resp.status === 200 || resp.status === 201) return (await resp.json()).id ?? null;
  return null;
}

/** Add a note in HubSpot for a missed call. */
export async function logMissedCall(missedAt: string, callId: string): Promise<void> {
  if (!env("HUBSPOT_API_KEY")) return;
  await post("/crm/v3/objects/notes", {
    properties: {
      hs_note_body: `Missed call at ${missedAt}. Call ID: ${callId}. Recovery SMS sent.`,
      hs_timestamp: missedAt,
    },
  });
}
