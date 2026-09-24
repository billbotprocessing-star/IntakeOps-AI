export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m ? `${m}m ${s.toString().padStart(2, "0")}s` : `${s}s`;
}

export function formatPercent(value: number | null) {
  return value === null ? "—" : `${Math.round(value * 100)}%`;
}

const INDUSTRY_LABELS: Record<string, string> = {
  plumbing: "Plumbing",
  legal: "Legal",
  "med-spa": "Med spa",
  "property-management": "Property mgmt",
  general: "General",
  "home-services": "Home services",
  property: "Property mgmt",
  "multi-location": "Multi-location",
  other: "Other",
};

export const industryLabel = (key: string) => INDUSTRY_LABELS[key] ?? key;
