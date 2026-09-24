import { YesNo } from "../../components/Badges";
import { TableState } from "../../components/States";
import { useRows, type MissedCall } from "../../lib/data";
import { formatDateTime } from "../../lib/format";

export default function MissedCalls() {
  const { rows, loading, error } = useRows<MissedCall>("missed_calls", "missed_at");
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Missed calls</h1>
          <p>Callers who didn't reach the receptionist, and whether they got a recovery text.</p>
        </div>
      </div>
      <div className="card panel">
        <TableState loading={loading} error={error} empty={!rows.length} emptyText="No missed calls. Nice." />
        {rows.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Caller</th>
                  <th>Missed at</th>
                  <th>Recovery text</th>
                  <th>Call ID</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.id}>
                    <td className="mono">
                      <a href={`tel:${m.caller_phone}`}>{m.caller_phone}</a>
                    </td>
                    <td>{formatDateTime(m.missed_at)}</td>
                    <td>
                      <YesNo yes={m.recovery_sms_sent} yesLabel="Sent" noLabel="Not sent" />
                    </td>
                    <td className="muted mono">{m.call_id}</td>
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
