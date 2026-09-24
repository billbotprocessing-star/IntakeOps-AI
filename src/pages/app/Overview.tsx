import { Link } from "react-router-dom";
import DailyBars, { countByDay } from "../../components/DailyBars";
import { UrgencyBadge } from "../../components/Badges";
import { TableState } from "../../components/States";
import { useRows, type Lead, type MissedCall } from "../../lib/data";
import { formatDateTime, formatDuration, formatPercent, industryLabel } from "../../lib/format";

const WINDOW_DAYS = 30;

export default function Overview() {
  const leads = useRows<Lead>("leads", "occurred_at", { sinceDays: WINDOW_DAYS, limit: 5000 });
  const missed = useRows<MissedCall>("missed_calls", "missed_at", { sinceDays: WINDOW_DAYS, limit: 5000 });

  const total = leads.rows.length;
  const qualified = leads.rows.filter((l) => l.urgency_level !== "unqualified").length;
  const emergencies = leads.rows.filter((l) => l.urgency_level === "emergency").length;
  const booked = leads.rows.filter((l) => l.status === "booked").length;
  const avgDuration = total ? Math.round(leads.rows.reduce((s, l) => s + l.call_duration_seconds, 0) / total) : 0;
  const recovered = missed.rows.filter((m) => m.recovery_sms_sent).length;

  const kpis = [
    { label: "Calls handled", value: String(total), sub: `last ${WINDOW_DAYS} days` },
    { label: "Qualified rate", value: formatPercent(total ? qualified / total : null), sub: `${qualified} qualified` },
    { label: "Booked", value: String(booked), sub: formatPercent(qualified ? booked / qualified : null) + " of qualified" },
    { label: "Emergencies", value: String(emergencies), sub: "paged to on-call" },
    { label: "Missed calls", value: String(missed.rows.length), sub: `${recovered} sent a recovery text` },
    { label: "Avg call length", value: total ? formatDuration(avgDuration) : "—", sub: "per handled call" },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Overview</h1>
          <p>How your AI receptionist performed over the last {WINDOW_DAYS} days.</p>
        </div>
      </div>

      <div className="kpis">
        {kpis.map((k) => (
          <div className="card kpi" key={k.label}>
            <div className="label">{k.label}</div>
            <div className="value">{leads.loading ? "…" : k.value}</div>
            <div className="sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <h2>Calls handled per day</h2>
        </div>
        <div className="panel-body">
          <DailyBars days={countByDay(leads.rows.map((l) => l.occurred_at), 14)} label="Calls" />
        </div>
      </div>

      <div className="card panel">
        <div className="panel-head">
          <h2>Latest leads</h2>
          <Link to="/app/leads" className="link-btn">
            View all →
          </Link>
        </div>
        <TableState loading={leads.loading} error={leads.error} empty={!total} emptyText="No calls yet. They'll appear here as soon as n8n posts to /api/leads." />
        {total > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Caller</th>
                  <th>Urgency</th>
                  <th>Issue</th>
                  <th>Industry</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {leads.rows.slice(0, 6).map((l) => (
                  <tr key={l.id}>
                    <td>
                      {l.caller_name}
                      <div className="muted mono">{l.caller_phone}</div>
                    </td>
                    <td>
                      <UrgencyBadge level={l.urgency_level} />
                    </td>
                    <td className="clip">{l.issue_description || "—"}</td>
                    <td>{industryLabel(l.industry)}</td>
                    <td className="muted">{formatDateTime(l.occurred_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
