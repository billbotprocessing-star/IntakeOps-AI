const INTEGRATIONS = [
  {
    id: "vapi",
    name: "Vapi",
    category: "Voice AI",
    icon: "phone-call",
    color: "#6366f1",
    status: "connected",
    lastActivity: "11 min ago",
    eventsWeek: 10,
    description: "Core voice engine — handles all inbound phone calls, real-time transcription via Deepgram, tool dispatch, and call recording. Routes end-of-call reports to n8n via server webhook.",
    metrics: [
      { label: "Calls this week",  value: "10"                   },
      { label: "Avg duration",     value: "2:34"                 },
      { label: "Active agent",     value: "IntakeOps_Base_v1"    },
      { label: "Voice",            value: "Rachel · ElevenLabs"  },
    ],
    config: [
      { key: "VAPI_API_KEY",    label: "API Key",    masked: true,  value: "vapi_••••••••••••••••8f2a"                                    },
      { key: "N8N_WEBHOOK_URL", label: "Server URL", masked: false, value: "https://your-instance.n8n.cloud/webhook/vapi/call-ended"      },
    ],
    events: [
      { t: "11 min ago", icon: "phone-incoming", tone: "",     text: "Call ended · C-7142 · Marcus Reyes · 1:48 · Emergency"  },
      { t: "32 min ago", icon: "phone-incoming", tone: "",     text: "Call ended · C-7141 · Anika Patel · 2:41 · Booked"      },
      { t: "49 min ago", icon: "phone-incoming", tone: "",     text: "Call ended · C-7140 · Dev Sharma · 4:41 · Quote req"    },
      { t: "1 hr ago",   icon: "phone-incoming", tone: "",     text: "Call ended · C-7139 · Roberta Liu · 1:58 · Booked"      },
      { t: "1 hr ago",   icon: "shield-x",       tone: "warn", text: "Spam filter · (888) 555-0042 · 0:08 · auto-terminated"  },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "LLM",
    icon: "cpu",
    color: "#10a37f",
    status: "connected",
    lastActivity: "11 min ago",
    eventsWeek: 47,
    description: "GPT-4o is the AI brain embedded in the Vapi assistant. Handles intent classification, urgency triage, structured metadata extraction, and all conversational reasoning at temperature 0.3.",
    metrics: [
      { label: "Model",            value: "gpt-4o"   },
      { label: "Temperature",      value: "0.3"      },
      { label: "Tokens this week", value: "~84,200"  },
      { label: "Avg per call",     value: "~8,420"   },
    ],
    config: [
      { key: "OPENAI_API_KEY", label: "API Key", masked: true, value: "sk-••••••••••••••••••••••••••••9c4d" },
    ],
    events: [
      { t: "11 min ago", icon: "zap", tone: "",     text: "Completion · C-7142 · 1,842 tokens · emergency triage"          },
      { t: "32 min ago", icon: "zap", tone: "",     text: "Completion · C-7141 · 1,204 tokens · standard booking"           },
      { t: "49 min ago", icon: "zap", tone: "gold", text: "Completion · C-7140 · 2,109 tokens · quote (long call)"          },
      { t: "1 hr ago",   icon: "zap", tone: "",     text: "Completion · C-7139 · 987 tokens · standard booking"             },
      { t: "1 hr ago",   icon: "zap", tone: "mute", text: "Completion · C-7138 · 112 tokens · spam detection"               },
    ],
  },
  {
    id: "n8n",
    name: "n8n",
    category: "Automation",
    icon: "git-branch",
    color: "#ea4b71",
    status: "connected",
    lastActivity: "11 min ago",
    eventsWeek: 47,
    description: "Orchestrates all post-call automation. Receives Vapi webhooks, extracts call metadata, routes data to the CRM backend, triggers SMS confirmations, and runs the lead-recovery workflow for missed calls.",
    metrics: [
      { label: "Active workflows",  value: "4"          },
      { label: "Executions / week", value: "47"         },
      { label: "Success rate",      value: "100%"       },
      { label: "Last execution",    value: "11 min ago" },
    ],
    config: [
      { key: "N8N_WEBHOOK_URL",   label: "Webhook Base URL", masked: false, value: "https://your-instance.n8n.cloud/webhook"  },
      { key: "INTAKEOPS_API_KEY", label: "Backend API Key",  masked: true,  value: "••••••••••••••••••••••••••••••••"          },
    ],
    events: [
      { t: "11 min ago", icon: "check-circle", tone: "",     text: "post-call-intake · C-7142 · emergency routed · 412 ms"     },
      { t: "32 min ago", icon: "check-circle", tone: "",     text: "post-call-intake · C-7141 · booking confirmed · 318 ms"    },
      { t: "49 min ago", icon: "check-circle", tone: "",     text: "post-call-intake · C-7140 · quote → sales queue · 291 ms"  },
      { t: "1 hr ago",   icon: "check-circle", tone: "",     text: "post-call-intake · C-7139 · booking confirmed · 305 ms"    },
      { t: "2 hr ago",   icon: "refresh-cw",   tone: "",     text: "lead-recovery · 3 missed calls re-engaged · 841 ms"        },
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    icon: "users",
    color: "#ff7a59",
    status: "connected",
    lastActivity: "11 min ago",
    eventsWeek: 47,
    description: "All intake leads land in HubSpot as contacts and deals. Urgency level maps directly to deal priority and pipeline stage. Missed calls are logged as contact notes for the follow-up team.",
    metrics: [
      { label: "Contacts synced", value: "47"         },
      { label: "Deals created",   value: "14"         },
      { label: "Pipeline",        value: "Default"    },
      { label: "Last sync",       value: "11 min ago" },
    ],
    config: [
      { key: "HUBSPOT_API_KEY", label: "Private App Token", masked: true, value: "pat-na1-••••••••-••••-••••-••••-••••••••••••" },
    ],
    events: [
      { t: "11 min ago", icon: "user-plus",  tone: "cyan", text: "Contact created · Marcus Reyes · deal #J-4412 (HIGH)"      },
      { t: "32 min ago", icon: "user-plus",  tone: "",     text: "Contact upserted · Anika Patel · deal (MEDIUM)"             },
      { t: "49 min ago", icon: "user-check", tone: "",     text: "Deal updated · Dev Sharma · routed to Marcus T."            },
      { t: "1 hr ago",   icon: "file-text",  tone: "",     text: "Note added · Juno Kim · missed call + partner referral"     },
      { t: "1 hr ago",   icon: "user-minus", tone: "mute", text: "Contact skipped · (888) 555-0042 · spam — no CRM entry"    },
    ],
  },
  {
    id: "twilio",
    name: "Twilio",
    category: "SMS",
    icon: "message-square",
    color: "#f22f46",
    status: "connected",
    lastActivity: "11 min ago",
    eventsWeek: 41,
    description: "Delivers confirmation texts to callers after booking, emergency alerts to on-call techs, and missed-call recovery messages. All traffic routes through a single Twilio number.",
    metrics: [
      { label: "Messages sent",    value: "41"              },
      { label: "Emergency alerts", value: "5"               },
      { label: "Confirmations",    value: "33"              },
      { label: "From number",      value: "+1 (512) 555-0100" },
    ],
    config: [
      { key: "TWILIO_ACCOUNT_SID", label: "Account SID",   masked: true,  value: "AC••••••••••••••••••••••••••••••••"  },
      { key: "TWILIO_AUTH_TOKEN",  label: "Auth Token",    masked: true,  value: "••••••••••••••••••••••••••••••••"    },
      { key: "TWILIO_FROM_NUMBER", label: "From Number",   masked: false, value: "+1 (512) 555-0100"                  },
      { key: "ON_CALL_PHONE",      label: "On-Call Phone", masked: true,  value: "+1 (512) 555-••••"                  },
    ],
    events: [
      { t: "11 min ago", icon: "alert-triangle", tone: "warn", text: "Emergency alert → on-call · Marcus Reyes · sewage backup"   },
      { t: "32 min ago", icon: "message-square", tone: "",     text: "Confirmation SMS → Anika Patel · booking Tue 10 AM"         },
      { t: "49 min ago", icon: "message-square", tone: "",     text: "Confirmation SMS → Dev Sharma · estimate booked Fri"        },
      { t: "1 hr ago",   icon: "message-square", tone: "",     text: "Partner referral SMS → Juno Kim · San Antonio OOA"          },
      { t: "2 hr ago",   icon: "message-circle", tone: "",     text: "Recovery SMS → 3 missed callers · booking link sent"        },
    ],
  },
  {
    id: "deepgram",
    name: "Deepgram",
    category: "Transcription",
    icon: "mic",
    color: "#805ad5",
    status: "connected",
    lastActivity: "11 min ago",
    eventsWeek: 10,
    description: "Real-time speech-to-text via the Vapi integration layer. Nova-2 provides high-accuracy English transcription for all inbound calls. Transcripts power the Recordings tab and AI intent extraction.",
    metrics: [
      { label: "Transcriptions",  value: "10"     },
      { label: "Model",           value: "nova-2" },
      { label: "Language",        value: "en-US"  },
      { label: "Avg confidence",  value: "98.8%"  },
    ],
    config: [
      { key: "DEEPGRAM_API_KEY", label: "API Key", masked: true, value: "Managed by Vapi — no direct key required" },
    ],
    events: [
      { t: "11 min ago", icon: "mic", tone: "", text: "Transcription · C-7142 · 312 words · 98.9% confidence"  },
      { t: "32 min ago", icon: "mic", tone: "", text: "Transcription · C-7141 · 198 words · 99.2% confidence"  },
      { t: "49 min ago", icon: "mic", tone: "", text: "Transcription · C-7140 · 441 words · 98.4% confidence"  },
      { t: "1 hr ago",   icon: "mic", tone: "", text: "Transcription · C-7139 · 167 words · 99.5% confidence"  },
      { t: "1 hr ago",   icon: "mic", tone: "mute", text: "Transcription · C-7138 · 8 words · spam — discarded" },
    ],
  },
  {
    id: "calendar",
    name: "Acuity Scheduling",
    category: "Calendar",
    icon: "calendar-check",
    color: "#5b6fe0",
    status: "connected",
    lastActivity: "32 min ago",
    eventsWeek: 13,
    description: "Provides real-time slot availability via checkCalendar() and accepts bookings triggered by the AI. Confirmed appointments are synced to the Bookings tab and a calendar invite is emailed to the caller.",
    metrics: [
      { label: "Bookings created",      value: "8"                                     },
      { label: "Availability checks",   value: "13"                                    },
      { label: "Calendar API",          value: "Acuity v1"                             },
      { label: "Public booking link",   value: "calendly.com/your-link"               },
    ],
    config: [
      { key: "CALENDAR_API_URL", label: "API URL",     masked: false, value: "https://acuityscheduling.com/api/v1"    },
      { key: "CALENDAR_API_KEY", label: "API Key",     masked: true,  value: "cal-••••••••••••••••••••••••"           },
      { key: "BOOKING_URL",      label: "Public Link", masked: false, value: "https://calendly.com/your-link"         },
    ],
    events: [
      { t: "32 min ago", icon: "calendar-check", tone: "cyan", text: "Booking created · Anika Patel · Tue Nov 12 10:00 AM"      },
      { t: "1 hr ago",   icon: "calendar-check", tone: "cyan", text: "Booking created · Roberta Liu · Wed Nov 13 2:00 PM"       },
      { t: "1 hr ago",   icon: "calendar",       tone: "",     text: "Availability check · plumbing-routine · 2 slots returned" },
      { t: "2 hr ago",   icon: "calendar-check", tone: "cyan", text: "Booking created · Sanjay Bhat · Tue Nov 12 9:00 AM"       },
      { t: "3 hr ago",   icon: "calendar",       tone: "",     text: "Availability check · plumbing-routine · 2 slots returned" },
    ],
  },
  {
    id: "backend",
    name: "IntakeOps API",
    category: "Backend",
    icon: "server",
    color: "#0ea5e9",
    status: "connected",
    lastActivity: "2 min ago",
    eventsWeek: 47,
    description: "FastAPI backend hosted on Railway. Receives post-call payloads from n8n, upserts HubSpot contacts and deals, fires Twilio SMS, and exposes REST endpoints for leads, tickets, missed calls, and escalations.",
    metrics: [
      { label: "Uptime (7 days)",  value: "99.8%"                                     },
      { label: "Requests / week",  value: "47"                                        },
      { label: "Avg latency",      value: "312 ms"                                    },
      { label: "Host",             value: "Railway"                                   },
    ],
    config: [
      { key: "CRM_WEBHOOK_URL",   label: "Backend URL",  masked: false, value: "https://your-intakeops-backend.up.railway.app" },
      { key: "INTAKEOPS_API_KEY", label: "API Key",      masked: true,  value: "••••••••••••••••••••••••••••••••"              },
    ],
    events: [
      { t: "2 min ago",  icon: "activity",     tone: "",     text: "GET /health · 200 OK · 4 ms"                               },
      { t: "11 min ago", icon: "arrow-down-circle", tone: "warn", text: "POST /escalate · 200 OK · C-7142 · on-call notified"  },
      { t: "32 min ago", icon: "arrow-down-circle", tone: "",     text: "POST /leads · 201 Created · C-7141 · 289 ms"          },
      { t: "49 min ago", icon: "arrow-down-circle", tone: "",     text: "POST /leads · 201 Created · C-7140 · 301 ms"          },
      { t: "1 hr ago",   icon: "arrow-down-circle", tone: "",     text: "POST /leads · 201 Created · C-7139 · 278 ms"          },
    ],
  },
];

const TONE_CLASS = { warn: "warn", cyan: "cyan", gold: "gold", mute: "mute", "": "info" };

function StatusDot({ status }) {
  const color = status === "connected" ? "var(--cyan-200)" : status === "error" ? "var(--red-200)" : "var(--fg-faint)";
  const label = status === "connected" ? "Connected" : status === "error" ? "Error" : "Not configured";
  const tagCls = status === "connected" ? "good" : status === "error" ? "warn" : "mute";
  return <span className={"tag " + tagCls}>{label}</span>;
}

function OverviewTab({ int }) {
  return (
    <>
      <div className="lc-grid">
        {int.metrics.map(m => (
          <div key={m.label} className="lc-info-card">
            <div className="lc-info-label">{m.label}</div>
            <div className="lc-info-value">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="lc-section-title" style={{ marginTop: 18 }}>About</div>
      <p style={{ color: "var(--fg-2)", fontSize: 13, lineHeight: 1.7 }}>{int.description}</p>
    </>
  );
}

function EventsTab({ int }) {
  return (
    <>
      <div className="lc-section-title">{int.eventsWeek} events this week · most recent first</div>
      <div className="lc-actions">
        {int.events.map((e, i) => (
          <div key={i} className="lc-action">
            <span className="lc-action-time">{e.t}</span>
            <span className={"lc-action-icon" + (e.tone ? " " + e.tone : "")}>
              <i data-lucide={e.icon} style={{ width: 13, height: 13 }}></i>
            </span>
            <span>{e.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ConfigTab({ int }) {
  const [revealed, setRevealed] = React.useState({});
  const [copied, setCopied] = React.useState(null);
  const [testing, setTesting] = React.useState(false);
  const [testResult, setTestResult] = React.useState(null);

  const toggleReveal = (key) => setRevealed(r => ({ ...r, [key]: !r[key] }));

  const handleCopy = (key, value) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const handleTest = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => { setTesting(false); setTestResult("ok"); }, 1400);
    setTimeout(() => setTestResult(null), 5000);
  };

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [revealed, testResult]);

  return (
    <>
      <div className="lc-section-title">Environment variables</div>
      <div className="int-config-list">
        {int.config.map(f => {
          const isRevealed = revealed[f.key];
          const displayVal = f.masked && !isRevealed ? f.value : f.value;
          return (
            <div key={f.key} className="int-field-row">
              <div className="int-field-key">{f.key}</div>
              <div className="int-field-label">{f.label}</div>
              <div className="int-field-val mono">{displayVal}</div>
              <div className="int-field-actions">
                {f.masked && (
                  <button className="icon-btn" onClick={() => toggleReveal(f.key)} title={isRevealed ? "Hide" : "Reveal"}>
                    <i data-lucide={isRevealed ? "eye-off" : "eye"} style={{ width: 13, height: 13 }}></i>
                  </button>
                )}
                <button className="icon-btn" onClick={() => handleCopy(f.key, f.value)} title="Copy">
                  <i data-lucide={copied === f.key ? "check" : "copy"} style={{ width: 13, height: 13 }}></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
        <button className={testing ? "ghost-btn" : "primary-btn"} style={{ padding: "9px 18px" }} onClick={handleTest} disabled={testing}>
          {testing
            ? <><i data-lucide="loader" style={{ width: 13, height: 13, verticalAlign: "middle", marginRight: 6 }}></i>Testing…</>
            : <><i data-lucide="radio" style={{ width: 13, height: 13, verticalAlign: "middle", marginRight: 6 }}></i>Test connection</>
          }
        </button>
        {testResult === "ok" && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--cyan-200)", fontWeight: 600 }}>
            <i data-lucide="check-circle" style={{ width: 14, height: 14 }}></i>
            Connection successful
          </span>
        )}
      </div>
    </>
  );
}

function IntegrationDetail({ int, tab, setTab }) {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [int, tab]);

  return (
    <div className="panel">
      <div className="lc-detail-head">
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div className="int-icon" style={{ background: int.color + "22", borderColor: int.color + "55", color: int.color }}>
            <i data-lucide={int.icon} style={{ width: 18, height: 18 }}></i>
          </div>
          <div>
            <div className="lc-detail-id">{int.category.toUpperCase()}</div>
            <div className="lc-detail-name">
              {int.name}
              <StatusDot status={int.status} />
            </div>
            <div className="lc-detail-meta">
              <span><b>Last activity:</b> {int.lastActivity}</span>
              <span><b>Events this week:</b> {int.eventsWeek}</span>
            </div>
          </div>
        </div>
        <div className="head-actions">
          <button className="ghost-btn">
            <i data-lucide="external-link" style={{ width: 13, height: 13 }}></i> Docs
          </button>
        </div>
      </div>

      <div className="lc-tabs">
        {[["overview", "Overview"], ["events", "Events"], ["config", "Config"]].map(([k, label]) => (
          <button key={k}
            className={"lc-tab" + (tab === k ? " active" : "")}
            onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>

      <div className="lc-body">
        {tab === "overview" && <OverviewTab int={int} />}
        {tab === "events"   && <EventsTab int={int} />}
        {tab === "config"   && <ConfigTab int={int} />}
      </div>
    </div>
  );
}

function Integrations() {
  const [filter, setFilter]         = React.useState("all");
  const [selectedId, setSelectedId] = React.useState("vapi");
  const [tab, setTab]               = React.useState("overview");

  const filtered = INTEGRATIONS.filter(i =>
    filter === "all"            ? true :
    filter === "connected"      ? i.status === "connected" :
    filter === "not-configured" ? i.status === "not-configured" : true
  );
  const selected = INTEGRATIONS.find(i => i.id === selectedId) || filtered[0];

  const connectedCount = INTEGRATIONS.filter(i => i.status === "connected").length;
  const errorCount     = INTEGRATIONS.filter(i => i.status === "error").length;
  const totalEvents    = INTEGRATIONS.reduce((s, i) => s + i.eventsWeek, 0);
  const categories     = [...new Set(INTEGRATIONS.map(i => i.category))].length;

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [selected, tab, filter]);

  return (
    <>
      {/* KPI row */}
      <section className="kpi-row">
        {[
          { label: "Integrations",       value: String(INTEGRATIONS.length), sub: categories + " categories",        delta: "up"                      },
          { label: "Connected",          value: String(connectedCount),       sub: errorCount ? errorCount + " error" : "all healthy", delta: errorCount ? "down" : "up" },
          { label: "API events / week",  value: String(totalEvents),          sub: "across all services",             delta: "up"                      },
          { label: "Automation success", value: "100%",                       sub: "n8n · 47 executions",             delta: "up"                      },
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

        {/* Integration list */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>Services</h3>
              <div className="muted sm">{INTEGRATIONS.length} integrations · {connectedCount} connected</div>
            </div>
            <button className="ghost-btn">
              <i data-lucide="plus" style={{ width: 13, height: 13 }}></i> Add
            </button>
          </div>

          <div className="lc-filterbar">
            {[["all", "All"], ["connected", "Connected"], ["not-configured", "Not configured"]].map(([k, label]) => (
              <button key={k}
                className={"lc-filter" + (filter === k ? " active" : "")}
                onClick={() => setFilter(k)}>
                {label}
              </button>
            ))}
          </div>

          <div className="bp-list">
            {filtered.map(int => (
              <div key={int.id}
                className={"bp-list-row" + (int.id === selectedId ? " selected" : "")}
                onClick={() => { setSelectedId(int.id); setTab("overview"); }}>
                <div className="int-icon" style={{ background: int.color + "22", borderColor: int.color + "44", color: int.color }}>
                  <i data-lucide={int.icon} style={{ width: 15, height: 15 }}></i>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="bp-list-name">
                    {int.name}
                    <StatusDot status={int.status} />
                  </div>
                  <div className="bp-list-sub">{int.category}</div>
                  <div className="bp-list-foot">
                    <span>{int.eventsWeek} events this week</span>
                    <span>· {int.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="lc-empty">
                <i data-lucide="plug"></i>
                No integrations match this filter.
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selected && <IntegrationDetail int={selected} tab={tab} setTab={setTab} />}
      </div>
    </>
  );
}

Object.assign(window, { Integrations });
