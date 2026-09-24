// Replays the payloads the n8n workflows send and checks each function's
// response plus the HubSpot / Twilio / n8n calls it makes. The database is
// left unconfigured here, so `stored` is false throughout.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import leads from "../netlify/functions/leads";
import missedCalls from "../netlify/functions/missed-calls";
import tickets from "../netlify/functions/tickets";
import escalate from "../netlify/functions/escalate";
import demoRequest from "../netlify/functions/demo-request";

const KEY = "test-secret";
const calls: { url: string; body: string }[] = [];

function post(path: string, body: unknown, key: string | null = KEY) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (key !== null) headers["X-API-Key"] = key;
  return new Request(`https://site.test/api/${path}`, {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// What the post-call-intake workflow's "Extract Call Data" node produces.
const lead = {
  call_id: "call_123",
  caller_phone: "+15551234567",
  caller_name: "Dana Reyes",
  issue_description: "Burst pipe under kitchen sink",
  urgency_level: "emergency",
  service_address: "12 Elm St",
  industry: "plumbing",
  call_duration_seconds: 184,
  transcript: "…",
  recording_url: "https://example.com/rec.mp3",
  ended_reason: "customer-ended-call",
  timestamp: "2026-09-24T10:00:00.000Z",
};

beforeEach(() => {
  calls.length = 0;
  vi.stubEnv("INTAKEOPS_API_KEY", KEY);
  vi.stubEnv("HUBSPOT_API_KEY", "hs");
  vi.stubEnv("TWILIO_ACCOUNT_SID", "AC1");
  vi.stubEnv("TWILIO_AUTH_TOKEN", "tok");
  vi.stubEnv("TWILIO_FROM_NUMBER", "+15550000000");
  vi.stubEnv("ON_CALL_PHONE", "+15559999999");
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      calls.push({ url, body: String(init?.body ?? "") });
      if (url.includes("/contacts")) return Response.json({ id: "contact_1" }, { status: 201 });
      if (url.includes("/deals")) return Response.json({ id: "deal_1" }, { status: 201 });
      return Response.json({}, { status: 201 });
    }),
  );
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("API key", () => {
  it("rejects a missing or wrong key", async () => {
    expect((await leads(post("leads", lead, null))).status).toBe(401);
    expect((await tickets(post("tickets", lead, "nope"))).status).toBe(401);
    expect(calls).toHaveLength(0);
  });

  it("fails closed when no key is configured", async () => {
    vi.stubEnv("INTAKEOPS_API_KEY", "");
    expect((await escalate(post("escalate", lead, ""))).status).toBe(503);
  });
});

describe("POST /api/leads", () => {
  it("creates contact + deal and pages on-call for an emergency", async () => {
    const res = await leads(post("leads", lead));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      status: "created",
      contact_id: "contact_1",
      deal_id: "deal_1",
      urgency: "emergency",
      stored: false,
      sms_sent: true,
    });
    const deal = JSON.parse(calls.find((c) => c.url.endsWith("/deals"))!.body);
    expect(deal.properties.dealstage).toBe("appointmentscheduled");
    expect(deal.associations[0].to.id).toBe("contact_1");
    const sms = calls.find((c) => c.url.includes("twilio"))!;
    expect(new URLSearchParams(sms.body).get("To")).toBe("+15559999999");
  });

  it("texts the caller for a standard lead", async () => {
    await leads(post("leads", { ...lead, urgency_level: "standard" }));
    const sms = calls.find((c) => c.url.includes("twilio"))!;
    expect(new URLSearchParams(sms.body).get("To")).toBe(lead.caller_phone);
  });

  it("returns 422 for an invalid urgency or missing timestamp", async () => {
    expect((await leads(post("leads", { ...lead, urgency_level: "urgent" }))).status).toBe(422);
    const { timestamp: _, ...noTimestamp } = lead;
    expect((await leads(post("leads", noTimestamp))).status).toBe(422);
    expect((await leads(post("leads", "not json"))).status).toBe(422);
  });

  it("still answers 200 when HubSpot is down", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network");
      }),
    );
    const body = await (await leads(post("leads", lead))).json();
    expect(body).toMatchObject({ status: "created", contact_id: null, deal_id: null, sms_sent: false });
  });
});

describe("POST /api/tickets", () => {
  it("accepts the triage workflow's ticket payload", async () => {
    const res = await tickets(post("tickets", { ...lead, priority: "CRITICAL", status: "escalated" }));
    expect(await res.json()).toMatchObject({ status: "created", deal_id: "deal_1", priority: "CRITICAL" });
  });
});

describe("POST /api/missed-calls", () => {
  it("logs a HubSpot note", async () => {
    const res = await missedCalls(
      post("missed-calls", {
        call_id: "call_9",
        caller_phone: "+15551112222",
        missed_at: "2026-09-24T09:00:00Z",
        recovery_sms_sent: true,
      }),
    );
    expect(await res.json()).toEqual({ status: "logged", stored: false });
    expect(calls[0].url).toContain("/crm/v3/objects/notes");
  });
});

describe("POST /api/escalate", () => {
  const escalation = {
    caller_name: "Dana Reyes",
    caller_phone: "+15551234567",
    issue_description: "Gas smell",
  };

  it("pages on-call", async () => {
    const res = await escalate(post("escalate", escalation));
    expect(await res.json()).toEqual({ status: "escalated", message: "On-call team notified via SMS" });
  });

  it("reports failure instead of claiming success when Twilio isn't set up", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "");
    expect((await escalate(post("escalate", escalation))).status).toBe(502);
  });
});

describe("POST /api/demo-request", () => {
  it("forwards the landing-page form to n8n without an API key", async () => {
    const body = { phoneNumber: "+1 (555) 123-4567", industry: "legal", source: "Landing Page" };
    const res = await demoRequest(post("demo-request", body, null));
    expect(res.status).toBe(200);
    expect(calls[0].url).toBe("https://billbotprocessing.app.n8n.cloud/webhook/demo-request");
    expect(JSON.parse(calls[0].body)).toEqual(body);
  });

  it("rejects junk", async () => {
    const res = await demoRequest(post("demo-request", { phoneNumber: "<script>", industry: "legal" }, null));
    expect(res.status).toBe(422);
    expect(calls).toHaveLength(0);
  });
});
