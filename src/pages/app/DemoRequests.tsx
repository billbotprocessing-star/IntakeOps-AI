import { YesNo } from "../../components/Badges";
import { TableState } from "../../components/States";
import { useRows, type DemoRequest } from "../../lib/data";
import { formatDateTime, industryLabel } from "../../lib/format";

export default function DemoRequests() {
  const { rows, loading, error } = useRows<DemoRequest>("demo_requests", "created_at");
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Demo requests</h1>
          <p>Prospects who asked for a demo call from the landing page.</p>
        </div>
      </div>
      <div className="card panel">
        <TableState loading={loading} error={error} empty={!rows.length} emptyText="No demo requests yet." />
        {rows.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Phone</th>
                  <th>Industry</th>
                  <th>Demo call</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={d.id}>
                    <td className="mono">
                      <a href={`tel:${d.phone_number}`}>{d.phone_number}</a>
                    </td>
                    <td>{industryLabel(d.industry)}</td>
                    <td>
                      <YesNo yes={d.forwarded} yesLabel="Triggered" noLabel="Failed" />
                    </td>
                    <td className="muted">{formatDateTime(d.created_at)}</td>
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
