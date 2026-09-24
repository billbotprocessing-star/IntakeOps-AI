import { useMemo, useState } from "react";
import Drawer from "../../components/Drawer";
import { UrgencyBadge } from "../../components/Badges";
import { TableState } from "../../components/States";
import { updateStatus, useRows, type Lead, type LeadStatus } from "../../lib/data";
import { formatDateTime, formatDuration, industryLabel } from "../../lib/format";

const STATUSES: LeadStatus[] = ["new", "contacted", "booked", "closed", "unqualified"];
const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  closed: "Closed",
  unqualified: "Unqualified",
};

export default function Leads() {
  const { rows, setRows, loading, error } = useRows<Lead>("leads", "occurred_at");
  const [query, setQuery] = useState("");
  const [urgency, setUrgency] = useState("");
  const [status, setStatus] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (l) =>
        (!urgency || l.urgency_level === urgency) &&
        (!status || l.status === status) &&
        (!q || [l.caller_name, l.caller_phone, l.issue_description, l.service_address].some((f) => f.toLowerCase().includes(q))),
    );
  }, [rows, query, urgency, status]);

  const open = rows.find((l) => l.id === openId) ?? null;

  async function changeStatus(lead: Lead, next: LeadStatus) {
    const previous = lead.status;
    setRows((rs) => rs.map((r) => (r.id === lead.id ? { ...r, status: next } : r)));
    const err = await updateStatus("leads", lead.id, next);
    if (err) {
      setRows((rs) => rs.map((r) => (r.id === lead.id ? { ...r, status: previous } : r)));
      alert(`Couldn't update status: ${err}`);
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Leads</h1>
          <p>Every call your receptionist handled, with transcript and recording.</p>
        </div>
      </div>

      <div className="toolbar">
        <input className="input" placeholder="Search name, phone, issue…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search leads" />
        <select className="select" value={urgency} onChange={(e) => setUrgency(e.target.value)} aria-label="Urgency">
          <option value="">All urgencies</option>
          <option value="emergency">Emergency</option>
          <option value="high">High</option>
          <option value="standard">Standard</option>
          <option value="unqualified">Unqualified</option>
        </select>
        <select className="select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="card panel">
        <TableState loading={loading} error={error} empty={!filtered.length} emptyText={rows.length ? "No leads match these filters." : "No leads yet."} />
        {filtered.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Caller</th>
                  <th>Urgency</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th className="num">Length</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="clickable" onClick={() => setOpenId(l.id)}>
                    <td>
                      {l.caller_name}
                      <div className="muted mono">{l.caller_phone}</div>
                    </td>
                    <td>
                      <UrgencyBadge level={l.urgency_level} />
                    </td>
                    <td className="clip">{l.issue_description || "—"}</td>
                    <td>{STATUS_LABEL[l.status]}</td>
                    <td className="num">{formatDuration(l.call_duration_seconds)}</td>
                    <td className="muted">{formatDateTime(l.occurred_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <Drawer title={open.caller_name} onClose={() => setOpenId(null)}>
          <label className="field" style={{ marginBottom: 18 }}>
            Status
            <select className="select" value={open.status} onChange={(e) => changeStatus(open, e.target.value as LeadStatus)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
          <dl>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${open.caller_phone}`} className="mono">
                {open.caller_phone}
              </a>
            </dd>
            <dt>Urgency</dt>
            <dd>
              <UrgencyBadge level={open.urgency_level} />
            </dd>
            <dt>Industry</dt>
            <dd>{industryLabel(open.industry)}</dd>
            <dt>Address</dt>
            <dd>{open.service_address || "—"}</dd>
            <dt>When</dt>
            <dd>{formatDateTime(open.occurred_at)}</dd>
            <dt>Call length</dt>
            <dd>{formatDuration(open.call_duration_seconds)}</dd>
            <dt>Ended</dt>
            <dd>{open.ended_reason || "—"}</dd>
            <dt>HubSpot</dt>
            <dd className="mono">{open.hubspot_deal_id ? `deal ${open.hubspot_deal_id}` : "not synced"}</dd>
            <dt>Call ID</dt>
            <dd className="mono">{open.call_id}</dd>
          </dl>
          <h3>Issue</h3>
          <p>{open.issue_description || "—"}</p>
          {open.recording_url && (
            <>
              <h3>Recording</h3>
              <audio controls preload="none" src={open.recording_url} />
            </>
          )}
          <h3>Transcript</h3>
          <div className="transcript">{open.transcript || "No transcript."}</div>
        </Drawer>
      )}
    </>
  );
}
