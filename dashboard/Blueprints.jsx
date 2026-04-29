const BLUEPRINTS = [
  {
    id: "plumbing",
    name: "Plumbing Intake",
    vertical: "Plumbing",
    status: "active",
    icon: "wrench",
    lastEdited: "Nov 10, 2025",
    description: "Handles inbound calls for plumbing businesses. Verifies service area, triages urgency, and triggers emergency escalation or appointment booking.",
    phases: [
      {
        id: 1, name: "Identification",
        goal: "Capture name and service address before discussing the issue.",
        steps: [
          "Collect caller's full name",
          "Ask for full service address + ZIP code",
          "Do not discuss the problem until address is confirmed — service area must be verified first",
        ],
        tool: null, branch: false,
      },
      {
        id: 2, name: "Service Area Verification",
        goal: "Confirm the caller's ZIP is within the active service radius.",
        steps: [
          "Call check_service_availability(zip_code) immediately after collecting ZIP",
          "Out of area → apologize, offer partner referral, set urgency_level: unqualified, end call",
          "In area → proceed to Phase 3",
        ],
        tool: "check_service_availability", branch: true,
      },
      {
        id: 3, name: "Triage & Urgency",
        goal: "Classify issue severity using keyword matching against urgency definitions.",
        steps: [
          "Ask caller to describe the issue in their own words",
          "Emergency: flooding, sewage backup, burst pipe, no water, gas smell",
          "High: slow active drip, water heater failure, barely any pressure",
          "Default to standard for all other requests",
        ],
        tool: null, branch: false,
      },
      {
        id: 4, name: "Action Logic",
        goal: "Trigger the correct downstream action based on the urgency classification.",
        steps: [
          "Emergency → escalateToOnCall(), skip scheduling, confirm ETA within 15 min",
          "High / Standard → checkCalendar(), present 2 slots, confirm booking via SMS",
          "Unqualified → politely decline, offer referral, end call",
        ],
        tool: "escalateToOnCall / checkCalendar", branch: true,
      },
      {
        id: 5, name: "Metadata Output",
        goal: "Emit structured JSON block to CRM before ending the call.",
        steps: [
          "Output: caller_name, issue_description, urgency_level, service_address, industry",
          "Confirm the booking or escalation verbally",
          "End the call",
        ],
        tool: null, branch: false,
      },
    ],
    checks: [
      { label: "Caller name captured",       passRate: 100 },
      { label: "Address + ZIP collected",     passRate: 99  },
      { label: "Service area verified",       passRate: 100 },
      { label: "Urgency level classified",    passRate: 97  },
      { label: "Correct action triggered",    passRate: 96  },
      { label: "Pricing guardrail held",      passRate: 100 },
      { label: "Financing offered on quotes", passRate: 82  },
      { label: "Metadata emitted",           passRate: 100 },
    ],
    guardrails: [
      "Never give specific price quotes — refer to the on-site diagnostic starting at $89",
      "Never confirm dispatch without calling escalateToOnCall — verbal promises don't trigger real notifications",
      "No DIY troubleshooting advice — direct the caller to the on-site tech",
      "Decline all non-plumbing requests politely and end the call",
      "Do not discuss the issue before the service address is confirmed",
    ],
    perf: {
      callsTotal: 47, callsWeek: 10, avgDuration: "2:34",
      topMissed: "Financing offered on quotes", emergencyPct: 12,
    },
  },
  {
    id: "legal",
    name: "Legal Intake",
    vertical: "Personal Injury",
    status: "draft",
    icon: "scale",
    lastEdited: "Nov 8, 2025",
    description: "Handles inbound calls for personal injury and civil law firms. Conflict check is the highest-priority gate — it runs before any case facts are collected.",
    phases: [
      {
        id: 1, name: "Conflict Check",
        goal: "Collect opposing party name before any case details. No exceptions.",
        steps: [
          "Greet and collect caller's full name",
          "Ask for the name of the opposing/at-fault party before anything else",
          "Set conflict_check_required: true on every call — attorney must clear before follow-up",
          "Inform caller this is a standard step to verify no conflict of interest",
        ],
        tool: null, branch: false,
      },
      {
        id: 2, name: "Case Facts",
        goal: "Collect incident details only after Phase 1 is fully complete.",
        steps: [
          "Case type: auto-accident / slip-and-fall / medical-malpractice / other",
          "Incident date — set statute_risk: true if > 2 years ago, flag transparently",
          "Injury severity: none / minor / hospitalized / fatality",
          "One-sentence liability summary",
        ],
        tool: null, branch: false,
      },
      {
        id: 3, name: "Qualification & Action",
        goal: "Route the caller based on qualification criteria.",
        steps: [
          "High: injury confirmed + < 2 yrs + clear liability → callback within 2 business hours",
          "Standard: statute risk, unclear injury, or soft liability → callback within 1 business day",
          "Unqualified: no injury / at-fault caller / non-PI → decline and refer",
        ],
        tool: null, branch: true,
      },
      {
        id: 4, name: "Metadata Output",
        goal: "Emit structured JSON block including statute_risk and conflict_check_required.",
        steps: [
          "Output all required fields including statute_risk and conflict_check_required: true",
          "Confirm callback timing verbally",
          "End the call",
        ],
        tool: null, branch: false,
      },
    ],
    checks: [
      { label: "Conflict check run first (before case facts)", passRate: null },
      { label: "Case type classified",                         passRate: null },
      { label: "Incident date collected",                      passRate: null },
      { label: "Injury severity captured",                     passRate: null },
      { label: "Statute risk flagged if applicable",           passRate: null },
      { label: "No legal advice given",                        passRate: null },
      { label: "Correct urgency level set",                    passRate: null },
      { label: "Metadata emitted",                            passRate: null },
    ],
    guardrails: [
      "Never say 'You have a case' — say 'This is something our attorneys will want to review'",
      "Never promise a settlement amount or case outcome",
      "Never provide legal advice of any kind",
      "Conflict check MUST run before any case facts are collected — no exceptions",
      "If caller becomes emotional, acknowledge empathetically before continuing intake",
    ],
    perf: null,
  },
  {
    id: "med-spa",
    name: "Med-Spa Intake",
    vertical: "Medical Aesthetics",
    status: "active",
    icon: "sparkles",
    lastEdited: "Nov 9, 2025",
    description: "Handles inbound calls for medical aesthetics practices. Medical disqualification screen runs before any booking discussion. Upscale, warm tone throughout.",
    phases: [
      {
        id: 1, name: "Greeting & Service Interest",
        goal: "Identify service category before qualification or scheduling.",
        steps: [
          "Warm greeting — ask what brings them in",
          "Categorize: injectables / skin / body / general-inquiry",
        ],
        tool: null, branch: false,
      },
      {
        id: 2, name: "Medical Pre-Screen",
        goal: "Ask about pregnancy/breastfeeding before scheduling. No exceptions.",
        steps: [
          "Ask: 'Are you currently pregnant or breastfeeding?'",
          "YES → set medically_disqualified: true, end call warmly — do not proceed to scheduling",
          "NO → set medically_disqualified: false, continue to Phase 3",
        ],
        tool: null, branch: true,
      },
      {
        id: 3, name: "New vs. Returning",
        goal: "Determine client history and set appropriate calendar service type.",
        steps: [
          "New client → 15-min consultation required, service_type: med-spa-consultation",
          "Returning client → use service-specific calendar type for direct booking",
        ],
        tool: null, branch: false,
      },
      {
        id: 4, name: "Scheduling",
        goal: "Present two available slots and confirm the booking.",
        steps: [
          "Call checkCalendar(service_type, requested_date?)",
          "Present the two returned slots",
          "No availability → offer priority waitlist, set nurture_list: true",
        ],
        tool: "checkCalendar", branch: false,
      },
      {
        id: 5, name: "Deposit & Policy",
        goal: "State cancellation policy and collect deposit acknowledgement.",
        steps: [
          "State 24-hour cancellation policy before ending",
          "Send $50 deposit link via SMS — applied toward treatment",
          "Set urgency_level: standard",
        ],
        tool: null, branch: false,
      },
      {
        id: 6, name: "Metadata Output",
        goal: "Emit structured JSON including medically_disqualified and nurture_list.",
        steps: [
          "Output all fields including medically_disqualified and nurture_list",
          "End the call warmly",
        ],
        tool: null, branch: false,
      },
    ],
    checks: [
      { label: "Service category identified",        passRate: null },
      { label: "Medical pre-screen run first",       passRate: null },
      { label: "New / returning determined",         passRate: null },
      { label: "Correct calendar type used",         passRate: null },
      { label: "Deposit policy disclosed",           passRate: null },
      { label: "No medical advice given",            passRate: null },
      { label: "No price quotes beyond deposit",     passRate: null },
      { label: "Metadata emitted",                  passRate: null },
    ],
    guardrails: [
      "Never give medical advice of any kind",
      "Medically disqualified callers must never reach the scheduling step",
      "Never quote specific treatment prices beyond the $50 booking deposit",
      "Maintain luxury, upscale tone at all times — no slang or filler phrases",
      "Inquiry-only callers must be captured for email nurture before the call ends",
    ],
    perf: null,
  },
  {
    id: "property-mgmt",
    name: "Property Management",
    vertical: "Rental Properties",
    status: "draft",
    icon: "building-2",
    lastEdited: "Nov 7, 2025",
    description: "Handles inbound calls for property managers across three caller types: Tenants, Prospective Renters, and Owners. Caller category determines every downstream action.",
    phases: [
      {
        id: 1, name: "Identity & Routing",
        goal: "Identify caller category immediately — every phase depends on it.",
        steps: [
          "Ask: 'Are you a current tenant, someone interested in renting, or a property owner?'",
          "Collect name and property address in all cases",
          "Route to the correct sub-flow",
        ],
        tool: null, branch: true,
      },
      {
        id: 2, name: "Tenant — Maintenance / Lease",
        goal: "Emergency screen first, then schedule or route the lease question.",
        steps: [
          "Maintenance: emergency screen → escalateToOnCall() or checkCalendar()",
          "Collect entry permission: set entry_permission: true / false",
          "Lease question → route to leasing team, 1-day SLA",
        ],
        tool: "escalateToOnCall / checkCalendar", branch: true,
      },
      {
        id: 3, name: "Prospective Renter",
        goal: "Qualify on pets and income before offering the application link.",
        steps: [
          "Check pets policy — disqualify if property is pet-free and caller has pets",
          "Check income requirement — disqualify if criteria not met",
          "Both checks pass → send digital application link via SMS",
        ],
        tool: null, branch: true,
      },
      {
        id: 4, name: "Owner — Priority Escalation",
        goal: "Owners always receive high-priority handling via escalateToOnCall.",
        steps: [
          "Collect name and property address",
          "Call escalateToOnCall() → notify Business Dev Manager via SMS",
          "Confirm 30-minute personal callback to owner",
        ],
        tool: "escalateToOnCall", branch: false,
      },
      {
        id: 5, name: "Metadata Output",
        goal: "Emit structured JSON including caller_category and entry_permission.",
        steps: [
          "Output all required fields including caller_category",
          "Include entry_permission for all maintenance calls",
          "End the call",
        ],
        tool: null, branch: false,
      },
    ],
    checks: [
      { label: "Caller category identified first",     passRate: null },
      { label: "Emergency screen run for tenants",     passRate: null },
      { label: "Entry permission collected",           passRate: null },
      { label: "Pet + income check before app link",   passRate: null },
      { label: "Owner escalated (not standard queue)", passRate: null },
      { label: "Lease terms not negotiated",           passRate: null },
      { label: "Metadata emitted",                    passRate: null },
    ],
    guardrails: [
      "Never promise specific repair timelines — tech provides ETA after on-site assessment",
      "Owners must never be routed to the standard maintenance queue",
      "Never discuss rent pricing or negotiate lease terms — requires a human staff member",
      "Application link only after BOTH qualification checks pass — not as a consolation",
      "Stay calm and empathetic with frustrated tenants — do not escalate",
    ],
    perf: null,
  },
];

function CheckPassBar({ passRate }) {
  if (passRate === null) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="bp-track"><div className="bp-fill" style={{ width: "0%", background: "var(--indigo-a20)" }} /></div>
        <span className="bp-check-pct" style={{ color: "var(--fg-faint)" }}>—</span>
      </div>
    );
  }
  const color = passRate >= 95 ? "var(--cyan-200)" : passRate >= 80 ? "var(--amber-200)" : "var(--red-200)";
  const textClass = passRate >= 95 ? "good" : passRate >= 80 ? "gold" : "warn";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div className="bp-track">
        <div className="bp-fill" style={{ width: passRate + "%", background: color }} />
      </div>
      <span className={"bp-check-pct tag " + textClass} style={{ padding: "2px 7px" }}>{passRate}%</span>
    </div>
  );
}

function FlowTab({ bp }) {
  return (
    <div className="bp-flow">
      {bp.phases.map((ph, idx) => (
        <React.Fragment key={ph.id}>
          <div className="bp-phase-row">
            <div className="bp-num">{ph.id}</div>
            <div className={"bp-phase-card" + (ph.branch ? " branch" : "")}>
              <div className="bp-phase-name">
                {ph.name}
                {ph.branch && <span className="bp-branch">⇢ branches</span>}
              </div>
              <div className="bp-phase-goal">{ph.goal}</div>
              <div>
                {ph.steps.map((s, i) => (
                  <div key={i} className="bp-phase-step">{s}</div>
                ))}
              </div>
              {ph.tool && (
                <div className="bp-tool">
                  <i data-lucide="terminal" style={{ width: 11, height: 11 }}></i>
                  {ph.tool}
                </div>
              )}
            </div>
          </div>
          {idx < bp.phases.length - 1 && (
            <div style={{ display: "flex", gap: 14 }}>
              <div className="bp-connector" />
              <div style={{ flex: 1 }} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ChecksTab({ bp }) {
  const isDraft = bp.status === "draft" || bp.checks.every(c => c.passRate === null);
  return (
    <>
      {isDraft && (
        <div style={{ marginBottom: 16, padding: "10px 14px", background: "var(--indigo-a05)", border: "1px solid var(--indigo-a20)", borderRadius: 10, fontSize: 12, color: "var(--fg-muted)" }}>
          Blueprint is in <b>Draft</b> — pass rate data will appear once the blueprint is activated and calls are processed.
        </div>
      )}
      <div className="lc-section-title">QA compliance checks</div>
      <div>
        {bp.checks.map((c, i) => (
          <div key={i} className="bp-check-row">
            <span className="bp-check-label">{c.label}</span>
            <CheckPassBar passRate={c.passRate} />
          </div>
        ))}
      </div>
    </>
  );
}

function GuardrailsTab({ bp }) {
  return (
    <>
      <div className="lc-section-title">Active guardrails</div>
      <div>
        {bp.guardrails.map((g, i) => (
          <div key={i} className="bp-guardrail">
            <div className="bp-guardrail-icon">
              <i data-lucide="shield-alert" style={{ width: 12, height: 12 }}></i>
            </div>
            {g}
          </div>
        ))}
      </div>
    </>
  );
}

function PerformanceTab({ bp }) {
  if (!bp.perf) {
    return (
      <div className="lc-empty" style={{ paddingTop: 60 }}>
        <i data-lucide="bar-chart-2"></i>
        <div style={{ marginTop: 10, fontSize: 13, color: "var(--fg-muted)" }}>No call data yet.</div>
        <div style={{ marginTop: 4, fontSize: 12, color: "var(--fg-faint)" }}>Activate this blueprint to start collecting performance metrics.</div>
      </div>
    );
  }

  const p = bp.perf;
  const sortedChecks = [...bp.checks].sort((a, b) => (a.passRate ?? 101) - (b.passRate ?? 101));

  return (
    <>
      <div className="lc-grid">
        {[
          { label: "Calls this week",    value: String(p.callsWeek)      },
          { label: "Total calls",        value: String(p.callsTotal)     },
          { label: "Avg call duration",  value: p.avgDuration            },
          { label: "Emergency rate",     value: p.emergencyPct + "%"     },
        ].map(c => (
          <div key={c.label} className="lc-info-card">
            <div className="lc-info-label">{c.label}</div>
            <div className="lc-info-value lg">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="lc-section-title" style={{ marginTop: 18 }}>Check pass rates — sorted by performance</div>
      <div>
        {sortedChecks.map((c, i) => (
          <div key={i} className="bp-check-row">
            <span className="bp-check-label">{c.label}</span>
            <CheckPassBar passRate={c.passRate} />
          </div>
        ))}
      </div>

      {p.topMissed && (
        <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(253,230,138,0.06)", border: "1px solid rgba(253,230,138,0.2)", borderRadius: 10, fontSize: 13, color: "var(--amber-200)", lineHeight: 1.6 }}>
          <b>Top missed check:</b> "{p.topMissed}" — review the prompt in the Flow tab and add an explicit reminder step.
        </div>
      )}
    </>
  );
}

function BlueprintDetail({ bp, tab, setTab }) {
  const isActive = bp.status === "active";
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [bp, tab]);

  return (
    <div className="panel">
      <div className="lc-detail-head">
        <div>
          <div className="lc-detail-id">BLUEPRINT · {bp.vertical.toUpperCase()}</div>
          <div className="lc-detail-name">
            {bp.name}
            <span className={"tag " + (isActive ? "good" : "mute")}>
              {isActive ? "Active" : "Draft"}
            </span>
          </div>
          <div className="lc-detail-meta">
            <span><b>Vertical:</b> {bp.vertical}</span>
            <span><b>Last edited:</b> {bp.lastEdited}</span>
            {bp.perf && <span><b>Pass rate:</b> {bp.perf.callsWeek > 0 ? bp.passRate + "%" : "—"}</span>}
            {bp.perf && <span><b>Calls this week:</b> {bp.perf.callsWeek}</span>}
          </div>
        </div>
        <div className="head-actions">
          <button className="ghost-btn"><i data-lucide="file-edit" style={{ width: 13, height: 13 }}></i> Edit prompt</button>
          <button className="ghost-btn"><i data-lucide="copy" style={{ width: 13, height: 13 }}></i> Duplicate</button>
          <button className={"ghost-btn" + (isActive ? "" : " active")} style={isActive ? {} : { borderColor: "rgba(165,243,252,0.4)", color: "var(--cyan-200)" }}>
            <i data-lucide={isActive ? "pause-circle" : "play-circle"} style={{ width: 13, height: 13 }}></i>
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>

      <div className="lc-tabs">
        {[["flow", "Flow"], ["checks", "Checks"], ["guardrails", "Guardrails"], ["performance", "Performance"]].map(([k, label]) => (
          <button key={k}
            className={"lc-tab" + (tab === k ? " active" : "")}
            onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>

      <div className="lc-body">
        {tab === "flow"        && <FlowTab bp={bp} />}
        {tab === "checks"      && <ChecksTab bp={bp} />}
        {tab === "guardrails"  && <GuardrailsTab bp={bp} />}
        {tab === "performance" && <PerformanceTab bp={bp} />}
      </div>
    </div>
  );
}

function Blueprints() {
  const [filter, setFilter]       = React.useState("all");
  const [selectedId, setSelectedId] = React.useState("plumbing");
  const [tab, setTab]             = React.useState("flow");

  const filtered = BLUEPRINTS.filter(bp =>
    filter === "all"    ? true :
    filter === "active" ? bp.status === "active" :
    filter === "draft"  ? bp.status === "draft"  : true
  );
  const selected = BLUEPRINTS.find(bp => bp.id === selectedId) || filtered[0];

  const activeCount  = BLUEPRINTS.filter(b => b.status === "active").length;
  const draftCount   = BLUEPRINTS.filter(b => b.status === "draft").length;
  const callsWeek    = BLUEPRINTS.reduce((s, b) => s + (b.perf?.callsWeek ?? 0), 0);
  const activePRs    = BLUEPRINTS.filter(b => b.perf?.passRate != null);
  const avgPassRate  = activePRs.length
    ? Math.round(activePRs.reduce((s, b) => s + b.passRate, 0) / activePRs.length)
    : null;
  const topMissedPct = BLUEPRINTS.flatMap(b => b.checks).filter(c => c.passRate !== null)
    .reduce((low, c) => (c.passRate < (low?.passRate ?? 101) ? c : low), null);

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [selected, tab, filter]);

  return (
    <>
      {/* KPI row */}
      <section className="kpi-row">
        {[
          { label: "Active blueprints",  value: String(activeCount),                      sub: draftCount + " in draft",           delta: "up"   },
          { label: "Calls this week",    value: String(callsWeek),                        sub: "across active blueprints",         delta: "up"   },
          { label: "Avg QA pass rate",   value: avgPassRate != null ? avgPassRate + "%" : "—", sub: "active blueprints only",      delta: avgPassRate && avgPassRate >= 90 ? "up" : "down" },
          { label: "Lowest check",       value: topMissedPct ? topMissedPct.passRate + "%" : "—", sub: topMissedPct?.label ?? "no data yet", delta: "down" },
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

        {/* Blueprint list */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>Blueprints</h3>
              <div className="muted sm">{BLUEPRINTS.length} total · {activeCount} active</div>
            </div>
            <button className="primary-btn" style={{ padding: "8px 14px", fontSize: 12 }}>
              <i data-lucide="plus" style={{ width: 13, height: 13, verticalAlign: "middle", marginRight: 5 }}></i>
              New
            </button>
          </div>

          <div className="lc-filterbar">
            {[["all", "All"], ["active", "Active"], ["draft", "Draft"]].map(([k, label]) => (
              <button key={k}
                className={"lc-filter" + (filter === k ? " active" : "")}
                onClick={() => setFilter(k)}>
                {label}
              </button>
            ))}
          </div>

          <div className="bp-list">
            {filtered.map(bp => {
              const isActive = bp.status === "active";
              return (
                <div key={bp.id}
                  className={"bp-list-row" + (bp.id === selectedId ? " selected" : "")}
                  onClick={() => { setSelectedId(bp.id); setTab("flow"); }}>
                  <div className="bp-icon">
                    <i data-lucide={bp.icon} style={{ width: 16, height: 16 }}></i>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="bp-list-name">
                      {bp.name}
                      <span className={"tag " + (isActive ? "good" : "mute")}>{isActive ? "Active" : "Draft"}</span>
                    </div>
                    <div className="bp-list-sub">{bp.vertical}</div>
                    <div className="bp-list-foot">
                      {bp.perf
                        ? <><span className={"tag " + (bp.passRate >= 90 ? "good" : "gold")} style={{ fontSize: 10 }}>{bp.passRate}% QA</span><span>·</span><span>{bp.perf.callsWeek} calls this week</span></>
                        : <span>No call data yet</span>
                      }
                      <span>· edited {bp.lastEdited}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected && <BlueprintDetail bp={selected} tab={tab} setTab={setTab} />}
      </div>
    </>
  );
}

Object.assign(window, { Blueprints });
