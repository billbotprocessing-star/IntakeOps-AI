const TECHS = [
  { id: "diego",   name: "Diego M.",   color: "#a5f3fc" },
  { id: "marcus",  name: "Marcus T.",  color: "#c7d2fe" },
  { id: "renee",   name: "Renee S.",   color: "#fde68a" },
  { id: "jordan",  name: "Jordan W.",  color: "#fecaca" },
];

const STATUS_COLOR = {
  confirmed:  "#a5f3fc",
  enroute:    "#fde68a",
  inprogress: "#c7d2fe",
  completed:  "#71717a",
  cancelled:  "#fecaca",
};

const STATUS_LABEL = {
  confirmed: "Confirmed", enroute: "En route", inprogress: "In progress",
  completed: "Completed", cancelled: "Cancelled",
};

// day index 0=Mon..6=Sun for current week. Week starts Monday.
const BOOKINGS = [
  // Today (let's say day 1 = Tuesday)
  { id: "B-9012", customer: "Anika Patel",     phone: "(512) 555-0188", address: "1108 Walnut Ridge Ln, Round Rock 78664", service: "Drain clear — kitchen",        day: 1, start: 10, end: 11,   tech: "diego",  status: "confirmed",  value: 189,  source: "AI booked" },
  { id: "B-9013", customer: "Roberta Liu",     phone: "(512) 555-0109", address: "4108 Avenue G, Austin 78751",            service: "Faucet cartridge replacement", day: 1, start: 14, end: 15,   tech: "diego",  status: "confirmed",  value: 145,  source: "AI booked" },
  { id: "B-9014", customer: "Marcus Reyes",    phone: "(512) 555-0134", address: "4412 South Lamar Blvd, Austin 78704",    service: "Sewage backup — emergency",    day: 1, start: 11, end: 13,   tech: "diego",  status: "inprogress", value: 480,  source: "AI emergency" },
  { id: "B-9015", customer: "Sanjay Bhat",     phone: "(512) 555-0199", address: "722 Oltorf St, Austin 78704",            service: "Garbage disposal install",     day: 1, start: 9,  end: 10,   tech: "renee",  status: "completed",  value: 320,  source: "AI booked" },
  { id: "B-9016", customer: "Theo Ng",         phone: "(512) 555-0177", address: "9214 Brodie Ln, Austin 78745",            service: "Tankless heater estimate",     day: 1, start: 15, end: 16.5, tech: "marcus", status: "enroute",    value: 0,    source: "AI booked" },

  // Wednesday (day 2)
  { id: "B-9017", customer: "Jamal Foster",    phone: "(737) 555-0133", address: "2710 Manor Rd, Austin 78722",            service: "Toilet replacement",           day: 2, start: 8,  end: 10,   tech: "renee",  status: "confirmed",  value: 540,  source: "AI booked" },
  { id: "B-9018", customer: "Carla Mendez",    phone: "(512) 555-0120", address: "5519 Cameron Rd, Austin 78723",          service: "Repipe estimate (whole-home)", day: 2, start: 14, end: 16,   tech: "marcus", status: "confirmed",  value: 0,    source: "Web form" },
  { id: "B-9019", customer: "Hank Liu",        phone: "(512) 555-0132", address: "1408 South 1st St, Austin 78704",        service: "Leak under sink",              day: 2, start: 11, end: 12,   tech: "diego",  status: "confirmed",  value: 215,  source: "AI booked" },

  // Thursday (day 3)
  { id: "B-9020", customer: "Priya Wallace",   phone: "(512) 555-0156", address: "8801 Research Blvd, Austin 78758",       service: "Slab leak inspection",         day: 3, start: 9,  end: 11,   tech: "marcus", status: "confirmed",  value: 350,  source: "AI booked" },
  { id: "B-9021", customer: "Dev Sharma",      phone: "(737) 555-0121", address: "11302 Lookout Dr, Austin 78745",         service: "Water heater install",         day: 3, start: 13, end: 16,   tech: "jordan", status: "confirmed",  value: 1650, source: "AI booked" },

  // Friday (day 4)
  { id: "B-9022", customer: "Eliza Park",      phone: "(512) 555-0142", address: "5222 Burnet Rd, Austin 78756",           service: "Sump pump install",            day: 4, start: 10, end: 12.5, tech: "jordan", status: "confirmed",  value: 1100, source: "AI booked" },
  { id: "B-9023", customer: "Owen Chase (FU)", phone: "(512) 555-0118", address: "1320 East 6th St, Austin 78702",         service: "Re-quote — water softener",    day: 4, start: 14, end: 15,   tech: "marcus", status: "confirmed",  value: 0,    source: "Manual" },
  { id: "B-9024", customer: "Ines Castillo",   phone: "(512) 555-0166", address: "3500 Jefferson St, Austin 78731",        service: "Dishwasher line repair",       day: 4, start: 9,  end: 10,   tech: "diego",  status: "confirmed",  value: 195,  source: "AI booked" },

  // Saturday (day 5)
  { id: "B-9025", customer: "Bryan Solis",     phone: "(512) 555-0181", address: "2205 Slaughter Ln, Austin 78748",        service: "Outdoor spigot replace",       day: 5, start: 11, end: 12,   tech: "renee",  status: "confirmed",  value: 175,  source: "AI booked" },
];

const ACTIVITY = [
  { icon: "calendar-check", tone: "cyan",  title: "Booking confirmed",         desc: "AI agent booked Tue Nov 12, 10:00 AM — Anika accepted standard rate.", time: "Today · 10:39 AM" },
  { icon: "user-plus",      tone: "",      title: "Assigned to Diego M.",      desc: "Auto-assigned via routing rule (zip 78664, drain clear).",            time: "Today · 10:39 AM" },
  { icon: "message-square", tone: "cyan",  title: "Confirmation SMS sent",     desc: "Sent to (512) 555-0188 — read receipt at 10:42 AM.",                  time: "Today · 10:39 AM" },
  { icon: "mail",           tone: "",      title: "Calendar invite delivered", desc: "iCal sent to anika.p@outlook.com — accepted.",                        time: "Today · 10:41 AM" },
  { icon: "bell",           tone: "amber", title: "Reminder scheduled",        desc: "SMS reminder will fire 24 hours before appointment.",                 time: "Today · 10:42 AM" },
];

function Bookings() {
  const [view, setView] = React.useState("week");
  const [openId, setOpenId] = React.useState(null);
  const [techFilter, setTechFilter] = React.useState(new Set(TECHS.map(t => t.id)));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [weekOffset, setWeekOffset] = React.useState(0);

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [view, openId, techFilter, statusFilter, weekOffset]);

  const filtered = BOOKINGS.filter(b => {
    if (!techFilter.has(b.tech)) return false;
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    return true;
  });

  const open = openId ? BOOKINGS.find(b => b.id === openId) : null;

  const toggleTech = (id) => {
    const next = new Set(techFilter);
    if (next.has(id)) next.delete(id); else next.add(id);
    setTechFilter(next);
  };

  return (
    <>
      <BookingsKpis bookings={BOOKINGS}/>

      <div className="leads-toolbar">
        <div className="leads-toolbar-left">
          <CalNav weekOffset={weekOffset} setWeekOffset={setWeekOffset} view={view}/>
          <StatusFilter status={statusFilter} setStatus={setStatusFilter}/>
        </div>
        <div className="view-toggle">
          {[
            ["week",  "calendar-range",  "Week"],
            ["day",   "calendar",        "Day"],
            ["list",  "list",            "List"],
          ].map(([k, icon, label]) => (
            <button key={k} className={view === k ? "active" : ""} onClick={() => setView(k)}>
              <i data-lucide={icon} style={{width:14,height:14}}></i> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        <TechFilterRow techs={TECHS} selected={techFilter} toggle={toggleTech}/>
        {view === "week" && <WeekView bookings={filtered} weekOffset={weekOffset} onOpen={setOpenId}/>}
        {view === "day"  && <DayView  bookings={filtered} weekOffset={weekOffset} onOpen={setOpenId}/>}
        {view === "list" && <ListView bookings={filtered} onOpen={setOpenId}/>}
      </div>

      {open && <BookingDrawer booking={open} onClose={() => setOpenId(null)}/>}
    </>
  );
}

function BookingsKpis({ bookings }) {
  const today = bookings.filter(b => b.day === 1).length;
  const week  = bookings.length;
  const revenue = bookings.filter(b => b.status !== "cancelled").reduce((s, b) => s + b.value, 0);
  const utilization = Math.round((bookings.length * 1.5 / (TECHS.length * 8)) * 100);
  const cards = [
    { label: "Today's bookings",   value: String(today),    sub: "scheduled" },
    { label: "This week",          value: String(week),     sub: "across 4 techs" },
    { label: "Booked revenue",     value: "$" + revenue.toLocaleString(), sub: "this week" },
    { label: "Tech utilization",   value: utilization + "%", sub: "avg this week" },
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

function CalNav({ weekOffset, setWeekOffset, view }) {
  const labels = view === "day"
    ? (weekOffset === 0 ? ["Today", "Tuesday, Nov 12"] : weekOffset === -1 ? ["Yesterday", "Monday, Nov 11"] : ["Tomorrow", "Wednesday, Nov 13"])
    : (weekOffset === 0 ? ["This week", "Nov 11 – Nov 17, 2025"] : weekOffset > 0 ? ["Next week", "Nov 18 – Nov 24, 2025"] : ["Last week", "Nov 4 – Nov 10, 2025"]);
  return (
    <div className="cal-nav">
      <button className="icon-btn" onClick={() => setWeekOffset(o => o - 1)}>
        <i data-lucide="chevron-left" style={{width:14,height:14}}></i>
      </button>
      <button className="ghost-btn" onClick={() => setWeekOffset(0)}>Today</button>
      <button className="icon-btn" onClick={() => setWeekOffset(o => o + 1)}>
        <i data-lucide="chevron-right" style={{width:14,height:14}}></i>
      </button>
      <div>
        <div className="cal-period">{labels[0]}</div>
        <div className="cal-period-sub">{labels[1]}</div>
      </div>
    </div>
  );
}

function StatusFilter({ status, setStatus }) {
  const opts = [
    ["all", "All"], ["confirmed", "Confirmed"], ["enroute", "En route"],
    ["inprogress", "In progress"], ["completed", "Completed"],
  ];
  return (
    <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
      {opts.map(([k, label]) => (
        <button key={k}
                className={"ghost-btn" + (status === k ? " active" : "")}
                onClick={() => setStatus(k)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function TechFilterRow({ techs, selected, toggle }) {
  return (
    <div className="cal-tech-row">
      <span className="cal-tech-label">Techs</span>
      {techs.map(t => {
        const initials = t.name.split(" ").map(w => w[0]).join("").slice(0,2);
        return (
          <button key={t.id}
                  className={"tech-chip" + (selected.has(t.id) ? "" : " muted")}
                  onClick={() => toggle(t.id)}>
            <span className="tech-dot" style={{background: t.color}}>{initials}</span>
            {t.name}
          </button>
        );
      })}
    </div>
  );
}

// ===== Week view =====
const HOURS = [7,8,9,10,11,12,13,14,15,16,17,18];
const HOUR_PX = 48;
const fmtHour = h => {
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h > 12 ? h - 12 : (h === 0 ? 12 : h);
  return `${hh} ${ampm}`;
};
const fmtTime = h => {
  const ampm = h >= 12 ? "PM" : "AM";
  const wholeHour = Math.floor(h);
  const min = Math.round((h - wholeHour) * 60);
  const hh = wholeHour > 12 ? wholeHour - 12 : (wholeHour === 0 ? 12 : wholeHour);
  return `${hh}:${min.toString().padStart(2,"0")} ${ampm}`;
};

function WeekView({ bookings, weekOffset, onOpen }) {
  const baseDates = [11, 12, 13, 14, 15, 16, 17];
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const todayIdx = weekOffset === 0 ? 1 : -1;
  const nowH = 11.5; // visual "now" line at 11:30 AM

  return (
    <div className="cal-week">
      <div className="cal-corner"></div>
      {days.map((d, i) => (
        <div key={d} className="cal-day-head">
          <div className="cal-day-name">{d}</div>
          <div className={"cal-day-num" + (i === todayIdx ? " today" : "")}>{baseDates[i] + weekOffset * 7}</div>
        </div>
      ))}

      <div className="cal-time-col">
        {HOURS.map(h => (
          <div key={h} className="cal-time-slot">{fmtHour(h)}</div>
        ))}
      </div>

      {days.map((d, dayIdx) => {
        const dayBookings = bookings.filter(b => b.day === dayIdx);
        return (
          <div key={d} className={"cal-day-col" + (dayIdx === todayIdx ? " today" : "")}>
            {HOURS.map(h => <div key={h} className="cal-hour-line"></div>)}
            {dayIdx === todayIdx && (
              <div className="cal-now-line" style={{top: (nowH - HOURS[0]) * HOUR_PX + "px"}}></div>
            )}
            {dayBookings.map(b => <CalEvent key={b.id} booking={b} onOpen={onOpen}/>)}
          </div>
        );
      })}
    </div>
  );
}

function CalEvent({ booking, onOpen }) {
  const tech = TECHS.find(t => t.id === booking.tech);
  const top = (booking.start - HOURS[0]) * HOUR_PX;
  const height = (booking.end - booking.start) * HOUR_PX - 4;
  const isShort = (booking.end - booking.start) <= 1;
  return (
    <div className="cal-event"
         onClick={() => onOpen(booking.id)}
         style={{
           top: top + "px",
           height: height + "px",
           background: tech.color,
           borderLeftColor: STATUS_COLOR[booking.status] === tech.color ? "#0a0a0f" : STATUS_COLOR[booking.status],
         }}>
      <div className="cal-event-title">{booking.customer}</div>
      {!isShort && <div className="cal-event-sub">{booking.service}</div>}
      <div className="cal-event-time">{fmtTime(booking.start)}–{fmtTime(booking.end)}</div>
    </div>
  );
}

// ===== Day view =====
function DayView({ bookings, weekOffset, onOpen }) {
  const dayIdx = weekOffset === 0 ? 1 : (weekOffset > 0 ? 2 : 0);
  const dayBookings = bookings.filter(b => b.day === dayIdx).sort((a,b) => a.start - b.start);

  return (
    <div className="cal-day">
      <div className="cal-time-col">
        {HOURS.map(h => <div key={h} className="cal-time-slot">{fmtHour(h)}</div>)}
      </div>
      <div className="cal-day-col" style={{position:"relative"}}>
        {HOURS.map(h => <div key={h} className="cal-hour-line"></div>)}
        {dayIdx === 1 && (
          <div className="cal-now-line" style={{top: (11.5 - HOURS[0]) * HOUR_PX + "px"}}></div>
        )}
        {dayBookings.map((b, i) => {
          const tech = TECHS.find(t => t.id === b.tech);
          const overlapping = dayBookings.filter(x => x.start < b.end && x.end > b.start);
          const idxIn = overlapping.indexOf(b);
          const widthPct = 100 / overlapping.length;
          const top = (b.start - HOURS[0]) * HOUR_PX;
          const height = (b.end - b.start) * HOUR_PX - 4;
          return (
            <div key={b.id} className="cal-event"
                 onClick={() => onOpen(b.id)}
                 style={{
                   top: top + "px",
                   height: height + "px",
                   left: `calc(${idxIn * widthPct}% + 4px)`,
                   width: `calc(${widthPct}% - 8px)`,
                   right: "auto",
                   background: tech.color,
                   borderLeftColor: STATUS_COLOR[b.status],
                 }}>
              <div className="cal-event-title">{b.customer}</div>
              <div className="cal-event-sub">{b.service} · {tech.name}</div>
              <div className="cal-event-time">{fmtTime(b.start)}–{fmtTime(b.end)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== List view =====
function ListView({ bookings, onOpen }) {
  const dayLabels = ["Monday Nov 11", "Tuesday Nov 12 (today)", "Wednesday Nov 13", "Thursday Nov 14", "Friday Nov 15", "Saturday Nov 16", "Sunday Nov 17"];
  const grouped = {};
  bookings.forEach(b => {
    if (!grouped[b.day]) grouped[b.day] = [];
    grouped[b.day].push(b);
  });
  Object.values(grouped).forEach(arr => arr.sort((a,b) => a.start - b.start));

  const sortedDays = Object.keys(grouped).map(Number).sort((a,b) => a - b);

  if (sortedDays.length === 0) {
    return (
      <div className="lc-empty">
        <i data-lucide="calendar-x"></i>
        No bookings match these filters.
      </div>
    );
  }

  return (
    <div>
      {sortedDays.map(dayIdx => (
        <div key={dayIdx}>
          <div className="day-header">
            <span>{dayLabels[dayIdx]}</span>
            <span className="day-header-count">{grouped[dayIdx].length} bookings · ${grouped[dayIdx].reduce((s,b) => s + b.value, 0).toLocaleString()}</span>
          </div>
          {grouped[dayIdx].map(b => {
            const tech = TECHS.find(t => t.id === b.tech);
            const initials = tech.name.split(" ").map(w => w[0]).join("").slice(0,2);
            const statusTagClass = b.status === "completed" ? "mute" : b.status === "cancelled" ? "warn" : b.status === "inprogress" ? "info" : b.status === "enroute" ? "gold" : "good";
            return (
              <div key={b.id} className="booking-row" onClick={() => onOpen(b.id)}>
                <div className="booking-time">
                  <span className="booking-time-main">{fmtTime(b.start)}</span>
                  <span className="booking-time-sub">{(b.end - b.start)}h window</span>
                </div>
                <div>
                  <div className="booking-name">{b.customer}</div>
                  <div className="booking-svc">{b.service} · {b.address.split(",")[1]?.trim() || b.address}</div>
                </div>
                <div className="booking-tech-cell">
                  <span className="tech-dot" style={{background: tech.color}}>{initials}</span>
                  {tech.name}
                </div>
                <div><span className={"tag " + statusTagClass}>{STATUS_LABEL[b.status]}</span></div>
                <div className="mono" style={{textAlign:"right", color:"var(--fg-2)"}}>${b.value.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ===== Drawer =====
function BookingDrawer({ booking, onClose }) {
  const tech = TECHS.find(t => t.id === booking.tech);
  const initials = tech.name.split(" ").map(w => w[0]).join("").slice(0,2);
  const statusTagClass = booking.status === "completed" ? "mute" : booking.status === "cancelled" ? "warn" : booking.status === "inprogress" ? "info" : booking.status === "enroute" ? "gold" : "good";

  React.useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}></div>
      <aside className="drawer">
        <div className="drawer-head">
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            <i data-lucide="x" style={{width:14,height:14}}></i>
          </button>
          <div className="lc-detail-id">BOOKING {booking.id}</div>
          <div className="drawer-name">
            {booking.customer}
            <span className={"tag " + statusTagClass}>{STATUS_LABEL[booking.status]}</span>
          </div>
          <div className="drawer-meta">
            <span><b>When:</b> Tue Nov 12 · {fmtTime(booking.start)} – {fmtTime(booking.end)}</span>
            <span><b>Phone:</b> <span className="mono">{booking.phone}</span></span>
            <span><b>Source:</b> {booking.source}</span>
          </div>
          <div className="head-actions" style={{marginTop:14}}>
            <button className="primary-btn" style={{padding:"8px 16px"}}>
              <i data-lucide="phone" style={{width:13,height:13,verticalAlign:"middle",marginRight:6}}></i>
              Call customer
            </button>
            <button className="ghost-btn"><i data-lucide="message-square" style={{width:13,height:13}}></i> SMS</button>
            <button className="ghost-btn"><i data-lucide="calendar-clock" style={{width:13,height:13}}></i> Reschedule</button>
            <button className="ghost-btn"><i data-lucide="x-circle" style={{width:13,height:13}}></i> Cancel</button>
          </div>
        </div>

        <div className="drawer-body">
          <div className="lc-grid">
            <div className="lc-info-card">
              <div className="lc-info-label">Service</div>
              <div className="lc-info-value">{booking.service}</div>
            </div>
            <div className="lc-info-card">
              <div className="lc-info-label">Quoted value</div>
              <div className="lc-info-value lg">${booking.value.toLocaleString()}</div>
            </div>
            <div className="lc-info-card">
              <div className="lc-info-label">Address</div>
              <div className="lc-info-value">{booking.address}</div>
            </div>
            <div className="lc-info-card">
              <div className="lc-info-label">Assigned tech</div>
              <div className="lc-info-value" style={{display:"flex",alignItems:"center",gap:8}}>
                <span className="tech-dot" style={{background: tech.color}}>{initials}</span>
                {tech.name}
              </div>
            </div>
          </div>

          <div className="lc-section-title">Activity</div>
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

          <div className="lc-section-title">Internal notes</div>
          <div style={{padding:"14px 16px", background:"rgba(20,20,28,0.5)", border:"1px solid var(--indigo-a10)", borderRadius:10, fontSize:13, color:"var(--fg-2)", lineHeight:1.6}}>
            Customer confirmed gradual onset, no standing water. Standard cable-clear approach. If recurring, AI flagged camera inspection upsell ($95 add-on).
          </div>
        </div>
      </aside>
    </>
  );
}

Object.assign(window, { Bookings });
