const STAGES = [
  { id: "new",        label: "New",        dot: "#a5f3fc" },
  { id: "qualified",  label: "Qualified",  dot: "#c7d2fe" },
  { id: "booked",     label: "Booked",     dot: "#8b5cf6" },
  { id: "won",        label: "Won",        dot: "#fde68a" },
  { id: "lost",       label: "Lost",       dot: "#71717a" },
];

const SCORE_TIER = (score) =>
  score >= 85 ? "hot"  :
  score >= 65 ? "warm" :
  score >= 40 ? "cool" : "cold";

const LEADS = [
  { id: "L-2401", name: "Marcus Reyes",   phone: "(512) 555-0134", email: "marcus.r@gmail.com",   vertical: "Plumbing",        intent: "Sewage backup — emergency",  stage: "qualified", score: 94, value: 480,   source: "Inbound call", owner: "Diego M.",   touched: "2m ago",  created: "Today, 10:42 AM" },
  { id: "L-2400", name: "Anika Patel",    phone: "(512) 555-0188", email: "anika.p@outlook.com",  vertical: "Plumbing",        intent: "Kitchen sink slow drain",     stage: "booked",    score: 81, value: 189,   source: "Inbound call", owner: "Diego M.",   touched: "4m ago",  created: "Today, 10:38 AM" },
  { id: "L-2399", name: "Dev Sharma",     phone: "(737) 555-0121", email: "dev.s@hey.com",        vertical: "Plumbing",        intent: "Water heater replacement",    stage: "qualified", score: 76, value: 1650,  source: "Inbound call", owner: "Marcus T.",  touched: "15m ago", created: "Today, 10:21 AM" },
  { id: "L-2398", name: "Roberta Liu",    phone: "(512) 555-0109", email: "rliu@protonmail.com",  vertical: "Plumbing",        intent: "Bathroom faucet repair",      stage: "booked",    score: 72, value: 145,   source: "Inbound call", owner: "Diego M.",   touched: "24m ago", created: "Today, 9:55 AM"  },
  { id: "L-2397", name: "Sanjay Bhat",    phone: "(512) 555-0199", email: "sanjayb@gmail.com",    vertical: "Plumbing",        intent: "Garbage disposal install",    stage: "won",       score: 88, value: 320,   source: "Inbound call", owner: "Diego M.",   touched: "1h ago",  created: "Today, 8:14 AM"  },
  { id: "L-2396", name: "Juno Kim",       phone: "(737) 555-0144", email: "juno.k@gmail.com",     vertical: "Plumbing",        intent: "Out of service area",         stage: "lost",      score: 22, value: 0,     source: "Inbound call", owner: "Auto",       touched: "41m ago", created: "Today, 9:38 AM"  },
  { id: "L-2395", name: "Carla Mendez",   phone: "(512) 555-0120", email: "carla.m@yahoo.com",    vertical: "Plumbing",        intent: "Whole-home repipe estimate",  stage: "new",       score: 68, value: 8400,  source: "Web form",     owner: "Marcus T.",  touched: "3h ago",  created: "Today, 7:02 AM"  },
  { id: "L-2394", name: "Theo Ng",        phone: "(512) 555-0177", email: "theo.ng@gmail.com",    vertical: "Plumbing",        intent: "Tankless water heater quote", stage: "qualified", score: 79, value: 2900,  source: "Inbound call", owner: "Marcus T.",  touched: "5h ago",  created: "Yesterday"       },
  { id: "L-2393", name: "Priya Wallace",  phone: "(512) 555-0156", email: "priya.w@gmail.com",    vertical: "Plumbing",        intent: "Slab leak — needs inspection",stage: "new",       score: 91, value: 3200,  source: "Inbound call", owner: "Unassigned", touched: "6h ago",  created: "Yesterday"       },
  { id: "L-2392", name: "Jamal Foster",   phone: "(737) 555-0133", email: "jfoster@gmail.com",    vertical: "Plumbing",        intent: "Toilet replacement",          stage: "booked",    score: 70, value: 540,   source: "Inbound call", owner: "Diego M.",   touched: "8h ago",  created: "Yesterday"       },
  { id: "L-2391", name: "Eliza Park",     phone: "(512) 555-0142", email: "eliza.p@gmail.com",    vertical: "Plumbing",        intent: "Sump pump install",           stage: "won",       score: 84, value: 1100,  source: "Inbound call", owner: "Diego M.",   touched: "1d ago",  created: "2 days ago"      },
  { id: "L-2390", name: "Owen Chase",     phone: "(512) 555-0118", email: "owen.c@gmail.com",     vertical: "Plumbing",        intent: "Pricing — declined",          stage: "lost",      score: 38, value: 0,     source: "Inbound call", owner: "Marcus T.",  touched: "1d ago",  created: "2 days ago"      },
];

const ACTIVITY = [
  { icon: "phone-incoming",  tone: "cyan",  title: "Inbound call (3:02)",      desc: "Iris booked Tuesday 10am for kitchen drain clear. Standard rate accepted.",  time: "Today · 10:38 AM" },
  { icon: "tag",             tone: "",      title: "Tagged: drain-clear, qualified", desc: "Auto-tagged from Intake Blueprint qualifier tree.",                      time: "Today · 10:38 AM" },
  { icon: "calendar-check",  tone: "amber", title: "Appointment booked",       desc: "Tuesday Nov 12, 10:00 AM — assigned to Diego M.",                              time: "Today · 10:39 AM" },
  { icon: "message-square",  tone: "cyan",  title: "Confirmation SMS sent",    desc: "Sent to (512) 555-0188 from FlowState short code.",                            time: "Today · 10:39 AM" },
  { icon: "mail",            tone: "",      title: "Calendar invite emailed",  desc: "Delivered to anika.p@outlook.com — opened.",                                   time: "Today · 10:41 AM" },
  { icon: "database",        tone: "",      title: "Synced to HubSpot",        desc: "Contact created · Deal stage: Booked · Source: AI Intake.",                    time: "Today · 10:42 AM" },
];

function Leads() {
  const [view, setView] = React.useState("pipeline"); // pipeline | table
  const [search, setSearch] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState("all");
  const [sortKey, setSortKey] = React.useState("touched");
  const [sortDir, setSortDir] = React.useState("desc");
  const [openLeadId, setOpenLeadId] = React.useState(null);
  const [selected, setSelected] = React.useState(new Set());

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [view, openLeadId, search, stageFilter, sortKey, sortDir, selected]);

  const filtered = LEADS.filter(l => {
    if (stageFilter !== "all" && l.stage !== stageFilter) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return l.name.toLowerCase().includes(s)
        || l.phone.includes(s)
        || l.email.toLowerCase().includes(s)
        || l.intent.toLowerCase().includes(s);
  });

  const openLead = LEADS.find(l => l.id === openLeadId);

  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const totalValue = filtered.filter(l => l.stage !== "lost").reduce((s, l) => s + l.value, 0);

  return (
    <>
      <LeadsKpis leads={LEADS}/>

      <div className="leads-toolbar">
        <div className="leads-toolbar-left">
          <div className="search-input">
            <i data-lucide="search" style={{width:14,height:14}}></i>
            <input type="text" placeholder="Search name, phone, email, intent…"
                   value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <button className="ghost-btn">
            <i data-lucide="filter" style={{width:14,height:14}}></i>
            Filters
          </button>
          {selected.size > 0 && (
            <>
              <span className="muted sm">{selected.size} selected</span>
              <button className="ghost-btn">
                <i data-lucide="user-plus" style={{width:14,height:14}}></i> Assign
              </button>
              <button className="ghost-btn">
                <i data-lucide="message-square" style={{width:14,height:14}}></i> SMS
              </button>
              <button className="ghost-btn">
                <i data-lucide="download" style={{width:14,height:14}}></i> Export
              </button>
            </>
          )}
        </div>
        <div className="view-toggle">
          <button className={view === "pipeline" ? "active" : ""} onClick={() => setView("pipeline")}>
            <i data-lucide="kanban-square" style={{width:14,height:14}}></i> Pipeline
          </button>
          <button className={view === "table" ? "active" : ""} onClick={() => setView("table")}>
            <i data-lucide="list" style={{width:14,height:14}}></i> Table
          </button>
        </div>
      </div>

      {view === "pipeline" ? (
        <Pipeline leads={filtered} onOpen={setOpenLeadId}/>
      ) : (
        <LeadsTable
          leads={filtered}
          sortKey={sortKey} setSortKey={setSortKey}
          sortDir={sortDir} setSortDir={setSortDir}
          stageFilter={stageFilter} setStageFilter={setStageFilter}
          onOpen={setOpenLeadId}
          selected={selected} toggleSelect={toggleSelect}
          totalValue={totalValue}
        />
      )}

      {openLead && <LeadDrawer lead={openLead} onClose={() => setOpenLeadId(null)}/>}
    </>
  );
}

function LeadsKpis({ leads }) {
  const open      = leads.filter(l => l.stage !== "won" && l.stage !== "lost").length;
  const qualified = leads.filter(l => l.stage === "qualified" || l.stage === "booked").length;
  const won       = leads.filter(l => l.stage === "won").length;
  const totalRev  = leads.filter(l => l.stage === "won").reduce((s,l) => s + l.value, 0);
  const fmt = n => "$" + n.toLocaleString();

  const cards = [
    { label: "Open leads",         value: String(open),       sub: "in pipeline" },
    { label: "Qualified + booked", value: String(qualified),  sub: `${Math.round(qualified/leads.length*100)}% of total` },
    { label: "Closed-won (7d)",    value: String(won),        sub: "deals" },
    { label: "Pipeline revenue",   value: fmt(totalRev),      sub: "won this period" },
  ];
  return (
    <section className="kpi-row">
      {cards.map(c => (
        <div key={c.label} className="kpi-card">
          <div className="kpi-label">{c.label}</div>
          <div className="kpi-row-inner">
            <div className="kpi-value">{c.value}</div>
          </div>
          <div className="kpi-delta up">
            <i data-lucide="circle" style={{width:8,height:8,fill:"currentColor"}}></i>
            <span className="kpi-delta-sub" style={{marginLeft:0}}>{c.sub}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

function Pipeline({ leads, onOpen }) {
  return (
    <div className="pipeline">
      {STAGES.map(stage => {
        const stageLeads = leads.filter(l => l.stage === stage.id);
        const stageValue = stageLeads.reduce((s, l) => s + l.value, 0);
        return (
          <div key={stage.id} className="pipe-col">
            <div className="pipe-col-head">
              <div className="pipe-col-title">
                <span className="pipe-col-dot" style={{background: stage.dot}}></span>
                {stage.label}
              </div>
              <div className="pipe-col-count">{stageLeads.length}</div>
            </div>
            <div className="pipe-col-value">${stageValue.toLocaleString()} pipeline</div>
            <div className="pipe-col-body">
              {stageLeads.map(l => <PipeCard key={l.id} lead={l} onOpen={onOpen}/>)}
              {stageLeads.length === 0 && (
                <div style={{padding:"20px 8px", textAlign:"center", color:"var(--fg-faint)", fontSize:12}}>
                  No leads
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PipeCard({ lead, onOpen }) {
  const tier = SCORE_TIER(lead.score);
  return (
    <div className="pipe-card" onClick={() => onOpen(lead.id)}>
      <div className="pipe-card-top">
        <div className="pipe-card-name">{lead.name}</div>
        <div className={`pipe-card-score ${tier}`}>{lead.score}</div>
      </div>
      <div className="pipe-card-meta">{lead.intent}</div>
      <div className="pipe-card-foot">
        <span className="pipe-card-value">${lead.value.toLocaleString()}</span>
        <span className="pipe-card-time">{lead.touched}</span>
      </div>
    </div>
  );
}

function LeadsTable({ leads, sortKey, setSortKey, sortDir, setSortDir, stageFilter, setStageFilter, onOpen, selected, toggleSelect, totalValue }) {
  const sorted = [...leads].sort((a, b) => {
    let va = a[sortKey], vb = b[sortKey];
    if (typeof va === "string") { va = va.toLowerCase(); vb = vb.toLowerCase(); }
    if (va < vb) return sortDir === "asc" ? -1 : 1;
    if (va > vb) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  const setSort = (k) => {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("desc"); }
  };

  const stageTagClass = {
    new: "info", qualified: "info", booked: "good", won: "gold", lost: "mute",
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h3>{leads.length} leads</h3>
          <div className="muted sm">${totalValue.toLocaleString()} open pipeline value</div>
        </div>
        <div className="head-actions">
          {[
            ["all", "All"], ["new", "New"], ["qualified", "Qualified"],
            ["booked", "Booked"], ["won", "Won"], ["lost", "Lost"],
          ].map(([k, label]) => (
            <button key={k}
                    className={"ghost-btn" + (stageFilter === k ? " active" : "")}
                    onClick={() => setStageFilter(k)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{overflowX:"auto"}}>
        <table className="leads-table">
          <thead>
            <tr>
              <th style={{width:32}}></th>
              <Th label="Lead"     k="name"     sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
              <Th label="Stage"    k="stage"    sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
              <Th label="Score"    k="score"    sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
              <Th label="Intent"   k="intent"   sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
              <Th label="Value"    k="value"    sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
              <Th label="Owner"    k="owner"    sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
              <Th label="Touched"  k="touched"  sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
            </tr>
          </thead>
          <tbody>
            {sorted.map(l => {
              const tier = SCORE_TIER(l.score);
              const initials = l.name.split(" ").map(w => w[0]).join("").slice(0,2);
              return (
                <tr key={l.id}
                    className={selected.has(l.id) ? "selected" : ""}
                    onClick={() => onOpen(l.id)}>
                  <td onClick={e => e.stopPropagation()}>
                    <input type="checkbox" className="lead-checkbox"
                           checked={selected.has(l.id)}
                           onChange={() => toggleSelect(l.id)}/>
                  </td>
                  <td>
                    <div className="lead-name-cell">
                      <span className="avatar sm">{initials}</span>
                      <div className="lead-name-info">
                        <span className="lead-name-primary">{l.name}</span>
                        <span className="lead-name-secondary">{l.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className={"tag " + stageTagClass[l.stage]}>{l.stage}</span></td>
                  <td>
                    <span className={`score-pill ${tier}`}>
                      <span className="score-dot"></span>{l.score}
                    </span>
                  </td>
                  <td style={{maxWidth:240, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{l.intent}</td>
                  <td className="mono" style={{color:"var(--fg-2)"}}>${l.value.toLocaleString()}</td>
                  <td>{l.owner}</td>
                  <td className="muted">{l.touched}</td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr><td colSpan="8" style={{textAlign:"center", padding:"40px 20px", color:"var(--fg-faint)"}}>No leads match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ label, k, sortKey, sortDir, setSort }) {
  const active = sortKey === k;
  return (
    <th className={"sortable" + (active ? " sorted" : "")} onClick={() => setSort(k)}>
      {label}<span className="sort-arrow">{active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}</span>
    </th>
  );
}

function LeadDrawer({ lead, onClose }) {
  const tier = SCORE_TIER(lead.score);
  React.useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const initials = lead.name.split(" ").map(w => w[0]).join("").slice(0,2);

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}></div>
      <aside className="drawer">
        <div className="drawer-head">
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            <i data-lucide="x" style={{width:14,height:14}}></i>
          </button>
          <div className="lc-detail-id">LEAD {lead.id}</div>
          <div className="drawer-name">
            <span className="avatar" style={{width:40,height:40,fontSize:14}}>{initials}</span>
            {lead.name}
            <span className={`score-pill ${tier}`}>
              <span className="score-dot"></span>Score {lead.score}
            </span>
          </div>
          <div className="drawer-meta">
            <span><b>Phone:</b> <span className="mono">{lead.phone}</span></span>
            <span><b>Email:</b> {lead.email}</span>
            <span><b>Vertical:</b> {lead.vertical}</span>
            <span><b>Owner:</b> {lead.owner}</span>
            <span><b>Created:</b> {lead.created}</span>
          </div>
          <div className="head-actions" style={{marginTop:14}}>
            <button className="primary-btn" style={{padding:"8px 16px"}}>
              <i data-lucide="phone" style={{width:13,height:13,verticalAlign:"middle",marginRight:6}}></i>
              Call back
            </button>
            <button className="ghost-btn">
              <i data-lucide="message-square" style={{width:13,height:13}}></i> SMS
            </button>
            <button className="ghost-btn">
              <i data-lucide="calendar-plus" style={{width:13,height:13}}></i> Schedule
            </button>
            <button className="ghost-btn">
              <i data-lucide="external-link" style={{width:13,height:13}}></i> Open in CRM
            </button>
          </div>
        </div>

        <div className="drawer-body">
          <div className="lc-grid">
            <div className="lc-info-card">
              <div className="lc-info-label">Stage</div>
              <div className="lc-info-value lg" style={{textTransform:"capitalize"}}>{lead.stage}</div>
            </div>
            <div className="lc-info-card">
              <div className="lc-info-label">Deal value</div>
              <div className="lc-info-value lg">${lead.value.toLocaleString()}</div>
            </div>
            <div className="lc-info-card">
              <div className="lc-info-label">Intent</div>
              <div className="lc-info-value">{lead.intent}</div>
            </div>
            <div className="lc-info-card">
              <div className="lc-info-label">Source</div>
              <div className="lc-info-value">{lead.source}</div>
            </div>
          </div>

          <div className="lc-section-title">Activity timeline</div>
          <div className="timeline">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="timeline-item">
                <div className={"timeline-icon " + (a.tone || "")}>
                  <i data-lucide={a.icon} style={{width:14,height:14}}></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">{a.title}</div>
                  <div className="timeline-desc">{a.desc}</div>
                  <div className="timeline-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lc-section-title">Notes</div>
          <div style={{padding:"14px 16px", background:"rgba(20,20,28,0.5)", border:"1px solid var(--indigo-a10)", borderRadius:10, fontSize:13, color:"var(--fg-2)", lineHeight:1.6}}>
            Caller verbally agreed to standard rate. AI flagged for upsell opportunity (drain camera inspection — not pursued in this call). Recommend follow-up if recurring.
          </div>
        </div>
      </aside>
    </>
  );
}

Object.assign(window, { Leads });
