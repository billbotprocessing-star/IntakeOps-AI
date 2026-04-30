const INTEGRATIONS = [
  // ── VOICE & INTELLIGENCE ──────────────────────────────────────────────────
  {
    id: "vapi",
    name: "Vapi",
    category: "Voice Engine",
    icon: "phone",
    status: "connected",
    health: "healthy",
    lastSync: "live",
    description: "Voice AI platform powering the IntakeOps receptionist. Handles inbound calls, real-time transcription, and tool orchestration.",
    docsUrl: "https://docs.vapi.ai",
    envVars: [
      { key: "VAPI_API_KEY", value: "vapi_••••••••••••a3f2", masked: true, status: "set" },
    ],
    metrics: [
      { label: "Calls today",       value: "47" },
      { label: "Avg latency",       value: "640ms" },
      { label: "Tool calls (24h)",  value: "112" },
      { label: "Uptime (30d)",      value: "99.94%" },
    ],
    events: [
      { t: "2m ago",  ok: "pass", text: "Tool call: checkCalendar (210ms)" },
      { t: "4m ago",  ok: "pass", text: "Call ended — C-7142 forwarded to post-call workflow" },
      { t: "11m ago", ok: "pass", text: "Tool call: escalateToOnCall (480ms)" },
      { t: "1h ago",  ok: "pass", text: "Assistant config synced (IntakeOps_Base_v1)" },
    ],
    config: {
      assistant: "IntakeOps_Base_v1",
      voice: "rachel",
      model: "openai/gpt-4o",
      transcriber: "deepgram/nova-2",
      maxDuration: "600s",
      serverUrl: "{N8N_WEBHOOK_URL}/vapi/call-ended",
    },
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "Intelligence",
    icon: "brain",
    status: "connected",
    health: "healthy",
    lastSync: "live",
    description: "GPT-4o powers caller understanding, qualification logic, and structured metadata extraction. Enterprise tier — data not used for training.",
    docsUrl: "https://platform.openai.com/docs",
    envVars: [
      { key: "OPENAI_API_KEY", value: "sk-proj-••••••••e1c4", masked: true, status: "set" },
    ],
    metrics: [
      { label: "Tokens (24h)",   value: "1.42M" },
      { label: "Avg cost / call", value: "$0.08" },
      { label: "Model",          value: "gpt-4o" },
      { label: "Temperature",    value: "0.3" },
    ],
    events: [
      { t: "2m ago", ok: "pass", text: "Completion 312 tokens — call C-7142" },
      { t: "4m ago", ok: "pass", text: "Completion 891 tokens — call C-7141" },
      { t: "9m ago", ok: "pass", text: "Completion 624 tokens — call C-7140" },
    ],
    config: {
      model: "gpt-4o",
      temperature: 0.3,
      maxTokens: 1000,
      systemPromptSource: "blueprints/{industry}.md",
    },
  },

  // ── AUTOMATION ────────────────────────────────────────────────────────────
  {
    id: "n8n",
    name: "n8n",
    category: "Automation",
    icon: "git-branch",
    status: "connected",
    health: "healthy",
    lastSync: "live",
    description: "Workflow orchestrator routing post-call data, missed-call recovery, calendar lookups, and triage logic between Vapi and the CRM backend.",
    docsUrl: "https://docs.n8n.io",
    envVars: [
      { key: "N8N_WEBHOOK_URL", value: "https://billbotprocessing.app.n8n.cloud/webhook", masked: false, status: "set" },
    ],
    metrics: [
      { label: "Workflows active", value: "4 / 4" },
      { label: "Executions (24h)", value: "186" },
      { label: "Failure rate",     value: "0.4%" },
      { label: "Avg run time",     value: "1.2s" },
    ],
    events: [
      { t: "1m ago",  ok: "pass", text: "post-call-intake ran — call C-7142" },
      { t: "4m ago",  ok: "pass", text: "calendar-sync ran — slot returned in 340ms" },
      { t: "12m ago", ok: "pass", text: "lead-recovery ran — SMS sent to (737) 555-0144" },
      { t: "38m ago", ok: "fail", text: "triage-routing — HubSpot rate limit retry (recovered)" },
    ],
    config: {
      workflows: [
        "post-call-intake",
        "lead-recovery",
        "calendar-sync",
        "triage-routing",
      ],
      executionMode: "queue",
    },
  },

  // ── BACKEND ───────────────────────────────────────────────────────────────
  {
    id: "intakeops-backend",
    name: "IntakeOps Backend",
    category: "Backend",
    icon: "server",
    status: "connected",
    health: "healthy",
    lastSync: "live",
    description: "FastAPI service receiving leads, tickets, and missed calls from n8n. Handles CRM upserts, SMS dispatch, and emergency escalation.",
    docsUrl: null,
    envVars: [
      { key: "CRM_WEBHOOK_URL",   value: "https://intakeops-api.up.railway.app", masked: false, status: "set" },
      { key: "INTAKEOPS_API_KEY", value: "iops_••••••••••••9f1d", masked: true,  status: "set" },
    ],
    metrics: [
      { label: "Requests (24h)",  value: "186" },
      { label: "Avg response",    value: "180ms" },
      { label: "5xx rate",        value: "0.0%" },
      { label: "Health check",    value: "200 OK" },
    ],
    events: [
      { t: "1m ago", ok: "pass", text: "POST /leads — 201 Created" },
      { t: "4m ago", ok: "pass", text: "POST /tickets — 201 Created" },
      { t: "8m ago", ok: "pass", text: "POST /missed-calls — 200 OK" },
      { t: "1h ago", ok: "pass", text: "Health check — /health 200 OK" },
    ],
    config: {
      endpoints: ["/leads", "/missed-calls", "/tickets", "/escalate", "/health"],
      auth: "X-API-Key header (HMAC compare)",
      runtime: "FastAPI 0.115 / Python 3.11",
    },
  },

  // ── COMMUNICATIONS ────────────────────────────────────────────────────────
  {
    id: "twilio",
    name: "Twilio SMS",
    category: "Communications",
    icon: "message-square",
    status: "connected",
    health: "healthy",
    lastSync: "live",
    description: "SMS delivery for booking confirmations, missed-call recovery, emergency on-call alerts, and deposit collection links.",
    docsUrl: "https://www.twilio.com/docs/sms",
    envVars: [
      { key: "TWILIO_ACCOUNT_SID", value: "AC••••••••••••7b3a", masked: true,  status: "set" },
      { key: "TWILIO_AUTH_TOKEN",  value: "••••••••••••••••",   masked: true,  status: "set" },
      { key: "TWILIO_FROM_NUMBER", value: "+1 (512) 555-0042",  masked: false, status: "set" },
      { key: "ON_CALL_PHONE",      value: "+1 (512) 555-0099",  masked: false, status: "set" },
    ],
    metrics: [
      { label: "Sent (24h)",      value: "94" },
      { label: "Delivered",       value: "98.9%" },
      { label: "Avg delivery",    value: "2.1s" },
      { label: "Cost (24h)",      value: "$0.71" },
    ],
    events: [
      { t: "2m ago",  ok: "pass", text: "SMS delivered to (512) 555-0188 (confirmation)" },
      { t: "11m ago", ok: "pass", text: "SMS delivered to (512) 555-0099 (emergency alert)" },
      { t: "38m ago", ok: "pass", text: "SMS delivered to (737) 555-0144 (recovery)" },
    ],
    config: {
      messagingService: "FlowState Plumbing",
      complianceFooter: "Reply STOP to opt out",
      tcrRegistration: "Approved",
    },
  },

  // ── CRM ───────────────────────────────────────────────────────────────────
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    icon: "database",
    status: "connected",
    health: "warn",
    lastSync: "38 min ago",
    description: "Two-way CRM sync for contacts, deals, and call notes. Lead-status, urgency-priority, and recording URLs are written automatically.",
    docsUrl: "https://developers.hubspot.com",
    envVars: [
      { key: "HUBSPOT_API_KEY", value: "pat-na1-••••••••e8c2", masked: true, status: "set" },
    ],
    metrics: [
      { label: "Contacts synced (24h)", value: "47" },
      { label: "Deals created (24h)",   value: "31" },
      { label: "Notes attached",         value: "63" },
      { label: "API quota used",         value: "62%" },
    ],
    events: [
      { t: "1m ago",  ok: "pass", text: "Contact upserted — Anika Patel" },
      { t: "4m ago",  ok: "pass", text: "Deal created — $480 / Sewage backup [HIGH]" },
      { t: "38m ago", ok: "fail", text: "429 rate limit — retried successfully after 2.4s" },
      { t: "2h ago",  ok: "pass", text: "Pipeline stage map verified" },
    ],
    config: {
      portalId: "47281904",
      pipeline: "default",
      stageMap: {
        emergency: "appointmentscheduled",
        high: "qualifiedtobuy",
        standard: "qualifiedtobuy",
        unqualified: "closedlost",
      },
    },
  },

  // ── SCHEDULING ────────────────────────────────────────────────────────────
  {
    id: "calendar",
    name: "Acuity Scheduling",
    category: "Scheduling",
    icon: "calendar",
    status: "connected",
    health: "healthy",
    lastSync: "2 min ago",
    description: "Live availability lookups for the checkCalendar tool. Returns 2 next-available slots per request, scoped to service type.",
    docsUrl: "https://developers.acuityscheduling.com",
    envVars: [
      { key: "CALENDAR_API_URL", value: "https://acuityscheduling.com/api/v1", masked: false, status: "set" },
      { key: "CALENDAR_API_KEY", value: "acuity_••••••••6d10", masked: true,  status: "set" },
      { key: "BOOKING_URL",      value: "https://calendly.com/flowstate-plumbing", masked: false, status: "set" },
    ],
    metrics: [
      { label: "Lookups (24h)", value: "58" },
      { label: "Avg response",  value: "340ms" },
      { label: "Hit rate",       value: "94%" },
      { label: "Bookings made", value: "31" },
    ],
    events: [
      { t: "4m ago",  ok: "pass", text: "Availability returned — plumbing-routine, 2 slots" },
      { t: "22m ago", ok: "pass", text: "Booking created — Anika Patel, Tue 10am" },
      { t: "1h ago",  ok: "pass", text: "Service-type map verified (4 verticals)" },
    ],
    config: {
      serviceTypes: [
        "plumbing-routine",
        "med-spa-consultation",
        "med-spa-injectables",
        "property-maintenance",
      ],
      defaultDuration: "60 min",
    },
  },

  // ── NOT YET CONNECTED ─────────────────────────────────────────────────────
  {
    id: "slack",
    name: "Slack",
    category: "Communications",
    icon: "message-circle",
    status: "available",
    health: null,
    lastSync: null,
    description: "Push real-time intake notifications and emergency alerts into team channels. Recommended for multi-tech operations.",
    docsUrl: "https://api.slack.com",
    envVars: [
      { key: "SLACK_BOT_TOKEN",   value: "", masked: true, status: "missing" },
      { key: "SLACK_CHANNEL_ID",  value: "", masked: false, status: "missing" },
    ],
    metrics: null,
    events: [],
    config: null,
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Communications",
    icon: "mail",
    status: "available",
    health: null,
    lastSync: null,
    description: "Send calendar invites and follow-up sequences via Gmail. Useful for med-spa nurture lists and legal callback confirmations.",
    docsUrl: "https://developers.google.com/gmail/api",
    envVars: [
      { key: "GMAIL_OAUTH_CLIENT_ID",     value: "", masked: true, status: "missing" },
      { key: "GMAIL_OAUTH_CLIENT_SECRET", value: "", masked: true, status: "missing" },
    ],
    metrics: null,
    events: [],
    config: null,
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    icon: "credit-card",
    status: "available",
    health: null,
    lastSync: null,
    description: "Collect booking deposits (e.g. $50 med-spa deposit) and on-site payments. Required for verticals with no-show policies.",
    docsUrl: "https://stripe.com/docs/api",
    envVars: [
      { key: "STRIPE_SECRET_KEY",     value: "", masked: true, status: "missing" },
      { key: "STRIPE_WEBHOOK_SECRET", value: "", masked: true, status: "missing" },
    ],
    metrics: null,
    events: [],
    config: null,
  },
];

// ─── Health pill ──────────────────────────────────────────────────────────────
function HealthPill({ health, status }) {
  if (status === "available") return <span className="tag mute">Not connected</span>;
  if (health === "healthy")   return <span className="tag good">● Healthy</span>;
  if (health === "warn")      return <span className="tag gold">● Degraded</span>;
  if (health === "fail")      return <span className="tag warn">● Failing</span>;
  return <span className="tag mute">—</span>;
}

// ─── Env-var row with reveal toggle ───────────────────────────────────────────
function EnvVarRow({ envVar }) {
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied]     = React.useState(false);

  const isSet     = envVar.status === "set";
  const display   = !isSet ? "(not set)" :
                    !envVar.masked ? envVar.value :
                    revealed ? envVar.value : envVar.value;

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!isSet) return;
    navigator.clipboard?.writeText(envVar.value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="int-env-row">
      <div className="int-env-key">{envVar.key}</div>
      <div className="int-env-val mono">
        {isSet ? display : <span style={{ color: "var(--red-200)" }}>{display}</span>}
      </div>
      <div className="int-env-actions">
        {isSet && envVar.masked && (
          <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setRevealed(r => !r); }}
                  title={revealed ? "Hide" : "Reveal"}>
            <i data-lucide={revealed ? "eye-off" : "eye"} style={{ width: 12, height: 12 }}></i>
          </button>
        )}
        {isSet && (
          <button className="icon-btn" onClick={handleCopy} title="Copy">
            <i data-lucide={copied ? "check" : "copy"} style={{ width: 12, height: 12 }}></i>
          </button>
        )}
        {!isSet && (
          <span className="tag warn" style={{ fontSize: 9 }}>Missing</span>
        )}
      </div>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function OverviewTab({ integration }) {
  const isAvailable = integration.status === "available";
  return (
    <>
      <p style={{ color: "var(--fg-2)", fontSize: 14, lineHeight: 1.65, marginBottom: 18 }}>
        {integration.description}
      </p>

      {!isAvailable && integration.metrics && (
        <>
          <div className="lc-section-title">Live metrics</div>
          <div className="lc-grid">
            {integration.metrics.map(m => (
              <div key={m.label} className="lc-info-card">
                <div className="lc-info-label">{m.label}</div>
                <div className="lc-info-value lg">{m.value}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {isAvailable && (
        <div style={{ padding: "16px 18px", background: "var(--indigo-a05)", border: "1px solid var(--indigo-a20)", borderRadius: 12, fontSize: 13, color: "var(--fg-2)", lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, color: "var(--indigo-200)", marginBottom: 6 }}>
            <i data-lucide="info" style={{ width: 13, height: 13, verticalAlign: "middle", marginRight: 6 }}></i>
            Not connected yet
          </div>
          Add this integration to extend your IntakeOps automations. Click <b>Connect</b> above to add the required credentials.
        </div>
      )}

      {integration.docsUrl && (
        <div style={{ marginTop: 18 }}>
          <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer"
             className="ghost-btn" style={{ display: "inline-flex" }}>
            <i data-lucide="external-link" style={{ width: 13, height: 13 }}></i>
            View official docs
          </a>
        </div>
      )}
    </>
  );
}

function CredentialsTab({ integration }) {
  const missing = integration.envVars.filter(e => e.status === "missing").length;
  return (
    <>
      <div className="lc-section-title">Environment variables</div>
      <div className="int-env-list">
        {integration.envVars.map(e => <EnvVarRow key={e.key} envVar={e} />)}
      </div>

      {missing > 0 && (
        <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(254,202,202,0.06)", border: "1px solid rgba(254,202,202,0.2)", borderRadius: 10, fontSize: 13, color: "var(--red-200)", lineHeight: 1.6 }}>
          <b>{missing} variable{missing > 1 ? "s" : ""} missing.</b> Set {missing > 1 ? "them" : "it"} in your <code style={{ background: "rgba(0,0,0,0.3)", padding: "1px 5px", borderRadius: 3 }}>.env</code> file or hosting provider's secret manager before connecting this integration.
        </div>
      )}

      <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--indigo-a05)", border: "1px solid var(--indigo-a20)", borderRadius: 10, fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.6 }}>
        <i data-lucide="shield" style={{ width: 12, height: 12, verticalAlign: "middle", marginRight: 5, color: "var(--indigo-200)" }}></i>
        Secrets are stored encrypted at rest (AES-256) and never logged. Reveal access is audited.
      </div>
    </>
  );
}

function ConfigTab({ integration }) {
  if (!integration.config) {
    return (
      <div className="lc-empty" style={{ paddingTop: 60 }}>
        <i data-lucide="settings"></i>
        <div style={{ marginTop: 10, fontSize: 13, color: "var(--fg-muted)" }}>No configuration available.</div>
        <div style={{ marginTop: 4, fontSize: 12, color: "var(--fg-faint)" }}>Connect this integration to view its settings.</div>
      </div>
    );
  }

  const renderValue = (val) => {
    if (Array.isArray(val)) {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {val.map((v, i) => <span key={i} className="tag info" style={{ fontSize: 10 }}>{v}</span>)}
        </div>
      );
    }
    if (typeof val === "object" && val !== null) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {Object.entries(val).map(([k, v]) => (
            <div key={k} style={{ fontSize: 12 }}>
              <span style={{ color: "var(--fg-faint)" }}>{k}:</span>{" "}
              <span className="mono" style={{ color: "var(--fg-2)" }}>{String(v)}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span className="mono" style={{ color: "var(--fg-2)" }}>{String(val)}</span>;
  };

  return (
    <>
      <div className="lc-section-title">Active configuration</div>
      <div className="int-config-list">
        {Object.entries(integration.config).map(([key, val]) => (
          <div key={key} className="int-config-row">
            <div className="int-config-key">{key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}</div>
            <div className="int-config-val">{renderValue(val)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ActivityTab({ integration }) {
  if (!integration.events || integration.events.length === 0) {
    return (
      <div className="lc-empty" style={{ paddingTop: 60 }}>
        <i data-lucide="activity"></i>
        <div style={{ marginTop: 10, fontSize: 13, color: "var(--fg-muted)" }}>No activity yet.</div>
        <div style={{ marginTop: 4, fontSize: 12, color: "var(--fg-faint)" }}>Events will appear here once this integration starts processing requests.</div>
      </div>
    );
  }
  return (
    <>
      <div className="lc-section-title">Recent events · last 24 hours</div>
      <div className="lc-checklist">
        {integration.events.map((e, i) => (
          <div key={i} className={"lc-check " + (e.ok === "fail" ? "fail" : "pass")}>
            <span className="lc-check-icon">{e.ok === "fail" ? "✕" : "✓"}</span>
            <span style={{ flex: 1 }}>{e.text}</span>
            <span className="mono" style={{ color: "var(--fg-faint)", fontSize: 11 }}>{e.t}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function IntegrationDetail({ integration, tab, setTab }) {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [integration, tab]);
  const isConnected = integration.status === "connected";

  return (
    <div className="panel">
      <div className="lc-detail-head">
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div className="int-detail-icon">
            <i data-lucide={integration.icon} style={{ width: 22, height: 22 }}></i>
          </div>
          <div>
            <div className="lc-detail-id">INTEGRATION · {integration.category.toUpperCase()}</div>
            <div className="lc-detail-name">
              {integration.name}
              <HealthPill health={integration.health} status={integration.status} />
            </div>
            <div className="lc-detail-meta">
              <span><b>Category:</b> {integration.category}</span>
              {integration.lastSync && <span><b>Last activity:</b> {integration.lastSync}</span>}
              <span><b>Variables:</b> {integration.envVars.filter(e => e.status === "set").length} / {integration.envVars.length} set</span>
            </div>
          </div>
        </div>
        <div className="head-actions">
          {isConnected ? (
            <>
              <button className="ghost-btn">
                <i data-lucide="refresh-cw" style={{ width: 13, height: 13 }}></i> Test connection
              </button>
              <button className="ghost-btn" style={{ borderColor: "rgba(254,202,202,0.3)", color: "var(--red-200)" }}>
                <i data-lucide="unlink" style={{ width: 13, height: 13 }}></i> Disconnect
              </button>
            </>
          ) : (
            <button className="primary-btn" style={{ padding: "8px 16px" }}>
              <i data-lucide="plug" style={{ width: 13, height: 13, verticalAlign: "middle", marginRight: 6 }}></i>
              Connect {integration.name}
            </button>
          )}
        </div>
      </div>

      <div className="lc-tabs">
        {[
          ["overview",    "Overview"],
          ["credentials", "Credentials"],
          ["config",      "Configuration"],
          ["activity",    "Activity"],
        ].map(([k, label]) => (
          <button key={k}
            className={"lc-tab" + (tab === k ? " active" : "")}
            onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>

      <div className="lc-body">
        {tab === "overview"    && <OverviewTab integration={integration} />}
        {tab === "credentials" && <CredentialsTab integration={integration} />}
        {tab === "config"      && <ConfigTab integration={integration} />}
        {tab === "activity"    && <ActivityTab integration={integration} />}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function Integrations() {
  const [filter, setFilter]         = React.useState("all");
  const [selectedId, setSelectedId] = React.useState("vapi");
  const [tab, setTab]               = React.useState("overview");

  const filtered = INTEGRATIONS.filter(i =>
    filter === "all"        ? true :
    filter === "connected"  ? i.status === "connected" :
    filter === "available"  ? i.status === "available" :
    filter === "issues"     ? i.health === "warn" || i.health === "fail" : true
  );
  const selected = INTEGRATIONS.find(i => i.id === selectedId) || filtered[0];

  const connectedCount = INTEGRATIONS.filter(i => i.status === "connected").length;
  const availableCount = INTEGRATIONS.filter(i => i.status === "available").length;
  const healthyCount   = INTEGRATIONS.filter(i => i.health === "healthy").length;
  const issuesCount    = INTEGRATIONS.filter(i => i.health === "warn" || i.health === "fail").length;

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [selected, tab, filter]);

  return (
    <>
      {/* KPI row */}
      <section className="kpi-row">
        {[
          { label: "Connected",          value: String(connectedCount), sub: `of ${INTEGRATIONS.length} total`,           delta: "up" },
          { label: "Healthy",            value: String(healthyCount),   sub: "operating normally",                         delta: "up" },
          { label: "Needs attention",    value: String(issuesCount),    sub: issuesCount ? "review activity log" : "all good", delta: issuesCount ? "down" : "up" },
          { label: "Available to add",   value: String(availableCount), sub: "extend automation",                          delta: "up" },
        ].map(c => (
          <div key={c.label} className="kpi-card">
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-row-inner">
              <div className="kpi-value">{c.value}</div>
            </div>
            <div className={"kpi-delta " + c.delta}>
              <i data-lucide="circle" style={{ width: 8, height: 8, fill: "currentColor" }}></i>
              <span className="kpi-delta-sub" style={{ marginLeft: 0 }}>{c.sub}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main split */}
      <div className="live-split">
        {/* List panel */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>Integrations</h3>
              <div className="muted sm">{connectedCount} connected · {availableCount} available</div>
            </div>
            <button className="primary-btn" style={{ padding: "8px 14px", fontSize: 12 }}>
              <i data-lucide="plus" style={{ width: 13, height: 13, verticalAlign: "middle", marginRight: 5 }}></i>
              Browse
            </button>
          </div>

          <div className="lc-filterbar">
            {[
              ["all",       "All"],
              ["connected", "Connected"],
              ["issues",    "Issues"],
              ["available", "Available"],
            ].map(([k, label]) => (
              <button key={k}
                className={"lc-filter" + (filter === k ? " active" : "")}
                onClick={() => setFilter(k)}>
                {label}
              </button>
            ))}
          </div>

          <div className="bp-list">
            {filtered.length === 0 && (
              <div className="lc-empty">
                <i data-lucide="inbox"></i>
                No integrations match.
              </div>
            )}
            {filtered.map(i => {
              const isConnected = i.status === "connected";
              return (
                <div key={i.id}
                  className={"bp-list-row" + (i.id === selectedId ? " selected" : "")}
                  onClick={() => { setSelectedId(i.id); setTab("overview"); }}>
                  <div className={"bp-icon" + (!isConnected ? " int-icon-muted" : "")}>
                    <i data-lucide={i.icon} style={{ width: 16, height: 16 }}></i>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="bp-list-name">
                      {i.name}
                      <HealthPill health={i.health} status={i.status} />
                    </div>
                    <div className="bp-list-sub">{i.category}</div>
                    <div className="bp-list-foot">
                      {isConnected
                        ? <><span>{i.envVars.filter(e => e.status === "set").length}/{i.envVars.length} vars set</span><span>·</span><span>{i.lastSync}</span></>
                        : <span>Click to view setup requirements</span>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected && <IntegrationDetail integration={selected} tab={tab} setTab={setTab} />}
      </div>
    </>
  );
}

Object.assign(window, { Integrations });
