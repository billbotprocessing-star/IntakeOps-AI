// POST /api/demo-request — the landing page's "Call me now" form. Forwards to
// the n8n demo-request webhook server-side, so the browser never needs CORS
// access to n8n, and keeps a copy for the dashboard.
import type { Config } from "@netlify/functions";
import { attempt, env, json, parseBody } from "../lib/http";
import { DemoRequest } from "../lib/models";
import { check, db } from "../lib/db";

const DEFAULT_WEBHOOK = "https://billbotprocessing.app.n8n.cloud/webhook/demo-request";

export default async (req: Request) => {
  const parsed = await parseBody(req, DemoRequest);
  if ("error" in parsed) return parsed.error;
  const demo = parsed.data;

  const forwarded =
    (await attempt("n8n demo-request", async () => {
      const resp = await fetch(env("N8N_DEMO_WEBHOOK_URL") || DEFAULT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(demo),
        signal: AbortSignal.timeout(10_000),
      });
      if (!resp.ok) throw new Error(`n8n responded ${resp.status}`);
      return true;
    })) ?? false;

  await attempt("store demo request", async () => {
    const supabase = db();
    if (!supabase) return;
    check(
      await supabase.from("demo_requests").insert({
        phone_number: demo.phoneNumber,
        industry: demo.industry,
        source: demo.source,
        forwarded,
      }),
    );
  });

  if (!forwarded) return json({ status: "failed", message: "Could not start the demo call" }, 502);
  return json({ status: "ok" });
};

export const config: Config = { path: "/api/demo-request", method: "POST" };
