function Sidebar() {
  const items = [
    ["Overview", "layout-dashboard", true],
    ["Live Calls", "phone-incoming", false],
    ["Leads", "users", false],
    ["Bookings", "calendar-check", false],
    ["Recordings", "mic", false],
    ["Blueprints", "sliders-horizontal", false],
    ["Integrations", "database", false],
    ["Settings", "settings", false],
  ];
  return (
    <aside className="sidebar">
     <div className="brand">
  <div className="brand-text">IntakeOps<span> AI</span></div>
</div>
      <nav className="nav-list">
        {items.map(([label, icon, active]) => (
          <a key={label} className={"nav-item" + (active ? " active" : "")} href="#">
            <i data-lucide={icon}></i>
            <span>{label}</span>
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

function TopBar() {
  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">Overview</div>
        <h1 className="page-title">Conversion Dashboard</h1>
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
