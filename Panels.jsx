function CallFeed() {
  const calls = [
    { t: "just now",   caller: "Marcus R.",  verdict: "Emergency", vClass: "warn", summary: "Sewage backup in basement. Dispatched on-call tech.", dur: "2:14" },
    { t: "2 min ago",  caller: "Anika P.",   verdict: "Booked",    vClass: "good", summary: "Kitchen sink clog. Tuesday 10am scheduled.",          dur: "3:02" },
    { t: "7 min ago",  caller: "Unknown",    verdict: "Spam",      vClass: "mute", summary: "Robocall filtered. No CRM entry created.",            dur: "0:08" },
    { t: "14 min ago", caller: "Dev S.",     verdict: "Quote req", vClass: "info", summary: "Water heater replacement estimate. Routed to sales.", dur: "4:41" },
    { t: "22 min ago", caller: "Roberta L.", verdict: "Booked",    vClass: "good", summary: "Leaky faucet, routine. Wed 2pm scheduled.",           dur: "1:58" },
  ];
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h3>Live call feed</h3>
          <div className="muted sm">Updated continuously · last 30 min</div>
        </div>
        <div className="live-dot"><span className="dot"/> Live</div>
      </div>
      <div className="call-list">
        {calls.map((c, i) => (
          <div className="call-row" key={i}>
            <div className="call-time">{c.t}</div>
            <div className="call-body">
              <div className="call-top">
                <span className="caller">{c.caller}</span>
                <span className={"tag " + c.vClass}>{c.verdict}</span>
              </div>
              <div className="muted sm">{c.summary}</div>
            </div>
            <div className="call-dur mono">{c.dur}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntakeTable() {
  const rows = [
    ["Marcus R.",  "(512) 555-0134", "Home Services", "Emergency", "warn", "Dispatched", "2m"],
    ["Anika P.",   "(512) 555-0188", "Home Services", "Qualified", "good", "Booked",     "4m"],
    ["Dev S.",     "(737) 555-0121", "Home Services", "Quote req", "info", "Awaiting",   "15m"],
    ["Roberta L.", "(512) 555-0109", "Home Services", "Qualified", "good", "Booked",     "24m"],
    ["Juno K.",    "(737) 555-0144", "Home Services", "Not qual",  "mute", "Nurture",    "41m"],
    ["Sanjay B.",  "(512) 555-0199", "Home Services", "Qualified", "good", "Booked",     "1h"],
  ];
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h3>Recent intakes</h3>
          <div className="muted sm">Synced to HubSpot · 6 of 142 today</div>
        </div>
        <div className="head-actions">
          <button className="ghost-btn"><i data-lucide="filter" style={{width:14,height:14}}></i> Filter</button>
          <button className="ghost-btn"><i data-lucide="download" style={{width:14,height:14}}></i> Export</button>
        </div>
      </div>
      <table className="intake-table">
        <thead>
          <tr><th>Caller</th><th>Number</th><th>Vertical</th><th>Verdict</th><th>Next step</th><th>When</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td><span className="avatar sm">{r[0].split(" ").map(w => w[0]).join("")}</span>{r[0]}</td>
              <td className="mono">{r[1]}</td>
              <td>{r[2]}</td>
              <td><span className={"tag " + r[4]}>{r[3]}</span></td>
              <td>{r[5]}</td>
              <td className="muted">{r[6]} ago</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Object.assign(window, { CallFeed, IntakeTable });
