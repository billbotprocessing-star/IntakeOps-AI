// A call saved as a lead and then as a ticket must not create a second
// HubSpot deal: /api/tickets reuses the lead's contact and deal IDs.
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const inserted: Record<string, unknown>[] = [];
let storedLead: { hubspot_contact_id: string | null; hubspot_deal_id: string | null } | null = null;

vi.mock("../netlify/lib/db", () => ({
  check: <T,>(r: T) => r,
  db: () => ({
    from: (table: string) => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: storedLead, error: null }) }) }),
      insert: async (row: Record<string, unknown>) => {
        inserted.push({ table, ...row });
        return { error: null };
      },
    }),
  }),
}));

const { default: tickets } = await import("../netlify/functions/tickets");

const body = {
  call_id: "call_1",
  caller_phone: "+15551234567",
  caller_name: "Dana Reyes",
  issue_description: "Leaking water heater",
  urgency_level: "high",
  industry: "plumbing",
  priority: "HIGH",
  status: "pending_callback",
};
const post = () =>
  tickets(
    new Request("https://site.test/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": "k" },
      body: JSON.stringify(body),
    }),
  );

const hubspotCalls: string[] = [];
beforeEach(() => {
  inserted.length = 0;
  hubspotCalls.length = 0;
  vi.stubEnv("INTAKEOPS_API_KEY", "k");
  vi.stubEnv("HUBSPOT_API_KEY", "hs");
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      hubspotCalls.push(url);
      return Response.json({ id: url.includes("/deals") ? "new_deal" : "new_contact" }, { status: 201 });
    }),
  );
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("reuses the lead's HubSpot deal for the same call", async () => {
  storedLead = { hubspot_contact_id: "c_9", hubspot_deal_id: "d_9" };
  expect(await (await post()).json()).toMatchObject({ contact_id: "c_9", deal_id: "d_9", stored: true });
  expect(hubspotCalls).toHaveLength(0);
  expect(inserted[0]).toMatchObject({ table: "tickets", hubspot_deal_id: "d_9" });
});

it("creates a contact and deal when there is no lead for the call", async () => {
  storedLead = null;
  expect(await (await post()).json()).toMatchObject({ contact_id: "new_contact", deal_id: "new_deal" });
  expect(hubspotCalls).toHaveLength(2);
});
