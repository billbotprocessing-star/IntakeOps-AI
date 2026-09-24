import type { Urgency } from "../lib/data";

const URGENCY: Record<Urgency, [string, string]> = {
  emergency: ["badge-red", "Emergency"],
  high: ["badge-amber", "High"],
  standard: ["badge-indigo", "Standard"],
  unqualified: ["badge-gray", "Unqualified"],
};

export function UrgencyBadge({ level }: { level: Urgency }) {
  const [cls, label] = URGENCY[level] ?? ["badge-gray", level];
  return <span className={`badge ${cls}`}>{label}</span>;
}

const PRIORITY: Record<string, string> = { CRITICAL: "badge-red", HIGH: "badge-amber", NORMAL: "badge-indigo" };

export function PriorityBadge({ priority }: { priority: string }) {
  return <span className={`badge ${PRIORITY[priority] ?? "badge-gray"}`}>{priority}</span>;
}

export function YesNo({ yes, yesLabel, noLabel }: { yes: boolean; yesLabel: string; noLabel: string }) {
  return <span className={`badge ${yes ? "badge-green" : "badge-gray"}`}>{yes ? yesLabel : noLabel}</span>;
}
