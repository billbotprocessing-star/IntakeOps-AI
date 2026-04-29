const RECORDINGS = [
  {
    id: "R-7142", caller: "Marcus Reyes", phone: "(512) 555-0134",
    date: "Tue Nov 12", time: "11:04 AM", duration: "1:48",
    verdict: "Emergency", vClass: "warn", aiScore: 98, flagged: false,
    intent: "Sewage backup — basement",
    location: "Austin, TX 78704", vertical: "Plumbing",
    summary: "Caller reported active sewage backup in basement. AI triaged as emergency and dispatched on-call tech Diego within 35 seconds. All compliance checks passed.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState Plumbing — this is Iris. Are you experiencing an emergency right now?" },
      { who: "caller", t: "0:04", text: "Yeah — there's sewage coming up in my basement floor drain. It's getting bad fast." },
      { who: "ai",     t: "0:11", text: "I'm sorry, that sounds urgent. I'm classifying this as an emergency and pulling up our on-call tech. Can I get your address and a number to text the ETA to?" },
      { who: "caller", t: "0:21", text: "It's 4412 South Lamar, 78704. Phone's the one I called from." },
      { who: "ai",     t: "0:30", text: "Got it. I'm dispatching Diego — he's about 18 minutes out. Please don't run any water. Diego will text when he's 5 minutes out." },
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
    id: "R-7141", caller: "Anika Patel", phone: "(512) 555-0188",
    date: "Tue Nov 12", time: "10:39 AM", duration: "2:41",
    verdict: "Booked", vClass: "good", aiScore: 100, flagged: false,
    intent: "Kitchen sink slow drain",
    location: "Round Rock, TX 78664", vertical: "Plumbing",
    summary: "Routine kitchen drain clog. Booked Tuesday 10am, standard rate disclosed and accepted. All intake fields captured cleanly.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState Plumbing — this is Iris. How can I help today?" },
      { who: "caller", t: "0:04", text: "Hi, my kitchen sink is draining really slowly." },
      { who: "ai",     t: "0:09", text: "Got it — sounds like a clog. Has it been getting worse over time, or did it happen suddenly?" },
      { who: "caller", t: "0:15", text: "Gradual, over the past week or two." },
      { who: "ai",     t: "0:22", text: "Standard drain clear is $189 flat. I've got Tuesday at 10am or Wednesday at 2pm — what works?" },
      { who: "caller", t: "0:30", text: "Tuesday 10am works." },
      { who: "ai",     t: "0:34", text: "Booked. You'll get a confirmation text shortly. Anything else?" },
    ],
    checks: [
      { ok: "pass", label: "Service identified" },
      { ok: "pass", label: "Pricing disclosed and accepted" },
      { ok: "pass", label: "Appointment booked (Tue 10am)" },
      { ok: "pass", label: "Contact synced to HubSpot" },
    ],
    actions: [
      { t: "0:23", icon: "tag",            text: "Tagged: drain-clear, qualified" },
      { t: "0:31", icon: "calendar-check", text: "Booked Tuesday Nov 12, 10:00 AM" },
      { t: "0:32", icon: "message-square", text: "Confirmation SMS sent" },
      { t: "0:33", icon: "mail",           text: "Calendar invite emailed" },
    ],
  },
  {
    id: "R-7140", caller: "Dev Sharma", phone: "(737) 555-0121",
    date: "Tue Nov 12", time: "10:22 AM", duration: "4:41",
    verdict: "Quote req", vClass: "info", aiScore: 82, flagged: true,
    intent: "Water heater replacement",
    location: "Austin, TX 78745", vertical: "Plumbing",
    summary: "40-gal gas water heater quote. Routed to sales for in-home estimate Friday afternoon. AI missed financing offer prompt — flagged for coach review.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — this is Iris. How can I help?" },
      { who: "caller", t: "0:03", text: "Looking for a quote on a new water heater. Mine's 12 years old and starting to leak." },
      { who: "ai",     t: "0:10", text: "Got it. Gas or electric, and roughly how many gallons?" },
      { who: "caller", t: "0:17", text: "Gas, 40 gallon I think." },
      { who: "ai",     t: "0:22", text: "Standard install runs $1,400–$1,800. We'd send a tech for a free in-home estimate. Friday 2–4pm?" },
      { who: "caller", t: "0:38", text: "Yeah, Friday works." },
      { who: "ai",     t: "0:42", text: "Great — booked. You'll receive a confirmation text shortly." },
    ],
    checks: [
      { ok: "pass", label: "Service category identified" },
      { ok: "pass", label: "Specs captured (gas, 40 gal)" },
      { ok: "pass", label: "Estimate window booked" },
      { ok: "fail", label: "Financing offered (missed prompt)" },
    ],
    actions: [
      { t: "0:23", icon: "tag",            text: "Tagged: water-heater, quote-request" },
      { t: "0:39", icon: "calendar-check", text: "Estimate booked Fri Nov 15, 2–4 PM" },
      { t: "0:40", icon: "user-plus",      text: "Routed to sales (Marcus T.)" },
      { t: "0:41", icon: "flag",           text: "Flagged for QA review · missed financing prompt" },
    ],
  },
  {
    id: "R-7139", caller: "Roberta Liu", phone: "(512) 555-0109",
    date: "Tue Nov 12", time: "9:58 AM", duration: "1:58",
    verdict: "Booked", vClass: "good", aiScore: 100, flagged: false,
    intent: "Leaky bathroom faucet",
    location: "Austin, TX 78751", vertical: "Plumbing",
    summary: "Routine faucet repair. Booked Wed 2pm at $145 flat. Clean intake with all required fields captured.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — Iris speaking." },
      { who: "caller", t: "0:03", text: "Hi, I have a leaky bathroom faucet. Can you send someone?" },
      { who: "ai",     t: "0:09", text: "Of course. Hot side, cold side, or base?" },
      { who: "caller", t: "0:13", text: "The hot side, drips constantly." },
      { who: "ai",     t: "0:18", text: "Cartridge replacement — $145 flat. Wednesday 2pm work?" },
      { who: "caller", t: "0:28", text: "Perfect." },
      { who: "ai",     t: "0:32", text: "Booked. Confirmation on its way." },
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
    id: "R-7138", caller: "Unknown", phone: "(888) 555-0042",
    date: "Tue Nov 12", time: "9:47 AM", duration: "0:08",
    verdict: "Spam", vClass: "mute", aiScore: 100, flagged: false,
    intent: "Robocall — filtered",
    location: "—", vertical: "—",
    summary: "Detected as robocall in 5 seconds. Auto-hangup executed. No CRM entry created.",
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
    id: "R-7137", caller: "Juno Kim", phone: "(737) 555-0144",
    date: "Tue Nov 12", time: "9:31 AM", duration: "1:12",
    verdict: "Not qual", vClass: "mute", aiScore: 95, flagged: false,
    intent: "Out of service area",
    location: "San Antonio, TX 78201", vertical: "Plumbing",
    summary: "Caller outside service radius. Partner referral sent via SMS. Added to nurture list for potential expansion coverage.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — how can I help?" },
      { who: "caller", t: "0:04", text: "I need a plumber out in San Antonio." },
      { who: "ai",     t: "0:09", text: "We don't currently service San Antonio, but I can refer you to a trusted partner — would that help?" },
      { who: "caller", t: "0:18", text: "Sure, that'd be great." },
      { who: "ai",     t: "0:22", text: "Sending you a text with our partner's contact info now. We hope to expand to your area soon!" },
    ],
    checks: [
      { ok: "pass", label: "Geo qualifier checked" },
      { ok: "pass", label: "Partner referral sent" },
      { ok: "pass", label: "Added to nurture list" },
      { ok: "skip", label: "Booking (out of area)" },
    ],
    actions: [
      { t: "0:10", icon: "map-pin",        text: "Geo-disqualified · San Antonio out of radius" },
      { t: "0:23", icon: "message-square", text: "Partner referral SMS sent" },
      { t: "0:24", icon: "tag",            text: "Tagged: nurture, out-of-area" },
    ],
  },
  {
    id: "R-7136", caller: "Priya Wallace", phone: "(512) 555-0156",
    date: "Mon Nov 11", time: "3:18 PM", duration: "3:22",
    verdict: "Booked", vClass: "good", aiScore: 96, flagged: false,
    intent: "Slab leak inspection",
    location: "Austin, TX 78758", vertical: "Plumbing",
    summary: "Customer flagged high water bill and warm floor. AI correctly triaged as potential slab leak and booked inspection at $350, credited toward repair if proceeding.",
    transcript: [
      { who: "ai",     t: "0:00", text: "Thanks for calling FlowState — Iris here. What's going on today?" },
      { who: "caller", t: "0:05", text: "My water bill shot up $200 last month and part of my floor feels warm." },
      { who: "ai",     t: "0:14", text: "Those are classic signs of a slab leak — a pipe running beneath your foundation. We'd want eyes on it quickly. Can I schedule an inspection?" },
      { who: "caller", t: "0:28", text: "Yes please. How much is the inspection?" },
      { who: "ai",     t: "0:33", text: "The inspection is $350 and we apply it toward the repair if you proceed. Thursday 9am work?" },
      { who: "caller", t: "0:44", text: "Thursday 9am is perfect." },
    ],
    checks: [
      { ok: "pass", label: "Symptoms captured" },
      { ok: "pass", label: "Slab leak correctly triaged" },
      { ok: "pass", label: "Inspection fee disclosed" },
      { ok: "pass", label: "Booked (Thu 9am)" },
      { ok: "pass", label: "CRM synced" },
    ],
    actions: [
      { t: "0:15", icon: "alert-triangle", text: "Flagged: potential slab leak — priority" },
      { t: "0:34", icon: "tag",            text: "Tagged: slab-leak, inspection" },
      { t: "0:45", icon: "calendar-check", text: "Booked Thu Nov 14, 9:00 AM (Marcus T.)" },
      { t: "0:46", icon: "message-square", text: "Confirmation SMS + prep instructions sent" },
    ],
  },
  {
    id: "R-7135", caller: "Sanjay Bhat", phone: "(512) 555-0199",
    date: "Mon Nov 11", time: "2:04 PM", duration: "2:15",
    verdict: "Booked", vClass: "good", aiScore: 100, flagged: false,
    intent: "Garbage disposal install",
    location: "Austin, TX 78704", vertical: "Plumbing",
    summary: "New disposal install for kitchen remodel. AI presented upsell to InSinkErator Pro — accepted. Booked Tuesday morning with Renee.",
    transcript: [
      { who: "ai",     t: "0:00", text: "FlowState Plumbing, Iris speaking — how can I help?" },
      { who: "caller", t: "0:04", text: "Need a garbage disposal installed. Kitchen remodel — there isn't one currently." },
      { who: "ai",     t: "0:12", text: "New install is $320 for a standard unit, or $425 for our InSinkErator Pro with a 5-year warranty. Which sounds better?" },
      { who: "caller", t: "0:22", text: "The Pro sounds good actually." },
      { who: "ai",     t: "0:27", text: "Great choice. We have tomorrow at 9am — does that work?" },
      { who: "caller", t: "0:32", text: "That works." },
    ],
    checks: [
      { ok: "pass", label: "Service identified" },
      { ok: "pass", label: "Upsell presented and accepted" },
      { ok: "pass", label: "Pricing confirmed ($425)" },
      { ok: "pass", label: "Booked (Tue 9am)" },
      { ok: "pass", label: "CRM synced" },
    ],
    actions: [
      { t: "0:13", icon: "tag",            text: "Tagged: disposal-install, upsell-success" },
      { t: "0:28", icon: "dollar-sign",    text: "Upsell recorded · +$105 vs standard" },
      { t: "0:33", icon: "calendar-check", text: "Booked Tue Nov 12, 9:00 AM (Renee S.)" },
      { t: "0:34", icon: "message-square", text: "Confirmation SMS sent" },
    ],
  },
  {
    id: "R-7134", caller: "Jamal Foster", phone: "(737) 555-0133",
    date: "Mon Nov 11", time: "11:49 AM", duration: "3:05",
    verdict: "Booked", vClass: "good", aiScore: 88, flagged: true,
    intent: "Toilet replacement",
    location: "Austin, TX 78722", vertical: "Plumbing",
    summary: "Toilet replacement booked Wednesday 8am. AI captured comfort-height need after caller volunteered it, but did not proactively ask — flagged for blueprint update.",
    transcript: [
      { who: "ai",     t: "0:00", text: "FlowState Plumbing — Iris here. What can I do for you?" },
      { who: "caller", t: "0:04", text: "I need my toilet replaced. It runs constantly and it's pretty old." },
      { who: "ai",     t: "0:10", text: "Running toilets usually mean a worn flapper or fill valve — is this definitely a full swap?" },
      { who: "caller", t: "0:18", text: "Yes, full swap. Also my mom uses a walker so we need the taller style." },
      { who: "ai",     t: "0:25", text: "Understood — comfort height. Standard replacement is $540 installed. Wednesday 8am?" },
      { who: "caller", t: "0:35", text: "Wednesday 8am works." },
    ],
    checks: [
      { ok: "pass", label: "Service identified" },
      { ok: "pass", label: "Comfort height noted" },
      { ok: "pass", label: "Pricing confirmed" },
      { ok: "pass", label: "Booked (Wed 8am)" },
      { ok: "fail", label: "ADA/accessibility need proactively asked" },
    ],
    actions: [
      { t: "0:26", icon: "tag",            text: "Tagged: toilet-replace, comfort-height" },
      { t: "0:36", icon: "calendar-check", text: "Booked Wed Nov 13, 8:00 AM (Renee S.)" },
      { t: "0:37", icon: "message-square", text: "Confirmation SMS sent" },
      { t: "0:38", icon: "flag",           text: "Flagged: ADA need not proactively asked" },
    ],
  },
  {
    id: "R-7133", caller: "Carla Mendez", phone: "(512) 555-0120",
    date: "Mon Nov 11", time: "9:12 AM", duration: "5:30",
    verdict: "Quote req", vClass: "info", aiScore: 91, flagged: false,
    intent: "Repipe estimate — whole-home",
    location: "Austin, TX 78723", vertical: "Plumbing",
    summary: "Major re-pipe estimate for 1960s galvanized home. Routed to senior tech for on-site quote Wednesday. Financing options correctly discussed.",
    transcript: [
      { who: "ai",     t: "0:00", text: "FlowState — this is Iris. How can I help?" },
      { who: "caller", t: "0:06", text: "We bought an older home — 1962 — and we think we need the whole thing re-piped. Water pressure is terrible." },
      { who: "ai",     t: "0:17", text: "For homes that age, galvanized steel is usually the culprit — it corrodes from the inside. I can have our senior tech do a free assessment. What's the home's square footage?" },
      { who: "caller", t: "0:35", text: "About 1,800 square feet, one story." },
      { who: "ai",     t: "0:41", text: "Expect $8,000–$14,000 for a full PEX re-pipe. We also offer 0% financing for 18 months. Wednesday afternoon for an estimate?" },
      { who: "caller", t: "0:58", text: "Yes, Wednesday is good." },
    ],
    checks: [
      { ok: "pass", label: "Scope confirmed (whole-home)" },
      { ok: "pass", label: "Square footage captured" },
      { ok: "pass", label: "Ballpark range given" },
      { ok: "pass", label: "Financing mentioned" },
      { ok: "pass", label: "Senior tech estimate booked (Wed)" },
    ],
    actions: [
      { t: "0:18", icon: "tag",            text: "Tagged: repipe, large-job, senior-tech" },
      { t: "0:42", icon: "dollar-sign",    text: "Range estimate logged: $8k–$14k" },
      { t: "0:59", icon: "calendar-check", text: "Estimate booked Wed Nov 13, 2:00 PM (Marcus T.)" },
      { t: "1:00", icon: "user-plus",      text: "Routed to senior sales queue" },
    ],
  },
];

function AiScore({ score }) {
  const cls = score >= 95 ? "good" : score >= 80 ? "gold" : "warn";
  return <span className={"tag " + cls}>AI {score}%</span>;
}

function RecPlayer({ duration }) {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const bars = 48;
  const heights = React.useMemo(() => Array.from({ length: bars }, () => 30 + Math.random() * 70), []);

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => p >= 100 ? 100 : p + 1.2), 120);
    return () => clearInterval(id);
  }, [playing]);

  React.useEffect(() => { setPlaying(false); setProgress(0); }, [duration]);

  return (
    <div className="lc-player">
      <button className="lc-play-btn" onClick={() => setPlaying(p => !p)} aria-label={playing ? "Pause" : "Play"}>
        <i data-lucide={playing ? "pause" : "play"} style={{ width: 16, height: 16 }}></i>
      </button>
      <div className="lc-waveform">
        {heights.map((h, i) => (
          <span key={i}
            className={"lc-bar" + ((i / bars) * 100 <= progress ? " played" : "")}
            style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="lc-timer">{duration}</div>
    </div>
  );
}

function RecTranscriptTab({ rec }) {
  return (
    <>
      <RecPlayer duration={rec.duration} />
      <div className="lc-transcript">
        {rec.transcript.map((m, i) => (
          <div key={i} className={"lc-msg " + m.who}>
            <div className="lc-msg-avatar">
              {m.who === "ai" ? "AI" : rec.caller.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="lc-bubble">{m.text}</div>
              <div className="lc-msg-meta" style={{ textAlign: m.who === "caller" ? "right" : "left" }}>{m.t}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RecSummaryTab({ rec }) {
  return (
    <>
      <div className="lc-grid">
        <div className="lc-info-card">
          <div className="lc-info-label">Caller intent</div>
          <div className="lc-info-value lg">{rec.intent}</div>
        </div>
        <div className="lc-info-card">
          <div className="lc-info-label">AI verdict</div>
          <div className="lc-info-value lg">{rec.verdict}</div>
        </div>
        <div className="lc-info-card">
          <div className="lc-info-label">AI score</div>
          <div className="lc-info-value lg"><AiScore score={rec.aiScore} /></div>
        </div>
        <div className="lc-info-card">
          <div className="lc-info-label">Service location</div>
          <div className="lc-info-value">{rec.location}</div>
        </div>
      </div>
      <div className="lc-section-title">Synopsis</div>
      <p style={{ color: "var(--fg-2)", fontSize: 14, lineHeight: 1.65 }}>{rec.summary}</p>
    </>
  );
}

function RecActionsTab({ rec }) {
  return (
    <>
      <div className="lc-section-title">Automated actions taken</div>
      <div className="lc-actions">
        {rec.actions.map((a, i) => (
          <div key={i} className="lc-action">
            <span className="lc-action-time">{a.t}</span>
            <span className="lc-action-icon">
              <i data-lucide={a.icon} style={{ width: 13, height: 13 }}></i>
            </span>
            <span>{a.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function RecQATab({ rec }) {
  const passed  = rec.checks.filter(c => c.ok === "pass").length;
  const failed  = rec.checks.filter(c => c.ok === "fail").length;
  const skipped = rec.checks.filter(c => c.ok === "skip").length;
  return (
    <>
      <div className="lc-grid" style={{ marginBottom: 16 }}>
        <div className="lc-info-card">
          <div className="lc-info-label">AI score</div>
          <div className="lc-info-value lg"><AiScore score={rec.aiScore} /></div>
        </div>
        <div className="lc-info-card">
          <div className="lc-info-label">Check results</div>
          <div className="lc-info-value">{passed} passed · {failed} failed · {skipped} skipped</div>
        </div>
      </div>
      <div className="lc-section-title">Blueprint compliance</div>
      <div className="lc-checklist">
        {rec.checks.map((c, i) => (
          <div key={i} className={"lc-check " + c.ok}>
            <span className="lc-check-icon">
              {c.ok === "pass" ? "✓" : c.ok === "fail" ? "✕" : "—"}
            </span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>
      {failed > 0 && (
        <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(254,202,202,0.06)", border: "1px solid rgba(254,202,202,0.2)", borderRadius: 10, fontSize: 13, color: "var(--red-200)", lineHeight: 1.6 }}>
          <b>Coaching note:</b> {failed} check{failed > 1 ? "s" : ""} failed. Review the flagged section of the transcript and update the AI prompt via Blueprints.
        </div>
      )}
    </>
  );
}

function RecordingDetail({ rec, tab, setTab }) {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [rec, tab]);

  return (
    <div className="panel">
      <div className="lc-detail-head">
        <div>
          <div className="lc-detail-id">RECORDING {rec.id}</div>
          <div className="lc-detail-name">
            {rec.caller}
            <span className={"tag " + rec.vClass}>{rec.verdict}</span>
            {rec.flagged && <span className="tag gold">⚑ Flagged</span>}
          </div>
          <div className="lc-detail-meta">
            <span><b>Phone:</b> <span className="mono">{rec.phone}</span></span>
            <span><b>Date:</b> {rec.date} · {rec.time}</span>
            <span><b>Duration:</b> {rec.duration}</span>
            <span><b>Location:</b> {rec.location}</span>
          </div>
        </div>
        <div className="head-actions">
          <button className="ghost-btn"><i data-lucide="download" style={{ width: 14, height: 14 }}></i> Download</button>
          <button className="ghost-btn"><i data-lucide="flag" style={{ width: 14, height: 14 }}></i> Flag</button>
          <button className="ghost-btn"><i data-lucide="external-link" style={{ width: 14, height: 14 }}></i> Open in CRM</button>
        </div>
      </div>

      <div className="lc-tabs">
        {[["transcript", "Transcript"], ["summary", "Summary"], ["actions", "Actions"], ["qa", "QA"]].map(([k, label]) => (
          <button key={k}
            className={"lc-tab" + (tab === k ? " active" : "")}
            onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>

      <div className="lc-body">
        {tab === "transcript" && <RecTranscriptTab rec={rec} />}
        {tab === "summary"    && <RecSummaryTab rec={rec} />}
        {tab === "actions"    && <RecActionsTab rec={rec} />}
        {tab === "qa"         && <RecQATab rec={rec} />}
      </div>
    </div>
  );
}

function Recordings() {
  const [filter, setFilter]     = React.useState("all");
  const [search, setSearch]     = React.useState("");
  const [selectedId, setSelectedId] = React.useState(RECORDINGS[0].id);
  const [tab, setTab]           = React.useState("transcript");

  const filtered = RECORDINGS.filter(r => {
    const matchFilter =
      filter === "all"       ? true :
      filter === "booked"    ? r.vClass === "good" :
      filter === "emergency" ? r.vClass === "warn" :
      filter === "quote"     ? r.vClass === "info" :
      filter === "flagged"   ? r.flagged :
      filter === "spam"      ? r.verdict === "Spam" :
      true;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      r.caller.toLowerCase().includes(q) ||
      r.intent.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const selected = RECORDINGS.find(r => r.id === selectedId) || filtered[0];

  const totalCalls   = RECORDINGS.length;
  const bookedCount  = RECORDINGS.filter(r => r.vClass === "good").length;
  const bookedRate   = Math.round(bookedCount / totalCalls * 100);
  const flaggedCount = RECORDINGS.filter(r => r.flagged).length;
  const passRate     = Math.round(
    RECORDINGS.filter(r => r.checks.every(c => c.ok !== "fail")).length / totalCalls * 100
  );

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [selected, tab, filter, search]);

  return (
    <>
      {/* KPI row */}
      <section className="kpi-row">
        {[
          { label: "Recordings this week", value: String(totalCalls), sub: "all calls captured",      delta: "up"   },
          { label: "Total talk time",       value: "2h 14m",           sub: "this week",               delta: "up"   },
          { label: "AI-booked rate",        value: bookedRate + "%",   sub: "of qualified calls",      delta: "up"   },
          { label: "QA pass rate",          value: passRate + "%",     sub: flaggedCount + " flagged", delta: flaggedCount ? "down" : "up" },
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
              <h3>All Recordings</h3>
              <div className="muted sm">{totalCalls} calls · 2h 14m total</div>
            </div>
            <button className="ghost-btn">
              <i data-lucide="download" style={{ width: 13, height: 13 }}></i> Export
            </button>
          </div>

          {/* Search bar */}
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--indigo-a10)" }}>
            <div className="search-input" style={{ maxWidth: "100%", minWidth: 0 }}>
              <i data-lucide="search" style={{ width: 14, height: 14 }}></i>
              <input
                placeholder="Search caller, intent, ID…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-faint)", padding: 0, display: "flex" }}>
                  <i data-lucide="x" style={{ width: 12, height: 12 }}></i>
                </button>
              )}
            </div>
          </div>

          {/* Filter bar */}
          <div className="lc-filterbar">
            {[
              ["all", "All"],
              ["booked", "Booked"],
              ["emergency", "Emergency"],
              ["quote", "Quotes"],
              ["flagged", "Flagged ⚑"],
              ["spam", "Spam"],
            ].map(([k, label]) => (
              <button key={k}
                className={"lc-filter" + (filter === k ? " active" : "")}
                onClick={() => setFilter(k)}>
                {label}
              </button>
            ))}
          </div>

          {/* Recording list */}
          <div className="lc-list">
            {filtered.length === 0 && (
              <div className="lc-empty">
                <i data-lucide="mic-off"></i>
                No recordings match.
              </div>
            )}
            {filtered.map(r => (
              <div key={r.id}
                className={"lc-row" + (r.id === selectedId ? " selected" : "")}
                onClick={() => { setSelectedId(r.id); setTab("transcript"); }}>
                <div className="lc-row-top">
                  <div className="lc-caller">
                    {r.flagged && <span style={{ color: "var(--amber-200)", fontSize: 11, marginRight: 2 }}>⚑</span>}
                    {r.caller}
                  </div>
                  <div className="lc-time">{r.date} · {r.time}</div>
                </div>
                <div className="lc-summary">{r.intent}</div>
                <div className="lc-meta">
                  <span className={"tag " + r.vClass}>{r.verdict}</span>
                  <span className="lc-meta-sep">·</span>
                  <span>{r.duration}</span>
                  <span className="lc-meta-sep">·</span>
                  <AiScore score={r.aiScore} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && <RecordingDetail rec={selected} tab={tab} setTab={setTab} />}
      </div>
    </>
  );
}

Object.assign(window, { Recordings });
