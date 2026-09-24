export function TableState({ loading, error, empty, emptyText }: {
  loading: boolean;
  error: string | null;
  empty: boolean;
  emptyText: string;
}) {
  if (error) return <div className="empty">Couldn't load data: {error}</div>;
  if (loading) return <div className="empty">Loading…</div>;
  if (empty) return <div className="empty">{emptyText}</div>;
  return null;
}
