import { useState } from "react";
import { PriorityBadge } from "../../components/Badges";
import { TableState } from "../../components/States";
import { updateStatus, useRows, type Ticket } from "../../lib/data";
import { formatDateTime, industryLabel } from "../../lib/format";

const STATUSES: Record<string, string> = {
  escalated: "Escalated",
  pending_callback: "Pending callback",
  queued: "Queued",
  in_progress: "In progress",
  resolved: "Resolved",
};

export default function Tickets() {
  const { rows, setRows, loading, error } = useRows<Ticket>("tickets", "occurred_at");
  const [showResolved, setShowResolved] = useState(false);
  const visible = rows.filter((t) => showResolved || t.status !== "resolved");

  async function changeStatus(ticket: Ticket, next: string) {
    const previous = ticket.status;
    setRows((rs) => rs.map((r) => (r.id === ticket.id ? { ...r, status: next } : r)));
    const err = await updateStatus("tickets", ticket.id, next);
    if (err) {
      setRows((rs) => rs.map((r) => (r.id === ticket.id ? { ...r, status: previous } : r)));
      alert(`Couldn't update status: ${err}`);
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Tickets</h1>
          <p>Prioritized follow-ups created by triage routing.</p>
        </div>
        <label className="muted" style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
          <input type="checkbox" checked={showResolved} onChange={(e) => setShowResolved(e.target.checked)} /> Show resolved
        </label>
      </div>

      <div className="card panel">
        <TableState loading={loading} error={error} empty={!visible.length} emptyText="No open tickets." />
        {visible.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Caller</th>
                  <th>Issue</th>
                  <th>Industry</th>
                  <th>Status</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td>
                      {t.caller_name}
                      <div className="muted mono">
                        <a href={`tel:${t.caller_phone}`}>{t.caller_phone}</a>
                      </div>
                    </td>
                    <td className="clip" title={t.issue_description}>
                      {t.issue_description || "—"}
                      {t.service_address && <div className="muted">{t.service_address}</div>}
                    </td>
                    <td>{industryLabel(t.industry)}</td>
                    <td>
                      <select className="select" style={{ padding: "6px 8px", fontSize: 13 }} value={t.status} onChange={(e) => changeStatus(t, e.target.value)} aria-label="Ticket status">
                        {!(t.status in STATUSES) && <option value={t.status}>{t.status}</option>}
                        {Object.entries(STATUSES).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="muted">{formatDateTime(t.occurred_at)}</td>
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
