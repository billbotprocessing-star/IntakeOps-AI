function KpiRow() {
  const kpis = [
    { label: "Missed-call capture",   value: "94.2%", delta: "+6.1 pts", trend: [3,4,5,4,6,7,8,9], good: true },
    { label: "Qualified-lead rate",   value: "71.8%", delta: "+2.4 pts", trend: [5,6,6,7,6,8,9,9], good: true },
    { label: "Booking rate",          value: "48.6%", delta: "+1.1 pts", trend: [4,5,5,6,5,6,7,7], good: true },
    { label: "Avg time-to-response",  value: "11s",   delta: "-4s",      trend: [9,8,7,7,6,5,4,4], good: true },
  ];
  return (
    <section className="kpi-row">
      {kpis.map(k => <KpiCard key={k.label} {...k} />)}
    </section>
  );
}

function KpiCard({ label, value, delta, trend, good }) {
  const max = Math.max(...trend);
  const w = 120, h = 36, step = w / (trend.length - 1);
  const pts = trend.map((v, i) => `${i*step},${h - (v/max)*h}`).join(' ');
  const gid = `g-${label.replace(/\s+/g, '-')}`;
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-row-inner">
        <div className="kpi-value">{value}</div>
        <svg width={w} height={h} className="spark">
          <defs>
            <linearGradient id={gid} x1="0" x2="1">
              <stop offset="0" stopColor="#6366f1"/>
              <stop offset="1" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
          <polyline points={pts} fill="none" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={"kpi-delta " + (good ? "up" : "down")}>
        <i data-lucide={good ? "trending-up" : "trending-down"} style={{width:12, height:12}}></i>
        <span>{delta}</span>
        <span className="kpi-delta-sub">vs prev 7d</span>
      </div>
    </div>
  );
}

Object.assign(window, { KpiRow, KpiCard })
