import { useEffect, useState } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { useAuth } from "../../lib/auth";

type Status = Record<"webhookKey" | "database" | "hubspot" | "twilio" | "onCall" | "n8nDemo", boolean>;

const ROWS: { key: keyof Status; name: string; desc: string; env: string }[] = [
  { key: "webhookKey", name: "n8n webhook key", desc: "Shared secret n8n sends as X-API-Key.", env: "INTAKEOPS_API_KEY" },
  { key: "database", name: "Supabase", desc: "Stores every call, ticket and missed call.", env: "SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY" },
  { key: "hubspot", name: "HubSpot CRM", desc: "Creates a contact and deal for each call.", env: "HUBSPOT_API_KEY" },
  { key: "twilio", name: "Twilio SMS", desc: "Confirmation texts to callers.", env: "TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER" },
  { key: "onCall", name: "On-call paging", desc: "Number texted for emergencies and escalations.", env: "ON_CALL_PHONE" },
];

const ENDPOINTS = ["leads", "tickets", "missed-calls", "escalate"];

export default function Integrations() {
  const { session } = useAuth();
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);
  const base = `${window.location.origin}/api`;

  useEffect(() => {
    if (!session) return;
    fetch("/api/status", { headers: { Authorization: `Bearer ${session.access_token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`status ${r.status}`))))
      .then(setStatus)
      .catch((e) => setError(e.message));
  }, [session]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Integrations</h1>
          <p>What's connected. Secrets are set as Netlify environment variables and never shown here.</p>
        </div>
      </div>

      <div className="card panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <h2>Services</h2>
        </div>
        <div className="panel-body" style={{ paddingTop: 0, paddingBottom: 0 }}>
          {error && <div className="empty">Couldn't check status: {error}</div>}
          {ROWS.map((row) => {
            const ok = status?.[row.key];
            return (
              <div className="status-row" key={row.key}>
                {ok ? <CheckCircle2 size={20} color="var(--green)" /> : <CircleAlert size={20} color="var(--amber)" />}
                <div className="grow">
                  <div className="name">{row.name}</div>
                  <div className="desc">
                    {row.desc} <span className="mono">{row.env}</span>
                  </div>
                </div>
                <span className={`badge ${ok ? "badge-green" : "badge-amber"}`}>
                  {status === null ? "Checking…" : ok ? "Connected" : "Not set"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card panel">
        <div className="panel-head">
          <h2>n8n webhook endpoints</h2>
        </div>
        <div className="panel-body">
          <p className="muted" style={{ marginBottom: 12, fontSize: 14 }}>
            In n8n, set <span className="mono">CRM_WEBHOOK_URL</span> to the base URL below. The workflows append the paths themselves.
          </p>
          <div className="code">{base}</div>
          <ul style={{ listStyle: "none", marginTop: 12, display: "grid", gap: 4, fontSize: 13 }} className="muted mono">
            {ENDPOINTS.map((e) => (
              <li key={e}>POST {base}/{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
