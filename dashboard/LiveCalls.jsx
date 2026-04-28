const LIVE_CALLS = [
  {
    id: "C-7142", caller: "Marcus Reyes", phone: "(512) 555-0134", verdict: "Emergency", vClass: "warn",
    status: "live", duration: "1:48", elapsed: "in progress",
    intent: "Sewage backup — basement",
    location: "Austin, TX 78704", vertical: "Plumbing",
    summary: "Caller reports active sewage backup in basement. AI triaged as emergency, dispatching on-call tech.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState Plumbing — this is Iris. Are you experiencing an emergency right now?" },
      { who: "caller", t: "0:04", text: "Yeah — there's sewage coming up in my basement floor drain. It's getting bad fast." },
      { who: "ai",     t: "0:11", text: "I'm sorry, that sounds urgent. I'm classifying this as an emergency and pulling up our on-call tech. Can I get your address and a number to text the ETA to?" },
      { who: "caller", t: "0:21", text: "It's 4412 South Lamar, 78704. Phone's the one I called from." },
      { who: "ai",     t: "0:30", text: "Got it. I'm dispatching Diego — he's about 18 minutes out. While we wait, please don't run any water and stay away from the affected area. Anyone in the home with respiratory issues?" },
      { who: "caller", t: "0:47", text: "No, just me and my dog. Should I do anything else?" },
      { who: "ai",     t: "0:54", text: "If safe, shut off the main water valve. Diego will text when he's 5 minutes out. We'll bill on-site after the diagnosis. You're all set." },
    ],
    checks: [
      { ok: "pass", label: "Caller intent captured" },
      { ok: "pass", label: "Address verified" },
      { ok: "pass", label: "Emergency severity confirmed" },
      { ok: "pass", label: "Tech dispatched (Diego, ETA 18 min)" },
      { ok: "skip", label: "Payment method (collected on-site)" },
    ],
    actions: [
      { t: "0:32", icon: "ambulance",      text: "Tagged emergency in HubSpot · contact created" },
      { t: "0:35", icon: "send",           text: "Dispatched to Diego (on-call rotation)" },
      { t: "0:36", icon: "message-square", text: "Confirmation SMS sent to (512) 555-0134" },
      { t: "0:58", icon: "calendar-check", text: "Job created · Emergency #J-4412" },
    ],
  },
  {
    id: "C-7141", caller: "Anika Patel", phone: "(512) 555-0188", verdict: "Booked", vClass: "good",
    status: "live", duration: "2:41", elapsed: "in progress",
    intent: "Kitchen sink slow drain",
    location: "Round Rock, TX 78664", vertical: "Plumbing",
    summary: "Routine kitchen drain clog. Booked Tuesday 10am, standard rate disclosed and accepted.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState Plumbing — this is Iris. How can I help today?" },
      { who: "caller", t: "0:04", text: "Hi, my kitchen sink is draining really slowly. Not an emergency, but I'd like to get it fixed soon." },
      { who: "ai",     t: "0:13", text: "Got it — sounds like a clog. Has it been getting worse over time, or did it happen suddenly?" },
      { who: "caller", t: "0:19", text: "Gradual, over the past week or two." },
      { who: "ai",     t: "0:25", text: "Standard drain clear is $189 flat. I've got Tuesday at 10am or Wednesday at 2pm — what works?" },
      { who: "caller", t: "0:34", text: "Tuesday 10am works." },
      { who: "ai",     t: "0:38", text: "Booked. You'll get a confirmation text shortly. Anything else?" },
    ],
    checks: [
      { ok: "pass", label: "Service identified" },
      { ok: "pass", label: "Pricing disclosed and accepted" },
      { ok: "pass", label: "Appointment booked (Tue 10am)" },
      { ok: "pass", label: "Contact synced to HubSpot" },
    ],
    actions: [
      { t: "0:26", icon: "tag",             text: "Tagged: drain-clear, qualified" },
      { t: "0:39", icon: "calendar-check",  text: "Booked Tuesday Nov 12, 10:00 AM" },
      { t: "0:40", icon: "message-square",  text: "Confirmation SMS sent" },
      { t: "0:41", icon: "mail",            text: "Calendar invite emailed" },
    ],
  },
  {
    id: "C-7140", caller: "Dev Sharma", phone: "(737) 555-0121", verdict: "Quote req", vClass: "info",
    status: "completed", duration: "4:41", elapsed: "14 min ago",
    intent: "Water heater replacement",
    location: "Austin, TX 78745", vertical: "Plumbing",
    summary: "40-gal gas water heater quote. Routed to sales for in-home estimate Friday afternoon.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — this is Iris. How can I help?" },
      { who: "caller", t: "0:03", text: "Looking for a quote on a new water heater. Mine's 12 years old and starting to leak." },
      { who: "ai",     t: "0:10", text: "Got it. A few quick questions: gas or electric, and roughly how many gallons?" },
      { who: "caller", t: "0:17", text: "Gas, 40 gallon I think." },
      { who: "ai",     t: "0:22", text: "Standard install runs $1,400-$1,800 depending on code upgrades. We'd send a tech out for a free in-home estimate. Friday 2-4pm?" },
      { who: "caller", t: "0:38", text: "Yeah, Friday works." },
    ],
    checks: [
      { ok: "pass", label: "Service category identified" },
      { ok: "pass", label: "Specs captured (gas, 40 gal)" },
      { ok: "pass", label: "Estimate window booked" },
      { ok: "fail", label: "Financing offered (missed prompt)" },
    ],
    actions: [
      { t: "0:23", icon: "tag",            text: "Tagged: water-heater, quote-request" },
      { t: "0:39", icon: "calendar-check", text: "Estimate booked Fri Nov 15, 2-4 PM" },
      { t: "0:40", icon: "user-plus",      text: "Routed to sales (Marcus T.)" },
    ],
  },
  {
    id: "C-7139", caller: "Roberta Liu", phone: "(512) 555-0109", verdict: "Booked", vClass: "good",
    status: "completed", duration: "1:58", elapsed: "22 min ago",
    intent: "Leaky bathroom faucet",
    location: "Austin, TX 78751", vertical: "Plumbing",
    summary: "Routine faucet repair. Booked Wed 2pm.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — Iris speaking." },
      { who: "caller", t: "0:03", text: "Hi, I have a leaky bathroom faucet. Can you send someone?" },
      { who: "ai",     t: "0:09", text: "Of course. Hot side, cold side, or base?" },
      { who: "caller", t: "0:13", text: "The hot side, drips constantly." },
      { who: "ai",     t: "0:18", text: "Cartridge replacement — $145 flat. Wednesday 2pm work?" },
      { who: "caller", t: "0:28", text: "Perfect." },
    ],
    checks: [
      { ok: "pass", label: "Issue diagnosed" },
      { ok: "pass", label: "Pricing accepted" },
      { ok: "pass", label: "Booked (Wed 2pm)" },
      { ok: "pass", label: "CRM synced" },
    ],
    actions: [
      { t: "0:18", icon: "tag",            text: "Tagged: faucet-repair" },
      { t: "0:29", icon: "calendar-check", text: "Booked Wed Nov 13, 2:00 PM" },
      { t: "0:30", icon: "message-square", text: "Confirmation SMS sent" },
    ],
  },
  {
    id: "C-7138", caller: "Unknown", phone: "(888) 555-0042", verdict: "Spam", vClass: "mute",
    status: "completed", duration: "0:08", elapsed: "31 min ago",
    intent: "Robocall — filtered",
    location: "—", vertical: "—",
    summary: "Detected as robocall. Auto-hangup. No CRM entry created.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — Iris speaking." },
      { who: "caller", t: "0:03", text: "[automated voice detected]" },
      { who: "ai",     t: "0:05", text: "[call ended — spam filter]" },
    ],
    checks: [
      { ok: "pass", label: "Spam pattern detected" },
      { ok: "pass", label: "Call auto-terminated" },
      { ok: "skip", label: "CRM entry (none — spam)" },
    ],
    actions: [
      { t: "0:05", icon: "shield-x", text: "Spam filter triggered · call dropped" },
    ],
  },
  {
    id: "C-7137", caller: "Juno Kim", phone: "(737) 555-0144", verdict: "Not qual", vClass: "mute",
    status: "completed", duration: "1:12", elapsed: "41 min ago",
    intent: "Out of service area",
    location: "San Antonio, TX 78201", vertical: "Plumbing",
    summary: "Caller outside service radius. Referred to partner network. Added to nurture list.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — how can I help?" },
      { who: "caller", t: "0:04", text: "I need a plumber out in San Antonio." },
      { who: "ai",     t: "0:09", text: "We don't currently service San Antonio, but I can refer you to one of our trusted partners — would that help?" },
      { who: "caller", t: "0:18", text: "Sure, that'd be great." },
      { who: "ai",     t: "0:22", text: "Sending you a text with our partner's contact info now." },
    ],
    checks: [
      { ok: "pass", label: "Geo qualifier checked" },
      { ok: "pass", label: "Partner referral sent" },
      { ok: "pass", label: "Added to nurture list" },
    ],
    actions: [
      { t: "0:10", icon: "map-pin",         text: "Geo-disqualified · San Antonio out of radius" },
      { t: "0:23", icon: "message-square",  text: "Partner referral SMS sent" },
      { t: "0:24", icon: "tag",             text: "Tagged: nurture, out-of-area" },
    ],
  },
];

function LiveCalls() {
  const [filter, setFilter] = React.useState("all");
  const [selectedId, setSelectedId] = React.useState(LIVE_CALLS[0].id);
  const [tab, setTab] = React.useState("transcript");

  const filtered = LIVE_CALLS.filter(c => {
    if (filter === "all") return true;
    if (filter === "live") return c.status === "live";
    if (filter === "booked") return c.vClass === "good";
    if (filter === "emergency") return c.vClass === "warn";
    if (filter === "spam") return c.vClass === "mute" && c.verdict === "Spam";
    return true;
  });

  const selected = LIVE_CALLS.find(c => c.id === selectedId) || filtered[0];
  const liveCount = LIVE_CALLS.filter(c => c.status === "live").length;

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [selected, tab, filter]);

  return (
    <div className="live-split">
      {/* List */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Calls</h3>
            <div className="muted sm">{LIVE_CALLS.length} total · {liveCount} live now</div>
          </div>
          <div className="live-dot"><span className="dot"/> Live</div>
        </div>
        <div className="lc-filterbar">
          {[
            ["all", "All"], ["live", "Live"], ["booked", "Booked"],
            ["emergency", "Emergency"], ["spam", "Spam"],
          ].map(([k, label]) => (
            <button key={k}
                    className={"lc-filter" + (filter === k ? " active" : "")}
                    onClick={() => setFilter(k)}>
              {label}
            </button>
          ))}
        </div>
        <div className="lc-list">
          {filtered.length === 0 && (
            <div className="lc-empty">
              <i data-lucide="inbox"></i>
              No calls match this filter.
            </div>
          )}
          {filtered.map(c => (
            <div key={c.id}
                 className={"lc-row" + (c.id === selectedId ? " selected" : "") + (c.status === "live" ? " live" : "")}
                 onClick={() => setSelectedId(c.id)}>
              <div className="lc-row-top">
                <div className="lc-caller">
                  {c.status === "live" && <span className="lc-pulse"/>}
                  {c.caller}
                </div>
                <div className="lc-time">{c.elapsed}</div>
              </div>
              <div className="lc-summary">{c.summary}</div>
              <div className="lc-meta">
                <span className={"tag " + c.vClass}>{c.verdict}</span>
                <span className="lc-meta-sep">·</span>
                <span>{c.duration}</span>
                <span className="lc-meta-sep">·</span>
                <span>{c.vertical}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      {selected ? <CallDetail call={selected} tab={tab} setTab={setTab}/> : null}
    </div>
  );
}

function CallDetail({ call, tab, setTab }) {
  return (
    <div className="panel">
      <div className="lc-detail-head">
        <div>
          <div className="lc-detail-id">CALL {call.id}</div>
          <div className="lc-detail-name">
            {call.caller}
            {call.status === "live" && <span className="live-dot"><span className="dot"/> Live</span>}
            <span className={"tag " + call.vClass}>{call.verdict}</span>
          </div>
          <div className="lc-detail-meta">
            <span><b>Phone:</b> <span className="mono">{call.phone}</span></span>
            <span><b>Duration:</b> {call.duration}</span>
            <span><b>Vertical:</b> {call.vertical}</span>
            <span><b>Location:</b> {call.location}</span>
          </div>
        </div>
        <div className="head-actions">
          <button className="ghost-btn"><i data-lucide="phone-forwarded" style={{width:14,height:14}}></i> Transfer</button>
          <button className="ghost-btn"><i data-lucide="flag" style={{width:14,height:14}}></i> Flag</button>
          <button className="ghost-btn"><i data-lucide="external-link" style={{width:14,height:14}}></i> Open in CRM</button>
        </div>
      </div>

      <div className="lc-tabs">
        {[
          ["transcript", "Transcript"],
          ["summary",    "Summary"],
          ["actions",    "Actions"],
          ["qa",         "QA"],
        ].map(([k, label]) => (
          <button key={k}
                  className={"lc-tab" + (tab === k ? " active" : "")}
                  onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>

      <div className="lc-body">
        {tab === "transcript" && <TranscriptTab call={call}/>}
        {tab === "summary"    && <SummaryTab call={call}/>}
        {tab === "actions"    && <ActionsTab call={call}/>}
        {tab === "qa"         && <QATab call={call}/>}
      </div>
    </div>
  );
}

function TranscriptTab({ call }) {
  return (
    <>
      <Player live={call.status === "live"} duration={call.duration}/>
      <div className="lc-transcript">
        {call.transcript.map((m, i) => (
          <div key={i} className={"lc-msg " + m.who}>
            <div className="lc-msg-avatar">{m.who === "ai" ? "AI" : call.caller.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
            <div>
              <div className="lc-bubble">{m.text}</div>
              <div className="lc-msg-meta" style={{textAlign: m.who === "caller" ? "right" : "left"}}>{m.t}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Player({ live, duration }) {
  const [playing, setPlaying] = React.useState(live);
  const [progress, setProgress] = React.useState(live ? 78 : 0);
  const bars = 48;
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => p >= 100 ? (live ? 0 : 100) : p + 1.5), 120);
    return () => clearInterval(id);
  }, [playing, live]);
  const heights = React.useMemo(() => Array.from({length: bars}, () => 30 + Math.random() * 70), []);
  return (
    <div className="lc-player">
      <button className="lc-play-btn" onClick={() => setPlaying(p => !p)} aria-label={playing ? "Pause" : "Play"}>
        <i data-lucide={playing ? "pause" : "play"} style={{width:16,height:16}}></i>
      </button>
      <div className="lc-waveform">
        {heights.map((h, i) => (
          <span key={i}
                className={"lc-bar" + ((i / bars) * 100 <= progress ? " played" : "")}
                style={{height: `${h}%`}}/>
        ))}
      </div>
      <div className="lc-timer">
        {live ? <span style={{color: "var(--cyan-200)"}}>● LIVE</span> : duration}
      </div>
    </div>
  );
}

function SummaryTab({ call }) {
  return (
    <>
      <div className="lc-grid">
        <div className="lc-info-card">
          <div className="lc-info-label">Caller intent</div>
          <div className="lc-info-value lg">{call.intent}</div>
        </div>
        <div className="lc-info-card">
          <div className="lc-info-label">AI verdict</div>
          <div className="lc-info-value lg">{call.verdict}</div>
        </div>
        <div className="lc-info-card">
          <div className="lc-info-label">Vertical</div>
          <div className="lc-info-value">{call.vertical}</div>
        </div>
        <div className="lc-info-card">
          <div className="lc-info-label">Service location</div>
          <div className="lc-info-value">{call.location}</div>
        </div>
      </div>
      <div className="lc-section-title">Synopsis</div>
      <p style={{color:"var(--fg-2)", fontSize:14, lineHeight:1.65}}>{call.summary}</p>
    </>
  );
}

function ActionsTab({ call }) {
  return (
    <>
      <div className="lc-section-title">Automated actions taken</div>
      <div className="lc-actions">
        {call.actions.map((a, i) => (
          <div key={i} className="lc-action">
            <span className="lc-action-time">{a.t}</span>
            <span className="lc-action-icon">
              <i data-lucide={a.icon} style={{width:13,height:13}}></i>
            </span>
            <span>{a.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function QATab({ call }) {
  return (
    <>
      <div className="lc-section-title">Blueprint compliance</div>
      <div className="lc-checklist">
        {call.checks.map((c, i) => (
          <div key={i} className={"lc-check " + c.ok}>
            <span className="lc-check-icon">
              {c.ok === "pass" ? "✓" : c.ok === "fail" ? "✕" : "—"}
            </span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

Object.assign(window, { LiveCalls });
