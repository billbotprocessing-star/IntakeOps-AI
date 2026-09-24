// GET /api/status — which integrations are configured, for the dashboard's
// Integrations page. Reports booleans only, never the values, and requires a
// signed-in dashboard user.
import type { Config } from "@netlify/functions";
import { env, json } from "../lib/http";
import { db } from "../lib/db";

export default async (req: Request) => {
  const supabase = db();
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!supabase || !token) return json({ detail: "Unauthorized" }, 401);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return json({ detail: "Unauthorized" }, 401);

  const set = (...names: string[]) => names.every((n) => Boolean(env(n)));
  return json({
    webhookKey: set("INTAKEOPS_API_KEY"),
    database: true,
    hubspot: set("HUBSPOT_API_KEY"),
    twilio: set("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_FROM_NUMBER"),
    onCall: set("ON_CALL_PHONE"),
    n8nDemo: true,
  });
};

export const config: Config = { path: "/api/status", method: "GET" };
