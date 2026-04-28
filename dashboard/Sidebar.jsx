function Sidebar({ route }) {
  const items = [
    ["Overview",     "layout-dashboard",  "overview"],
    ["Live Calls",   "phone-incoming",    "live-calls",   2],
    ["Leads",        "users",             "leads"],
    ["Bookings",     "calendar-check",    "bookings"],
    ["Recordings",   "mic",               "recordings"],
    ["Blueprints",   "sliders-horizontal","blueprints"],
    ["Integrations", "database",          "integrations"],
    ["Settings",     "settings",          "settings"],
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-text">IntakeOps<span> AI</span></div>
      </div>
      <nav className="nav-list">
        {items.map(([label, icon, slug, badge]) => (
          <a key={slug}
             className={"nav-item" + (route === slug ? " active" : "")}
             href={`#/${slug}`}>
            <i data-lucide={icon}></i>
            <span>{label}</span>
            {badge ? <span className="nav-count">{badge}</span> : null}
          </a>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="avatar">KB</div>
        <div>
          <div className="name">Kara Brooks</div>
          <div className="co">FlowState Plumbing</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ eyebrow, title }) {
  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="topbar-right">
        <div className="pill-select">
          <i data-lucide="calendar" style={{width:14, height:14}}></i>
          <span>Last 7 days</span>
          <i data-lucide="chevron-down" style={{width:14, height:14}}></i>
        </div>
        <div className="pill-select">
          <i data-lucide="building-2" style={{width:14, height:14}}></i>
          <span>All locations</span>
          <i data-lucide="chevron-down" style={{width:14, height:14}}></i>
        </div>
        <button className="primary-btn">Book a Review →</button>
      </div>
    </header>
  );
}

Object.assign(window, { Sidebar, TopBar });
